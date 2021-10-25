import React from "react";
import { Box } from "native-base";
import { theme } from "../../theme";
import { TeaLeavesType, TeaType } from "../../data/firebase";

type CardPropsType = {
  children: ReactNode;
  id: string;
  data: TeaType | TeaLeavesType;
};

export function Card({
  children,
  id,
  data,
  ...props
}: CardPropsType): ReactNode {
  return (
    <Box
      bg={theme.other.white}
      shadow={2}
      rounded="lg"
      m={4}
      width={["xs", "sm", "lg"]}
      id={id}
      data={data}
      {...props}
    >
      {children}
    </Box>
  );
}
