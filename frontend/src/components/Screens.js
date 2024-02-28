import { Button,Box } from '@chakra-ui/react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'
import { useAuth } from './AuthProvider'

const Screens = ({screen}) => {
  const navigate=useNavigate()
  const handleBook=()=>{
    navigate(`/users/getSeats/${screen.show_id}`)
    
  }
  const viewBookings=()=>{
    navigate(`/admins/bookings/${screen.show_id}`)
  }
  const auth=useAuth();
  return (
    <Box
        maxW="md"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        boxShadow="lg"
        mt="10px"
        ml="110px"
        mb="10px"
      >

        <Box p="4">
          
            <strong>Screen Id:{screen.screen_id}</strong>
            <br></br>
            <strong>Date:{moment(new Date(screen.date)).format('DD/MM/YYYY')}</strong>
            <br/>
            <strong>Time:{moment(screen.time,'HH:mm').format('h:mm A')}</strong>
            <br/>
          {auth.isUser?<center><Button onClick={handleBook} colorScheme="blue">Book seats</Button></center>:<center><Button onClick={viewBookings} colorScheme="blue">View Bookings</Button></center>}
        </Box>
      </Box>
  )
}

export default Screens
