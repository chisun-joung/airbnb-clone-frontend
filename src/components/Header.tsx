import { FaAirbnb, FaMoon, FaSun } from "react-icons/fa";
import {
  Box,
  Button,
  HStack,
  IconButton,
  Stack,
  useDisclosure,
  useColorMode,
  useColorModeValue,
  LightMode,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useToast,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import LoginModal from "./LoginModal";
import SignUpModal from "./SignUpModal";
import useUser from "../lib/useUser";

export default function Header() {
  const { userLoading, isLoggedIn, user } = useUser();
  const {
    isOpen: isLoginOpen,
    onClose: onLoginClose,
    onOpen: onLoginOpen,
  } = useDisclosure();
  const {
    isOpen: isSignUpOpen,
    onClose: onSignUpClose,
    onOpen: onSignUpOpen,
  } = useDisclosure();
  const { toggleColorMode } = useColorMode();
  const logoColor = useColorModeValue("red.500", "red.300");
  const Icon = useColorModeValue(FaMoon, FaSun);
  const toast = useToast();
  const onLogout = async () => {
    const toastId = toast({
      title: "Logging out...",
      description: "Please wait...",
      status: "loading",
      position: "bottom-right",
    });
    setTimeout(() => {
      toast.update(toastId, {
        title: "Logged out",
        description: "You have been logged out",
        status: "success",
      });
    }, 3000);
  };

  return (
    <Stack
      justifyContent={"space-between"}
      py={5}
      px={40}
      borderBottomWidth={1}
      direction={{ sm: "column", md: "row" }}
      spacing={{ sm: 4, md: 0 }}
    >
      <Box color={logoColor}>
        <Link to={"/"}>
          <FaAirbnb size={"48"} />
        </Link>
      </Box>
      <HStack spacing={2}>
        <IconButton
          onClick={toggleColorMode}
          variant={"ghost"}
          aria-label="Toggle dark mode"
          icon={<Icon />}
        />
        {!userLoading ? (
          !isLoggedIn ? (
            <>
              <Button onClick={onLoginOpen}>Log in</Button>
              <LightMode>
                <Button onClick={onSignUpOpen} colorScheme={"red"}>
                  Sign up
                </Button>
              </LightMode>
            </>
          ) : (
            <Menu>
              <MenuButton>
                <Avatar name={user?.name} src={user?.avatar} size={"md"} />
              </MenuButton>
              <MenuList>
                <MenuItem onClick={onLogout}>Log out</MenuItem>
              </MenuList>
            </Menu>
          )
        ) : null}
      </HStack>
      <LoginModal isOpen={isLoginOpen} onClose={onLoginClose} />
      <SignUpModal isOpen={isSignUpOpen} onClose={onSignUpClose} />
    </Stack>
  );
}
