"use client"

import { useState, useEffect, useContext } from "react"
import { Link, useLocation } from "react-router-dom"
import { ThemeContext } from "./ThemeProvider"
import "./Navbar.css"
import { Sun, Moon, Menu, X } from "lucide-react"

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userType, setUserType] = useState("")
  const location = useLocation()
  const { theme, toggleTheme } = useContext(ThemeContext)

  useEffect(() => {
    // Check if user is logged in based on localStorage
    const dealerId = localStorage.getItem("dealerId")
    const shopkeeperId = localStorage.getItem("shopkeeperId")

    if (dealerId) {
      setIsLoggedIn(true)
      setUserType("dealer")
    } else if (shopkeeperId) {
      setIsLoggedIn(true)
      setUserType("shopkeeper")
    } else {
      setIsLoggedIn(false)
      setUserType("")
    }
  }, [location])

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const handleLogout = () => {
    localStorage.removeItem("dealerId")
    localStorage.removeItem("shopkeeperId")
    setIsLoggedIn(false)
    setUserType("")
    window.location.href = "/"
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <i className="fas fa-link"></i> SupplyConnect
        </Link>

        <div className="menu-icon" onClick={toggleMenu}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </div>

        <ul className={isOpen ? "nav-menu active" : "nav-menu"}>
          <li className="nav-item">
            <Link to="/" className="nav-links" onClick={() => setIsOpen(false)}>
              Home
            </Link>
          </li>

          {isLoggedIn && userType === "dealer" ? (
            <>
              <li className="nav-item">
                <Link to="/dealer_landing" className="nav-links" onClick={() => setIsOpen(false)}>
                  Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/dealer_connections" className="nav-links" onClick={() => setIsOpen(false)}>
                  Connections
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/inventory" className="nav-links" onClick={() => setIsOpen(false)}>
                  Inventory
                </Link>
              </li>
            </>
          ) : isLoggedIn && userType === "shopkeeper" ? (
            <>
              <li className="nav-item">
                <Link to="/shopkeeper_landing" className="nav-links" onClick={() => setIsOpen(false)}>
                  Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/shopkeeper_find_dealers" className="nav-links" onClick={() => setIsOpen(false)}>
                  Find Dealers
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/shopkeeper_products" className="nav-links" onClick={() => setIsOpen(false)}>
                  Products
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/shopkeeper_dashboard" className="nav-links" onClick={() => setIsOpen(false)}>
                  Sales
                </Link>
              </li>
            </>
          ) : (
            <li className="nav-item">
              <Link to="/workflow" className="nav-links" onClick={() => setIsOpen(false)}>
                How It Works
              </Link>
            </li>
          )}

          {isLoggedIn ? (
            <li className="nav-item">
              <button className="nav-links logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </li>
          ) : (
            <>
              <li className="nav-item dropdown">
                <span className="nav-links dropdown-toggle">
                  Login <i className="fas fa-chevron-down"></i>
                </span>
                <div className="dropdown-menu">
                  <Link to="/dealer_login" className="dropdown-item" onClick={() => setIsOpen(false)}>
                    Dealer Login
                  </Link>
                  <Link to="/shopkeeper_login" className="dropdown-item" onClick={() => setIsOpen(false)}>
                    Shopkeeper Login
                  </Link>
                </div>
              </li>
              <li className="nav-item dropdown">
                <span className="nav-links dropdown-toggle">
                  Sign Up <i className="fas fa-chevron-down"></i>
                </span>
                <div className="dropdown-menu">
                  <Link to="/dealer_signup" className="dropdown-item" onClick={() => setIsOpen(false)}>
                    Dealer Sign Up
                  </Link>
                  <Link to="/shopkeeper_signup" className="dropdown-item" onClick={() => setIsOpen(false)}>
                    Shopkeeper Sign Up
                  </Link>
                </div>
              </li>
            </>
          )}

          <li className="nav-item theme-toggle">
            <button className="theme-toggle-btn" onClick={toggleTheme}>
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar

