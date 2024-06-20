// // Authors.js
// import {
//   Table,
//   Thead,
//   Tbody,
//   Tr,
//   Th,
//   Td,
//   Text,
//   useColorModeValue,
//   Box,
//   Spinner,
// } from "@chakra-ui/react";
// import React from "react";
// import Card from "components/Card/Card.js";
// import CardBody from "components/Card/CardBody.js";
// import CardHeader from "components/Card/CardHeader.js";
// import TablesTableRow from "components/Tables/TablesTableSubscription";

// const Authors = ({ title, captions, data }) => {
//   const textColor = useColorModeValue("gray.700", "white");

//   function formatDueDate(dateString) {
//     let normalizedDateString = dateString.replace("ii", "02");
//     let date = new Date(normalizedDateString);
//     let year = date.getFullYear();
//     let month = String(date.getMonth() + 1).padStart(2, "0");
//     let day = String(date.getDate()).padStart(2, "0");
//     return `${year}/${month}/${day}`;
//   }

//   return (
//     <Card overflowX="scroll">
//       <CardHeader>
//         <Text fontSize="xl" color={textColor} fontWeight="bold">
//           {title}
//         </Text>
//       </CardHeader>
//       <CardBody>
//         {data.length === 0 ? (
//           <Box textAlign="center">
//             <Spinner />
//           </Box>
//         ) : (
//           <Table variant="simple">
//             <Thead>
//               <Tr>
//                 {captions.map((caption, idx) => (
//                   <Th key={idx} color="gray.400" textAlign="center">
//                     {caption}
//                   </Th>
//                 ))}
//               </Tr>
//             </Thead>
//             <Tbody>
//               {data.map((row) => {
//                 return (
//                   <TablesTableRow
//                     key={row.id}
//                     id={row.id}
//                     status={row.status}
//                     email={row.user.email}
//                     transactionNumber={row.transactionNumber}
//                     transactionDate={formatDueDate(row.transactionDate)}
//                     dueDate={formatDueDate(row.dueDate)}
//                     subscriptionType={row.pricing.type}
//                   />
//                 );
//               })}
//             </Tbody>
//           </Table>
//         )}
//       </CardBody>
//     </Card>
//   );
// };

// export default Authors;

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  useColorModeValue,
  Box,
} from "@chakra-ui/react";
import React from "react";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import TablesTableRow from "components/Tables/TablesTableSubscription";
import CustomSpinner from "components/Spinner/Spinner";

const Authors = ({ title, captions, data, updateHandler }) => {
  const textColor = useColorModeValue("gray.700", "white");

  function formatDueDate(dateString) {
    let normalizedDateString = dateString.replace("ii", "02");
    let date = new Date(normalizedDateString);
    let year = date.getFullYear();
    let month = String(date.getMonth() + 1).padStart(2, "0");
    let day = String(date.getDate()).padStart(2, "0");
    return `${year}/${month}/${day}`;
  }

  return (
    <Card overflowX="scroll">
      <CardHeader>
        <Text fontSize="xl" color={textColor} fontWeight="bold">
          {title}
        </Text>
      </CardHeader>
      <CardBody>
        {data.length === 0 ? (
          <Box textAlign="center">
            <CustomSpinner />
          </Box>
        ) : (
          <Table variant="simple">
            <Thead>
              <Tr>
                {captions.map((caption, idx) => (
                  <Th key={idx} color="gray.400" textAlign="center">
                    {caption}
                  </Th>
                ))}
              </Tr>
            </Thead>
            <Tbody>
              {data.map((row) => {
                return (
                  <TablesTableRow
                    key={row.id}
                    id={row.id}
                    status={row.status}
                    email={row.user.email}
                    transactionNumber={row.transactionNumber}
                    transactionDate={formatDueDate(row.transactionDate)}
                    dueDate={formatDueDate(row.dueDate)}
                    subscriptionType={row.pricing.type}
                    updateHandler={updateHandler}
                  />
                );
              })}
            </Tbody>
          </Table>
        )}
      </CardBody>
    </Card>
  );
};

export default Authors;
