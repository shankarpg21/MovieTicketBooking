import React from 'react';
import { ChakraProvider, Box, VStack, Text, Badge, Button, Center, Image } from '@chakra-ui/react';
import userimg from './images/user.png'
import { useAuth } from './AuthProvider';

const Profile = () => {
  const auth=useAuth()
  return (
        <ChakraProvider>
      <Box p="6" borderWidth="1px" borderRadius="lg" boxShadow="lg">
        <VStack mt="4" align="center">
        <Image size="xl"  src={userimg} />
          <Text fontSize="xl" fontWeight="Text">
            {auth.user}
          </Text>
        </VStack>       

        <VStack spacing="2" >
          <Text fontSize="sl">
            <strong>Email:</strong> {auth.user}
          </Text>
        </VStack>

        <VStack mt="4" spacing="2">
          <Badge colorScheme="green">Active</Badge>
        </VStack>
        <Center><Button mt="4" colorScheme='green' onClick={()=>auth.logout()}>Logout</Button></Center>
      </Box>
      </ChakraProvider>
  );
};

export default Profile;
