import React, { useState } from 'react';
import {
  ChakraProvider,
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Heading,
} from '@chakra-ui/react';
import axios from 'axios';
import { useAuth } from './AuthProvider';

 const AddScreen = () => {
  const [screenInfo, setScreenInfo] = useState({
    screen_id: '',
    no_of_seats:0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setScreenInfo((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const auth=useAuth();
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/admins/addScreen',
    { "screen_id":screenInfo.screen_id,
      "no_of_seats":screenInfo.no_of_seats
  },{headers:{Authorization:`Bearer ${auth.token}`}}).then(res=>{
    alert("Screen Added successfully")
    setScreenInfo({screen_id: '',
    no_of_seats: 0,
    })
  }).catch(e=>alert(e.response.data))
  };

  return (
    <ChakraProvider>
      <Box
        maxW="md"
        mx="auto"
        mt="8"
        mb="8"
        p="8"
        borderWidth="1px"
        borderRadius="lg"
        boxShadow="xl"
        bg="white"
        color="black800"
      >
        <Heading as="h2" size="xl" mb="6" textAlign="center" color="teal.500">
          Add Screen Information
        </Heading>
        <form onSubmit={handleSubmit}>
        <FormControl mb="4" isRequired>
            <FormLabel>Screen ID</FormLabel>
            <Input
              type="text"
              name="screen_id"
              placeholder="Enter Screen ID"
              value={screenInfo.screen_id}
              onChange={handleChange}
              variant="filled"
            />
          </FormControl>
 
          <FormControl mb="4" isRequired>
            <FormLabel>No of Seats</FormLabel>
            <Input
              type="number"
              name="no_of_seats"
              placeholder="Enter Number of seats available in the screen"
              value={screenInfo.no_of_seats}
              onChange={handleChange}
              variant="filled"
            />
          </FormControl>


          <Button colorScheme="teal" type="submit" width="full">
            Submit
          </Button>
        </form>
      </Box>
    </ChakraProvider>
  );
};


export default AddScreen