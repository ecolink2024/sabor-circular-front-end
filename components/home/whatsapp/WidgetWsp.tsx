"use client";
import { Box, Image } from "@chakra-ui/react";

const WidgetWsp = ({ display }: { display: boolean }) => {
  return (
    <Box
      display={display ? "block" : "none"}
      position={"fixed"}
      w={{ base: "50px", lg: "60px" }}
      h={{ base: "50px", lg: "60px" }}
      bottom={"0"}
      right={"0"}
      cursor={"pointer"}
      m={5}
      zIndex={999}
      onClick={() =>
        window.open(
          "https://wa.me/5493512332934?text=Hola%2C%20quiero%20consultar%20sobre%20la%20suscripci%C3%B3n",
          "_blank"
        )
      }
    >
      <Image src="/svg/whatsapp.svg" w={"100%"} h={"100%"} alt="svg-wsp" />
    </Box>
  );
};

export default WidgetWsp;
