import { Button, Center, Text } from '@chakra-ui/react'
import React from 'react'
import styles from './Success.module.css'
import { useNavigate } from 'react-router-dom'

const Success = () => {
    const navigate=useNavigate()
    const handleClick=()=>{
        navigate('/users/viewTickets')
    }
  return (
    <div>
      <Text mt="180" fontSize='xxx-large' fontWeight='Text'  textAlign="center">Ticket Booked succesfully <span className={styles.tick}>&#10003;</span></Text>
      <Center><Button colorScheme='green' onClick={handleClick}>Click here to view Ticket</Button></Center>
    </div>
  )
}

export default Success
