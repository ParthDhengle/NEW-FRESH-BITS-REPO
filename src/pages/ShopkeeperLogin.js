"use client"

import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import axios from "axios"
import "../styles/Auth.css"

const ShopkeeperLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const response = await axios.post("http://localhost:8000/shopkeeper/login", formData)

      // Store shopkeeper ID in localStorage
      localStorage.setItem("shopkeeperId", response.data.shopkeeper_id)
      localStorage.setItem("shopkeeperName", response.data.name)

      // Redirect to home page (shopkeepers don't have direct inventory access)
      navigate("/")
    } catch (err) {
      console.error("Login error:", err)
      setError(err.response?.data?.detail || "Login failed. Please check your credentials.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-form-container">
        <h2>Shopkeeper Login</h2>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="auth-button" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="auth-redirect">
          Don't have an account? <Link to="/shopkeeper/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  )
}

export default ShopkeeperLogin

