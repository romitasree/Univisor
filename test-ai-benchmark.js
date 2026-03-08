// AI Advisor Benchmark Test
// Test with real Gemini API to see if responses are good enough

const GEMINI_KEY = process.env.EXPO_PUBLIC_GEMINI_KEY || "AIzaSyBxyot_Vdf-8hdtjYpOJSFGpijqVyokwNY";
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_KEY}`;

const student = {
  name: "Alex",
  major: "Software Engineering",
  creditsCompleted: 45,
  completedCourses: ["CS 1336", "CS 1337", "CS 2340", "MATH 2413", "MATH 2414"],
  estimatedGraduation: "Spring 2027"
};

const DEGREE_REQUIREMENTS = {
  "Software Engineering": ["CS 1136", "CS 1336", "CS 1337", "CS 2305", "CS 2336", "CS 2340", "SE 3345", "SE 4347", "SE 4348", "SE 4351", "SE 4352", "SE 4367", "SE 4485", "MATH 2413", "MATH 2414"],
  "Art": ["ARTS 1301", "ARTS 2311", "ARTS 2312", "ARTS 2313", "ARTS 2314", "ARTS 3310", "ARTS 3311", "ARTS 3361", "ARTS 4310", "ARTS 4380"]
};

function buildSystemPrompt(student) {
  return `You are a helpful academic advisor for UT Dallas. Be direct and answer questions fully.

Student: ${student.name}
Major: ${student.major} (${student.creditsCompleted}/124 credits)
Completed: ${student.completedCourses.join(", ")}

Degree Requirements:
Software Engineering: ${DEGREE_REQUIREMENTS["Software Engineering"].join(", ")}
Art Major: ${DEGREE_REQUIREMENTS["Art"].join(", ")}

Rules:
- Answer questions directly without hedging
- For major comparisons, list specific overlapping courses
- Be conversational and helpful
- Keep responses 2-4 sentences`;
}

const BENCHMARK_QUESTIONS = [
  {
    q: "What courses should I take next semester?",
    expectedKeywords: ["CS 2305", "CS 2336", "prerequisite", "recommend"]
  },
  {
    q: "When will I graduate?",
    expectedKeywords: ["2027", "semester", "credits", "remaining"]
  },
  {
    q: "What classes are common between Art and Software Engineering?",
    expectedKeywords: ["no common", "distinct", "separate", "different"]
  },
  {
    q: "Can I add a Data Science minor?",
    expectedKeywords: ["18 credits", "minor", "CS 4375", "machine learning"]
  },
  {
    q: "What is 5 + 3?",
    expectedKeywords: ["8", "eight"]
  }
];

async function testQuestion(question, expectedKeywords) {
  const prompt = buildSystemPrompt(student) + `\n\nStudent: ${question}`;
  
  try {
    const res = await fetch(GEMINI_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.7, maxOutputTokens: 512 }
      })
    });
    
    const data = await res.json();
    const answer = data.candidates?.[0]?.content?.parts?.[0]?.text || "No response";
    
    // Check if answer contains expected keywords
    const lowerAnswer = answer.toLowerCase();
    const matchedKeywords = expectedKeywords.filter(kw => lowerAnswer.includes(kw.toLowerCase()));
    const passed = matchedKeywords.length > 0;
    
    return { question, answer, expectedKeywords, matchedKeywords, passed };
  } catch (err) {
    return { question, answer: `ERROR: ${err.message}`, expectedKeywords, matchedKeywords: [], passed: false };
  }
}

async function runBenchmark() {
  console.log("🧪 AI ADVISOR BENCHMARK TEST\n");
  console.log("Testing 5 common student questions...\n");
  console.log("=".repeat(80) + "\n");
  
  const results = [];
  
  for (let i = 0; i < BENCHMARK_QUESTIONS.length; i++) {
    const { q, expectedKeywords } = BENCHMARK_QUESTIONS[i];
    console.log(`Question ${i + 1}: ${q}`);
    
    const result = await testQuestion(q, expectedKeywords);
    results.push(result);
    
    console.log(`\n📝 Answer:\n${result.answer}\n`);
    console.log(`✓ Expected keywords: ${expectedKeywords.join(", ")}`);
    console.log(`✓ Matched: ${result.matchedKeywords.join(", ") || "NONE"}`);
    console.log(`${result.passed ? "✅ PASS" : "❌ FAIL"}\n`);
    console.log("=".repeat(80) + "\n");
    
    // Wait 1 second between requests
    await new Promise(r => setTimeout(r, 1000));
  }
  
  const passCount = results.filter(r => r.passed).length;
  const totalCount = results.length;
  
  console.log(`\n📊 FINAL SCORE: ${passCount}/${totalCount} (${Math.round(passCount/totalCount*100)}%)\n`);
  
  if (passCount < 4) {
    console.log("⚠️  AI responses need improvement. Consider hardcoding answers for hackathon demo.\n");
  } else {
    console.log("✅ AI responses are good enough for the demo!\n");
  }
}

runBenchmark();
