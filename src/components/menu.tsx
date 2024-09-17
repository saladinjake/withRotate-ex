"use client";

import Image from "next/image";
import {
  Flex,
  Box,
  Text,
  Container,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { useAuth } from "@/context/AuthContextProvider";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useRouter } from "next/navigation";
const AppMenu = () => {
  const { user, isFetchingUserData, logout } = useAuth();
  const router = useRouter();

  return (
    <Box as="header">
      <Container maxW="1600px">
        <Flex
          as="nav"
          height="76px"
          bg="white"
          alignItems="center"
          justifyContent="space-between"
        >
          <Image src="/images/logo.png" alt="logo" width={150} height={28} />
          <Menu>
            <MenuButton>
              <Flex alignItems="center" justifyContent="start" columnGap="3">
                <Box>
                  <Text fontWeight="medium" as="div" textAlign="start">
                    {user?.name}
                  </Text>
                  <Text fontSize="14px" as="div" mt="-1" textAlign="start">
                    {user?.email}
                  </Text>
                </Box>
                {!isFetchingUserData && (
                  <Image
                    src={user?.picture as string}
                    alt="avatar"
                    height={40}
                    width={40}
                    style={{ borderRadius: "100%" }}
                  />
                )}
                {!isFetchingUserData && <ChevronDownIcon />}
              </Flex>
            </MenuButton>

            <MenuList>
              <MenuItem
                onClick={() => {
                  logout();
                  setTimeout(() => {
                    window.location.reload();
                  }, 500);
                }}
              >
                Log out
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Container>
    </Box>
  );
};

export default AppMenu;
