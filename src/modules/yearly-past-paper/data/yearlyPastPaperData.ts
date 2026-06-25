import { MaterialIcons } from "@expo/vector-icons";

export type MaterialIconName = React.ComponentProps<typeof MaterialIcons>["name"];

export type SubjectGroupId =
  | "all"
  | "commerce"
  | "mathematics"
  | "languages"
  | "science"
  | "humanities";

export type PaperType = "mcq" | "theory" | "practical" | "alternative";

export type McqQuestion = {
  id: string;
  prompt: string;
  options: { key: "A" | "B" | "C" | "D"; text: string }[];
  correctOption: "A" | "B" | "C" | "D";
  answerNote: string;
};

export type WrittenQuestion = {
  id: string;
  label: string;
  prompt: string;
  explanation: string;
};

export type PaperVariant = {
  id: string;
  paperCode: string;
  label: string;
  grade: string;
  badges: string[];
  type: PaperType;
  pdfTitle: string;
  questionCount: number;
  mcqs?: McqQuestion[];
  writtenQuestions?: WrittenQuestion[];
};

export type PaperSection = {
  id: string;
  title: string;
  type: PaperType;
  accent: string;
  variants: PaperVariant[];
};

export type SessionResource = {
  id: string;
  label: string;
  fileName: string;
};

export type SubjectSession = {
  id: string;
  year: string;
  session: string;
  accent: string;
  difficulty: "Easy" | "Moderate" | "Hard";
  paperGroups: PaperSection[];
  resources: SessionResource[];
};

export type SubjectItem = {
  id: string;
  name: string;
  code: string;
  group: SubjectGroupId;
  icon: MaterialIconName;
  palette: {
    edge: string;
    glow: string;
    orb: string;
  };
  sessions: SubjectSession[];
};

export const SUBJECT_GROUPS: { id: SubjectGroupId; label: string }[] = [
  { id: "all", label: "All Subjects" },
  { id: "commerce", label: "Commerce Book" },
  { id: "mathematics", label: "Mathematics Book" },
  { id: "languages", label: "Languages Book" },
  { id: "science", label: "Science Book" },
  { id: "humanities", label: "Humanities Book" },
];

function buildMcqs(subjectName: string, paperCode: string): McqQuestion[] {
  const answerKeys: ("A" | "B" | "C" | "D")[] = ["A", "B", "C", "D"];

  return Array.from({ length: 40 }, (_, index) => {
    const number = index + 1;
    const correctOption = answerKeys[index % 4];

    return {
      id: `${paperCode}-q${number}`,
      prompt: `${subjectName} question ${number}. Select the best answer for this past paper item.`,
      options: [
        { key: "A", text: `Concept choice A for question ${number}` },
        { key: "B", text: `Concept choice B for question ${number}` },
        { key: "C", text: `Concept choice C for question ${number}` },
        { key: "D", text: `Concept choice D for question ${number}` },
      ],
      correctOption,
      answerNote: `Correct answer ${correctOption} hai kyun ke is question ka tested concept ${subjectName.toLowerCase()} ke core syllabus point se linked hai.`,
    };
  });
}

function buildWrittenQuestions(subjectName: string, paperLabel: string): WrittenQuestion[] {
  return Array.from({ length: 8 }, (_, index) => {
    const number = index + 1;

    return {
      id: `${paperLabel.toLowerCase().replace(/\s+/g, "-")}-q${number}`,
      label: `Question ${number}`,
      prompt: `${subjectName} ${paperLabel} Question ${number}`,
      explanation: `Explanation for Question ${number}: First identify the command word, then break the marking points into clear, concise steps, and finally complete the answer using appropriate model phrasing.`,    };
  });
}

