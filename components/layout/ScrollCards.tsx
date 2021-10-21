import React, { ReactNode } from "react";
import { Center, ScrollView } from "native-base";

import { TeaLeavesType, TeaType } from "../../data/firebase";

import { TeaCard } from "../TeaCard";
import { TeaLeafCard } from "../TeaLeafCard";

type ScrollCardsPropsType = {
  data: TeaType[] | TeaLeavesType[];
  type: "tea" | "leaves";
};

export default function ScrollCards({
  data,
  type,
}: ScrollCardsPropsType): ReactNode {
  const Component = () => {
    if (type === "tea") {
      return data.map((teaObj) => (
        <TeaCard id={teaObj.id} teaData={teaObj.data} key={teaObj.id} />
      ));
    } else if (type === "leaves") {
      return data.map((leavesObj) => {
        return (
          <TeaLeafCard
            id={leavesObj.type}
            teaLeafData={leavesObj}
            key={leavesObj.type}
          />
        );
      });
    }
  };

  return (
    <ScrollView>
      <Center>{data.length > 0 && <Component />}</Center>
    </ScrollView>
  );
}
