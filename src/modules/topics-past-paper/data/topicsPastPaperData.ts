import type React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import type {
  McqQuestion,
  PaperType,
  WrittenQuestion,
} from "@/modules/yearly-past-paper/data/yearlyPastPaperData";

export type TopicPaperItem = {
  id: string;
  title: string;
  questionCount: number;
  icon: React.ComponentProps<typeof MaterialIcons>["name"];
  accent: string;
  type: PaperType;
  pdfTitle: string;
  mcqs?: McqQuestion[];
  writtenQuestions?: WrittenQuestion[];
};

export type TopicPaperSection = {
  id: string;
  title: string;
  totalQuestions: number;
  items: TopicPaperItem[];
};

export type TopicPastPaperPaper = {
  id: string;
  title: string;
  label: string;
  type: PaperType;
  accent: string;
  sections: TopicPaperSection[];
};

export type TopicPastPaperSubject = {
  id: string;
  name: string;
  code: string;
  icon: React.ComponentProps<typeof MaterialIcons>["name"];
  palette: {
    edge: string;
    soft: string;
    glow: string;
  };
  papers: TopicPastPaperPaper[];
};

function buildMcqs(topicName: string, subjectCode: string, paperTitle: string): McqQuestion[] {
  const keys: ("A" | "B" | "C" | "D")[] = ["A", "B", "C", "D"];

  return Array.from({ length: 20 }, (_, index) => {
    const number = index + 1;
    const correctOption = keys[index % 4];

    return {
      id: `${subjectCode}-${paperTitle}-${topicName}-${number}`.toLowerCase().replace(/\s+/g, "-"),
      prompt: `${topicName} question ${number}. Choose the best answer using the key concept from this topic.`,
      options: [
        { key: "A", text: `A direct statement linked with ${topicName.toLowerCase()}` },
        { key: "B", text: `A common classroom misunderstanding from this chapter` },
        { key: "C", text: `A complete explanation using the exam keyword for this idea` },
        { key: "D", text: `A partially correct choice missing one important detail` },
      ],
      correctOption,
      answerNote: `This is correct because it matches the core syllabus wording expected in ${topicName.toLowerCase()} MCQs.`,
    };
  });
}

function buildWrittenQuestions(topicName: string, label: string): WrittenQuestion[] {
  return Array.from({ length: 6 }, (_, index) => {
    const number = index + 1;

    return {
      id: `${label}-${topicName}-${number}`.toLowerCase().replace(/\s+/g, "-"),
      label: `Question ${number}`,
      prompt: `${topicName} structured response ${number}. Answer in a clear, stepwise exam style.`,
      explanation: `Answer plan for Question ${number}: define the idea, add one supporting scientific point, and close with the exact result asked by the examiner.`,
    };
  });
}

function createItem(
  subjectCode: string,
  paperTitle: string,
  title: string,
  questionCount: number,
  icon: React.ComponentProps<typeof MaterialIcons>["name"],
  accent: string,
  type: PaperType,
): TopicPaperItem {
  return {
    id: `${subjectCode}-${paperTitle}-${title}`.toLowerCase().replace(/\s+/g, "-"),
    title,
    questionCount,
    icon,
    accent,
    type,
    pdfTitle: `${subjectCode} / ${paperTitle} / ${title}`,
    mcqs: type === "mcq" ? buildMcqs(title, subjectCode, paperTitle) : undefined,
    writtenQuestions: type === "mcq" ? undefined : buildWrittenQuestions(title, paperTitle),
  };
}

function sumQuestions(items: TopicPaperItem[]) {
  return items.reduce((total, item) => total + item.questionCount, 0);
}

function buildBiologyPapers(): TopicPastPaperPaper[] {
  const paper1Sections: TopicPaperSection[] = [
    {
      id: "cells",
      title: "Cells",
      items: [
        createItem("5090", "Paper 1", "1.1 Cell Structure And Function", 61, "biotech", "#57C6B8", "mcq"),
        createItem("5090", "Paper 1", "1.2 Specialised Cells, Tissues And Organs", 19, "medication", "#86E0D5", "mcq"),
      ],
      totalQuestions: 80,
    },
    {
      id: "classification",
      title: "Classification",
      items: [
        createItem("5090", "Paper 1", "2.1 Concept And Use Of A Classification System", 8, "adjust", "#FF5F7D", "mcq"),
        createItem("5090", "Paper 1", "2.2 Features Of Organisms", 34, "auto-awesome", "#7B4DFF", "mcq"),
      ],
      totalQuestions: 42,
    },
    {
      id: "movement",
      title: "Movement into and out of cells",
      items: [
        createItem("5090", "Paper 1", "3.1 Diffusion And Osmosis", 102, "flare", "#F0A64D", "mcq"),
        createItem("5090", "Paper 1", "3.2 Active Transport", 64, "show-chart", "#00C2A8", "mcq"),
      ],
      totalQuestions: 166,
    },
    {
      id: "molecules",
      title: "Biological molecules",
      items: [
        createItem("5090", "Paper 1", "4.1 Carbohydrates, Fats And Proteins", 21, "science", "#63B3FF", "mcq"),
        createItem("5090", "Paper 1", "4.2 Enzymes", 22, "water-drop", "#93A7FF", "mcq"),
      ],
      totalQuestions: 43,
    },
  ];

  const paper2Sections: TopicPaperSection[] = [
    {
      id: "paper2-cells",
      title: "Cells",
      items: [
        createItem("5090", "Paper 2", "1.1 Cell Structure And Function", 18, "biotech", "#57C6B8", "theory"),
        createItem("5090", "Paper 2", "1.2 Cell Transport And Surface Area", 11, "swap-calls", "#86E0D5", "theory"),
      ],
      totalQuestions: 29,
    },
    {
      id: "paper2-organisation",
      title: "Organisation",
      items: [
        createItem("5090", "Paper 2", "2.1 Movement Into And Out Of Cells", 13, "tune", "#F0A64D", "theory"),
        createItem("5090", "Paper 2", "2.2 Biological Molecules", 10, "science", "#63B3FF", "theory"),
      ],
      totalQuestions: 23,
    },
  ];

  const paper3Sections: TopicPaperSection[] = [
    {
      id: "paper3-practical",
      title: "Practical Skills",
      items: [
        createItem("5090", "Paper 3", "3.1 Planning A Food Test", 14, "science", "#57C6B8", "practical"),
        createItem("5090", "Paper 3", "3.2 Drawing And Observation", 8, "edit", "#F0A64D", "practical"),
      ],
      totalQuestions: 22,
    },
  ];

  const paper4Sections: TopicPaperSection[] = [
    {
      id: "paper4-atp",
      title: "Alternative To Practical",
      items: [
        createItem("5090", "Paper 4", "4.1 Experiment Variables And Conclusion", 16, "rule", "#57C6B8", "alternative"),
        createItem("5090", "Paper 4", "4.2 Data Reading And Graph Skills", 12, "stacked-line-chart", "#63B3FF", "alternative"),
      ],
      totalQuestions: 28,
    },
  ];

  return [
    { id: "paper-1", title: "Paper 1", label: "Multiple Choice", type: "mcq", accent: "#5FAE98", sections: paper1Sections },
    { id: "paper-2", title: "Paper 2", label: "Theory", type: "theory", accent: "#6F8FD8", sections: paper2Sections },
    { id: "paper-3", title: "Paper 3", label: "Practical Test", type: "practical", accent: "#4EB5AF", sections: paper3Sections },
    { id: "paper-4", title: "Paper 4", label: "Alternative to Practical", type: "alternative", accent: "#B58A67", sections: paper4Sections },
  ];
}

