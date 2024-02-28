import { Box, Center, Text } from '@chakra-ui/react'
import moment from 'moment'
import React from 'react'

const Tickets = ({ticket}) => {


    const spanStyle = {
        fontWeight: 'bold',
        fontSize: 'medium'
      };
  return (
    <div>
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
          
            <Center><Text fontSize='large' fontWeight="bold">{ticket.movie_name}</Text></Center>
            <Text fontSize="sl" color="black">
  <span style={spanStyle}>Booking Id</span>:{ticket._id}
  </Text>
          <Text fontSize="sl" color="black">
          <span style={spanStyle}>Show Id</span>:{ticket.show_id}
          </Text>
          <Text fontSize="sl" color="black">
            <span style={spanStyle}>Screen Id</span>:{ticket.screen_id}
          </Text>
          <Text fontSize="sl" color="black">
          <span style={spanStyle}>Date</span>:{moment(new Date(ticket.date)).format('DD/MM/YYYY')}
          </Text>
          <Text fontSize="sl" color="black">
          <span style={spanStyle}>Time</span>:{moment(ticket.time,'HH:mm').format('h:mm A')}
          </Text>
          
          <Text fontSize="sl" color="black">
          <span style={spanStyle}>Seats</span>:{ticket.bookedSeats.sort().join()}
          </Text>
        </Box>
      </Box>
    </div>
  )
}

export default Tickets
