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
import axios from 'axios';
import {  useNavigate } from 'react-router-dom';

const AdminLogin = () => {
    const [user,setUser]=useState("");
    const navigate=useNavigate();
    const [password,setPassword]=useState("");
    function handleSubmit(e){
        e.preventDefault();
        var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if(!validRegex.test(user)){
            alert("Invalid mail address")
        }
        else{
            axios.post(`/users/register`,{"email":user,"password":password}).then(res=>{
              alert(res.data)
                setUser("");
                setPassword("");
                navigate(`/users/login`)
            }).catch(e=>alert(e.response.data))
        }
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
            <Input type="password" placeholder="Enter your password" onChange={(e)=>setPassword(e.target.value)}/>
          </FormControl>
          <Checkbox color='black' onChange={handleChange}>Show Password</Checkbox>
          <div>Already have an account?
        < Link color='purple' textDecoration="underline" onClick={()=>navigate('/users/login')}>Click here to login</Link>
        </div>
          <Button onClick={(e)=>handleSubmit(e)} colorScheme="green" width="full">
            Register
          </Button>
        </VStack>
      </Box>
    </ChakraProvider>
  );
};

export default AdminLogin;
