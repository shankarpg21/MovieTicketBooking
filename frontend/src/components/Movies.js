import React from 'react'
import { Button,Box, Image, Text, Center } from '@chakra-ui/react'

import { useNavigate } from 'react-router-dom'
import { useAuth } from './AuthProvider'

const Movies = ({movie}) => {
    const auth=useAuth()
    const navigate=useNavigate();
  return (
    <div>
        
        <Box
        maxW="md"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        objectFit='contain'
        boxShadow="lg"
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
        <Box padding='10px'>
            <strong>{movie.movie_name}</strong>
          <Text fontSize="sl" color="black">
            {movie.description}
          </Text>
        <center><Button bottom='auto' margin='auto'onClick={()=>{
           auth.title(movie.movie_name)
           navigate(`/admins/addShow/${movie.movie_id}`)
           }} colorScheme="blue">Add Shows</Button></center>
        </Box>
      </Box>
    </div>
  )
}


export default Movies