function buildPaperSections(subjectName: string, code: string) {
  return [
    {
      id: "mcq",
      title: "Paper 1: Multiple Choice",
      type: "mcq" as const,
      accent: "#B49349",
      variants: [
        {
          id: `${code}-paper11`,
          paperCode: "11",
          label: "Paper 11",
          grade: "A grade: 30/40",
          badges: ["QP", "MS"],
          type: "mcq" as const,
          pdfTitle: `${code}/11 Multiple Choice`,
          questionCount: 40,
          mcqs: buildMcqs(subjectName, `${code}-11`),
        },
        {
          id: `${code}-paper12`,
          paperCode: "12",
          label: "Paper 12",
          grade: "A grade: 30/40",
          badges: ["QP", "MS"],
          type: "mcq" as const,
          pdfTitle: `${code}/12 Multiple Choice`,
          questionCount: 40,
          mcqs: buildMcqs(subjectName, `${code}-12`),
        },
      ],
    },
    {
      id: "theory",
      title: "Paper 2: Theory",
      type: "theory" as const,
      accent: "#7B68D6",
      variants: [
        {
          id: `${code}-paper21`,
          paperCode: "21",
          label: "Paper 21",
          grade: "A grade: 49/80",
          badges: ["QP", "MS"],
          type: "theory" as const,
          pdfTitle: `${code}/21 Theory`,
          questionCount: 8,
          writtenQuestions: buildWrittenQuestions(subjectName, "Paper 21"),
        },
        {
          id: `${code}-paper22`,
          paperCode: "22",
          label: "Paper 22",
          grade: "A grade: 51/80",
          badges: ["QP", "MS"],
          type: "theory" as const,
          pdfTitle: `${code}/22 Theory`,
          questionCount: 8,
          writtenQuestions: buildWrittenQuestions(subjectName, "Paper 22"),
        },
      ],
    },
    {
      id: "practical",
      title: "Paper 3: Practical Test",
      type: "practical" as const,
      accent: "#D58A5D",
      variants: [
        {
          id: `${code}-paper31`,
          paperCode: "31",
          label: "Paper 31",
          grade: "A grade: 27/40",
          badges: ["QP", "MS", "CI"],
          type: "practical" as const,
          pdfTitle: `${code}/31 Practical Test`,
          questionCount: 6,
          writtenQuestions: buildWrittenQuestions(subjectName, "Paper 31"),
        },
        {
          id: `${code}-paper32`,
          paperCode: "32",
          label: "Paper 32",
          grade: "A grade: 29/40",
          badges: ["QP", "MS", "CI"],
          type: "practical" as const,
          pdfTitle: `${code}/32 Practical Test`,
          questionCount: 6,
          writtenQuestions: buildWrittenQuestions(subjectName, "Paper 32"),
        },
      ],
    },
    {
      id: "alternative",
      title: "Paper 4: Alternative to Practical",
      type: "alternative" as const,
      accent: "#A59A44",
      variants: [
        {
          id: `${code}-paper41`,
          paperCode: "41",
          label: "Paper 41",
          grade: "A grade: 27/40",
          badges: ["QP", "MS"],
          type: "alternative" as const,
          pdfTitle: `${code}/41 Alternative to Practical`,
          questionCount: 6,
          writtenQuestions: buildWrittenQuestions(subjectName, "Paper 41"),
        },
        {
          id: `${code}-paper42`,
          paperCode: "42",
          label: "Paper 42",
          grade: "A grade: 29/40",
          badges: ["QP", "MS"],
          type: "alternative" as const,
          pdfTitle: `${code}/42 Alternative to Practical`,
          questionCount: 6,
          writtenQuestions: buildWrittenQuestions(subjectName, "Paper 42"),
        },
      ],
    },
  ];
}

