import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
// Chakra imports
import {
  Box,
  Flex,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Switch,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Assets
import signInImage from "assets/img/signInImage.png";

function SignIn() {
  const [user, setUser] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const history = useHistory();

  // Chakra color mode
  const titleColor = useColorModeValue("teal.300", "teal.200");
  const textColor = useColorModeValue("gray.400", "white");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const validateForm = (values) => {
    let errors = {};
    if (!values.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = "Email is invalid";
    }
    if (!values.password) {
      errors.password = "Password is required";
    }
    return errors;
  };

  const loginHandler = async () => {
    const errors = validateForm(user);
    if (Object.keys(errors).length === 0) {
      setLoading(true);
      try {
        const response = await axios.post(
          "https://rishtamobarak.com/api/v1/auth/login",
          user
        );
        if (response.data.isSuccess) {
          const userData = response.data.data;
          localStorage.setItem("user", JSON.stringify(userData));
          localStorage.setItem("accessToken", userData.accessToken);
          console.log("navigating");
          history.push("/admin/dashboard");
        } else {
          setFormErrors({ request: response.data.message });
        }
      } catch (error) {
        if (error.response) {
          setFormErrors({
            request: error.response.data.message || "Server error",
          });
        } else if (error.request) {
          setFormErrors({ request: "No response from the server." });
        } else {
          setFormErrors({ request: "An error occurred while logging in." });
        }
      } finally {
        setLoading(false);
      }
    } else {
      setFormErrors(errors);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    loginHandler();
  };

  return (
    <Flex position="relative" mb="40px">
      <Flex
        h={{ sm: "initial", md: "75vh", lg: "85vh" }}
        w="100%"
        maxW="1044px"
        mx="auto"
        justifyContent="space-between"
        mb="30px"
        pt={{ sm: "100px", md: "0px" }}
      >
        <Flex
          alignItems="center"
          justifyContent="start"
          style={{ userSelect: "none" }}
          w={{ base: "100%", md: "50%", lg: "42%" }}
        >
          <Flex
            direction="column"
            w="100%"
            background="transparent"
            p="48px"
            mt={{ md: "150px", lg: "80px" }}
          >
            <Heading color={titleColor} fontSize="32px" mb="10px">
              Welcome Back
            </Heading>
            <Text
              mb="36px"
              ms="4px"
              color={textColor}
              fontWeight="bold"
              fontSize="14px"
            >
              Enter your email and password to sign in
            </Text>
            <form onSubmit={handleSubmit}>
              <FormControl>
                <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                  Email
                </FormLabel>
                <Input
                  id="email"
                  borderRadius="15px"
                  mb="24px"
                  fontSize="sm"
                  type="text"
                  name="email"
                  value={user.email}
                  onChange={handleInputChange}
                  placeholder="Your email address"
                  size="lg"
                />
                {formErrors.email && (
                  <Text color="red.500" fontSize="sm">
                    {formErrors.email}
                  </Text>
                )}
                <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                  Password
                </FormLabel>
                <Input
                  id="password"
                  borderRadius="15px"
                  mb="24px"
                  fontSize="sm"
                  type="password"
                  name="password"
                  value={user.password}
                  onChange={handleInputChange}
                  placeholder="Your password"
                  size="lg"
                />
                {formErrors.password && (
                  <Text color="red.500" fontSize="sm">
                    {formErrors.password}
                  </Text>
                )}
                <FormControl display="flex" alignItems="center">
                  <Switch id="remember-login" colorScheme="teal" me="10px" />
                  <FormLabel
                    htmlFor="remember-login"
                    mb="0"
                    ms="1"
                    fontWeight="normal"
                  >
                    Remember me
                  </FormLabel>
                </FormControl>
                {formErrors.request && (
                  <Text color="red.500" fontSize="sm" mt="10px" mb="20px">
                    {formErrors.request}
                  </Text>
                )}
                <Button
                  fontSize="10px"
                  type="submit"
                  bg="teal.300"
                  w="100%"
                  h="45"
                  mb="20px"
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
                  SIGN IN
                </Button>
              </FormControl>
            </form>
            <Flex
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              maxW="100%"
              mt="0px"
            >
              <Text color={textColor} fontWeight="medium">
                Don't have an account?
                <RouterLink
                  to="/auth/reset-password"
                  // color={titleColor}
                  // ms="5px"
                  // fontWeight="bold"
                  style={{
                    color: titleColor,
                    marginLeft: "5px",
                    fontWeight: "bold",
                  }}
                >
                  Reset Password
                </RouterLink>
              </Text>
            </Flex>
          </Flex>
        </Flex>
        <Box
          display={{ base: "none", md: "block" }}
          overflowX="hidden"
          h="100%"
          w="40vw"
          position="absolute"
          right="0px"
        >
          <Box
            bgImage={signInImage}
            w="100%"
            h="100%"
            bgSize="cover"
            bgPosition="50%"
            position="absolute"
            borderBottomLeftRadius="20px"
          ></Box>
        </Box>
      </Flex>
    </Flex>
  );
}

export default SignIn;
