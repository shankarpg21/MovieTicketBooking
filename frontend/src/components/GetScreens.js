import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {  Center, Text } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import Screens from './Screens';
import { useAuth } from './AuthProvider';

const GetScreens = () => {
    const params=useParams()
    const id=params.id
    const auth=useAuth();
    const [load,setLoad]=useState(false);
    const [screenInfo,setScreenInfo]=useState([{}])
    useEffect(()=>{
      async function getScreen(){
        try{
          await axios.get(`/users/getScreens/${id}`).then(
            res=>setScreenInfo(res.data))
        }
        catch(e){ 
          console.log(e)
        }
        finally{
          setLoad(true)
        }
      }
      getScreen()
    },[id])
  return (
    <div>
      <Center fontSize={"xx-large"}>
        <strong>{auth.movie}</strong>
        </Center> 
      {!load && <Text textAlign="center" fontSize="xx-large">Loading...</Text>}
      {load &&  screenInfo.map((info)=>{
       return <Screens key={info._id} screen={info}></Screens>
      })}
    </div>
  )
}

export default GetScreens
