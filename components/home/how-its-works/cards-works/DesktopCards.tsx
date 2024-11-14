import { cardsWorks } from "@/lib/data/data";
import { useAuth } from "@/providers/AuthProvider";
import {
  HStack,
  Icon,
  VStack,
  Button,
  Box,
  Text,
  Link,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { FaToolbox, FaUtensils } from "react-icons/fa6";
import { GoArrowUpRight } from "react-icons/go";
import { RiUserAddFill } from "react-icons/ri";

export default function DesktopCards() {
  const { user } = useAuth();
  const router = useRouter();

  const redirectCard = (card: string) => {
    // validación para la primera tarjeta (usuario)
    if (card === "user") {
      if (user) {
        if (user.role === "casa") {
          return `/dashboard/casa/${user._id}`;
        } else {
          return `/`;
        }
      } else {
        return `/login`;
      }
    }
    // validación para la segunda tarjeta (tupper)
    else if (card === "tupper") {
    }
    // validación para la tercera tarjeta (return-container)
    else {
      return `/return-container`;
    }
  };

  const handleTupperClick = () => {
    const section = document.getElementById("locales-adheridos");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

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
          p={6}
          display="flex"
          justifyContent="space-between"
          flexDirection="column"
          alignItems="flex-start"
          bg="linear-gradient(90deg, rgb(250, 250, 243) 0%, rgba(250, 250, 243, 0) 100%)"
          borderRadius={"20px"}
          border={"1.5px solid"}
          borderColor={"gray.100"}
        >
          <Box
            w="110px"
            h="110px"
            borderRadius="full"
            bg="rgba(81, 138, 62, 0.45)"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            {card.icon === "user" ? (
              <Icon as={RiUserAddFill} fontSize={30} color="#344234" />
            ) : card.icon === "tupper" ? (
              <Icon as={FaToolbox} fontSize={30} color="#344234" />
            ) : (
              <Icon as={FaUtensils} fontSize={30} color="#344234" />
            )}
          </Box>
          <VStack align="flex-start">
            <Text fontSize="md" fontWeight="bold">
              {card.title}
            </Text>
            <Text fontSize="sm">{card.description}</Text>
          </VStack>
          <Button
            as={Link}
            bg="rgba(81, 138, 62, 0.45)"
            _hover={{ bg: "rgba(81, 138, 62, 0.45)" }}
            color={"white"}
            fontWeight={600}
            borderRadius="8.93px"
            leftIcon={<GoArrowUpRight />}
            onClick={() => {
              const redirectTo = redirectCard(card.icon);
              if (card.icon === "tupper") {
                handleTupperClick();
              } else {
                router.push(redirectTo as string);
              }
            }}
          >
            {card.button}
          </Button>
        </Box>
      ))}
    </HStack>
  );
}
