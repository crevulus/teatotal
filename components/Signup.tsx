import React, { ReactNode } from "react";
import {
  NativeBaseProvider,
  Box,
  Heading,
  VStack,
  FormControl,
  Input,
  HStack,
  Text,
} from "native-base";
import SimpleButton from "./atoms/Button";

type SignupFormProps = {
  togglePage: () => void;
  setEmail: () => void;
  setPw: () => void;
  handlePress: () => void;
};

export default function SignupForm({
  togglePage,
  setEmail,
  setPw,
  handlePress,
}: SignupFormProps): ReactNode {
  return (
    <NativeBaseProvider>
      <Box safeArea flex={1} p={2} w="90%" mx="auto">
        <Heading size="lg" color="primary.500">
          Welcome
        </Heading>
        <Heading color="muted.400" size="xs">
          Sign up to continue!
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
          <FormControl>
            <FormControl.Label
              _text={{ color: "muted.700", fontSize: "sm", fontWeight: 600 }}
            >
              Password
            </FormControl.Label>
            <Input type="password" onChangeText={setPw} />
          </FormControl>
          {/* <FormControl>
            <FormControl.Label
              _text={{ color: "muted.700", fontSize: "sm", fontWeight: 600 }}
            >
              Confirm Password
            </FormControl.Label>
            <Input type="password" />
          </FormControl> */}
          <VStack space={2} mt={5}>
            <SimpleButton onPress={handlePress}>Sign Up</SimpleButton>
          </VStack>
          <HStack justifyContent="center">
            <Text fontSize="sm" color="muted.700" fontWeight={400}>
              Already a member?{" "}
            </Text>
            <SimpleButton variant="anchor" p={0} size="sm" onPress={togglePage}>
              Log in
            </SimpleButton>
          </HStack>
        </VStack>
      </Box>
    </NativeBaseProvider>
  );
}
