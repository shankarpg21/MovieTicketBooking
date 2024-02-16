import React, { useEffect, useState } from 'react'
import { Stack, Text} from '@chakra-ui/react'
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
      <Text textAlign="center" fontWeight='bold' fontSize="xx-large">Shows</Text>
      {!load && <Text textAlign="center" fontSize="xx-large">Loading...</Text>}
      {load && !shows[0]  && <Text textAlign="center" fontSize="xx-large">No shows are schedule for future</Text>}
      <Stack direction='row' spacing='4' flexWrap='wrap' flexDirection='row'>
      {load &&  shows.map(movie=><Shows key={movie.movie_id} movie={movie}></Shows>)}
      </Stack>
    </div>
  )
}

export default GetShows
