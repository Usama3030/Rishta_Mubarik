// // TablesTableRow.js
// import {
//   Button,
//   Flex,
//   Td,
//   Text,
//   Tr,
//   useColorModeValue,
//   Badge,
// } from "@chakra-ui/react";
// import React from "react";

// const TablesTableRow = ({
//   status,
//   email,
//   transactionNumber,
//   transactionDate,
//   dueDate,
//   subscriptionType,
// }) => {
//   const textColor = useColorModeValue("gray.700", "white");
//   const dateColor = useColorModeValue("blue.500", "blue.300");

//   return (
//     <Tr>
//       <Td textAlign="center">
//         <Text
//           fontSize="md"
//           color={status ? "green.400" : "red.400"}
//           fontWeight="bold"
//         >
//           {status ? "Paid" : "Unpaid"}
//         </Text>
//       </Td>
//       <Td textAlign="center">
//         <Text fontSize="md" color={textColor} fontWeight="bold">
//           {email}
//         </Text>
//       </Td>

//       <Td textAlign="center">
//         <Text fontSize="md" color={textColor} fontWeight="bold">
//           {transactionNumber}
//         </Text>
//       </Td>
//       <Td textAlign="center">
//         <Text fontSize="md" color={textColor} fontWeight="bold">
//           {transactionDate}
//         </Text>
//       </Td>
//       <Td textAlign="center">
//         <Text fontSize="md" color={textColor} fontWeight="bold">
//           {dueDate}
//         </Text>
//       </Td>
//       <Td textAlign="center">
//         <Text fontSize="md" color={textColor} fontWeight="bold">
//           {subscriptionType}
//         </Text>
//       </Td>
//       <Td textAlign="center">
//         <Flex justify="center">
//           <Button colorScheme="teal" size="sm" mr={2}>
//             Edit
//           </Button>
//           <Button colorScheme="gray" size="sm" variant="outline">
//             Pay
//           </Button>
//         </Flex>
//       </Td>
//     </Tr>
//   );
// };

// export default TablesTableRow;

import {
  Button,
  Flex,
  Td,
  Text,
  Tr,
  useColorModeValue,
  Badge,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import React, { useState } from "react";

const TablesTableRow = ({
  status,
  email,
  transactionNumber,
  transactionDate,
  dueDate,
  subscriptionType,
  id,
  updateHandler,
}) => {
  const textColor = useColorModeValue("gray.700", "white");
  const dateColor = useColorModeValue("blue.500", "blue.300");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [editData, setEditData] = useState({
    transactionNumber,
    transactionDate,
    dueDate,
    status,
    subscriptionType,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  // const handleUpdateSubscription = async () => {
  //   await updateHandler(id, editData);
  //   onClose();
  // };
  const handleUpdateSubscription = async () => {
    const validData = {
      transactionNumber: editData.transactionNumber,
      transactionDate: new Date(editData.transactionDate).toISOString(),
      dueDate: new Date(editData.dueDate).toISOString(),
      status: editData.status,
      subscriptionType: editData.subscriptionType,
    };

    await updateHandler(id, validData);
    onClose();
  };
  return (
    <Tr>
      <Td textAlign="center">
        <Text
          fontSize="md"
          color={status ? "green.400" : "red.400"}
          fontWeight="bold"
        >
          {status ? "Paid" : "Unpaid"}
        </Text>
      </Td>
      <Td textAlign="center">
        <Text fontSize="md" color={textColor} fontWeight="normal">
          {email}
        </Text>
      </Td>
      <Td textAlign="center">
        <Text fontSize="md" color="gray.400" fontWeight="normal">
          {transactionNumber}
        </Text>
      </Td>
      <Td textAlign="center">
        <Text fontSize="md" color={textColor} fontWeight="normal">
          {transactionDate}
        </Text>
      </Td>
      <Td textAlign="center">
        <Text fontSize="md" color={textColor} fontWeight="normal">
          {dueDate}
        </Text>
      </Td>
      <Td textAlign="center">
        <Text fontSize="md" color={textColor} fontWeight="bold">
          {subscriptionType}
        </Text>
      </Td>
      <Td textAlign="center">
        <Flex justify="center">
          <Button colorScheme="teal" size="sm" mr={2} onClick={onOpen}>
            Edit
          </Button>
          <Button colorScheme="gray" size="sm" variant="outline">
            Pay
          </Button>
        </Flex>
      </Td>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Record</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Transaction Number</FormLabel>
              <Input
                name="transactionNumber"
                value={editData.transactionNumber}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Transaction Date</FormLabel>
              <Input
                name="transactionDate"
                value={editData.transactionDate}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Due Date</FormLabel>
              <Input
                name="dueDate"
                value={editData.dueDate}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Status</FormLabel>
              <Input
                name="status"
                value={editData.status}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Subscription Type</FormLabel>
              <Input
                name="subscriptionType"
                value={editData.subscriptionType}
                onChange={handleChange}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={handleUpdateSubscription}
            >
              Save
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Tr>
  );
};

export default TablesTableRow;
