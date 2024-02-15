import {useState} from 'react';
import {
  ChakraProvider,
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  Checkbox,
  Link,
} from '@chakra-ui/react';
import { useAuth } from './AuthProvider';
import axios from 'axios';
import {  useNavigate } from 'react-router-dom';

const UserLogin = () => {
    const [user,setUser]=useState("");
    const navigate=useNavigate();
    const auth=useAuth();
    const [password,setPassword]=useState("");
    function handleSubmit(e){
        e.preventDefault();
        
            axios.post(`/users/login`,{"email":user,"password":password}).then(res=>{
                auth.login(res.data.email)
                auth.User()
                auth.verify(res.data.accessToken)
                setUser("");
                setPassword("");
                alert("Login successful");
                navigate('/users/profile')
            }).catch(e=>alert(e.response.data))
    }
    function handleChange(){
        let x=document.getElementById('password');
        x.type==='password'?x.type='text':x.type='password'
    }
  return (
    <ChakraProvider>
      <Box
        maxW="md"
        mx="auto"
        mt="8"
        p="8"
        borderWidth="1px"
        borderRadius="lg"
        boxShadow="lg"
      >
        <VStack spacing="4">
          <FormControl id="email" isRequired>
            <FormLabel>Email address</FormLabel>
            <Input type="email" placeholder="Enter your email" onChange={(e)=>setUser(e.target.value)}/>
          </FormControl>

          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <Input type="password" placeholder="Enter your password" onChange={(e)=>setPassword(e.target.value)} />
          </FormControl>
          <Checkbox color='black' onChange={handleChange}>Show Password</Checkbox>
          <div>Don't have an account?
        < Link color='purple' textDecoration="underline" onClick={()=>navigate('/users/register')}>Click here to register</Link>
        </div>
          <Button onClick={(e)=>handleSubmit(e)} colorScheme="green" width="full">
            Login
          </Button>
        </VStack>
      </Box>
    </ChakraProvider>
  );
};

export default UserLogin;
