// // // Chakra imports
// // import {
// //   Table,
// //   Tbody,
// //   Text,
// //   Th,
// //   Thead,
// //   Tr,
// //   useColorModeValue,
// // } from "@chakra-ui/react";
// // // Custom components
// // import Card from "components/Card/Card.js";
// // import CardBody from "components/Card/CardBody.js";
// // import CardHeader from "components/Card/CardHeader.js";
// // import TablesTableRow from "components/Tables/TablesTableRow";
// // import React from "react";

// // const Authors = ({ title, captions, data }) => {
// //   const textColor = useColorModeValue("gray.700", "white");
// //   return (
// //     <Card overflowX={{ sm: "scroll", xl: "hidden" }}>
// //       <CardHeader p="6px 0px 22px 0px">
// //         <Text fontSize="xl" color={textColor} fontWeight="bold">
// //           {title}
// //         </Text>
// //       </CardHeader>
// //       <CardBody>
// //         <Table variant="simple" color={textColor}>
// //           <Thead>
// //             <Tr my=".8rem" pl="0px" color="gray.400">
// //               {captions.map((caption, idx) => {
// //                 return (
// //                   <Th color="gray.400" key={idx} ps={idx === 0 ? "0px" : null}>
// //                     {caption}
// //                   </Th>
// //                 );
// //               })}
// //             </Tr>
// //           </Thead>
// //           <Tbody>
// //             {data.map((row) => {
// //               return (
// //                 <TablesTableRow
// //                   key={`${row.email}-${row.name}`}
// //                   name={row.name}
// //                   logo={row.logo}
// //                   email={row.email}
// //                   subdomain={row.subdomain}
// //                   domain={row.domain}
// //                   status={row.status}
// //                   date={row.date}
// //                 />
// //               );
// //             })}
// //           </Tbody>
// //         </Table>
// //       </CardBody>
// //     </Card>
// //   );
// // };

// // export default Authors;

// // Chakra imports
// import {
//   Table,
//   Tbody,
//   Text,
//   Th,
//   Thead,
//   Tr,
//   useColorModeValue,
// } from "@chakra-ui/react";
// // Custom components
// import Card from "components/Card/Card.js";
// import CardBody from "components/Card/CardBody.js";
// import CardHeader from "components/Card/CardHeader.js";
// import TablesTableRow from "components/Tables/TablesTableRow";
// import React from "react";

// const Authors = ({ title, captions, data }) => {
//   const textColor = useColorModeValue("gray.700", "white");
//   console.log(data);
//   return (
//     <Card overflowX={{ sm: "scroll", xl: "hidden" }}>
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
//             {data.map((row) => {
//               return (
//                 <TablesTableRow
//                   key={`${row.email}-${row.name}`}
//                   name={row.name}
//                   logo={row.frontCNICPath}
//                   email={row.email}
//                   active={row.active ? "Active" : "Inactive"}
//                   verification={row.verified}
//                   subscription={row.subscription}
//                   date={new Date(row.createdAt).toLocaleDateString()}
//                 />
//               );
//             })}
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
// Custom components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CustomSpinner from "components/Spinner/Spinner";
import TablesTableRow from "components/Tables/TablesTableRow";
import React from "react";

const Authors = ({
  title,
  captions,
  data,
  toggleVerification,
  deleteUser,
  loading,
}) => {
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
          {/* <Tbody>
            {data.map((row) => (
              <TablesTableRow
                // key={`${row.email}-${row.name}`}
                key={row.id}
                id={row.id}
                name={row.name}
                logo={row.frontCNICPath}
                email={row.email}
                active={row.active}
                verification={row.verified}
                subscription={row.subscription}
                date={new Date(row.createdAt).toLocaleDateString()}
                toggleVerification={toggleVerification}
                deleteUser={deleteUser}
              />
            ))}
          </Tbody> */}
          {/* <Tbody>
            {loading ? (
              <Tr>
                <Td colSpan={captions.length}>
                  <Flex justify="center">
                    <CustomSpinner />
                  </Flex>
                </Td>
              </Tr>
            ) : data.length === 0 ? (
              <Tr>
                <Td colSpan={captions.length}>
                  <Flex justify="center">
                    <Text color="gray.500">No records found</Text>
                  </Flex>
                </Td>
              </Tr>
            ) : (
              data.map((row) => (
                <TablesTableRow
                  key={row.id}
                  id={row.id}
                  name={row.name}
                  logo={row.frontCNICPath}
                  email={row.email}
                  active={row.active}
                  verification={row.verified}
                  subscription={row.subscription}
                  date={new Date(row.createdAt).toLocaleDateString()}
                  toggleVerification={toggleVerification}
                  deleteUser={deleteUser}
                />
              ))
            )}
          </Tbody> */}
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
                <TablesTableRow
                  key={row.id}
                  id={row.id}
                  name={row.name}
                  logo={row.frontCNICPath}
                  email={row.email}
                  active={row.active}
                  verification={row.verified}
                  subscription={row.subscription}
                  date={new Date(row.createdAt).toLocaleDateString()}
                  toggleVerification={toggleVerification}
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
