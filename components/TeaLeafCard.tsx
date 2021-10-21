import React, { ReactNode } from "react";
import { Text } from "native-base";
import { Card } from "./atoms/Card";
import { TeaLeavesType } from "../data/firebase";

type TeaLeafCardPropsType = {
  teaLeafData: TeaLeavesType;
  id: string;
};

export const TeaLeafCard = ({
  teaLeafData,
}: TeaLeafCardPropsType): ReactNode => {
  return (
    <Card>
      <Text>{teaLeafData.type ?? "Tea leaf"}</Text>
    </Card>
  );
};
