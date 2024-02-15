import React from 'react'
import userimg from './images/user.png'
import adminimg from './images/admin.jpg'
import {useNavigate} from 'react-router-dom'
import { Box,Button,Center,Flex,Image } from '@chakra-ui/react'
import { useAuth } from './AuthProvider'

const Intro = () => {
  const auth=useAuth()
  const navigate=useNavigate();
  return (
    <div>
        <Flex color='black' alignItems='center' gap='18' justify='center' mt='40px'>
      <Box boxSize='sm' border="2px">
        <Image src={userimg} maxW='100%' maxH='100%' alt='user' boxSize='sm' />
        <Center><Button onClick={()=>{
          auth.User()
          navigate('/users')}} colorScheme='blue'  mt='2px'>User</Button></Center>
      </Box>
      <Box boxSize='sm'  border='2px'>
        <Image src={adminimg} maxW='100%' maxH='100%' alt='admin' boxSize='sm' />
        <Center><Button onClick={()=>{
          auth.Admin()
          navigate('/admins')}} colorScheme='blue' mt="2px">Admin</Button></Center>
      </Box>
      </Flex>
    </div>
  )
}

export default Intro
