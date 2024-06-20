// import {
//   Avatar,
//   Badge,
//   Button,
//   Flex,
//   Td,
//   Text,
//   Tr,
//   useColorModeValue,
// } from "@chakra-ui/react";
// import React from "react";

// function TablesTableRow(props) {
//   const { logo, name, email, active, verification, subscription, date } = props;
//   const textColor = useColorModeValue("gray.700", "white");
//   const bgStatus = useColorModeValue("gray.400", "#1a202c");
//   const colorStatus = useColorModeValue("white", "gray.400");

//   return (
//     <Tr>
//       <Td minWidth={{ sm: "250px" }} pl="0px">
//         <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
//           <Avatar src={logo} w="50px" borderRadius="12px" me="18px" />
//           <Flex direction="column">
//             <Text
//               fontSize="md"
//               color={textColor}
//               fontWeight="bold"
//               minWidth="100%"
//             >
//               {name}
//             </Text>
//             <Text fontSize="sm" color="gray.400" fontWeight="normal">
//               {email}
//             </Text>
//           </Flex>
//         </Flex>
//       </Td>

//       <Td>
//         <Flex direction="column">
//           <Text fontSize="md" color={textColor} fontWeight="bold">
//             {/* {active ? "Active" : "Inactive"} */}
//             {active}
//           </Text>
//           {/* <Text fontSize="sm" color="gray.400" fontWeight="normal">
//             {verification}
//           </Text>
//           <Text fontSize="sm" color="gray.400" fontWeight="normal">
//             {subscription}
//           </Text> */}
//         </Flex>
//       </Td>
//       <Td>
//         <Flex direction="column">
//           <Text fontSize="sm" color="gray.400" fontWeight="normal">
//             {verification}
//           </Text>
//         </Flex>
//       </Td>
//       <Td>
//         <Flex direction="column">
//           <Text
//             fontSize="sm"
//             color="gray.400"
//             fontWeight="normal"
//             color={subscription === "Paid" ? "green" : "red"}
//           >
//             {subscription ? "Paid" : "Unpaid"}
//           </Text>
//         </Flex>
//       </Td>
//       <Td>
//         <Badge
//           bg={active === "Online" ? "green.400" : bgStatus}
//           color={active === "Online" ? "white" : colorStatus}
//           fontSize="16px"
//           p="3px 10px"
//           borderRadius="8px"
//         >
//           {active}
//         </Badge>
//       </Td>
//       <Td>
//         <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem">
//           {date}
//         </Text>
//       </Td>
//       <Td>
//         <Button p="0px" bg="transparent" variant="no-hover">
//           <Text
//             fontSize="md"
//             color="gray.400"
//             fontWeight="bold"
//             cursor="pointer"
//           >
//             Edit
//           </Text>
//         </Button>
//       </Td>
//     </Tr>
//   );
// }

// export default TablesTableRow;

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
  const {
    logo,
    name,
    email,
    active,
    verification,
    subscription,
    date,
    toggleVerification,
    id,
    deleteUser,
  } = props;
  const textColor = useColorModeValue("gray.700", "white");
  const bgStatus = useColorModeValue("gray.400", "#1a202c");
  const colorStatus = useColorModeValue("white", "gray.400");

  const handleToggleVerification = () => {
    toggleVerification(id);
  };

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

        {/* <Switch
          isChecked={verification}
          onChange={() => toggleVerification(id)}
          colorScheme="teal"
        /> */}
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
        {/* <Button onClick={handleDeleteUser} colorScheme="red">
          <Text
            fontSize="md"
            color="gray.400"
            fontWeight="bold"
            cursor="pointer"
          >
            delete
          </Text>
        </Button> */}
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
