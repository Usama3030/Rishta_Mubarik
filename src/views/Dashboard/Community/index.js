// // Chakra imports
// import { Flex } from "@chakra-ui/react";
// import React, { useEffect, useState } from "react";
// import { useHistory } from "react-router-dom";
// import Authors from "./components/Authors";
// function Community() {
//   const [loading, setLoading] = useState(true);
//   const [users, setUsers] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
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
//       const response = await fetch(
//         "https://rishtamobarak.com/api/v1/reported-contacts",
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
//       console.log("Fetched users:", data);
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
//         title={"Community Table"}
//         captions={["Author", "Function", "Status", "Employed", ""]}
//         data={users}
//       />
//     </Flex>
//   );
// }

// export default Community;

import { Flex } from "@chakra-ui/react";
import Authors from "./components/Authors";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

function Subscription() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // Step 1
  const history = useHistory();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      history.push("/auth/signin");
    } else {
      fetchUsers(token, searchQuery); // Step 3
    }
  }, [history, searchQuery]);

  const fetchUsers = async (token, searchQuery = "") => {
    // Step 2
    setLoading(true);
    try {
      let url = "https://rishtamobarak.com/api/v1/transaction";
      if (searchQuery) {
        url += `?email=${searchQuery}`;
      }
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

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

  const handleUpdate = async (id, updatedData) => {
    try {
      const token = localStorage.getItem("accessToken");
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

      if (!response.ok) {
        throw new Error("Failed to update subscription");
      }

      const updatedSubscription = await response.json();

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
