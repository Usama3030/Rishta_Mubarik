import {
  Avatar,
  Badge,
  Button,
  Flex,
  Td,
  Text,
  Tr,
  Box,
  useColorModeValue,
  Switch,
} from "@chakra-ui/react";
import React from "react";

function TablesTableCommunity(props) {
  const {
    reportFrequency,
    reportedContactId,
    reportedContact,
    deleteUser,
  } = props;
  const textColor = useColorModeValue("gray.700", "white");
  const bgStatus = useColorModeValue("gray.400", "#1a202c");
  const colorStatus = useColorModeValue("white", "gray.400");

  const handleDeleteUser = () => {
    deleteUser(reportedContactId);
  };

  return (
    <Tr>
      <Td minWidth={{ sm: "250px" }} pl="0px">
        <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
          <Flex direction="column">
            <Text
              fontSize="md"
              color={textColor}
              fontWeight="bold"
              minWidth="100%"
            >
              {reportedContact}
            </Text>
            {/* <Text fontSize="sm" color="gray.400" fontWeight="normal">
              {reportedContactId}
            </Text> */}
          </Flex>
        </Flex>
      </Td>
      <Td>
        <Text
          fontSize="md"
          color={textColor}
          fontWeight="bold"
          // textAlign="center"
        >
          {reportFrequency}
        </Text>
      </Td>
      <Td>
        <Box display="flex" paddingRight="1rem">
          <Button
            onClick={handleDeleteUser}
            colorScheme="red"
            size="sm"
            fontWeight="bold"
            _hover={{ bg: "red.500" }}
          >
            <Text fontSize="md" color="white" cursor="pointer">
              Delete
            </Text>
          </Button>
        </Box>
      </Td>
    </Tr>
  );
}

export default TablesTableCommunity;
