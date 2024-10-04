import { cardsWorks } from "@/lib/data/data";
import { HStack, Icon, VStack, Button, Box, Text } from "@chakra-ui/react";
import React from "react";
import { CiUser } from "react-icons/ci";
import { FaBoxArchive, FaUtensils } from "react-icons/fa6";
import { GoArrowUpRight } from "react-icons/go";

export default function DesktopCards() {
  return (
    <HStack
      w="100%"
      justify="center"
      gap={10}
      px={10}
      flexWrap={"wrap"}
      pt={"100px"}
    >
      {cardsWorks.map((card, ix) => (
        <Box
          key={ix}
          w="350px"
          h="400px"
          borderRadius="16px"
          borderTop="2px solid #518a3e"
          borderX="2px solid #518a3e"
          borderBottom="6px solid #518a3e"
          p={6}
          display="flex"
          justifyContent="space-between"
          flexDirection="column"
          alignItems="flex-start"
        >
          <Box
            w="110px"
            h="110px"
            borderRadius="full"
            bg="rgba(81, 138, 62, 0.5)"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            {card.icon === "user" ? (
              <Icon as={CiUser} fontSize={30} color="#518a3e" />
            ) : card.icon === "tupper" ? (
              <Icon as={FaBoxArchive} fontSize={30} color="#518a3e" />
            ) : (
              <Icon as={FaUtensils} fontSize={30} color="#518a3e" />
            )}
          </Box>
          <VStack align="flex-start">
            <Text fontSize="md" fontWeight="bold">
              {card.title}
            </Text>
            <Text fontSize="sm">{card.description}</Text>
          </VStack>
          <Button
            border="1.5px solid #518a3e"
            variant="outline"
            color="#518a3e"
            fontWeight={600}
            borderRadius="8.93px"
            leftIcon={<GoArrowUpRight />}
          >
            {card.button}
          </Button>
        </Box>
      ))}
    </HStack>
  );
}
