import React, { useContext, ReactNode } from "react";

import AppContext from "../data/createContext";
import { TeaType } from "../data/firebase";
import { Card } from "./Card";

type TeaCardProps = {
  id: string;
  teaData: TeaType;
};

function TeaCard({ id, teaData }: TeaCardProps): ReactNode {
  const { desiredStrength } = useContext(AppContext);

  const roundToHalf = (value) => {
    let decimal = value - parseInt(value, 10);
    decimal = Math.round(decimal * 10);
    if (decimal == 5) {
      return parseInt(value, 10) + 0.5;
    }
    if (decimal < 3 || decimal > 7) {
      return Math.round(value);
    } else {
      return parseInt(value, 10) + 0.5;
    }
  };

  return (
    <Card
      id={id}
      name={teaData.name}
      minutes={roundToHalf(
        desiredStrength *
          2 *
          (teaData.strength === 10 ? 1 : 10 - teaData.strength)
      )}
      stars={teaData.rating}
      imageUrl={teaData.logo}
    />
  );
}

export default TeaCard;
