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
import { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { SearchContext } from "context/SearchContext";

function Subscription() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const history = useHistory();
  const { searchQuery } = useContext(SearchContext);

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
      console.log("Response status:", response.status);

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      const result = await response.json();
      const data = result.data;
      console.log("Users data:", data);
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

  // const handleUpdate = async (id, updatedData) => {
  //   try {
  //     const token = localStorage.getItem("accessToken");

  //     console.log("Sending PATCH request with data:", updatedData);

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

  //     console.log("Received response:", response);

  //     if (!response.ok) {
  //       throw new Error("Failed to update subscription");
  //     }

  //     const updatedSubscription = await response.json();

  //     console.log("Updated subscription:", updatedSubscription);

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
        throw new Error("Failed to update transaction");
      }

      const updatedTransaction = await response.json();

      console.log("Updated transaction:", updatedTransaction);

      // Update the local state or handle success as needed
    } catch (error) {
      console.error("Error updating transaction:", error);
      // Handle error state or display error messages
    }
  };

  // const handleUpdate = () => {
  //   console.log("clicked");
  // };

  const filteredUsers = users.filter((user) => {
    const transactionNumber =
      user.transactionNumber && user.transactionNumber.toString().toLowerCase();
    const userEmail =
      user.user && user.user.email && user.user.email.toLowerCase();

    return (
      (transactionNumber &&
        transactionNumber.includes(searchQuery.toLowerCase())) ||
      (userEmail && userEmail.includes(searchQuery.toLowerCase()))
    );
  });

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
        // data={users}
        data={filteredUsers}
        updateHandler={handleUpdate}
        loading={loading}
      />
    </Flex>
  );
}

export default Subscription;
