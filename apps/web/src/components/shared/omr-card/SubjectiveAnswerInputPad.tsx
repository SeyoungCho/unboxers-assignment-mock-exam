import { Button } from "@/components/ui/button";
import { BackspaceIcon } from "@/components/shared/icons";
import { cn } from "@/lib/utils";

type SubjectiveAnswerInputPadProps = {
  selectedIndex: number | null;
  draftValue: string;
  onAppendValue: (nextValue: string) => void;
  onBackspace: () => void;
  onSubmit: () => void;
  keys?: readonly string[];
};

const SUBJECTIVE_INPUT_PAD_KEYS = [
  ".",
  "/",
  "-",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
] as const;

function SubjectiveAnswerInputPad({
  selectedIndex,
  draftValue,
  onAppendValue,
  onBackspace,
  onSubmit,
  keys = SUBJECTIVE_INPUT_PAD_KEYS,
}: SubjectiveAnswerInputPadProps) {
  const isRowSelected = selectedIndex !== null;
  const displayText = isRowSelected
    ? draftValue || `${selectedIndex + 1}번 답안을 입력하세요`
    : "입력할 곳을 터치해주세요";

  return (
    <div className="flex w-full flex-col gap-6 [&_button]:h-13 [&_button]:rounded-xl [&_button]:text-[17px] [&_button]:font-bold">
      <div className="grid grid-cols-3 gap-3">
        <div
          className={cn(
            "shadow-btn col-span-3 flex h-13 items-center justify-center rounded-xl bg-white text-[17px] font-bold",
            {
              "outline-inbrain-light-blue outline-2": isRowSelected,
            },
          )}
        >
          <span
            className={cn(
              "text-center",
              {
                "text-gs1": draftValue.length > 0 || selectedIndex === null,
              },
              {
                "text-gs4": !isRowSelected || draftValue.length === 0,
              },
            )}
          >
            {displayText}
          </span>
        </div>

        {keys.map((key) => (
          <Button
            key={key}
            variant="secondary"
            disabled={!isRowSelected}
            onClick={() => onAppendValue(key)}
          >
            {key}
          </Button>
        ))}

        <Button
          variant="secondary"
          className="col-span-2"
          disabled={!isRowSelected}
          onClick={() => onAppendValue("0")}
        >
          0
        </Button>
        <Button
          variant="secondary"
          disabled={!isRowSelected}
          onClick={onBackspace}
        >
          <BackspaceIcon className="size-5" />
        </Button>
      </div>
      <Button
        disabled={!isRowSelected || draftValue.length === 0}
        onClick={onSubmit}
        className="bg-inbrain-gradient"
      >
        완료
      </Button>
    </div>
  );
}

export default SubjectiveAnswerInputPad;
