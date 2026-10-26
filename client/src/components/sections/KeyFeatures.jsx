import { Box, Heading, SimpleGrid } from "@chakra-ui/react";
import {
  LuPenLine,
  LuMessageSquare,
  LuThumbsUp,
  LuSearch,
  LuBell,
} from "react-icons/lu";
import FeatureCard from "../cards/FeatureCard";
import Reveal from "../ui/Reveal";

const features = [
  {
    icon: <LuPenLine />,
    title: "Share your experience",
    description:
      "Tell others about the places you've been and help them with real, first-hand impressions.",
  },
  {
    icon: <LuMessageSquare />,
    title: "Ask people who've been there",
    description:
      "Get first-hand advice from a community that knows destinations inside out.",
  },
  {
    icon: <LuThumbsUp />,
    title: "Like what's useful",
    description:
      "Like the best advice, so the most helpful posts are easy to find.",
  },
  {
    icon: <LuSearch />,
    title: "Find exactly what you need",
    description:
      "Search posts and sort them by newest, most liked or most commented.",
  },
  {
    icon: <LuBell />,
    title: "Never miss a reply",
    description:
      "Get notified in real time when someone likes, comments on or replies to your posts.",
  },
];

const KeyFeatures = () => {
  return (
    <Box as="section" py={{ base: 10, md: 16 }}>
      <Heading as="h2" size="xl" textAlign="center" mb={{ base: 8, md: 10 }}>
        What you can do on TravelForum
      </Heading>

      <SimpleGrid columns={{ base: 1, sm: 2, lg: 5 }} gap={6}>
        {features.map((f, index) => (
          <Reveal key={f.title} delay={index * 0.1}>
            <FeatureCard
              icon={f.icon}
              title={f.title}
              description={f.description}
            />
          </Reveal>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default KeyFeatures;
