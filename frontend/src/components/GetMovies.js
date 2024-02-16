import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Movies from './Movies'
import { useAuth } from './AuthProvider'
import { Text ,Stack} from '@chakra-ui/react'

const GetMovies = () => {
    const [movies,setMovies]=useState([{}])
    const auth=useAuth()
    const [load,setLoad]=useState(false)
    useEffect(()=>{
       async function fetch(){
        try{
            await axios.get('/admins/getMovies',{headers:{Authorization:`Bearer ${auth.token}`}}).then(res=>setMovies(res.data))
        }
        catch(e){
            console.log(e)
        }
        finally{
            setLoad(true)
        }
       }
       fetch()
    })
  return (
    <div>
        <Text textAlign="center" fontWeight='bold' fontSize="xx-large">Movies</Text>
      {!load && <Text textAlign="center" fontSize="xx-large">Loading...</Text>}
      {load && !movies[0]  && <Text textAlign="center" fontSize="xx-large">No shows are schedule for future</Text>}
      <Stack direction='row' spacing='4' flexWrap='wrap' flexDirection='row'>
      {load && movies.map((movie=><Movies key={movie.movie_id} movie={movie}/>))}
      </Stack>
    </div>
  )
}

export default GetMovies
