"use client"

import { useState, useEffect } from "react"
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import "../styles/ShopkeeperFindDealers.css"
import { Building, User, MapPin, Phone, Mail, Check } from "lucide-react"

// Fix Leaflet icon issue
delete L.Icon.Default.prototype._getIconUrl

// Custom icons for shopkeeper and dealers
const shopkeeperIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

const dealerIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

const ShopkeeperFindDealers = () => {
  const [shopkeeperInfo, setShopkeeperInfo] = useState(null)
  const [nearbyDealers, setNearbyDealers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedDealer, setSelectedDealer] = useState(null)
  const [error, setError] = useState("")
  const [searchRadius, setSearchRadius] = useState(10) // in kilometers

  useEffect(() => {
    // In a real app, fetch shopkeeper info and nearby dealers from API
    // For demo purposes, we'll use mock data
    const fetchData = async () => {
      try {
        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Mock shopkeeper data
        const mockShopkeeper = {
          shopkeeper_id: 1,
          name: "Alice Smith",
          shop_name: "Tech Haven",
          location_name: "456 Main St, Brooklyn, NY",
          latitude: 40.6782,
          longitude: -73.9442,
          domain: "Electronics",
          dealer_id: null, // No connected dealer yet
        }

        // Mock nearby dealers
        const mockDealers = [
          {
            dealer_id: 1,
            name: "John Doe",
            company_name: "Global Distribution Inc.",
            location_name: "123 Business Park, New York, NY",
            latitude: 40.7128,
            longitude: -74.006,
            email: "john.doe@example.com",
            phone: "+1 (555) 123-4567",
            distance: 5.2, // in kilometers
          },
          {
            dealer_id: 2,
            name: "Jane Smith",
            company_name: "East Coast Suppliers",
            location_name: "789 Commerce St, Jersey City, NJ",
            latitude: 40.7282,
            longitude: -74.0776,
            email: "jane.smith@example.com",
            phone: "+1 (555) 987-6543",
            distance: 8.7,
          },
          {
            dealer_id: 3,
            name: "Robert Johnson",
            company_name: "Metro Distributors",
            location_name: "456 Industrial Ave, Queens, NY",
            latitude: 40.7282,
            longitude: -73.7949,
            email: "robert.johnson@example.com",
            phone: "+1 (555) 456-7890",
            distance: 12.3,
          },
        ]

        setShopkeeperInfo(mockShopkeeper)
        setNearbyDealers(mockDealers)
      } catch (err) {
        console.error("Error fetching data:", err)
        setError("Failed to load nearby dealers. Please try again later.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleDealerSelect = (dealer) => {
    setSelectedDealer(dealer)
  }

  const connectWithDealer = async (dealerId) => {
    try {
      setIsLoading(true)

      // In a real app, make API call to connect with dealer
      // For demo, we'll simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Update shopkeeper info with connected dealer
      setShopkeeperInfo({
        ...shopkeeperInfo,
        dealer_id: dealerId,
      })

      // Show success message
      alert(`Successfully connected with ${selectedDealer.company_name}!`)

      // Close dealer profile
      setSelectedDealer(null)
    } catch (err) {
      console.error("Error connecting with dealer:", err)
      setError("Failed to connect with dealer. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleRadiusChange = (e) => {
    setSearchRadius(Number(e.target.value))
  }

  // Filter dealers based on search radius
  const filteredDealers = nearbyDealers.filter((dealer) => dealer.distance <= searchRadius)

  if (isLoading && !shopkeeperInfo) {
    return (
      <div className="find-dealers-loading">
        <div className="spinner"></div>
        <p>Loading nearby dealers...</p>
      </div>
    )
  }

  if (error && !shopkeeperInfo) {
    return <div className="find-dealers-error">{error}</div>
  }

  return (
    <div className="shopkeeper-find-dealers">
      <div className="find-dealers-header">
        <h1>Find Dealers Near You</h1>
        <p>Connect with dealers in your area to optimize your supply chain</p>
      </div>

      <div className="find-dealers-content">
        <div className="find-dealers-map-container">
          {shopkeeperInfo && (
            <>
              <div className="map-controls">
                <div className="radius-control">
                  <label htmlFor="radius">Search Radius: {searchRadius} km</label>
                  <input type="range" id="radius" min="1" max="50" value={searchRadius} onChange={handleRadiusChange} />
                </div>
              </div>

              <MapContainer
                center={[shopkeeperInfo.latitude, shopkeeperInfo.longitude]}
                zoom={11}
                style={{ height: "500px", width: "100%" }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {/* Shopkeeper marker */}
                <Marker position={[shopkeeperInfo.latitude, shopkeeperInfo.longitude]} icon={shopkeeperIcon}>
                  <Popup>
                    <div className="map-popup">
                      <h3>{shopkeeperInfo.shop_name}</h3>
                      <p>
                        <strong>Your Location</strong>
                      </p>
                    </div>
                  </Popup>
                </Marker>

                {/* Search radius circle */}
                <Circle
                  center={[shopkeeperInfo.latitude, shopkeeperInfo.longitude]}
                  radius={searchRadius * 1000} // Convert km to meters
                  pathOptions={{ color: "blue", fillColor: "blue", fillOpacity: 0.1 }}
                />

                {/* Dealer markers */}
                {filteredDealers.map((dealer) => (
                  <Marker key={dealer.dealer_id} position={[dealer.latitude, dealer.longitude]} icon={dealerIcon}>
                    <Popup>
                      <div className="map-popup">
                        <h3>{dealer.company_name}</h3>
                        <p>
                          <strong>Owner:</strong> {dealer.name}
                        </p>
                        <p>
                          <strong>Distance:</strong> {dealer.distance.toFixed(1)} km
                        </p>
                        <button className="view-dealer-btn" onClick={() => handleDealerSelect(dealer)}>
                          View Details
                        </button>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>

              <div className="map-legend">
                <div className="legend-item">
                  <div className="legend-marker shopkeeper-marker"></div>
                  <span>Your Location</span>
                </div>
                <div className="legend-item">
                  <div className="legend-marker dealer-marker"></div>
                  <span>Nearby Dealers</span>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="nearby-dealers">
          <h2>Nearby Dealers</h2>

          {filteredDealers.length === 0 ? (
            <div className="no-dealers">
              <p>No dealers found within {searchRadius} km. Try increasing your search radius.</p>
            </div>
          ) : (
            <div className="dealers-list">
              {filteredDealers.map((dealer) => (
                <div
                  className={`dealer-card ${selectedDealer?.dealer_id === dealer.dealer_id ? "selected" : ""}`}
                  key={dealer.dealer_id}
                  onClick={() => handleDealerSelect(dealer)}
                >
                  <div className="dealer-card-header">
                    <div className="dealer-icon">
                      <Building />
                    </div>
                    <div>
                      <h3>{dealer.company_name}</h3>
                      <p className="dealer-distance">{dealer.distance.toFixed(1)} km away</p>
                    </div>
                  </div>
                  <div className="dealer-card-content">
                    <p>
                      <User size={16} />
                      <span>{dealer.name}</span>
                    </p>
                    <p>
                      <MapPin size={16} />
                      <span>{dealer.location_name}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Dealer Profile Modal */}
      {selectedDealer && (
        <div className="dealer-profile-modal">
          <div className="profile-content">
            <button className="close-profile" onClick={() => setSelectedDealer(null)}>
              &times;
            </button>

            <div className="profile-header">
              <div className="profile-icon">
                <Building size={32} />
              </div>
              <div>
                <h2>{selectedDealer.company_name}</h2>
                <p className="profile-distance">{selectedDealer.distance.toFixed(1)} km from your location</p>
              </div>
            </div>

            <div className="profile-details">
              <div className="profile-section">
                <h3>Contact Information</h3>
                <p>
                  <User size={16} />
                  <span>
                    <strong>Owner:</strong> {selectedDealer.name}
                  </span>
                </p>
                <p>
                  <Mail size={16} />
                  <span>
                    <strong>Email:</strong> {selectedDealer.email}
                  </span>
                </p>
                <p>
                  <Phone size={16} />
                  <span>
                    <strong>Phone:</strong> {selectedDealer.phone}
                  </span>
                </p>
              </div>

              <div className="profile-section">
                <h3>Location</h3>
                <p>
                  <MapPin size={16} />
                  <span>{selectedDealer.location_name}</span>
                </p>

                <div className="profile-map">
                  <MapContainer
                    center={[
                      (shopkeeperInfo.latitude + selectedDealer.latitude) / 2,
                      (shopkeeperInfo.longitude + selectedDealer.longitude) / 2,
                    ]}
                    zoom={11}
                    style={{ height: "300px", width: "100%" }}
                  >
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    {/* Shopkeeper marker */}
                    <Marker position={[shopkeeperInfo.latitude, shopkeeperInfo.longitude]} icon={shopkeeperIcon}>
                      <Popup>
                        <div className="map-popup">
                          <h3>{shopkeeperInfo.shop_name}</h3>
                          <p>
                            <strong>Your Location</strong>
                          </p>
                        </div>
                      </Popup>
                    </Marker>

                    {/* Dealer marker */}
                    <Marker position={[selectedDealer.latitude, selectedDealer.longitude]} icon={dealerIcon}>
                      <Popup>
                        <div className="map-popup">
                          <h3>{selectedDealer.company_name}</h3>
                          <p>
                            <strong>Dealer Location</strong>
                          </p>
                        </div>
                      </Popup>
                    </Marker>
                  </MapContainer>
                </div>
              </div>
            </div>

            <div className="profile-actions">
              <button
                className="connect-btn"
                onClick={() => connectWithDealer(selectedDealer.dealer_id)}
                disabled={isLoading || shopkeeperInfo.dealer_id === selectedDealer.dealer_id}
              >
                {isLoading ? (
                  "Processing..."
                ) : shopkeeperInfo.dealer_id === selectedDealer.dealer_id ? (
                  <>
                    <Check size={16} /> Already Connected
                  </>
                ) : (
                  "Connect with Dealer"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ShopkeeperFindDealers

