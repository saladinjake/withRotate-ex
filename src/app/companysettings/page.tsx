"use client";

import { Box, Flex, Container, Text } from "@chakra-ui/react";

import { useState } from "react";


export default function Settings() {
  const [selectedTab, setSelectedTab] = useState(1);
  const tabs = [
    { label: "Account", id: 1 },
    { label: "User management", id: 2 },
  ];

  return (
    <main>
      <Box minH="100vh" bg="#FBFBFC">
        <Container maxW="1480px" pt="6">
          <Text as="h1" fontSize="28px" fontWeight="600" mb="8">
            Settings
          </Text>

          <Flex
            borderBottom="solid"
            borderBottomColor="#AEADBE"
            borderBottomWidth="0.3px"
            columnGap="14"
            mb="8"
          >
            {tabs.map((tab) => (
              <Box
                key={tab.id}
                as="button"
                onClick={() => setSelectedTab(tab.id)}
                color={selectedTab === tab.id ? "#5E6DFA" : "#5D5F6D"}
                fontWeight={selectedTab === tab.id ? "700" : "400"}
                borderBottom="solid"
                borderBottomColor={
                  selectedTab === tab.id ? "#5E6DFA" : "transparent"
                }
                borderBottomWidth="2px"
              >
                {tab.label}
              </Box>
            ))}
          </Flex>

          {selectedTab === 1 && "Account Page"}

          {selectedTab === 2 && "User Mgt Page"}
        </Container>
      </Box>
    </main>
  );
}
