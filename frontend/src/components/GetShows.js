import React, { useEffect, useState } from 'react'
import {Text} from '@chakra-ui/react'
import axios from 'axios'
import Shows from './Shows'
const GetShows = () => {
  const [load,setLoad]=useState(false)
  const [shows,setShows]=useState([{}]);
  
    useEffect(()=>{
      async function info(){
        try{
          await axios.get('/users/getShows').then(res=>{
            setShows(res.data)
          })
        }
        catch(e){
          console.log(e)
        }
        finally{
          setLoad(true)
        }
      }
      info()
    },[])
  return (
    <div>
      {!load && <Text textAlign="center" fontSize="xx-large">Loading...</Text>}
      {load && !shows[0]  && <Text textAlign="center" fontSize="xx-large">No shows are schedule for future</Text>}
      {load &&  shows.map(movie=><Shows key={movie.movie_id} movie={movie}></Shows>)}
    </div>
  )
}

export default GetShows
