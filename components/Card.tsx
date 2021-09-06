import React, { ReactNode } from "react";
import { Image, Text, Box, Stack, Heading } from "native-base";
import Rating from "./Rating";
import { useImageFromFirebase } from "../data/firebase";

type CardProps = {
  id: string;
  minutes: number;
  name: string;
  stars: number;
  imageUrl: string;
};

export function Card({ name, minutes, stars, imageUrl }: CardProps): ReactNode {
  const [image] = useImageFromFirebase(imageUrl);
  return (
    <Box bg="white" shadow={2} rounded="lg" m={4} width={["xs", "sm", "lg"]}>
      <Image
        source={{ uri: image }}
        alt={`${name} logo`}
        resizeMode="cover"
        height={150}
        roundedTop="md"
      />
      <Stack space={4} p={[4, 4, 8]}>
        <Text color="secondary.400">June 22, 2021</Text>
        <Heading color="primary.700" size={["md", "lg", "md"]} noOfLines={2}>
          {name}
        </Heading>
        <Text
          lineHeight={[5, 5, 7]}
          noOfLines={[4, 4, 2]}
          color="secondary.700"
        >
          {minutes} mins for the perfect brew
        </Text>
        <Rating count={parseInt(stars)} />
      </Stack>
    </Box>
  );
}
