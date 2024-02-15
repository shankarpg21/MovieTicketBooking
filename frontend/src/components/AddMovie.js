import React, { useState } from 'react';
import {
  ChakraProvider,
  Box,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  Heading,
} from '@chakra-ui/react';
import axios from 'axios';
import { useAuth } from './AuthProvider';

const AddMovie = () => {
  const [movieInfo, setMovieInfo] = useState({
    movie_id: '',
    movie_name: '',
    movie_url: '',
    description: '',
  });
  const auth=useAuth();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovieInfo((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    console.log(auth.token);
    e.preventDefault();
    axios.post('/admins/addMovie',{"movie_id":movieInfo.movie_id,"movie_name":movieInfo.movie_name,"description":movieInfo.description,"movie_url":movieInfo.movie_url},{headers: { Authorization: `Bearer ${auth.token}` }}).then(res=>{
      alert("Movie added successfully")
      setMovieInfo({movie_id:"",movie_name:"",movie_url:"",description:""})
    }).catch(e=>console.log(e))
  };

  return (
    <ChakraProvider>
      <Box
        maxW="md"
        mx="auto"
        mt="8"
        p="8"
        borderWidth="1px"
        borderRadius="lg"
        boxShadow="xl"
        bg="white"
        color="black800"
      >
        <Heading as="h2" size="xl" mb="6" textAlign="center" color="teal.500">
          Movie Information
        </Heading>
        <form onSubmit={handleSubmit}>
          <FormControl mb="4" isRequired>
            <FormLabel>Movie ID</FormLabel>
            <Input
              type="text"
              name="movie_id"
              placeholder="Enter Movie ID"
              value={movieInfo.movie_id}
              onChange={handleChange}
              variant="filled"
            />
          </FormControl>

          <FormControl mb="4" isRequired>
            <FormLabel>Movie Name</FormLabel>
            <Input
              type="text"
              name="movie_name"
              placeholder="Enter Movie Name"
              value={movieInfo.movie_name}
              onChange={handleChange}
              variant="filled"
            />
          </FormControl>

          <FormControl mb="4" isRequired>
            <FormLabel>Movie URL</FormLabel>
            <Input
              type="text"
              name="movie_url"
              placeholder="Enter Movie URL"
              value={movieInfo.movie_url}
              onChange={handleChange}
              variant="filled"
            />
          </FormControl>

          <FormControl mb="4" isRequired>
            <FormLabel>Description</FormLabel>
            <Textarea
              name="description"
              placeholder="Enter Movie Description"
              value={movieInfo.description}
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

export default AddMovie;
