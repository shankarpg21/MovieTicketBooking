import { Text } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useAuth } from './AuthProvider';
import Tickets from './Tickets';

const ViewTickets = () => {
  const [bookings,setBookings]=useState([{}]);
  const [load,setLoad]=useState(false)
  const auth=useAuth()
  useEffect(()=>{
    async function info(){
      try{
        await axios.get('/users/viewTickets',{headers:{Authorization:`Bearer ${auth.token}`}}).then(
          res=>{
            setBookings(res.data)
          })
        }
        catch(e){
          console.log(e.response.data)
        }
        finally{
        setLoad(true)
      }
    }
    info()
  },[auth.token])
  return (
    <div>
       {!load && <Text textAlign="center" fontSize="xx-large">Loading...</Text>}
      {load && bookings.length===0  && <Text textAlign="center" fontSize="xx-large">No tickets booked by you</Text>}
      {load && bookings.length>0 && bookings.map((book)=><Tickets key={book._id} ticket={book}/>)}
    </div>
  )
}

export default ViewTickets
