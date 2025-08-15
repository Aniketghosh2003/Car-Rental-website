import React from 'react'
import NavbarOwner from '../../components/owner/NavbarOwner'
import { Outlet } from 'react-router-dom'
import Sidebar from '../../components/owner/Sidebar'
import { useAppContext } from '../../context/appContext'
import { useEffect } from 'react'

const Layout = () => {

  const {isOwner, navigate, token, user} = useAppContext();

  useEffect(() => {
    // Add a small delay to ensure authentication state is properly loaded
    const checkAuth = setTimeout(() => {
      if (!token) {
        // No token means definitely not authenticated
        navigate("/");
        return;
      }
      
      // If we have a token but no user data yet, wait a bit more
      if (token && !user) {
        return; // User data is still loading
      }
      
      // If we have both token and user data, check if user is owner
      if (token && user && !isOwner) {
        navigate("/");
        return;
      }
    }, 500); // Small delay to allow state to settle

    return () => clearTimeout(checkAuth);
  }, [isOwner, token, user, navigate]);

  return (
    <div className='flex flex-col'>
       <NavbarOwner/>
       <div className='flex'>
        <Sidebar/>
        <Outlet/>
       </div>
    </div>
  )
}

export default Layout
