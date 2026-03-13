import { create } from "zustand";
import type { OmrAnswerMap } from "@/components/shared/omr-card/OmrCard";
import { submitRequestDtoSchema, type ExamResponseDto, type SubmitRequestDto } from "@/types";

const DEFAULT_EXAM_TAKER = {
  name: "권성민",
  school: "배방고등학교",
  grade: 1 as const,
  studentNumber: 21,
  seatNumber: 21,
};

type ExamSubmissionState = {
  name: string;
  school: string;
  grade: 1 | 2 | 3 | null;
  studentNumber: number | null;
  seatNumber: number | null;
  objectiveAnswers: OmrAnswerMap;
  subjectiveAnswers: Partial<Record<number, string>>;
  selectedSubjectiveQuestionNumber: number | null;
  subjectiveDraft: string;
  setGrade: (grade: 1 | 2 | 3 | null) => void;
  setStudentNumber: (studentNumber: number | null) => void;
  setSeatNumber: (seatNumber: number | null) => void;
  toggleObjectiveAnswer: (questionNumber: number, answer: number) => void;
  selectSubjectiveQuestion: (questionNumber: number) => void;
  appendSubjectiveDraft: (value: string) => void;
  backspaceSubjectiveDraft: () => void;
  submitSubjectiveDraft: () => void;
  resetExamSubmission: () => void;
};

function normalizeIntegerString(value: string) {
  return String(Number(value));
}

function isIntegerString(value: string) {
  return /^\d+$/.test(value);
}

export const useExamSubmissionStore = create<ExamSubmissionState>((set) => ({
  ...DEFAULT_EXAM_TAKER,
  objectiveAnswers: {},
  subjectiveAnswers: {},
  selectedSubjectiveQuestionNumber: null,
  subjectiveDraft: "",

  setGrade: (grade) => set({ grade }),
  setStudentNumber: (studentNumber) => set({ studentNumber }),
  setSeatNumber: (seatNumber) => set({ seatNumber }),

  toggleObjectiveAnswer: (questionNumber, answer) =>
    set((state) => {
      const currentAnswer = state.objectiveAnswers[questionNumber]?.[0];

      if (currentAnswer === answer) {
        const nextAnswers = { ...state.objectiveAnswers };
        delete nextAnswers[questionNumber];
        return { objectiveAnswers: nextAnswers };
      }

      return {
        objectiveAnswers: {
          ...state.objectiveAnswers,
          [questionNumber]: [answer],
        },
      };
    }),

  selectSubjectiveQuestion: (questionNumber) =>
    set((state) => ({
      selectedSubjectiveQuestionNumber: questionNumber,
      subjectiveDraft:
        state.subjectiveAnswers[questionNumber] != null
          ? state.subjectiveAnswers[questionNumber]
          : "",
    })),

  appendSubjectiveDraft: (value) =>
    set((state) => {
      if (state.selectedSubjectiveQuestionNumber == null) {
        return state;
      }

      return {
        subjectiveDraft: `${state.subjectiveDraft}${value}`,
      };
    }),

  backspaceSubjectiveDraft: () =>
    set((state) => {
      if (state.selectedSubjectiveQuestionNumber == null) {
        return state;
      }

      return {
        subjectiveDraft: state.subjectiveDraft.slice(0, -1),
      };
    }),

  submitSubjectiveDraft: () =>
    set((state) => {
      if (state.selectedSubjectiveQuestionNumber == null) {
        return state;
      }

      if (state.subjectiveDraft.length === 0) {
        return state;
      }

      const normalizedValue = isIntegerString(state.subjectiveDraft)
        ? normalizeIntegerString(state.subjectiveDraft)
        : state.subjectiveDraft;

      return {
        subjectiveDraft: normalizedValue,
        subjectiveAnswers: {
          ...state.subjectiveAnswers,
          [state.selectedSubjectiveQuestionNumber]: normalizedValue,
        },
      };
    }),

  resetExamSubmission: () =>
    set({
      ...DEFAULT_EXAM_TAKER,
      objectiveAnswers: {},
      subjectiveAnswers: {},
      selectedSubjectiveQuestionNumber: null,
      subjectiveDraft: "",
    }),
}));

export function buildSubmitRequestFromStore(
  examInfo: ExamResponseDto["data"],
): SubmitRequestDto {
  const state = useExamSubmissionStore.getState();

  if (
    state.grade == null ||
    state.studentNumber == null ||
    state.seatNumber == null
  ) {
    throw new Error("시험 제출에 필요한 학생 정보가 비어 있어요.");
  }

  const answers = examInfo.questions.reduce<SubmitRequestDto["answers"]>(
    (acc, question) => {
      if (question.answerType === "objective") {
        const selectedAnswer = state.objectiveAnswers[question.number]?.[0];

        if (selectedAnswer != null) {
          acc.push({
            answerType: question.answerType,
            number: question.number,
            answer: selectedAnswer,
          });
        }

        return acc;
      }

      const submittedAnswer = state.subjectiveAnswers[question.number];

      if (submittedAnswer != null) {
        if (!isIntegerString(submittedAnswer)) {
          throw new Error(
            `${question.number}번 주관식 답안은 현재 숫자만 제출할 수 있어요.`,
          );
        }

        acc.push({
          answerType: question.answerType,
          number: question.number,
          answer: Number(normalizeIntegerString(submittedAnswer)),
        });
      }

      return acc;
    },
    [],
  );

  return submitRequestDtoSchema.parse({
    name: state.name,
    school: state.school,
    grade: state.grade,
    studentNumber: state.studentNumber,
    seatNumber: state.seatNumber,
    answers,
  });
}
