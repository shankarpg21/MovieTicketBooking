import React from 'react'
import { Box, ChakraProvider, Text } from '@chakra-ui/react'
const Header = () => {
  return (
    <div>
      <ChakraProvider>
      <Box bg="teal.500" p="6">
      <Text fontSize="xl" textAlign='center' fontWeight="Text" color="white">
      Welcome to Movie Cinemas
      </Text>
      </Box>
      </ChakraProvider>
    </div>
  )
}

export default Header
