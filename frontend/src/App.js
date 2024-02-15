import { Route, Routes } from 'react-router-dom';
import './App.css';
import Intro from './components/Intro';
import {
  ChakraBaseProvider,
  extendBaseTheme,
  theme as chakraTheme,
} from '@chakra-ui/react'
import UserLogin from './components/UserLogin';
import Users from './components/Users/Users';
import AuthProvider from './components/AuthProvider';
import Register from './components/Register';
import GetShows from './components/GetShows';
import UserProfile from './components/UserProfile';
import ViewTickets from './components/ViewTickets';
import RequireAuth from './components/RequireAuth'
import AddShows from './components/AddShows';
import AddMovie from './components/AddMovie';
import Admins from './components/Admins/Admins'
import RequireAdminAuth from './components/RequireAdminAuth';
import AdminLogin from './components/AdminLogin' 
import AdminProfile from './components/AdminProfile'
import AddScreen from './components/AddScreen';
import GetScreens from './components/GetScreens';
import GetSeats from './components/GetSeats/GetSeats';
import Success from './components/Success/Success';
import ViewBookings from './components/ViewBookings';
const { Button } = chakraTheme.components

const theme = extendBaseTheme({
  components: {
    Button,
  },
})

function App() {
  return (
    <ChakraBaseProvider theme={theme}>
      <AuthProvider>
      <Routes>
        <Route path='/' element={<Intro/>}/>
        <Route path='/users' element={<Users/>}>
        <Route index='login' element={<UserLogin/>}/>
          <Route path='login' element={<UserLogin/>}/>
          <Route path='register' element={<Register/>}/>
          <Route path='getShows' element={<GetShows/>}/>
          <Route path='getScreens/:id' element={<GetScreens/>}/>
          <Route path='getSeats/:show_id' element={<RequireAuth><GetSeats/></RequireAuth>}/>
          <Route path='success' element={<Success/>}/>
          <Route path='viewTickets' element={<RequireAuth><ViewTickets/></RequireAuth>}/>
          <Route path='profile' element={<RequireAuth><UserProfile/></RequireAuth>}/>
          </Route>
        <Route path='/admins' element={<Admins/>}>
        <Route index='login' element={<AdminLogin/>}/>
          <Route path='login' element={<AdminLogin/>}/>
          <Route path='addMovie' element={<RequireAdminAuth><AddMovie/></RequireAdminAuth>}/>
          <Route path='addShow' element={<RequireAdminAuth><AddShows/></RequireAdminAuth>}/>
          <Route path='getShows' element={<GetShows/>}/>
          <Route path='getScreens/:id' element={<GetScreens/>}/>
          <Route path='bookings/:show_id' element={<RequireAdminAuth><ViewBookings/></RequireAdminAuth>}/>
          <Route path='addScreen' element={<RequireAdminAuth><AddScreen/></RequireAdminAuth>}/>
          <Route path='profile' element={<RequireAdminAuth><AdminProfile/></RequireAdminAuth>}/>
          </Route>
      </Routes>
      </AuthProvider>
    </ChakraBaseProvider>
  ); 
}

export default App;
