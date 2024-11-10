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
import { CiUser } from "react-icons/ci";
import { FaBoxArchive, FaUtensils } from "react-icons/fa6";
import { GoArrowUpRight } from "react-icons/go";

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
            as={Link}
            border="1.5px solid #518a3e"
            variant="outline"
            color="#518a3e"
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
