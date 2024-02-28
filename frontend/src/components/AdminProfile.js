import React from 'react';
import { Box, VStack, Text, Badge, Button, Center, Image, ChakraProvider } from '@chakra-ui/react';
import admin from './images/admin.jpg'
import { useAuth } from './AuthProvider';

const Profile = () => {
  const auth=useAuth()
  return (
    <ChakraProvider>
      <Box p="6" borderWidth="1px" borderRadius="lg" boxShadow="lg">
        <VStack mt="4" align="center">
        <Image size="xl"  src={admin} />
          <Text fontSize="xl" fontWeight="Text">
            Admin
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
