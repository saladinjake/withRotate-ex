import React from "react";
import styles from "./loader.module.css";
import { Flex, Box } from "@chakra-ui/react";

const Loader = () => {
  return (
    <Flex flexDirection="column" alignItems="center" pt="10">
      <div className={styles.loader}></div>
      <Box mt="1" fontWeight="medium">
        Initializing please wait...
      </Box>
    </Flex>
  );
};

export default Loader;
