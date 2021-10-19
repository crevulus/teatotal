import React, { ReactNode } from "react";
import { Center, ScrollView } from "native-base";

import { TeaType } from "../data/firebase";

import { TeaCard } from "./TeaCard";

type ScrollCardsPropsType = {
  teas: TeaType[];
};

export default function ScrollCards({ teas }: ScrollCardsPropsType): ReactNode {
  return (
    <ScrollView>
      <Center>
        {teas.length > 0 &&
          teas.map((teaObj) => (
            <TeaCard id={teaObj.id} teaData={teaObj.data} key={teaObj.id} />
          ))}
      </Center>
    </ScrollView>
  );
}
