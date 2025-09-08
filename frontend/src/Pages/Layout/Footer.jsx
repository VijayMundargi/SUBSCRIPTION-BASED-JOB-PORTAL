import { Box, Heading, HStack, Stack, VStack, Text } from "@chakra-ui/react";
import React from "react";
import {
  TiSocialYoutubeCircular,
  TiSocialInstagramCircular,
} from "react-icons/ti";
import { DiGithub } from "react-icons/di";

const Footer = () => {
  return (
    <Box bg="blackAlpha.900" color="white" py={8} px={6}>
      <Stack
        direction={["column", "row"]}
        spacing={[6, 0]}
        justify="space-between"
        align="center"
      >
        {/* Left Section */}
        <VStack align={["center", "flex-start"]} spacing={2}>
          <Heading size="sm" fontWeight="normal">
            © {new Date().getFullYear()} All Rights Reserved
          </Heading>
          <Text fontSize="sm" color="yellow.400">
            Designed & Built by @Vijay
          </Text>
        </VStack>

        {/* Right Section - Social Links */}
        <HStack spacing={6} fontSize="2xl">
          <a href="https://youtube.com" target="_blank" rel="noreferrer">
            <TiSocialYoutubeCircular
              style={{ transition: "0.3s" }}
              color="#FF0000"
              title="YouTube"
            />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer">
            <TiSocialInstagramCircular
              style={{ transition: "0.3s" }}
              color="#E1306C"
              title="Instagram"
            />
          </a>
          <a href="https://github.com" target="_blank" rel="noreferrer">
            <DiGithub
              style={{ transition: "0.3s" }}
              color="#fff"
              title="GitHub"
            />
          </a>
        </HStack>
      </Stack>
    </Box>
  );
};

export default Footer;
