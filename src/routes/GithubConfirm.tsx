import { Heading, Spinner, Text, useToast, VStack } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { githubLogIn } from "../api";

export default function GithubConfirm() {
  const { search } = useLocation();
  const toast = useToast();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const params = new URLSearchParams(search);
  const code = params.get("code");
  const mutation = useMutation(githubLogIn, {
    onSuccess: (data) => {
      toast({
        title: "Logged in",
        description: "You have been logged in",
        status: "success",
        position: "bottom-right",
      });
      queryClient.refetchQueries(["me"]);
      navigate("/");
    },
  });

  useEffect(() => {
    if (code) mutation.mutate(code);
  }, []);
  return (
    <VStack justifyContent={"center"} mt={40}>
      <Heading>Processing log in ...</Heading>
      <Text>Please wait a moment.</Text>
      <Spinner size={"lg"} />
    </VStack>
  );
}