function buildSessions(subjectName: string, code: string): SubjectSession[] {
  return [
    {
      id: `${code}-2024-oct-nov`,
      year: "2024",
      session: "Oct/Nov",
      accent: "#F2C08D",
      difficulty: "Easy",
      resources: [
        { id: `${code}-gt`, label: "Grade Threshold", fileName: `${code.toLowerCase()}_w24_gt.pdf` },
      ],
      paperGroups: buildPaperSections(subjectName, code),
    },
    {
      id: `${code}-2024-may-june`,
      year: "2024",
      session: "May/June",
      accent: "#7AE7D5",
      difficulty: "Moderate",
      resources: [
        { id: `${code}-gt-2`, label: "Grade Threshold", fileName: `${code.toLowerCase()}_s24_gt.pdf` },
      ],
      paperGroups: buildPaperSections(subjectName, code),
    },
    {
      id: `${code}-2023-oct-nov`,
      year: "2023",
      session: "Oct/Nov",
      accent: "#8CB7FF",
      difficulty: "Hard",
      resources: [
        { id: `${code}-gt-3`, label: "Grade Threshold", fileName: `${code.toLowerCase()}_w23_gt.pdf` },
      ],
      paperGroups: buildPaperSections(subjectName, code),
    },
  ];
}

export const YEARLY_SUBJECTS: SubjectItem[] = [
  {
    id: "acc-7707",
    name: "Accounting",
    code: "7707",
    group: "commerce",
    icon: "calculate",
    palette: {
      edge: "#F2C08D",
      glow: "rgba(242, 192, 141, 0.22)",
      orb: "rgba(242, 192, 141, 0.14)",
    },
    sessions: buildSessions("Accounting", "7707"),
  },
  {
    id: "add-math-4037",
    name: "Additional Mathematics",
    code: "4037",
    group: "mathematics",
    icon: "functions",
    palette: {
      edge: "#CDA4FF",
      glow: "rgba(205, 164, 255, 0.22)",
      orb: "rgba(205, 164, 255, 0.14)",
    },
    sessions: buildSessions("Additional Mathematics", "4037"),
  },
  {
    id: "biology-5090",
    name: "Biology",
    code: "5090",
    group: "science",
    icon: "biotech",
    palette: {
      edge: "#9DD18B",
      glow: "rgba(157, 209, 139, 0.22)",
      orb: "rgba(157, 209, 139, 0.14)",
    },
    sessions: buildSessions("Biology", "5090"),
  },
  {
    id: "arabic-3180",
    name: "Arabic",
    code: "3180",
    group: "languages",
    icon: "translate",
    palette: {
      edge: "#B48FFF",
      glow: "rgba(180, 143, 255, 0.22)",
      orb: "rgba(180, 143, 255, 0.14)",
    },
    sessions: buildSessions("Arabic", "3180"),
  },
  {
    id: "business-7115",
    name: "Business Studies",
    code: "7115",
    group: "commerce",
    icon: "business-center",
    palette: {
      edge: "#A6DCAD",
      glow: "rgba(166, 220, 173, 0.22)",
      orb: "rgba(166, 220, 173, 0.14)",
    },
    sessions: buildSessions("Business Studies", "7115"),
  },
  {
    id: "bangladesh-2094",
    name: "Bangladesh Studies",
    code: "2094",
    group: "humanities",
    icon: "public",
    palette: {
      edge: "#67D9D0",
      glow: "rgba(103, 217, 208, 0.22)",
      orb: "rgba(103, 217, 208, 0.14)",
    },
    sessions: buildSessions("Bangladesh Studies", "2094"),
  },
];

export function getSubjectById(subjectId?: string) {
  return YEARLY_SUBJECTS.find((subject) => subject.id === subjectId) ?? null;
}

export function getSessionById(subjectId?: string, sessionId?: string) {
  const subject = getSubjectById(subjectId);

  if (!subject) {
    return null;
  }

  return subject.sessions.find((session) => session.id === sessionId) ?? null;
}

export function getPaperVariantById(subjectId?: string, sessionId?: string, variantId?: string) {
  const session = getSessionById(subjectId, sessionId);

  if (!session) {
    return null;
  }

  for (const group of session.paperGroups) {
    const variant = group.variants.find((item) => item.id === variantId);

    if (variant) {
      return { group, variant };
    }
  }

  return null;
}
