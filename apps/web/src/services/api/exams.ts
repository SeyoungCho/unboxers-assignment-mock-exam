import {
  examApi,
  parseExamResponseDto,
  parseSubmitResponseDto,
  type ExamResponseDto,
  type SubmitRequestDto,
  type SubmitResponseDto,
} from "@/types";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3001";

function buildApiUrl(path: string) {
  return new URL(path, API_BASE_URL).toString();
}

async function readErrorMessage(response: Response) {
  try {
    const data: unknown = await response.json();

    if (
      typeof data === "object" &&
      data !== null &&
      "message" in data &&
      typeof data.message === "string"
    ) {
      return data.message;
    }
  } catch {
    // json 파싱 실패 예외 무시
  }

  return `Request failed with status ${response.status}`;
}

export async function fetchExam(): Promise<ExamResponseDto> {
  const response = await fetch(buildApiUrl(examApi.exam));

  if (!response.ok) {
    throw new Error(await readErrorMessage(response));
  }

  return parseExamResponseDto(await response.json());
}

export async function submitExam(
  payload: SubmitRequestDto,
): Promise<SubmitResponseDto> {
  const response = await fetch(buildApiUrl(examApi.submit), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(await readErrorMessage(response));
  }

  return parseSubmitResponseDto(await response.json());
}
