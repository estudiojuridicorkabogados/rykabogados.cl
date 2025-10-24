"use client";
import React from "react";
import { Route } from "next";
import Link from "next/link";

import { Button, ButtonProps } from "./Button";

interface LinkButtonProps extends ButtonProps {
  href: Route;
}

export const LinkButton: React.FC<LinkButtonProps> = ({
  href,
  children,
  ...props
}) => {
  return (
    <Button asChild {...props}>
      <Link href={href}>{children}</Link>
    </Button>
  );
};
