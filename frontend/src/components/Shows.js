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
        objectFit='contain'
        mt="10px"
        ml="110px"
        mb="60px"
        mr="10px"
      >
       
       <Box>
       <Center>
        <Image src={movie.movie_url} alt={movie.movie_name} width="446px" height='460px'  objectFit="contain" />
        </Center>
       </Box>
        <Box padding='10px' >
            <strong>{movie.movie_name}</strong>
          <Text fontSize="sl" color="black">
            {movie.description}
          </Text>
        <center><Button margin='auto' bottom='auto' onClick={()=>{
            auth.title(movie.movie_name)
            auth.isUser?navigate(`/users/getScreens/${movie.movie_id}`):navigate(`/admins/getScreens/${movie.movie_id}`)
            }} colorScheme="blue">View Screens</Button></center>
        </Box>
      </Box>
  )
}

export default Shows
