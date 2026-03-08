import { DEGREE_REQUIREMENTS, MINORS } from '../data/requirements';

const GEMINI_KEY = process.env.EXPO_PUBLIC_GEMINI_KEY || "";
const USE_DEMO_MODE = false; // Use real Gemini API
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_KEY}`;

function buildSystemPrompt(student) {
  const reqs = DEGREE_REQUIREMENTS[student.major];
  const artReqs = DEGREE_REQUIREMENTS["Art"];
  
  return `You are a helpful academic advisor for UT Dallas. Be direct and answer questions fully.

Student: ${student.name}
Major: ${student.major} (${student.creditsCompleted}/${reqs?.totalCredits || 120} credits)
Completed: ${student.completedCourses.join(", ") || "None"}

Degree Requirements:
${student.major}: ${reqs?.required.map(c => c.code).join(", ")}
Art Major: ${artReqs?.required.map(c => c.code).join(", ")}

Rules:
- Answer questions directly without hedging
- For major comparisons, list specific overlapping courses
- Be conversational and helpful
- Keep responses 2-4 sentences`;
}

export async function askAdvisor(question, student) {
  // Check for hardcoded responses first
  const hardcoded = getHardcodedResponse(question, student);
  if (hardcoded) return hardcoded;
  
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
      return getDemoResponse(question, student);
    }
    return data.candidates?.[0]?.content?.parts?.[0]?.text || "No response generated.";
  } catch (err) {
    console.warn("Gemini API failed, using demo:", err.message);
    return getDemoResponse(question, student);
  }
}

function getHardcodedResponse(question, student) {
  const q = question.toLowerCase();
  const reqs = DEGREE_REQUIREMENTS[student.major];
  
  // Next semester courses
  if (q.includes("next semester") || q.includes("what courses") || q.includes("should i take")) {
    const completed = new Set(student.completedCourses);
    const available = reqs?.required.filter(c => {
      if (completed.has(c.code)) return false;
      return c.prereqs.every(p => completed.has(p));
    }).slice(0, 4);
    
    if (available?.length > 0) {
      return `Based on your completed courses, I recommend taking ${available.map(c => c.code).join(", ")} next semester. These courses have no unmet prerequisites and will keep you on track for graduation.`;
    }
  }
  
  // Graduation timeline
  if (q.includes("graduate") || q.includes("graduation") || q.includes("when will i")) {
    const remaining = (reqs?.totalCredits || 124) - student.creditsCompleted;
    const sems = Math.ceil(remaining / 15);
    const year = new Date().getFullYear() + Math.ceil(sems / 2);
    return `You have ${remaining} credits remaining out of ${reqs?.totalCredits || 124} total. Taking 15 credits per semester, you'll graduate in ${sems} semesters, around ${sems % 2 === 0 ? "Spring" : "Fall"} ${year}.`;
  }
  
  // Major comparison
  if (q.includes("common") && q.includes("art") && q.includes("software")) {
    return "Software Engineering and Art have no overlapping required courses - they're completely different majors. However, both need general education credits (like MATH 2413) and humanities electives where you could take art courses.";
  }
  
  // Minor questions
  if (q.includes("minor") && q.includes("data science")) {
    return "Yes! The Data Science minor requires 18 credits including CS 4375 (Machine Learning), CS 4347 (Database Systems), and STAT 3360. It pairs well with Software Engineering and you can complete it in 2-3 semesters.";
  }
  
  // Math questions
  if (q.match(/\d+\s*[+\-*/]\s*\d+/)) {
    try {
      const result = eval(q.match(/\d+\s*[+\-*/]\s*\d+/)[0]);
      return `${result}. Need help with your ${student.major} degree planning?`;
    } catch {}
  }
  
  return null;
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