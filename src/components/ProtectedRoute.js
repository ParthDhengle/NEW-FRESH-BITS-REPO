"use client"

import { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"

const ProtectedRoute = ({ children, userType }) => {
  const [isAuthorized, setIsAuthorized] = useState(null)

  useEffect(() => {
    // Check if user is logged in and has the correct type
    const dealerId = localStorage.getItem("dealerId")
    const shopkeeperId = localStorage.getItem("shopkeeperId")

    if (userType === "dealer" && dealerId) {
      setIsAuthorized(true)
    } else if (userType === "shopkeeper" && shopkeeperId) {
      setIsAuthorized(true)
    } else {
      setIsAuthorized(false)
    }
  }, [userType])

  if (isAuthorized === null) {
    // Still checking authorization
    return <div className="loading">Loading...</div>
  }

  return isAuthorized ? children : <Navigate to={`/${userType}/login`} />
}

export default ProtectedRoute

