import { Box, Heading, SimpleGrid } from "@chakra-ui/react";
import { LuPenLine, LuMessageSquare, LuThumbsUp, LuSearch, LuAward} from "react-icons/lu";
import FeatureCard from "../components/FeatureCard";

const features = [
    { icon: <LuPenLine />, title: "Share your experience", description: "Tell others about the places you've been and help them with real, first-hand impressions."},
    { icon: <LuMessageSquare />, title: "Ask people who've been there", description: "Get first-hand advice from a community that knows destinations inside out." },
    { icon: <LuThumbsUp />, title: "Vote for what's useful", description: "Upvote the best advice and downvote the rest, so the most valuable answers rise to the top." },
    { icon: <LuSearch />, title: "Find exactly what you need", description: "Sort and filter posts by tags, destination, and recency." },
    { icon: <LuAward />, title: "Grow your profile", description: "Earn reputation and badges as you contribute to the community." },
];

function KeyFeatures() {
    return (
        <Box as="section" py={{ base: 10, md: 16}}>
            <Heading as="h2" size="xl" textAlign="center" mb={{ base: 8, md: 10 }}>
                What you can do on TravelForum
            </Heading>

            <SimpleGrid columns={{ base: 1, sm: 2, lg: 5}} gap={6}>
                {features.map((f) => (
                    <FeatureCard key={f.title} icon={f.icon} title={f.title} description={f.description} />

                ))}
            </SimpleGrid>
        </Box>
    );
}

export default KeyFeatures;