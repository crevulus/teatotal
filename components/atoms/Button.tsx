import React, { ReactNode } from "react";
import { Button } from "native-base";
import { theme } from "../../theme";

type ButtonProps = {
  variant?: string;
};

export default function SimpleButton({
  variant,
  ...props
}: ButtonProps): ReactNode {
  if (variant === "anchor") {
    return (
      <Button
        colorScheme={theme.primaryColorScheme}
        variant={variant}
        {...props}
      />
    );
  }

  return (
    <Button
      colorScheme={theme.secondaryColorScheme}
      variant={variant}
      shadow={3}
      _text={{ color: "white" }}
      {...props}
    />
  );
}
