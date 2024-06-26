// // Chakra imports
// import {
//   Table,
//   Tbody,
//   Text,
//   Th,
//   Thead,
//   Tr,
//   Td,
//   Flex,
//   useColorModeValue,
// } from "@chakra-ui/react";
// // Custom components
// import Card from "components/Card/Card.js";
// import CardBody from "components/Card/CardBody.js";
// import CardHeader from "components/Card/CardHeader.js";
// import TablesTableCommunity from "components/Tables/TablesTableCommunity";
// import React from "react";
// import CustomSpinner from "components/Spinner/Spinner";

// const Authors = ({ title, captions, data, loading }) => {
//   console.log("Authors data2:", data);
//   const textColor = useColorModeValue("gray.700", "white");
//   return (
//     <Card overflowX="scroll">
//       <CardHeader p="6px 0px 22px 0px">
//         <Text fontSize="xl" color={textColor} fontWeight="bold">
//           {title}
//         </Text>
//       </CardHeader>
//       <CardBody>
//         <Table variant="simple" color={textColor}>
//           <Thead>
//             <Tr my=".8rem" pl="0px" color="gray.400">
//               {captions.map((caption, idx) => {
//                 return (
//                   <Th color="gray.400" key={idx} ps={idx === 0 ? "0px" : null}>
//                     {caption}
//                   </Th>
//                 );
//               })}
//             </Tr>
//           </Thead>
//           <Tbody>
//             {loading && (
//               <Tr>
//                 <Td colSpan={captions.length}>
//                   <Flex justify="center" margin="40px">
//                     <CustomSpinner />
//                   </Flex>
//                 </Td>
//               </Tr>
//             )}
//             {!loading && data.length === 0 && (
//               <Tr>
//                 <Td colSpan={captions.length}>
//                   <Flex justify="center">
//                     <Text color="gray.500">No records found</Text>
//                   </Flex>
//                 </Td>
//               </Tr>
//             )}
//             {!loading &&
//               data.length > 0 &&
//               data.map((row) => {
//                 <TablesTableCommunity
//                   key={row.id}
//                   reportedContact={row.reportedContact}
//                   reportedContactId={row.reportedContactId}
//                   reportedFrequency={row.reportedFrequency}
//                 />;
//               })}
//           </Tbody>
//         </Table>
//       </CardBody>
//     </Card>
//   );
// };

// export default Authors;

import {
  Table,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
  Td,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import TablesTableCommunity from "components/Tables/TablesTableCommunity";
import CustomSpinner from "components/Spinner/Spinner";

const Authors = ({ title, captions, data, loading, deleteUser }) => {
  const textColor = useColorModeValue("gray.700", "white");

  return (
    <Card overflowX="scroll">
      <CardHeader p="6px 0px 22px 0px">
        <Text fontSize="xl" color={textColor} fontWeight="bold">
          {title}
        </Text>
      </CardHeader>
      <CardBody>
        <Table variant="simple" color={textColor}>
          <Thead>
            <Tr my=".8rem" pl="0px" color="gray.400">
              {captions.map((caption, idx) => (
                <Th color="gray.400" key={idx} ps={idx === 0 ? "0px" : null}>
                  {caption}
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {loading && (
              <Tr>
                <Td colSpan={captions.length}>
                  <Flex justify="center" margin="40px">
                    <CustomSpinner />
                  </Flex>
                </Td>
              </Tr>
            )}
            {!loading && data.length === 0 && (
              <Tr>
                <Td colSpan={captions.length}>
                  <Flex justify="center">
                    <Text color="gray.500">No records found</Text>
                  </Flex>
                </Td>
              </Tr>
            )}
            {!loading &&
              data.length > 0 &&
              data.map((row) => (
                <TablesTableCommunity
                  key={row.reportedContactId}
                  reportedContact={row.reportedContact}
                  reportedContactId={row.reportedContactId}
                  reportFrequency={row.reportFrequency}
                  deleteUser={deleteUser}
                />
              ))}
          </Tbody>
        </Table>
      </CardBody>
    </Card>
  );
};

export default Authors;
