import React, { ReactNode, useState, useEffect } from "react";
import { Card } from "./atoms/Card";
import { TeaLeavesType, useImageFromFirebase } from "../data/firebase";
import { SimpleHeading } from "./atoms/Heading";
import { Heading, Image } from "native-base";

type TeaLeafCardPropsType = {
  teaLeafData: TeaLeavesType;
  id: string;
};

export const TeaLeafCard = ({
  teaLeafData,
}: TeaLeafCardPropsType): ReactNode => {
  const [heading, setHeading] = useState("");
  const [content, setContent] = useState(<></>);

  const parseContent = () => {
    switch (teaLeafData.type) {
      case "advice":
        setHeading("Advice for the day");
        setContent(() => {
          return <Heading>{teaLeafData.advice}</Heading>;
        });
        break;
      case "bitcoin":
        setHeading("Current BTC Price");
        setContent(() => {
          return <Heading>$ {teaLeafData.priceRate}</Heading>;
        });
        break;
      case "animal":
        setHeading("Animal image of the day");
        setContent(() => {
          return (
            <Image
              source={{ uri: teaLeafData.animalImg }}
              alt="Animal of the day"
              roundedTop="md"
              h={200}
            />
          );
        });
        break;
      default:
        return null;
    }
  };

  useEffect(() => {
    parseContent();
  }, []);

  return (
    <Card
      p={2}
      _stack={{
        space: "gutter",
      }}
    >
      <SimpleHeading pb={2}>{heading}</SimpleHeading>
      {content}
    </Card>
  );
};
