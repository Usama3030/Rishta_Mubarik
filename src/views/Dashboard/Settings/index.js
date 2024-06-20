// import React, { useState, useEffect } from "react";
// import axios from "axios";
// // Chakra imports
// import {
//   Box,
//   Flex,
//   Button,
//   FormControl,
//   FormLabel,
//   Heading,
//   Input,
//   Text,
//   Switch,
//   useColorModeValue,
// } from "@chakra-ui/react";

// function Settings() {
//   const [oldPassword, setOldPassword] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [formErrors, setFormErrors] = useState({});

//   // Chakra color mode
//   const titleColor = useColorModeValue("teal.300", "teal.200");
//   const textColor = useColorModeValue("gray.400", "white");

//   // Password validation
//   const passwordValidation = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Check if new password and confirm password match
//     if (newPassword !== confirmPassword) {
//       setError("New password and confirm password do not match");
//       return;
//     }

//     // Make API call to change password
//     try {
//       const response = await fetch(
//         "https://rishtamobarak.com/api/v1/user/change-password",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             // Assuming you have a token stored in local storage
//             Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
//           },
//           body: JSON.stringify({
//             oldPassword,
//             password: newPassword,
//             confirmPassword,
//           }),
//         }
//       );

//       const data = await response.json();

//       if (response.ok) {
//         // Password changed successfully, clear token and navigate to login page
//         localStorage.removeItem("accessToken");
//         navigate("/");
//         alert("Password changed successfully");
//       } else {
//         // Handle error from API
//         setError(data.message || "An error occurred while changing password");
//       }
//     } catch (error) {
//       // Handle network errors
//       setError("An error occurred while changing password");
//     }
//   };

//   return (
//     <Flex
//       position="relative"
//       mb="40px"
//       justifyContent="center"
//       alignItems="center"
//       height="100vh"
//     >
//       <Flex
//         direction="column"
//         w={{ base: "90%", md: "50%", lg: "40%" }}
//         background="transparent"
//         p="48px"
//         borderRadius="15px"
//         boxShadow="lg"
//       >
//         <Heading color={titleColor} fontSize="32px" mb="10px">
//           Reset Password
//         </Heading>
//         {/* <Text mb="36px" color={textColor} fontWeight="bold" fontSize="14px">
//           Enter your email and password to sign in
//         </Text> */}
//         <form onSubmit={handleSubmit}>
//           <FormControl>
//             <FormLabel fontSize="sm" fontWeight="normal">
//               Old Password
//             </FormLabel>
//             <Input
//               id="oldpassword"
//               borderRadius="15px"
//               mb="24px"
//               fontSize="sm"
//               type="password"
//               name="oldpassword"
//               value={oldPassword}
//               placeholder="Old Password"
//               size="lg"
//             />
//             <FormLabel fontSize="sm" fontWeight="normal">
//               New Password
//             </FormLabel>
//             <Input
//               id="newpassword"
//               borderRadius="15px"
//               mb="24px"
//               fontSize="sm"
//               type="password"
//               name="newpassword"
//               value={newPassword}
//               placeholder="your new password"
//               size="lg"
//             />
//             <FormLabel fontSize="sm" fontWeight="normal">
//               Confirm New Password
//             </FormLabel>
//             <Input
//               id="confirmpassword"
//               borderRadius="15px"
//               mb="24px"
//               fontSize="sm"
//               type="password"
//               name="confirmpassword"
//               value={confirmPassword}
//               placeholder="confirm new password"
//               size="lg"
//             />
//             {formErrors && (
//               <Text color="red.500" fontSize="sm" mt="10px" mb="20px">
//                 {formErrors}
//               </Text>
//             )}
//             <Button
//               fontSize="10px"
//               type="submit"
//               bg="teal.300"
//               w="100%"
//               h="45"
//               mb="10px"
//               color="white"
//               mt="20px"
//               isLoading={loading}
//               _hover={{
//                 bg: "teal.200",
//               }}
//               _active={{
//                 bg: "teal.400",
//               }}
//             >
//               Save
//             </Button>
//           </FormControl>
//         </form>
//       </Flex>
//     </Flex>
//   );
// }

// export default Settings;

import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Box,
  Flex,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

function Settings() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState("");

  const history = useHistory();

  // Chakra color mode
  const titleColor = useColorModeValue("teal.300", "teal.200");
  const textColor = useColorModeValue("gray.400", "white");

  // Password validation
  // const passwordValidation = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErrors(""); // Clear previous errors

    // Check if new password and confirm password match
    if (newPassword !== confirmPassword) {
      setFormErrors("New password and confirm password do not match");
      return;
    }

    // // Validate the new password
    // if (!passwordValidation.test(newPassword)) {
    //   setFormErrors(
    //     "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character."
    //   );
    //   return;
    // }

    // Make API call to change password
    try {
      setLoading(true);
      const response = await fetch(
        "https://rishtamobarak.com/api/v1/user/change-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          body: JSON.stringify({
            oldPassword,
            password: newPassword,
            confirmPassword,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        // Password changed successfully, clear token and navigate to login page
        localStorage.removeItem("accessToken");
        console.log("navigating");
        alert("Password changed successfully");
        history.push("/auth/signin");
      } else {
        // Handle error from API
        setFormErrors(
          data.message || "An error occurred while changing password"
        );
      }
    } catch (error) {
      // Handle network errors
      setFormErrors("An error occurred while changing password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Flex
      position="relative"
      mb="40px"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Flex
        direction="column"
        w={{ base: "90%", md: "50%", lg: "40%" }}
        background="transparent"
        p="48px"
        borderRadius="15px"
        boxShadow="lg"
      >
        <Heading color={titleColor} fontSize="32px" mb="10px">
          Reset Password
        </Heading>
        <form onSubmit={handleSubmit}>
          <FormControl mt="20px">
            <FormLabel fontSize="sm" fontWeight="normal">
              Old Password
            </FormLabel>
            <Input
              id="oldpassword"
              borderRadius="15px"
              mb="24px"
              fontSize="sm"
              type="password"
              name="oldpassword"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              placeholder="Old Password"
              size="lg"
            />
            <FormLabel fontSize="sm" fontWeight="normal">
              New Password
            </FormLabel>
            <Input
              id="newpassword"
              borderRadius="15px"
              mb="24px"
              fontSize="sm"
              type="password"
              name="newpassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="New Password"
              size="lg"
            />
            <FormLabel fontSize="sm" fontWeight="normal">
              Confirm New Password
            </FormLabel>
            <Input
              id="confirmpassword"
              borderRadius="15px"
              mb="24px"
              fontSize="sm"
              type="password"
              name="confirmpassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm New Password"
              size="lg"
            />
            {formErrors && (
              <Text color="red.500" fontSize="sm" mt="10px" mb="20px">
                {formErrors}
              </Text>
            )}
            <Button
              fontSize="10px"
              type="submit"
              bg="teal.300"
              w="100%"
              h="45"
              mb="10px"
              color="white"
              mt="20px"
              isLoading={loading}
              _hover={{
                bg: "teal.200",
              }}
              _active={{
                bg: "teal.400",
              }}
            >
              Save
            </Button>
          </FormControl>
        </form>
      </Flex>
    </Flex>
  );
}

export default Settings;
