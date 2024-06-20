// // Chakra imports
// import { Flex } from "@chakra-ui/react";
// import Authors from "./components/Authors";
// import Projects from "./components/Projects";
// import { tablesTableData, dashboardTableData } from "variables/general";
// import React, { useEffect, useState } from "react";
// import { useHistory } from "react-router-dom";

// function Subscription() {
//   const [loading, setLoading] = useState(true);
//   const [users, setUsers] = useState([]);
//   const history = useHistory();
//   useEffect(() => {
//     const token = localStorage.getItem("accessToken");
//     if (!token) {
//       history.push("/auth/signin");
//     } else {
//       fetchUsers(token);
//     }
//   }, [history]);

//   const fetchUsers = async (token) => {
//     setLoading(true);
//     try {
//       console.log("Fetching users...");
//       const response = await fetch(
//         "https://rishtamobarak.com/api/v1/transaction",
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       if (!response.ok) {
//         throw new Error("Failed to fetch users");
//       }
//       const result = await response.json();
//       const data = result.data;
//       console.log("Users data:", data);
//       setUsers(Array.isArray(data) ? data : []);
//     } catch (error) {
//       console.error("Error fetching users:", error);
//       setUsers([]);
//     } finally {
//       setLoading(false);
//     }
//   };
//   return (
//     <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
//       <Authors
//         title={"Subscriptions Table"}
//         captions={[
//           "status",
//           "Email",
//           "Transaction Number",
//           "Transaction Date",
//           "Due Date",
//           "Subscription Type",
//           "Action",
//         ]}
//         data={users}
//       />
//     </Flex>
//   );
// }

// export default Subscription;

import { Flex } from "@chakra-ui/react";
import Authors from "./components/Authors";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

function Subscription() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      history.push("/auth/signin");
    } else {
      fetchUsers(token);
    }
  }, [history]);

  const fetchUsers = async (token) => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://rishtamobarak.com/api/v1/transaction",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      const result = await response.json();
      const data = result.data;
      setUsers(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching users:", error);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };
  // const handleUpdate = async (id, updatedData) => {
  //   try {
  //     const token = localStorage.getItem("accessToken");
  //     const response = await fetch(
  //       `https://rishtamobarak.com/api/v1/transaction/${id}`,
  //       {
  //         method: "PATCH",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${token}`,
  //         },
  //         body: JSON.stringify(updatedData),
  //       }
  //     );

  //     if (!response.ok) {
  //       throw new Error("Failed to update subscription");
  //     }

  //     const updatedSubscription = await response.json();

  //     // Update the local state
  //     setUsers((prevUsers) =>
  //       prevUsers.map((user) =>
  //         user.id === id ? { ...user, ...updatedSubscription } : user
  //       )
  //     );
  //   } catch (error) {
  //     console.error("Error updating subscription:", error);
  //   }
  // };

  const handleUpdate = async (id, updatedData) => {
    try {
      const token = localStorage.getItem("accessToken");

      console.log("Sending PATCH request with data:", updatedData);

      const response = await fetch(
        `https://rishtamobarak.com/api/v1/transaction/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedData),
        }
      );

      console.log("Received response:", response);

      if (!response.ok) {
        throw new Error("Failed to update subscription");
      }

      const updatedSubscription = await response.json();

      console.log("Updated subscription:", updatedSubscription);

      // Update the local state
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === id ? { ...user, ...updatedSubscription } : user
        )
      );
    } catch (error) {
      console.error("Error updating subscription:", error);
    }
  };

  return (
    <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
      <Authors
        title={"Subscriptions Table"}
        captions={[
          "Status",
          "Email",
          "Transaction Number",
          "Transaction Date",
          "Due Date",
          "Subscription Type",
          "Action",
        ]}
        data={users}
        updateHandler={handleUpdate}
      />
    </Flex>
  );
}

export default Subscription;
