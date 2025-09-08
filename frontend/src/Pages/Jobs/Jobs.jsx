import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Heading,
  HStack,
  Input,
  Stack,
  Text,
  VStack,
  Badge,
  SimpleGrid,
} from "@chakra-ui/react";

// ✅ Job Card Component (No Image)
const JobCard = ({ title, description, id, creator, category }) => {
  return (
    <VStack
      align="flex-start"
      borderWidth="1px"
      borderRadius="lg"
      p={5}
      spacing={3}
      boxShadow="md"
      bg="white"
      _hover={{ shadow: "xl", transform: "translateY(-5px)", transition: "0.3s" }}
    >
      <Heading fontSize="lg" noOfLines={2} color="gray.800">
        {title}
      </Heading>
      <Text fontSize="sm" color="gray.600" noOfLines={3}>
        {description}
      </Text>
      <Badge colorScheme="yellow" borderRadius="md" px={2}>
        {category}
      </Badge>
      <Text fontSize="xs" color="gray.500">
        Posted by: {creator}
      </Text>
      <Button
        as="a"
        href={`/job/${id}`}
        size="sm"
        colorScheme="yellow"
        w="full"
      >
        Apply Now
      </Button>
    </VStack>
  );
};

// ✅ Job Listing Page
const Jobs = () => {
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("");

  const categories = [
    "Web Development",
    "Artificial Intelligence",
    "DevOps",
    "Cloud Engineer",
    "Data Science",
    "Civil Engineering",
  ];

  // ✅ Sample Job Data
  const jobsData = [
    {
      id: 1,
      title: "Frontend Developer",
      description:
        "Build modern UI components with React, Chakra UI, and Tailwind.",
      creator: "Google",
      category: "Web Development",
    },
    {
      id: 2,
      title: "Data Scientist",
      description:
        "Work on AI models, ML pipelines, and big data visualization.",
      creator: "Amazon",
      category: "Data Science",
    },
    {
      id: 3,
      title: "Cloud Engineer",
      description:
        "Deploy and manage scalable cloud infrastructure on AWS & Azure.",
      creator: "Microsoft",
      category: "Cloud Engineer",
    },
    {
      id: 4,
      title: "DevOps Engineer",
      description:
        "Automate CI/CD pipelines and infrastructure using Docker & Kubernetes.",
      creator: "Netflix",
      category: "DevOps",
    },
  ];

  // ✅ Filtered Jobs
  const filteredJobs = jobsData.filter(
    (job) =>
      job.title.toLowerCase().includes(keyword.toLowerCase()) &&
      (category ? job.category === category : true)
  );

  return (
    <Container maxW="7xl" py={12}>
      <Heading mb={6}>All Jobs</Heading>

      {/* Search Bar */}
      <Input
        placeholder="Search a Job..."
        focusBorderColor="yellow.500"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        mb={6}
      />

      {/* Category Filters */}
      <Box overflowX="auto" mb={8}>
        <HStack spacing={4} minW="max-content">
          {categories.map((item, index) => (
            <Button
              key={index}
              onClick={() => setCategory(item)}
              colorScheme={category === item ? "yellow" : "gray"}
              variant={category === item ? "solid" : "outline"}
              borderRadius="full"
              px={6}
              py={2}
              flexShrink={0}
            >
              {item}
            </Button>
          ))}
          {category && (
            <Button
              onClick={() => setCategory("")}
              colorScheme="red"
              variant="ghost"
              borderRadius="full"
            >
              Clear
            </Button>
          )}
        </HStack>
      </Box>

      {/* Jobs Grid */}
      {filteredJobs.length > 0 ? (
        <SimpleGrid columns={[1, 2, 3]} spacing={8}>
          {filteredJobs.map((job) => (
            <JobCard key={job.id} {...job} />
          ))}
        </SimpleGrid>
      ) : (
        <Text textAlign="center" color="gray.500" mt={10}>
          No jobs found for your search 🔍
        </Text>
      )}
    </Container>
  );
};

export default Jobs;
