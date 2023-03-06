import {
  Box,
  Checkbox,
  Container,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
  Select,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { FaBed, FaMoneyCheck, FaToilet } from "react-icons/fa";
import useHostOnlyPage from "../components/HostOnlyPage";
import ProtectedPage from "../components/ProtectedPage";

export default function UploadRoom() {
  useHostOnlyPage();
  return (
    <ProtectedPage>
      <Box
        pb={40}
        mt={10}
        px={{
          base: 10,
          lg: 40,
        }}
      >
        <Container>
          <Heading textAlign={"center"}>Upload Room</Heading>
          <VStack spacing={5} as={"form"} mt={10}>
            <FormControl>
              <FormLabel>Room Name</FormLabel>
              <Input required type={"text"} />
              <FormHelperText>Write the name of your room.</FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel>Country</FormLabel>
              <Input required type={"text"} />
            </FormControl>
            <FormControl>
              <FormLabel>City</FormLabel>
              <Input required type={"text"} />
            </FormControl>
            <FormControl>
              <FormLabel>Address</FormLabel>
              <Input required type={"text"} />
            </FormControl>
            <FormControl>
              <FormLabel>Price</FormLabel>
              <InputGroup>
                <InputLeftAddon children={<FaMoneyCheck />} />
                <Input required type={"number"} min={0} />
              </InputGroup>
            </FormControl>
            <FormControl>
              <FormLabel>Room</FormLabel>
              <InputGroup>
                <InputLeftAddon children={<FaBed />} />
                <Input type={"number"} min={0} />
              </InputGroup>
            </FormControl>
            <FormControl>
              <FormLabel>Toilets</FormLabel>
              <InputGroup>
                <InputLeftAddon children={<FaToilet />} />
                <Input type={"number"} min={0} />
              </InputGroup>
            </FormControl>
            <FormControl>
              <FormLabel>Descriptions</FormLabel>
              <Textarea />
            </FormControl>
            <FormControl>
              <Checkbox>Pet friendly?</Checkbox>
            </FormControl>
            <FormControl>
              <FormLabel>Room Type</FormLabel>
              <Select placeholder="choose a kind">
                <option value="entire_place">Entire Place</option>
                <option value="private_room">Private Room</option>
                <option value="shared_room">Shared Room</option>
              </Select>
              <FormHelperText>Choose the type of your room.</FormHelperText>
            </FormControl>
          </VStack>
        </Container>
      </Box>
    </ProtectedPage>
  );
}
