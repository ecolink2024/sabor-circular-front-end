import { cardsWorks } from "@/lib/data/data";
import {
  VStack,
  HStack,
  Icon,
  Button,
  IconButton,
  Box,
  Text,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { CiUser } from "react-icons/ci";
import { FaBoxArchive, FaUtensils } from "react-icons/fa6";
import { GoArrowUpRight, GoChevronRight } from "react-icons/go";

export default function MobileCards() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const scrollRight = () => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth, scrollWidth } = scrollRef.current;

      if (scrollLeft + clientWidth >= scrollWidth - 10) {
        scrollRef.current.scrollTo({
          left: 0,
          behavior: "smooth",
        });
        setCurrentIndex(0);
      } else {
        scrollRef.current.scrollBy({
          left: 380,
          behavior: "smooth",
        });
        setCurrentIndex((prevIndex) => (prevIndex + 1) % cardsWorks.length);
      }
    }
  };

  return (
    <VStack w="100%" spacing={4} align="flex-start">
      <Box position="relative" w="100%">
        <HStack
          ref={scrollRef}
          w="100%"
          gap={{ base: 6, md: 10 }}
          p={6}
          justify={{ base: "flex-start", md: "center" }}
          align="flex-start"
          mt="50px"
          overflowX="hidden"
        >
          {cardsWorks.map((card, ix) => (
            <Box flexShrink={0} key={ix}>
              <Box
                w="350px"
                h={{
                  base: ix === currentIndex ? "400px" : "370px",
                  md: "400px",
                }}
                borderRadius="16px"
                borderTop="2px solid #518a3e"
                borderX="2px solid #518a3e"
                borderBottom="6px solid #518a3e"
                p={6}
                display="flex"
                justifyContent="space-between"
                flexDirection="column"
                alignItems="flex-start"
                transition="height 0.6s ease"
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
            </Box>
          ))}
        </HStack>

        {/* Botón para desplazar tarjetas en móvil/tablet */}
        <IconButton
          display={{ base: "flex", lg: "none" }}
          aria-label="scroll right"
          onClick={scrollRight}
          icon={<GoChevronRight />}
          bg={"#518a3e"}
          color={"white"}
          borderRadius={"8.93px"}
          position="absolute"
          right="20px"
          top="50%"
          transform="translateY(-50%)"
          zIndex={1}
        />
      </Box>
    </VStack>
  );
}
