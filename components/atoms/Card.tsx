import React, { ReactNode } from "react";
import { Image, Text, Box, Stack, Heading } from "native-base";
import Rating from "../Rating";
import { useImageFromFirebase } from "../../data/firebase";

type CardProps = {
  id: string;
  minutes: number;
  name: string;
  stars: number;
  imageUrl: string;
};

export function Card({
  name,
  minutes,
  id,
  stars,
  imageUrl,
}: CardProps): ReactNode {
  const [image] = useImageFromFirebase(imageUrl);

  console.log(image);
  return (
    <Box bg="white" shadow={2} rounded="lg">
      <Image
        source={image}
        alt={`${name} logo`}
        resizeMode="cover"
        height={150}
        roundedTop="md"
      />
      <Stack space={4} p={[4, 4, 8]}>
        <Text color="gray.400">June 22, 2021</Text>
        <Heading size={["md", "lg", "md"]} noOfLines={2}>
          {name}
        </Heading>
        <Text lineHeight={[5, 5, 7]} noOfLines={[4, 4, 2]} color="gray.700">
          {minutes} mins for the perfect brew
        </Text>
        <Rating count={parseInt(stars)} />
      </Stack>
    </Box>
  );
}
