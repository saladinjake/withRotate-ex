"use client";

import { ReactNode } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { AuthContextProvider } from "./AuthContextProvider";

interface IProps {
  children: ReactNode;
}

const AppContextProviders = (props: IProps) => {
  return (
    <ChakraProvider>
      <AuthContextProvider>{props.children}</AuthContextProvider>
    </ChakraProvider>
  );
};

export default AppContextProviders;
