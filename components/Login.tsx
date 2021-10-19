import React, { ReactNode } from "react";
import {
  Box,
  Text,
  Heading,
  VStack,
  FormControl,
  Input,
  HStack,
} from "native-base";
import { SimpleButton } from "./atoms/Button";

type LoginFormProps = {
  togglePage: () => void;
  setEmail: () => void;
  setPw: () => void;
  handlePress: () => void;
};

export default function LoginForm({
  togglePage,
  setEmail,
  setPw,
  handlePress,
}: LoginFormProps): ReactNode {
  return (
    <Box safeArea flex={1} p={2} w="90%" mx="auto">
      <Heading size="lg" color="primary.500">
        Welcome
      </Heading>
      <Heading color="muted.400" size="xs">
        Log in to continue!
      </Heading>

      <VStack space={2} mt={5}>
        <FormControl>
          <FormControl.Label
            _text={{ color: "muted.700", fontSize: "sm", fontWeight: 600 }}
          >
            Email
          </FormControl.Label>
          <Input onChangeText={setEmail} />
        </FormControl>
        <FormControl mb={5}>
          <FormControl.Label
            _text={{ color: "muted.700", fontSize: "sm", fontWeight: 600 }}
          >
            Password
          </FormControl.Label>
          <Input type="password" onChangeText={setPw} />
          <SimpleButton variant="anchor" p={0} size="sm" alignSelf="flex-end">
            Forget something?
          </SimpleButton>
        </FormControl>
        <VStack space={2}>
          <SimpleButton onPress={handlePress}>Login</SimpleButton>
        </VStack>
        <HStack justifyContent="center">
          <Text fontSize="sm" color="muted.700" fontWeight={400}>
            Are you new here?{" "}
          </Text>
          <SimpleButton variant="anchor" p={0} size="sm" onPress={togglePage}>
            Sign Up
          </SimpleButton>
        </HStack>
      </VStack>
    </Box>
  );
}
