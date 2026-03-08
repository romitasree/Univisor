export const DEGREE_REQUIREMENTS = {
  "Software Engineering": {
    totalCredits: 124,
    required: [
      { code: "CS 1136", title: "CS Lab", credits: 1, prereqs: [] },
      { code: "CS 1336", title: "Programming Fundamentals", credits: 3, prereqs: [] },
      { code: "CS 1337", title: "Computer Science I", credits: 3, prereqs: ["CS 1336"] },
      { code: "CS 2305", title: "Discrete Math I", credits: 3, prereqs: [] },
      { code: "CS 2336", title: "Computer Science II", credits: 3, prereqs: ["CS 1337"] },
      { code: "CS 2340", title: "Computer Architecture", credits: 3, prereqs: ["CS 1337"] },
      { code: "SE 3345", title: "Data Structures", credits: 3, prereqs: ["CS 2336", "CS 2305"] },
      { code: "SE 4347", title: "Database Systems", credits: 3, prereqs: ["CS 2336"] },
      { code: "SE 4348", title: "Operating Systems", credits: 3, prereqs: ["CS 2340", "CS 2336"] },
      { code: "SE 4351", title: "Requirements Engineering", credits: 3, prereqs: ["CS 3354"] },
      { code: "SE 4352", title: "Software Architecture", credits: 3, prereqs: ["SE 4351"] },
      { code: "SE 4367", title: "Software Testing", credits: 3, prereqs: ["CS 3354"] },
      { code: "SE 4485", title: "SE Project", credits: 4, prereqs: ["SE 4352"] },
      { code: "MATH 2413", title: "Differential Calculus", credits: 4, prereqs: [] },
      { code: "MATH 2414", title: "Integral Calculus", credits: 4, prereqs: ["MATH 2413"] },
    ],
    electives: 15
  },
  "Neuroscience": {
    totalCredits: 120,
    required: [
      { code: "BIOL 2311", title: "Biology I", credits: 3, prereqs: [] },
      { code: "BIOL 2312", title: "Biology II", credits: 3, prereqs: ["BIOL 2311"] },
      { code: "CHEM 1311", title: "General Chemistry I", credits: 3, prereqs: [] },
      { code: "CHEM 1312", title: "General Chemistry II", credits: 3, prereqs: ["CHEM 1311"] },
      { code: "NSC 3361", title: "Intro to Neuroscience", credits: 3, prereqs: ["BIOL 2311"] },
      { code: "NSC 3364", title: "Neurobiology", credits: 3, prereqs: ["NSC 3361"] },
      { code: "NSC 4351", title: "Behavioral Neuroscience", credits: 3, prereqs: ["NSC 3361"] },
      { code: "NSC 4366", title: "Cellular Neuroscience", credits: 3, prereqs: ["NSC 3364"] },
      { code: "MATH 2413", title: "Differential Calculus", credits: 4, prereqs: [] },
      { code: "PSYC 2301", title: "Intro to Psychology", credits: 3, prereqs: [] },
    ],
    electives: 18
  },
  "Cybersecurity": {
    totalCredits: 120,
    required: [
      { code: "CS 1336", title: "Programming Fundamentals", credits: 3, prereqs: [] },
      { code: "CS 1337", title: "Computer Science I", credits: 3, prereqs: ["CS 1336"] },
      { code: "CS 2336", title: "Computer Science II", credits: 3, prereqs: ["CS 1337"] },
      { code: "CS 2340", title: "Computer Architecture", credits: 3, prereqs: ["CS 1337"] },
      { code: "CS 4348", title: "Operating Systems", credits: 3, prereqs: ["CS 2340", "CS 2336"] },
      { code: "CS 4389", title: "Data and Applications Security", credits: 3, prereqs: ["CS 4348"] },
      { code: "CS 4390", title: "Computer Networks", credits: 3, prereqs: ["CS 4348"] },
      { code: "CS 4392", title: "Computer Security", credits: 3, prereqs: ["CS 4390"] },
      { code: "CS 4393", title: "Security Projects", credits: 3, prereqs: ["CS 4392"] },
      { code: "MATH 2413", title: "Differential Calculus", credits: 4, prereqs: [] },
    ],
    electives: 15
  },
  "Art": {
    totalCredits: 120,
    required: [
      { code: "ARTS 1301", title: "Exploring Visual Arts", credits: 3, prereqs: [] },
      { code: "ARTS 2311", title: "2D Design", credits: 3, prereqs: [] },
      { code: "ARTS 2312", title: "3D Design", credits: 3, prereqs: [] },
      { code: "ARTS 2313", title: "Drawing I", credits: 3, prereqs: [] },
      { code: "ARTS 2314", title: "Drawing II", credits: 3, prereqs: ["ARTS 2313"] },
      { code: "ARTS 3310", title: "Art History: Ancient-Medieval", credits: 3, prereqs: [] },
      { code: "ARTS 3311", title: "Art History: Renaissance-Modern", credits: 3, prereqs: [] },
      { code: "ARTS 3361", title: "Painting I", credits: 3, prereqs: ["ARTS 2313"] },
      { code: "ARTS 4310", title: "Contemporary Art & Theory", credits: 3, prereqs: [] },
      { code: "ARTS 4380", title: "Senior Exhibition", credits: 3, prereqs: ["ARTS 4310"] },
    ],
    electives: 24
  }
};

export const MINORS = {
  "Business": {
    totalCredits: 18,
    required: [
      { code: "MKT 3300", title: "Principles of Marketing", credits: 3, prereqs: [] },
      { code: "FIN 3320", title: "Business Finance", credits: 3, prereqs: [] },
      { code: "ACCT 2301", title: "Financial Accounting", credits: 3, prereqs: [] },
      { code: "BCOM 3310", title: "Business Communication", credits: 3, prereqs: [] },
      { code: "MIS 3300", title: "Fundamentals of MIS", credits: 3, prereqs: [] },
      { code: "MGT 3300", title: "Organizational Behavior", credits: 3, prereqs: [] },
    ]
  },
  "Data Science": {
    totalCredits: 18,
    required: [
      { code: "CS 4375", title: "Machine Learning", credits: 3, prereqs: [] },
      { code: "CS 4347", title: "Database Systems", credits: 3, prereqs: [] },
      { code: "STAT 3360", title: "Probability and Statistics", credits: 3, prereqs: [] },
      { code: "CS 4395", title: "NLP", credits: 3, prereqs: ["CS 4375"] },
      { code: "CS 4349", title: "Advanced Algorithms", credits: 3, prereqs: [] },
      { code: "CS 2305", title: "Discrete Math I", credits: 3, prereqs: [] },
    ]
  },
  "Mathematics": {
    totalCredits: 18,
    required: [
      { code: "MATH 2413", title: "Differential Calculus", credits: 4, prereqs: [] },
      { code: "MATH 2414", title: "Integral Calculus", credits: 4, prereqs: ["MATH 2413"] },
      { code: "MATH 2415", title: "Calculus III", credits: 4, prereqs: ["MATH 2414"] },
      { code: "MATH 2418", title: "Linear Algebra", credits: 4, prereqs: ["MATH 2414"] },
    ]
  }
};

export const MAJORS_LIST = ["Software Engineering", "Neuroscience", "Cybersecurity", "Art"];
export const MINORS_LIST = ["None", "Business", "Data Science", "Mathematics"];
