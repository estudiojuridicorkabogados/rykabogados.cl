export type IconType =
  | "contact"
  | "analysis"
  | "case-file"
  | "success"
  | "gear-shield";

export interface IStep {
  stepNumber: string;
  title: string;
  description: string;
  icon: IconType;
}
