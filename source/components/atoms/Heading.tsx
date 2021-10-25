import React, { ReactNode } from "react";
import { Heading } from "native-base";
import { theme } from "../../theme";

type HeadingPropsType = {
  children: ReactNode;
};

export const SimpleHeading = ({
  children,
  ...props
}: HeadingPropsType): ReactNode => {
  return (
    <Heading
      color={theme.primary}
      size={["md", "lg", "md"]}
      noOfLines={2}
      {...props}
    >
      {children}
    </Heading>
  );
};
