import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../AuthProvider";
import styles from './users.module.css'

const Users = () => {
    const auth=useAuth();
  return (
    <div>
      <nav className={styles.nav}>
      {
                (!auth.user||!auth.isUser) && (
                    <NavLink to='login'>Login</NavLink>
                )
            }
            {
                (!auth.user||!auth.isUser) && (
                    <NavLink to='register'>Register</NavLink>
                )
            }
            <NavLink to='getShows'>Shows</NavLink>
            <NavLink to='viewTickets'>Tickets</NavLink>
            {
                auth.user && (<NavLink to='profile'>Profile</NavLink>)
            }
        </nav>
      <Outlet/>
    </div>
  );
};

export default Users;
