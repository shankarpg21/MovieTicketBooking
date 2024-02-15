import React from 'react'
import {Td,Tr} from  '@chakra-ui/react'
import moment from 'moment'

const Bookings = ({info}) => {
  return (
       <Tr>
        <Td>{info._id}</Td>
        <Td>{info.user_id} </Td>
        <Td>{info.show_id}</Td>
        <Td>{info.movie_name}</Td>
        <Td>{info.screen_id}</Td>
        <Td>{moment(info.date).utc().format('yyyy-mm-dd')}</Td>
        <Td>{moment(info.time,'HH:mm').format('h:mm A')}</Td>
        <Td>{info.bookedSeats.sort().join(',')}</Td>
    </Tr>
  )
}

export default Bookings
