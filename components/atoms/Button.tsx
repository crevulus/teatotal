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
  if (variant === "link") {
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
      _text={{ color: "white" }}
      {...props}
    />
  );
}
