// Test case for transcript parsing
// Run with: node test-transcript.js

const sampleTranscript = `THE UNIVERSITY OF TEXAS AT DALLAS
Office of the Registrar
800 W Campbell Rd, Richardson, TX 75080
Student Name: Ken Wendy
Student ID: 20245XXXX
Major: Software Engineering
College: Erik Jonsson School of Engineering and Computer Science
Class Level: Junior
Academic Standing: Good Standing

Fall 2023
Course Code Course Title Credits Grade
CS 1336 Programming Fundamentals 3 A
MATH 2413 Differential Calculus 4 B+
ECS 1100 Introduction to Engineering 1 A
RHET 1302 Rhetoric 3 A-
PHYS 2325 Mechanics 3 B
Semester GPA: 3.63 | Credits Earned: 14

Spring 2024
Course Code Course Title Credits Grade
CS 1337 Computer Science II 3 A
MATH 2414 Integral Calculus 4 B+
PHYS 2326 Electromagnetism 3 B
ECS 2390 Professional & Technical Communication 3 A-
HIST 1301 U.S. History I 3 A
Semester GPA: 3.67 | Credits Earned: 16

Fall 2024
Course Code Course Title Credits Grade
SE 2315 Discrete Mathematics for Computing 3 A-
CS 2340 Computer Architecture 3 B+
CS 3341 Probability and Statistics in CS 3 B
GOVT 2306 Texas Government 3 A
SE 2342 Programming Paradigms 3 A-
Semester GPA: 3.56 | Credits Earned: 15

Spring 2025 (In Progress)
Course Code Course Title Credits Grade
SE 3306 Software Engineering 3 IP
CS 3345 Data Structures & Algorithms 3 IP
CS 3377 Systems Programming 3 IP
MATH 2415 Multivariable Calculus 4 IP
SE 3162 Professional Responsibility 1 IP

Total Credits Attempted: 46
Total Credits Earned: 46
Cumulative GPA: 3.62`;

function parseTranscript(transcriptText) {
  const lines = transcriptText.split('\n');
  const courses = [];
  const coursePattern = /([A-Z]{2,4})\s+(\d{4})\s+(.+?)\s+(\d+)\s+([A-F][+-]?|IP|WP|W)/i;
  
  lines.forEach(line => {
    const match = line.match(coursePattern);
    if (match) {
      const [, dept, num, title, credits, grade] = match;
      const courseCode = `${dept} ${num}`;
      if (grade !== 'IP' && grade !== 'WP' && grade !== 'W' && !courses.some(c => c.code === courseCode)) {
        courses.push({
          code: courseCode,
          title: title.trim(),
          credits: parseInt(credits),
          grade: grade
        });
      }
    }
  });
  
  return courses;
}

// Run test
console.log('🧪 Testing Transcript Parser\n');
const result = parseTranscript(sampleTranscript);

console.log(`✅ Found ${result.length} completed courses:\n`);
result.forEach(course => {
  console.log(`  ${course.code.padEnd(10)} | ${course.credits} cr | Grade: ${course.grade} | ${course.title}`);
});

const totalCredits = result.reduce((sum, c) => sum + c.credits, 0);
console.log(`\n📊 Total Credits: ${totalCredits}`);

// Expected output
const expected = [
  'CS 1336', 'MATH 2413', 'ECS 1100', 'RHET 1302', 'PHYS 2325',
  'CS 1337', 'MATH 2414', 'PHYS 2326', 'ECS 2390', 'HIST 1301',
  'SE 2315', 'CS 2340', 'CS 3341', 'GOVT 2306', 'SE 2342'
];

console.log(`\n✓ Expected: ${expected.length} courses`);
console.log(`✓ Got: ${result.length} courses`);
console.log(`✓ Test ${result.length === expected.length ? 'PASSED' : 'FAILED'}`);
