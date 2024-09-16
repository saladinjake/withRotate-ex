"use client";

import { Box, Button, Flex } from "@chakra-ui/react";
import Image from "next/image";
import { useAuth } from "@/contexts/AuthContextProvider";
const Auth = () => {
  const { login } = useAuth();
  const redirectUser = () => `${window.location.origin}/callback`;
  return (
    <main>
      <Box minH="100vh" bg="#FBFBFC" pt="20">
        <Flex
          direction="column"
          bg="white"
          maxW="450px"
          mx="auto"
          alignItems="center"
          py="16"
          border="1px solid #eee"
          rounded="8px"
        >
          <Box mb="8">
            <Image src="/images/logo.png" alt="logo" width={150} height={28} />
          </Box>

          <Button
            width="90%"
            border="1px solid #ccc"
            onClick={() => login(redirectUser())}
          >
            Authenticate
          </Button>
        </Flex>
      </Box>
    </main>
  );
};

export default Auth;
