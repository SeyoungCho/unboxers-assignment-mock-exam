import { z } from "zod";

export const answerTypeSchema = z.enum(["objective", "subjective"]);
export const gradeResultSchema = z.enum(["correct", "wrong", "unanswered"]);

export type AnswerType = z.infer<typeof answerTypeSchema>;
export type GradeResult = z.infer<typeof gradeResultSchema>;

export const examResponseDtoSchema = z.object({
  message: z.string(),
  data: z.object({
    title: z.string(),
    description: z.string().nullable(),
    supervisorName: z.string(),
    totalQuestions: z.number().int(),
    questions: z.array(
      z.object({
        answerType: answerTypeSchema,
        number: z.number().int(),
        score: z.number(),
      })
    ),
    totalScore: z.number(),
  }),
});

export const submitRequestDtoSchema = z.object({
  name: z.string(),
  school: z.string(),
  grade: z.number().int(),
  studentNumber: z.number().int(),
  seatNumber: z.number().int(),
  answers: z.array(
    z.object({
      answerType: answerTypeSchema,
      number: z.number().int(),
      answer: z.number().int(),
    })
  ),
});

export const submitResponseDtoSchema = z.object({
  message: z.string(),
  data: z.object({
    title: z.string(),
    score: z.number(),
    correctCount: z.number().int(),
    wrongCount: z.number().int(),
    unansweredCount: z.number().int(),
    results: z.array(
      z.object({
        answerType: answerTypeSchema,
        number: z.number().int(),
        result: gradeResultSchema,
      })
    ),
  }),
});

export type ExamResponseDto = z.infer<typeof examResponseDtoSchema>;
export type SubmitRequestDto = z.infer<typeof submitRequestDtoSchema>;
export type SubmitResponseDto = z.infer<typeof submitResponseDtoSchema>;

export const examApi = {
  exam: "/api/exams",
  submit: "/api/exams/submit",
} as const;

export function parseExamResponseDto(value: unknown): ExamResponseDto {
  return examResponseDtoSchema.parse(value);
}

export function parseSubmitResponseDto(value: unknown): SubmitResponseDto {
  return submitResponseDtoSchema.parse(value);
}
