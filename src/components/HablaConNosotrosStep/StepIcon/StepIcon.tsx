import React from "react";

import { IconType } from "../types";

import { AnalysisIcon } from "./AnalysisIcon";
import { CaseFileIcon } from "./CaseFileIcon";
import { ContactIcon } from "./ContactIcon";
import { GearShieldIcon } from "./GearShieldIcon";
import { SuccessIcon } from "./SuccessIcon";

interface StepIconProps {
  icon: IconType;
}

export const StepIcon: React.FC<StepIconProps> = ({ icon }) => {
  switch (icon) {
    case "contact":
      return <ContactIcon />;
    case "analysis":
      return <AnalysisIcon />;
    case "case-file":
      return <CaseFileIcon />;
    case "success":
      return <SuccessIcon />;
    case "gear-shield":
      return <GearShieldIcon />;
    default:
      return null;
  }
};
