import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import styles from './admin.module.css'
import { useAuth } from "../AuthProvider";
const Users = () => {
  const auth=useAuth()
  return (
    <div>
      <nav className={styles.nav}>
      {
                !auth.token && (
                    <NavLink to='login'>Login</NavLink>
                )
            }
            <NavLink to='addMovie'>AddMovies</NavLink>
            <NavLink to='addScreen'>AddScreen</NavLink>
            <NavLink to='getMovies'>Movies</NavLink>
            <NavLink to='getShows'>Shows</NavLink>
            {
                auth.token && (<NavLink to='profile'>Profile</NavLink>)
            }
        </nav>
      <Outlet/>
    </div>
  );
};

export default Users;
