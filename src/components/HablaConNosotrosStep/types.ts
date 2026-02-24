export type IconType = "contact" | "analysis" | "case-file" | "success";

export interface IStep {
  stepNumber: string;
  title: string;
  description: string;
  icon: IconType;
}
