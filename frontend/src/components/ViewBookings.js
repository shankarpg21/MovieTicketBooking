import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import {
    Table,
    Thead,
    Tbody,
    Box,
    Tr,
    Th,
    Text,
    Td,
    Center,
    TableCaption,
  } from '@chakra-ui/react'
import moment from "moment";

const ViewBookings = () => {
  const auth = useAuth();
  const [load,setLoad]=useState(false)
  const [info, setInfo] = useState([{}]);
  const [name,setName]=useState("");
  const params = useParams();
  useEffect(() => {
    async function fetch(){
        try{
            await axios.get(`/admins/bookings/${params.show_id}`, {
            headers: { Authorization: `Bearer ${auth.token}` },
          })
          .then((res) =>{
            setInfo(res.data.msg)
            setName(res.data.movie_name)
        })    
        }
        catch(e){
            console.log(e)
        }
        finally{
            setLoad(true)
        }
    }
      fetch()
  }, [params.show_id,auth.token]);


  
  return (
    <div>
      {!load && <Text textAlign="center" fontSize="xx-large">Loading...</Text>}
      {load && info.length===0 && <Text textAlign="center" fontSize="xx-large">No Bookings started yet</Text>}
      {load  && 
        <Box overflowX="auto">
          <Center>
        <Table variant="striped" colorScheme="teal" mt="20px" borderWidth="1px" borderRadius="lg">
          <TableCaption placement="top" fontSize='large'><strong>Booking Information of {name}</strong></TableCaption>
          <Thead bg="teal.100">
            <Tr>
              <Th border="1px" borderColor="teal.200" p={2}>Booking Id</Th>
              <Th border="1px" borderColor="teal.200" p={2}>Username</Th>
              <Th border="1px" borderColor="teal.200" p={2}>Show Id</Th>
              <Th border="1px" borderColor="teal.200" p={2}>Screen</Th>
              <Th border="1px" borderColor="teal.200" p={2}>Date</Th>
              <Th border="1px" borderColor="teal.200" p={2}>Time</Th>
              <Th border="1px" borderColor="teal.200" p={2}>Booked Seats</Th>
            </Tr>
          </Thead>
          <Tbody>
            {info.map((x) => (
              <Tr key={x._id}>
                <Td border="1px" borderColor="teal.200" p={2}>{x._id}</Td>
                <Td border="1px" borderColor="teal.200" p={2}>{x.user_id}</Td>
                <Td border="1px" borderColor="teal.200" p={2}>{x.show_id}</Td>
                <Td border="1px" borderColor="teal.200" p={2}>{x.screen_id}</Td>
                <Td border="1px" borderColor="teal.200" p={2}>{moment(new Date(x.date)).format('DD/MM/YYYY')}</Td>
                <Td border="1px" borderColor="teal.200" p={2}>{moment(x.time, 'HH:mm').format('h:mm A')}</Td>
                <Td border="1px" borderColor="teal.200" p={2}>{x.bookedSeats.sort().join(", ")}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        </Center>
      </Box>
      }
    </div>
  );
};

export default ViewBookings;
