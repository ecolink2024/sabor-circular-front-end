import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import {
  Box,
  Button,
  Center,
  HStack,
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
import { GoArrowUpRight, GoChevronLeft, GoChevronRight } from "react-icons/go";
import { useAuth } from "@/providers/AuthProvider";
import { useRouter } from "next/navigation";
import { getUserType, redirectCard } from "@/lib/utils/utils";

export default function CardsWorks() {
  // Ref for slider
  const swiperRef = useRef<SwiperClass | null>(null);

  const router = useRouter();

  const { user, userRole } = useAuth();

  return (
    <HStack
      w={"100%"}
      as={Center}
      position="relative"
      overflow="hidden"
      mt={"50px"}
      px={{ base: 6, lg: 12 }}
    >
      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        pagination={false}
        slidesPerView={3}
        spaceBetween={2}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        modules={[Pagination, Navigation]}
        className="mySwiper"
        breakpoints={{
          360: { slidesPerView: 1, spaceBetween: 10 },
          768: { slidesPerView: 2, spaceBetween: 20 },
          1024: { slidesPerView: 3, spaceBetween: 0 },
        }}
      >
        {cardsWorks.map((card, ix) => (
          <SwiperSlide
            key={ix}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              w={"400px"}
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
              {/* Icon Card */}
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
                <Icon as={card.icon} fontSize={30} color="#518a3e" />
              </Box>

              {/* Title and Description Card */}
              <VStack align="flex-start">
                <Text fontSize="md" fontWeight="bold">
                  {card.title}
                </Text>
                <Text fontSize="sm">{card.description}</Text>
              </VStack>

              {/* Button Card */}
              <Button
                bg="#518a3e"
                _hover={{ bg: "rgba(81, 138, 62, 0.45)" }}
                color={"white"}
                fontWeight={600}
                borderRadius="8.93px"
                leftIcon={<GoArrowUpRight />}
                onClick={() =>
                  redirectCard(card.id, router, user, getUserType(userRole))
                }
              >
                {card.button}
              </Button>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation Buttons */}
      <IconButton
        aria-label="Previous slide"
        className="swiper-button-prev"
        position="absolute"
        left={{ base: "5px", lg: "15px" }}
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
        right={{ base: "5px", sm: "15px" }}
        top="50%"
        transform="translateY(-50%)"
        icon={<GoChevronRight />}
        zIndex={1}
        bg={"#518a3e"}
        color={"white"}
        borderRadius={"8.93px"}
      />
    </HStack>
  );
}
