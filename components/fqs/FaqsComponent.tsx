import { faq } from "@/lib/data/data";
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Heading,
  VStack,
} from "@chakra-ui/react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

const FaqsComponent = () => {
  return (
    <Box
      p={6}
      maxW="md"
      w={"100%"}
      h={"100%"}
      bg={"white"}
      display={"flex"}
      borderRadius={"12px"}
      flexDirection={"column"}
      gap={6}
    >
      <Heading as="h3" size="sm" color="#344234">
        Preguntas Frecuentes
      </Heading>

      <VStack w="100%">
        <Accordion
          allowMultiple
          w="100%"
          display={"flex"}
          flexDirection={"column"}
          gap={4}
        >
          {faq.map((item, index) => (
            <AccordionItem
              key={index}
              border={"1px"}
              borderColor={"gray.100"}
              borderRadius={"lg"}
            >
              {({ isExpanded }) => (
                <>
                  <AccordionButton
                    minH={"60px"}
                    fontSize={index === 7 ? "12px" : "14px"}
                    borderTopRadius={"8.93px"}
                    borderBottomRadius={isExpanded ? "0px" : "8.93px"}
                    bg={"gray.100"}
                  >
                    <Box as="span" flex="1" textAlign="left">
                      {item.question}
                    </Box>
                    {isExpanded ? (
                      <AiOutlineMinus fontSize="16px" />
                    ) : (
                      <AiOutlinePlus fontSize="16px" />
                    )}
                  </AccordionButton>
                  <AccordionPanel pb={4} fontSize={"13px"}>
                    {item.answer}
                  </AccordionPanel>
                </>
              )}
            </AccordionItem>
          ))}
        </Accordion>
      </VStack>
    </Box>
  );
};

export default FaqsComponent;
