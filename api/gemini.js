import { DEGREE_REQUIREMENTS, MINORS } from '../data/requirements';

const GEMINI_KEY = process.env.EXPO_PUBLIC_GEMINI_KEY || "";
const USE_DEMO_MODE = false; // Use real Gemini API
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_KEY}`;

function buildSystemPrompt(student) {
  return `You are an AI academic advisor for UT Dallas.
Student: ${student.name} | Major: ${student.major} | Minor: ${student.minor || "None"}
Credits Completed: ${student.creditsCompleted} | Graduation: ${student.estimatedGraduation}
Completed Courses: ${student.completedCourses.join(", ") || "None"}
Missing Courses: ${student.missingCourses.join(", ") || "None"}
Be concise (3-5 sentences), specific to this student, and reference UTD course codes.`;
}

export async function askAdvisor(question, student) {
  const body = {
    contents: [{ parts: [{ text: buildSystemPrompt(student) + "\n\nStudent: " + question }] }],
    generationConfig: { temperature: 0.7, maxOutputTokens: 512 }
  };
  try {
    const res = await fetch(GEMINI_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });
    const data = await res.json();
    if (data.error) {
      console.warn("Gemini API error:", data.error);
      // Fallback to demo response
      return getDemoResponse(question, student);
    }
    return data.candidates?.[0]?.content?.parts?.[0]?.text || "No response generated.";
  } catch (err) {
    console.warn("Gemini API failed, using demo:", err.message);
    // Fallback to demo response if API unavailable
    return getDemoResponse(question, student);
  }
}

// Minimal fallback responses for when API fails
function getSimpleFallback(question, student) {
  const q = question.toLowerCase();
  if (q.includes("model") || q.includes("what are you") || q.includes("powered by")) {
    return "I'm your AI academic advisor powered by Gemini. I help with course planning, graduation timelines, and degree requirements.";
  }
  if (q.includes("name") || q.includes("who")) {
    return `I see you're ${student.name}, studying ${student.major} at UTD with ${student.creditsCompleted} credits done. How can I help?`;
  }
  if (q.includes("course") || q.includes("take") || q.includes("next")) {
    const reqs = DEGREE_REQUIREMENTS[student.major];
    if (!reqs) return "I can help you plan your courses. What would you like to know?";
    const remaining = reqs.required.filter(c => !student.completedCourses.includes(c.code));
    return `For ${student.major}, you have ${remaining.length} required courses left. Ask me about specific courses or your graduation timeline!`;
  }
  if (q.includes("graduate") || q.includes("graduation") || q.includes("when")) {
    const reqs = DEGREE_REQUIREMENTS[student.major];
    if (reqs) {
      const remaining = reqs.totalCredits - student.creditsCompleted;
      const sems = Math.ceil(remaining / 15);
      return `You need about ${remaining} more credits (${sems} semesters). That puts graduation around ${new Date().getFullYear() + Math.ceil(sems / 2)}.`;
    }
  }
  return `Hi ${student.name}! I'm here to help with your ${student.major} degree planning. What would you like to discuss?`;
}


export function getDemoResponse(question, student) {
  return getSimpleFallback(question, student);
}

export { USE_DEMO_MODE };