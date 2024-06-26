// // Chakra imports
// import { Flex } from "@chakra-ui/react";
// import React, { useEffect, useState } from "react";
// import { useHistory } from "react-router-dom";
// import Authors from "./components/Authors";
// import Projects from "./components/Projects";
// import { tablesTableData, dashboardTableData } from "variables/general";

// function Users() {
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
//       const response = await fetch(
//         "https://rishtamobarak.com/api/v1/user/all",
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
//     // console.log("users", users);
//     // console.log("tablesTableData", tablesTableData);
//   };
//   return (
//     <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
//       <Authors
//         title={"Users Table"}
//         captions={[
//           "Name & Email",
//           "Status",
//           "Verification",
//           "Subscription",
//           "Date",
//           "Action",
//         ]}
//         // data={tablesTableData}
//         data={users}
//       />
//       {/* <Projects
//         title={"Projects Table"}
//         captions={["Companies", "Budget", "Status", "Completion", ""]}
//         data={dashboardTableData}
//       /> */}
//     </Flex>
//   );
// }

// export default Users;

// Users.js
import { Flex } from "@chakra-ui/react";
import React, { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import Authors from "./components/Authors";
import { SearchContext } from "context/SearchContext";

function Users() {
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
        "https://rishtamobarak.com/api/v1/user/all",
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
      console.log("Fetched users:", data);
      setUsers(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching users:", error);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  // const toggleVerification = async (id) => {
  //   const userToUpdate = users.find((user) => user.id === id);

  //   if (!userToUpdate) {
  //     console.error(`User with ID ${id} not found`);
  //     return;
  //   }

  //   const newVerifyValue = !userToUpdate.verified;

  //   try {
  //     const token = localStorage.getItem("accessToken");
  //     const response = await fetch(
  //       `https://rishtamobarak.com/api/v1/user/verify-user/${id}`,
  //       {
  //         method: "PATCH",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${token}`,
  //         },
  //         body: JSON.stringify({
  //           verify: newVerifyValue,
  //         }),
  //       }
  //     );

  //     console.log(`User ID to update: ${id}`);
  //     console.log("Response:", response);

  //     if (!response.ok) {
  //       throw new Error(
  //         `Failed to update verification status for user with ID ${id}`
  //       );
  //     }

  //     setUsers((prevUsers) =>
  //       prevUsers.map((user) =>
  //         user.id === id ? { ...user, verified: newVerifyValue } : user
  //       )
  //     );
  //     console.log(
  //       `User ID ${id} updated with verification status: ${newVerifyValue}`
  //     );
  //   } catch (error) {
  //     console.error("Error updating verification status:", error);
  //   }
  // };

  const toggleVerification = async (id, value) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch(
        `https://rishtamobarak.com/api/v1/user/verify-user/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            verify: value,
          }),
        }
      );

      console.log(`User ID to update: ${id}`);
      console.log("Response:", response);

      if (!response.ok) {
        throw new Error(
          `Failed to update verification status for user with ID ${id}`
        );
      }

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === id ? { ...user, verified: value } : user
        )
      );
      console.log(`User ID ${id} updated with verification status: ${value}`);
    } catch (error) {
      console.error("Error updating verification status:", error);
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
          `https://rishtamobarak.com/api/v1/user/${id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
              "Content-Type": "application/json",
            },
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
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
      <Authors
        title={"Users Table"}
        captions={[
          "Name & Email",
          "Status",
          "Verification",
          "Subscription",
          "Date",
          "Action",
        ]}
        // data={users}
        data={filteredUsers}
        toggleVerification={toggleVerification}
        deleteUser={handleDelete}
        loading={loading}
      />
    </Flex>
  );
}

export default Users;
