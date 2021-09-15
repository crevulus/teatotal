import React, { ReactNode } from "react";
import { Button } from "native-base";

type ButtonProps = {
  variant?: string;
};

export default function SimpleButton({
  variant,
  ...props
}: ButtonProps): ReactNode {
  if (variant === "link") {
    return <Button colorScheme="cyan" variant={variant} {...props} />;
  }

  return (
    <Button
      colorScheme="amber"
      variant={variant}
      _text={{ color: "white" }}
      {...props}
    />
  );
}
