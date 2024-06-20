// TablesTableRow.js
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

function TablesTableRow(props) {
  const { id, name, email } = props;
  const textColor = useColorModeValue("gray.700", "white");
  const bgStatus = useColorModeValue("gray.400", "#1a202c");
  const colorStatus = useColorModeValue("white", "gray.400");

  const handleDeleteUser = () => {
    deleteUser(id);
  };

  return (
    <Tr>
      <Td minWidth={{ sm: "250px" }} pl="0px">
        <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
          <Avatar src={logo} w="50px" borderRadius="12px" me="18px" />
          <Flex direction="column">
            <Text
              fontSize="md"
              color={textColor}
              fontWeight="bold"
              minWidth="100%"
            >
              {name}
            </Text>
            <Text fontSize="sm" color="gray.400" fontWeight="normal">
              {email}
            </Text>
          </Flex>
        </Flex>
      </Td>

      <Td>
        <Badge
          bg={active ? "green.400" : bgStatus}
          color={active ? "white" : colorStatus}
          fontSize="16px"
          p="3px 10px"
          borderRadius="8px"
        >
          {active ? "Active" : "Inactive"}
        </Badge>
      </Td>
      <Td>
        <Text fontSize="md" color={textColor} fontWeight="bold">
          {verification}
        </Text>
      </Td>
      <Td>
        <Text
          fontSize="sm"
          fontWeight="bold"
          color={subscription ? "green.400" : "red.400"}
        >
          {subscription ? "Paid" : "Unpaid"}
        </Text>
      </Td>
      <Td>
        <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem">
          {date}
        </Text>
      </Td>
      <Td>
        <Box display="flex" justifyContent="flex-end" paddingRight="1rem">
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

export default TablesTableRow;
