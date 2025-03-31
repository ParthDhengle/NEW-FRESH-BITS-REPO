"use client"

import { useState, useRef } from "react"
import { useNavigate, Link } from "react-router-dom"
import { supabase } from "../App" // Import Supabase client from App.js
import "../styles/Auth.css"
import "../styles/MapSignup.css"
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import { MapPin, Navigation } from "lucide-react"

// Fix Leaflet icon issue
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
})

// Map click handler component
function LocationMarker({ setPosition, setLocationName }) {
  const map = useMapEvents({
    click: async (e) => {
      const { lat, lng } = e.latlng
      setPosition([lat, lng])

      // Reverse geocoding to get address
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`,
        )
        const data = await response.json()
        setLocationName(data.display_name)
      } catch (error) {
        console.error("Error fetching location name:", error)
      }
    },
  })

  return null
}

const DealerSignup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company_name: "",
    location_name: "",
    latitude: "",
    longitude: "",
    password: "",
    confirmPassword: "",
  })
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [position, setPosition] = useState([20.5937, 78.9629]) // Default center of India
  const [mapKey, setMapKey] = useState(Date.now()) // For map rerendering
  const navigate = useNavigate()
  const mapRef = useRef(null)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const setLocationName = (name) => {
    setFormData({
      ...formData,
      location_name: name,
      latitude: position[0].toString(),
      longitude: position[1].toString(),
    })
  }

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords
          setPosition([latitude, longitude])

          // Move map to current location
          if (mapRef.current) {
            mapRef.current.setView([latitude, longitude], 13)
          }

          // Reverse geocoding
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`,
            )
            const data = await response.json()
            setFormData({
              ...formData,
              location_name: data.display_name,
              latitude: latitude.toString(),
              longitude: longitude.toString(),
            })
          } catch (error) {
            console.error("Error fetching location name:", error)
          }

          // Force map to rerender with new position
          setMapKey(Date.now())
        },
        (error) => {
          console.error("Error getting location:", error)
          setError("Unable to get your current location. Please select manually on the map.")
        },
      )
    } else {
      setError("Geolocation is not supported by your browser. Please select location manually.")
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      return
    }

    // Validate location is selected
    if (!formData.latitude || !formData.longitude) {
      setError("Please select your location on the map")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      // Remove confirmPassword before sending to Supabase
      const { confirmPassword, ...apiData } = formData

      // Convert latitude and longitude to numbers
      apiData.latitude = Number.parseFloat(apiData.latitude)
      apiData.longitude = Number.parseFloat(apiData.longitude)

      // Insert data into Supabase dealers table
      const { data, error } = await supabase
        .from("dealers")
        .insert({
          name: apiData.name,
          email: apiData.email,
          company_name: apiData.company_name,
          location_name: apiData.location_name,
          latitude: apiData.latitude,
          longitude: apiData.longitude,
          password_hash: apiData.password, // Note: Hashing should ideally be done server-side
        })
        .select() // Return the inserted row

      if (error) throw error

      // Store dealer ID in localStorage
      localStorage.setItem("dealerId", data[0].dealer_id)

      // Redirect to dealer landing page
      navigate("/dealer_landing")
    } catch (err) {
      console.error("Signup error:", err)
      setError(err.message || "Signup failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-form-container map-signup">
        <h2>Dealer Signup</h2>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label htmlFor="company_name">Company Name</label>
            <input
              type="text"
              id="company_name"
              name="company_name"
              value={formData.company_name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="location_name">Location</label>
            <input
              type="text"
              id="location_name"
              name="location_name"
              value={formData.location_name}
              onChange={handleChange}
              placeholder="Select on map or use current location"
              readOnly
              required
            />
          </div>

          <div className="map-container">
            <div className="map-actions">
              <button type="button" className="location-btn" onClick={getCurrentLocation}>
                <Navigation size={16} /> Use Current Location
              </button>
            </div>
            <MapContainer
              center={position}
              zoom={5}
              style={{ height: "300px", width: "100%" }}
              key={mapKey}
              whenCreated={(map) => (mapRef.current = map)}
            >
              <TileLayer
                attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {position && <Marker position={position} />}
              <LocationMarker setPosition={setPosition} setLocationName={setLocationName} />
            </MapContainer>
            <p className="map-help">
              <MapPin size={16} /> Click on the map to select your location
            </p>
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

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="auth-button" disabled={isLoading}>
            {isLoading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        <p className="auth-redirect">
          Already have an account? <Link to="/dealer_login">Login</Link>
        </p>
      </div>
    </div>
  )
}

export default DealerSignup