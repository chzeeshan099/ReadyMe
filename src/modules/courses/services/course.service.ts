const COURSES = [
  {
    id: "math-foundation",
    title: "Cambridge Math Accelerator",
    level: "Foundation",
    description: "Concept-first math lessons with revision drills and quick tests.",
    duration: "8 Weeks",
    syllabus: ["Algebra refresh", "Functions and graphs", "Exam tactics"],
  },
  {
    id: "physics-core",
    title: "Physics Problem Solving Lab",
    level: "Intermediate",
    description: "Build speed, reasoning, and structured answers for physics papers.",
    duration: "10 Weeks",
    syllabus: ["Mechanics", "Electricity", "Waves and optics"],
  },
  {
    id: "biology-mastery",
    title: "Biology Mastery Track",
    level: "Advanced",
    description: "Memorisation support plus diagram practice and topical quizzes.",
    duration: "6 Weeks",
    syllabus: ["Cells and genetics", "Human systems", "Exam revision"],
  },
];

export function getCourses() {
  return COURSES;
}

export function getFeaturedCourses(user) {
  if (user?.subjects?.length) {
    const preferred = COURSES.filter((course) =>
      user.subjects.some((subject) =>
        course.title.toLowerCase().includes(subject.toLowerCase().split(" ")[0]),
      ),
    );

    return preferred.length ? preferred : COURSES.slice(0, 2);
  }

  return COURSES.slice(0, 2);
}

export function getCourseById(courseId) {
  return COURSES.find((course) => course.id === courseId) || COURSES[0];
}
