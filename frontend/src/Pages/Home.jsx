import React from "react";
import {
  Box,
  Button,
  Heading,
  HStack,
  Stack,
  Text,
  VStack,
  Container,
  Image,
} from "@chakra-ui/react";
import "./home.css";
import vg from "../assets/images/intro.png";
import { CgGoogle, CgYoutube } from "react-icons/cg";
import { SiCoursera, SiUdemy } from "react-icons/si";
import { DiAws } from "react-icons/di";
import intro from "../assets/videos/intro.mp4";

function Home() {
  return (
    <section className="home">
      <Container maxW="7xl" py={16}>
        <Stack
          direction={["column", "row"]}
          spacing={[10, 20]}
          align="center"
          justify="space-between"
        >
          <VStack
            align={["center", "flex-start"]}
            spacing={6}
            maxW="lg"
            textAlign={["center", "left"]}
          >
            <Heading
              as="h1"
              fontSize={["2xl", "4xl"]}
              lineHeight="short"
              color="gray.800"
            >
              Find the Dream Job Suitable for You
            </Heading>

            <Text fontSize="lg" color="gray.600">
              Connect with top employers, explore thousands of opportunities,
              and take the next step in your career journey.
            </Text>

            <Button
              as="a"
              href="/jobs"
              size="lg"
              colorScheme="yellow"
              rounded="full"
              px={8}
            >
              Explore Now
            </Button>
          </VStack>

          <Image
            src={vg}
            alt="Job Search Illustration"
            boxSize={["sm", "md"]}
            objectFit="contain"
          />
        </Stack>
      </Container>

      <Box py={12} bg="blackAlpha.800">
        <Heading
          textAlign="center"
          fontSize={["xl", "2xl"]}
          color="yellow.400"
          mb={8}
        >
          OUR BRANDS
        </Heading>

        <HStack
          justify="center"
          spacing={[8, 16]}
          color="white"
          fontSize={["3xl", "4xl"]}
        >
          <CgGoogle />
          <CgYoutube />
          <SiCoursera />
          <SiUdemy />
          <DiAws />
        </HStack>
      </Box>

      {/* Video Section */}
      <Container maxW="6xl" py={12}>
        <Box
          as="video"
          src={intro}
          autoPlay
          loop
          muted
          controls
          controlsList="nodownload noremoteplayback nofullscreen"
          disablePictureInPicture
          disableRemotePlayback
          rounded="xl"
          shadow="lg"
          w="100%"
          objectFit="cover"
        />
      </Container>
    </section>
  );
}

export default Home;
