import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import {
  Box,
  Button,
  Center,
  Flex,
  Icon,
  IconButton,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useRef } from "react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/pagination";
import { cardsWorks } from "@/lib/data/data";
import { FaRecycle, FaShop, FaUserPlus } from "react-icons/fa6";
import { GoArrowUpRight, GoChevronLeft, GoChevronRight } from "react-icons/go";
import { useAuth } from "@/providers/AuthProvider";
import { useRouter } from "next/navigation";

export default function MobileCards() {
  // Ref for slider
  const swiperRef = useRef<SwiperClass | null>(null);

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
    <Flex
      as={Center}
      w={"100%"}
      maxW={"700px"}
      position="relative"
      overflow="hidden"
      p={{ base: 4, sm: 10 }}
    >
      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        pagination={false}
        centeredSlides={true}
        slidesPerView={1}
        spaceBetween={10}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        modules={[Pagination, Navigation]}
        className="mySwiper"
        breakpoints={{
          360: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
        }}
      >
        {cardsWorks.map((card, ix) => (
          <SwiperSlide key={ix}>
            <Flex w={"100%"} justify={"center"}>
              <Box
                w={"380px"}
                h={"400px"}
                bg="linear-gradient(90deg, rgb(250, 250, 243) 0%, rgba(250, 250, 243, 0) 100%)"
                borderRadius={"20px"}
                border={"1.5px solid"}
                borderColor={"gray.100"}
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
                  border={"2px solid #518a3e"}
                  bg="transparent"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  {card.icon === "user" ? (
                    <Icon as={FaUserPlus} fontSize={30} color="#518a3e" />
                  ) : card.icon === "tupper" ? (
                    <Icon as={FaShop} fontSize={30} color="#518a3e" />
                  ) : (
                    <Icon as={FaRecycle} fontSize={30} color="#518a3e" />
                  )}
                </Box>
                <VStack align="flex-start">
                  <Text fontSize="md" fontWeight="bold">
                    {card.title}
                  </Text>
                  <Text fontSize="sm">{card.description}</Text>
                </VStack>
                <Button
                  bg="#518a3e"
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
            </Flex>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation Buttons */}
      <IconButton
        aria-label="Previous slide"
        className="swiper-button-prev"
        position="absolute"
        left={{ base: "0px", sm: "50px" }}
        top="50%"
        transform="translateY(-50%)"
        icon={<GoChevronLeft />}
        zIndex={1}
        bg={"#518a3e"}
        color={"white"}
        borderRadius={"8.93px"}
      />

      <IconButton
        aria-label="Next slide"
        className="swiper-button-next"
        position="absolute"
        right={{ base: "0px", sm: "50px" }}
        top="50%"
        transform="translateY(-50%)"
        icon={<GoChevronRight />}
        zIndex={1}
        bg={"#518a3e"}
        color={"white"}
        borderRadius={"8.93px"}
      />
    </Flex>
  );
}
