import type { ComponentType } from "react";

import TutorialAutoSubmitNoticeStep from "@/components/tutorial/steps/TutorialAutoSubmitNoticeStep";
import TutorialObjectiveMarkingMissionStep from "@/components/tutorial/steps/TutorialObjectiveMarkingMissionStep";
import TutorialSubjectiveMarkingMissionStep from "@/components/tutorial/steps/TutorialSubjectiveMarkingMissionStep";
import TutorialOmrMarkingGuideStep from "@/components/tutorial/steps/TutorialOmrMarkingGuideStep";
import TutorialWelcomeStep from "@/components/tutorial/steps/TutorialWelcomeStep";

export const TUTORIAL_STEP_SEQUENCE = [
  "welcome",
  "omr-marking-guide",
  "objective-marking-mission",
  "subjective-marking-mission",
  "auto-submit-notice",
] as const;

export type TutorialStepId = (typeof TUTORIAL_STEP_SEQUENCE)[number];

export type TutorialStepControls = {
  goPrevious: () => void;
  goNext: () => void;
  skipTutorial: () => void;
  goToExam: () => void;
};

export type TutorialStepComponentProps = {
  controls: TutorialStepControls;
};

export const tutorialStepComponentMap: Record<
  TutorialStepId,
  ComponentType<TutorialStepComponentProps>
> = {
  welcome: TutorialWelcomeStep,
  "omr-marking-guide": TutorialOmrMarkingGuideStep,
  "objective-marking-mission": TutorialObjectiveMarkingMissionStep,
  "subjective-marking-mission": TutorialSubjectiveMarkingMissionStep,
  "auto-submit-notice": TutorialAutoSubmitNoticeStep,
};
