import React, { ReactNode } from "react";
import { Button, IconButton } from "native-base";
import { Icon } from "react-native-elements";
import { theme } from "../../theme";

type ButtonProps = {
  variant?: string;
  iconName?: string;
};

export function SimpleButton({
  variant,
  iconName,
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

  if (variant === "icon") {
    return (
      <IconButton
        bg={theme.secondary}
        shadow={3}
        icon={<Icon name={iconName} size={30} color={theme.other.white} />}
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
