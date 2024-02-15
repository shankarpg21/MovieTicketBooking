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

 const AddShows = () => {
  const [showInfo, setShowInfo] = useState({
    show_id:'',
    screen_id: '',
    movie_id: '',
    price:0,
    date: '',
    time: '',
  });

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setShowInfo((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const auth=useAuth();
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/admins/addShow',
    {"show_id":showInfo.show_id,
      "screen_id":showInfo.screen_id,
    "movie_id":showInfo.movie_id,
    "price":showInfo.price,
    "date":showInfo.date,
    "time":showInfo.time
  },{headers:{Authorization:`Bearer ${auth.token}`}}).then(res=>{
    alert("Show Added successfully")
    setShowInfo({
      show_id:'',
      screen_id: '',
      price:0,
    movie_id: '',
    date: '',
    time: '',})
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
          Add Show Information
        </Heading>
        <form onSubmit={handleSubmit}>
        <FormControl mb="4" isRequired>
            <FormLabel>Show ID</FormLabel>
            <Input
              type="text"
              name="show_id"
              placeholder="Enter Show ID"
              value={showInfo.show_id}
              onChange={handleChange}
              variant="filled"
            />
          </FormControl>

          <FormControl mb="4" isRequired>
            <FormLabel>Screen ID</FormLabel>
            <Input
              type="text"
              name="screen_id"
              placeholder="Enter Screen ID"
              value={showInfo.screen_id}
              onChange={handleChange}
              variant="filled"
            />
          </FormControl>

          <FormControl mb="4" isRequired>
            <FormLabel>Movie ID</FormLabel>
            <Input
              type="text"
              name="movie_id"
              placeholder="Enter Movie ID"
              value={showInfo.movie_id}
              onChange={handleChange}
              variant="filled"
            />
          </FormControl>

          <FormControl mb="4" isRequired>
            <FormLabel>Price</FormLabel>
            <Input
              type="number"
              name="price"
              value={showInfo.price}
              onChange={handleChange}
              variant="filled"
            />
          </FormControl>

          <FormControl mb="4" isRequired>
            <FormLabel>Date</FormLabel>
            <Input
              type="date"
              name="date"
              value={showInfo.date}
              onChange={handleChange}
              variant="filled"
              min={new Date().toISOString().split('T')[0]}
            />
          </FormControl>

          <FormControl mb="4" isRequired>
            <FormLabel>Time</FormLabel>
            <Input
              type="time"
              name="time"
              value={showInfo.time}
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


export default AddShows