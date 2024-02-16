import { Text ,Button} from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import styles from './GetSeats.module.css'
import { useAuth } from '../AuthProvider';

const GetSeats = () => {
    const [load, setLoad] = useState(false);
    const [seats, setSeats] = useState([]);
    const [book, setBook] = useState(new Set());
    const params = useParams();
    const auth = useAuth();
    const id = params.show_id;
    const price=useRef(0);

    useEffect(() => {
        async function get() {
            try {
                const res = await axios.get(`/users/getSeats/${id}`, { headers: { Authorization: `Bearer ${auth.token}` } });
                setSeats(res.data.seats);
                price.current=res.data.price;
            }
            catch (e) {
                console.log(e);
            }
            finally {
                setLoad(true);
            }
        }
        get();
    }, [id, auth.token]);
    
    
    const [flag,setFlag]=useState(0);
    const handleChange = (i) => {
      const updatedBook = new Set(book);
        if (updatedBook.has(i)) {
            updatedBook.delete(i);
            setFlag(flag-1);
            document.getElementById(i).className=styles.seatAvailable
        } else {
            updatedBook.add(i);
            setFlag(flag+1);
            document.getElementById(i).className=styles.seatHold
        }
        setBook(updatedBook);
    }
    const navigate=useNavigate();
    const info=async(bookedSeats)=>{
        await axios.put('/users/bookShows',{"show_id":id,"bookings":bookedSeats},{'headers':{'Authorization':`Bearer ${auth.token}`}}).then(res=>navigate('/users/success')).catch(e=>console.log(e))
    }
    const handleBook=()=>{
        let bookedSeats=Array.from(book);
        info(bookedSeats)
    }
    return (
        <div>
            {!load && <Text textAlign="center" fontSize="xx-large">Loading...</Text>}
            {load && <><Text textAlign="center" fontSize="xx-large" className={styles.screen}>All eyes this way</Text>
            <div className={styles.seatsContainer}>{
               seats.map((seat, i) => (
                <div
                    key={i}
                    onClick={() => seat===0?handleChange(i):null}
                    id={i}
                    className={seat === 0 ? styles.seatAvailable : book.has(i) ?styles.seatHold: styles.seatReserved }
                >
                    {i}
                </div>
            ))
            }
            {  flag>0 &&
                 <div><pre>You have chosen {flag} seats.Amount to be paid Rs{flag*price.current}</pre>
                <Button colorScheme='red' onClick={handleBook}>Book Ticket</Button>
                </div>
            }
            </div></>}
        </div>
    );
}

export default GetSeats;
