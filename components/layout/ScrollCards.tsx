import React, { ReactNode } from "react";
import { Center, ScrollView } from "native-base";

import { TeaLeavesType, TeaType } from "../../data/firebase";

import { TeaCard } from "../TeaCard";

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
    }
  };

  return (
    <ScrollView>
      <Center>{data.length > 0 && <Component />}</Center>
    </ScrollView>
  );
}
