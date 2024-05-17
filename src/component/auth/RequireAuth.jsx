import React from 'react'
import { useSelector} from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

export default function RequireAuth({allowedRoles}) {

  const {role,isLoggedIn} = useSelector(state => state.auth)

  return isLoggedIn && allowedRoles.find((myRole)=> myRole == role)? (
  <Outlet/> // execute child the router
  ): isLoggedIn ? (<Navigate to= "/denied"/>): (<Navigate to="Login"/>)
}
