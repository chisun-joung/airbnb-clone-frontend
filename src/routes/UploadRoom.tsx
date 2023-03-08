import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
  Select,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { FaBed, FaMoneyCheck, FaToilet } from "react-icons/fa";
import { getAmenities, getCategories } from "../api";
import useHostOnlyPage from "../components/HostOnlyPage";
import ProtectedPage from "../components/ProtectedPage";
import { IAmenity, ICategory } from "../types";

interface IForm {
  name: string;
  country: string;
  city: string;
  price: number;
  rooms: number;
  toilets: number;
  description: string;
  address: string;
  pet_friendly: boolean;
  kind: string;
  amenities: number[];
  category: number;
}

export default function UploadRoom() {
  const { register, handleSubmit } = useForm<IForm>();
  const { data: amenities, isLoading: isAmenitiesLoading } = useQuery<
    IAmenity[]
  >(["amenities"], getAmenities);
  const { data: categories, isLoading: isCategoriesLoading } = useQuery<
    ICategory[]
  >(["categories"], getCategories);
  useHostOnlyPage();
  const onSubmit = (data: IForm) => {
    console.log(data);
  };
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
          <VStack
            spacing={10}
            as={"form"}
            onSubmit={handleSubmit(onSubmit)}
            mt={10}
          >
            <FormControl>
              <FormLabel>Room Name</FormLabel>
              <Input
                {...register("name", { required: true })}
                required
                type={"text"}
              />
              <FormHelperText>Write the name of your room.</FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel>Country</FormLabel>
              <Input
                {...register("country", { required: true })}
                required
                type={"text"}
              />
            </FormControl>
            <FormControl>
              <FormLabel>City</FormLabel>
              <Input
                {...register("city", { required: true })}
                required
                type={"text"}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Address</FormLabel>
              <Input
                {...register("address", { required: true })}
                required
                type={"text"}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Price</FormLabel>
              <InputGroup>
                <InputLeftAddon children={<FaMoneyCheck />} />
                <Input
                  {...register("price", { required: true })}
                  required
                  type={"number"}
                  min={0}
                />
              </InputGroup>
            </FormControl>
            <FormControl>
              <FormLabel>Room</FormLabel>
              <InputGroup>
                <InputLeftAddon children={<FaBed />} />
                <Input
                  {...register("rooms", { required: true })}
                  type={"number"}
                  min={0}
                />
              </InputGroup>
            </FormControl>
            <FormControl>
              <FormLabel>Toilets</FormLabel>
              <InputGroup>
                <InputLeftAddon children={<FaToilet />} />
                <Input
                  {...register("toilets", { required: true })}
                  type={"number"}
                  min={0}
                />
              </InputGroup>
            </FormControl>
            <FormControl>
              <FormLabel>Descriptions</FormLabel>
              <Textarea {...register("description", { required: true })} />
            </FormControl>
            <FormControl>
              <Checkbox {...register("pet_friendly", { required: true })}>
                Pet friendly?
              </Checkbox>
            </FormControl>
            <FormControl>
              <FormLabel>Room Type</FormLabel>
              <Select
                {...register("kind", { required: true })}
                placeholder="choose a kind"
              >
                <option value="entire_place">Entire Place</option>
                <option value="private_room">Private Room</option>
                <option value="shared_room">Shared Room</option>
              </Select>
              <FormHelperText>Choose the type of your room.</FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel>Category</FormLabel>
              <Select
                {...register("category", { required: true })}
                placeholder="Choose a kind"
              >
                {categories?.map((category) => (
                  <option key={category.pk} value={category.pk}>
                    {category.name}
                  </option>
                ))}
              </Select>
              <FormHelperText>
                What category describes your room?
              </FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel>Amenities</FormLabel>
              <Grid templateColumns={"1fr 1fr"} gap={5}>
                {amenities?.map((amenity) => (
                  <Box key={amenity.pk}>
                    <Checkbox
                      value={amenity.pk}
                      {...register("amenities", { required: true })}
                    >
                      {amenity.name}
                    </Checkbox>
                    <FormHelperText>{amenity.description}</FormHelperText>
                  </Box>
                ))}
              </Grid>
            </FormControl>
            <Button colorScheme={"red"} size="lg" w="100%">
              Upload Room
            </Button>
          </VStack>
        </Container>
      </Box>
    </ProtectedPage>
  );
}