function buildSimplePapers(subjectCode: string, subjectName: string): TopicPastPaperPaper[] {
  const makeSections = (paperTitle: string, type: PaperType): TopicPaperSection[] => {
    const items = [
      createItem(subjectCode, paperTitle, `${subjectName} Core Concepts`, 24, "menu-book", "#57C6B8", type),
      createItem(subjectCode, paperTitle, `${subjectName} Exam Practice`, 18, "school", "#63B3FF", type),
    ];

    return [
      {
        id: `${paperTitle}-section-1`.toLowerCase().replace(/\s+/g, "-"),
        title: `${subjectName} Topics`,
        totalQuestions: sumQuestions(items),
        items,
      },
    ];
  };

  return [
    { id: "paper-1", title: "Paper 1", label: "Multiple Choice", type: "mcq", accent: "#5FAE98", sections: makeSections("Paper 1", "mcq") },
    { id: "paper-2", title: "Paper 2", label: "Theory", type: "theory", accent: "#6F8FD8", sections: makeSections("Paper 2", "theory") },
    { id: "paper-3", title: "Paper 3", label: "Practical Test", type: "practical", accent: "#4EB5AF", sections: makeSections("Paper 3", "practical") },
    { id: "paper-4", title: "Paper 4", label: "Alternative to Practical", type: "alternative", accent: "#B58A67", sections: makeSections("Paper 4", "alternative") },
  ];
}

export const TOPIC_PAST_PAPER_SUBJECTS: TopicPastPaperSubject[] = [
  {
    id: "accounting-7707",
    name: "Accounting",
    code: "7707",
    icon: "calculate",
    palette: { edge: "#5FAE98", soft: "#18281F", glow: "rgba(95, 174, 152, 0.14)" },
    papers: buildSimplePapers("7707", "Accounting"),
  },
  {
    id: "additional-math-4037",
    name: "Additional Mathematics",
    code: "4037",
    icon: "calculate",
    palette: { edge: "#6F8FD8", soft: "#1A2744", glow: "rgba(111, 143, 216, 0.14)" },
    papers: buildSimplePapers("4037", "Additional Mathematics"),
  },
  {
    id: "biology-5090",
    name: "Biology",
    code: "5090",
    icon: "shuffle",
    palette: { edge: "#4EB5AF", soft: "#153034", glow: "rgba(78, 181, 175, 0.14)" },
    papers: buildBiologyPapers(),
  },
  {
    id: "business-7115",
    name: "Business Studies",
    code: "7115",
    icon: "business",
    palette: { edge: "#B58A67", soft: "#35251D", glow: "rgba(181, 138, 103, 0.14)" },
    papers: buildSimplePapers("7115", "Business Studies"),
  },
  {
    id: "chemistry-5070",
    name: "Chemistry",
    code: "5070",
    icon: "science",
    palette: { edge: "#9E7BC4", soft: "#2F233D", glow: "rgba(158, 123, 196, 0.14)" },
    papers: buildSimplePapers("5070", "Chemistry"),
  },
];

export function getTopicSubjectById(subjectId?: string) {
  return TOPIC_PAST_PAPER_SUBJECTS.find((subject) => subject.id === subjectId) ?? null;
}

export function getTopicPaperById(subjectId?: string, paperId?: string) {
  const subject = getTopicSubjectById(subjectId);

  if (!subject) {
    return null;
  }

  return subject.papers.find((paper) => paper.id === paperId) ?? null;
}

export function getTopicItemById(subjectId?: string, paperId?: string, itemId?: string) {
  const paper = getTopicPaperById(subjectId, paperId);

  if (!paper) {
    return null;
  }

  for (const section of paper.sections) {
    const item = section.items.find((entry) => entry.id === itemId);

    if (item) {
      return { paper, section, item };
    }
  }

  return null;
}
