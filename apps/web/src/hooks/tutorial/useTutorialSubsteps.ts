import type { ReactNode } from "react";
import { useCallback, useState } from "react";

export type TutorialSubstepConfig<TContext> = {
  description: ReactNode;
  isComplete?: (context: TContext) => boolean;
};

type UseTutorialSubstepsParams<TContext> = {
  substeps: readonly TutorialSubstepConfig<TContext>[];
  context: TContext;
};

function isSubstepComplete<TContext>(
  substep: TutorialSubstepConfig<TContext>,
  context: TContext,
) {
  return substep.isComplete?.(context) ?? true;
}

function getResolvedSubstepIndex<TContext>(
  substeps: readonly TutorialSubstepConfig<TContext>[],
  currentSubstepIndex: number,
  context: TContext,
) {
  let nextSubstepIndex = currentSubstepIndex;

  while (
    nextSubstepIndex < substeps.length - 1 &&
    isSubstepComplete(substeps[nextSubstepIndex], context)
  ) {
    nextSubstepIndex += 1;
  }

  return nextSubstepIndex;
}

export function useTutorialSubsteps<TContext>({
  substeps,
  context,
}: UseTutorialSubstepsParams<TContext>) {
  const [currentSubstepIndex, setCurrentSubstepIndex] = useState(0);

  const syncSubstepProgress = useCallback(
    (nextContext: TContext) => {
      setCurrentSubstepIndex((prevSubstepIndex) =>
        getResolvedSubstepIndex(substeps, prevSubstepIndex, nextContext),
      );
    },
    [substeps],
  );

  const currentSubstep = substeps[currentSubstepIndex];
  const isMissionComplete =
    currentSubstepIndex === substeps.length - 1 &&
    isSubstepComplete(currentSubstep, context);

  return {
    currentSubstepIndex,
    currentSubstep,
    currentDescription: currentSubstep.description,
    isMissionComplete,
    syncSubstepProgress,
  };
}
