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
import { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { SearchContext } from "context/SearchContext";

function Community() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const { searchQuery } = useContext(SearchContext);
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
    try {
      const response = await fetch(
        "https://rishtamobarak.com/api/v1/reported-contacts",
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
  const handleDelete = async (id) => {
    if (
      window.confirm(`Are you sure you want to delete the user with id: ${id}?`)
    ) {
      try {
        const token = localStorage.getItem("accessToken");
        console.log("Token:", token); // Log the token for debugging
        const response = await fetch(
          `https://rishtamobarak.com/api/v1/reported-contacts/un-report/`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              reportedUserId: id,
            }),
          }
        );
        console.log("Response status:", response.status);
        const responseBody = await response.text();
        console.log("Response body:", responseBody);
        if (!response.ok) {
          throw new Error(`Failed to delete user: ${responseBody}`);
        }
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
        alert(`User with id: ${id} has been deleted`);
      } catch (error) {
        console.error("Error deleting user:", error);
        alert(`Error deleting user: ${error.message}`);
      }
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.reportedContact.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.reportFrequency
        .toString()
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
  );

  return (
    <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
      <Authors
        title={"Community Table"}
        captions={["Reported Contact", "Reported Frequency", "Action"]}
        // data={users}
        data={filteredUsers}
        deleteUser={handleDelete}
        loading={loading}
      />
    </Flex>
  );
}

export default Community;
