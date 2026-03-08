const GEMINI_KEY = "YOUR_GEMINI_API_KEY_HERE";
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
    if (data.error) return "Sorry, I couldn't connect. Please try again.";
    return data.candidates?.[0]?.content?.parts?.[0]?.text || "No response generated.";
  } catch (err) {
    return "Connection error. Please try again.";
  }
}

const DEMO = {
  next: "Based on your profile, I recommend SE 3345, SE 4347, and MATH 2414 next semester.",
  grad: "At 15 credits/semester, you are on track to graduate in Spring 2027 with 42 credits remaining.",
  minor: "Adding Data Science minor needs 6 more courses (18 credits) — adds ~1 semester.",
  switch: "Switching majors keeps your CS core credits but adds ~2 semesters of new requirements.",
  default: "Great question! I recommend scheduling an advising session to discuss this in detail."
};

export function getDemoResponse(q) {
  const l = q.toLowerCase();
  if (l.includes("next") || l.includes("take")) return DEMO.next;
  if (l.includes("graduat") || l.includes("when")) return DEMO.grad;
  if (l.includes("minor")) return DEMO.minor;
  if (l.includes("switch") || l.includes("change")) return DEMO.switch;
  return DEMO.default;
}
