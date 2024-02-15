import { Button,Box, Image, Text, Center } from '@chakra-ui/react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from './AuthProvider'

const Shows = ({movie}) => {
  const navigate=useNavigate()
  const auth=useAuth()
  return (
    
    <Box
        maxW="md"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        boxShadow="lg"
        mt="10px"
        ml="110px"
        mb="10px"
      >
        <Center>
        <Image src={movie.movie_url} alt={movie.movie_name} height="ms" objectFit="cover" />
        </Center>

        <Box p="4">
          
            <strong>{movie.movie_name}</strong>
          <Text fontSize="sl" color="black">
            {movie.description}
          </Text>
          <center><Button onClick={()=>{
            auth.title(movie.movie_name)
            auth.isUser?navigate(`/users/getScreens/${movie.movie_id}`):navigate(`/admins/getScreens/${movie.movie_id}`)
            }} colorScheme="blue">View Screens</Button></center>
        </Box>
      </Box>
  )
}

export default Shows
