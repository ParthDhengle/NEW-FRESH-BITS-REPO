"use client"

import { useState, useEffect } from "react"
import ShopCard from "../components/ShopCard"
import "../styles/DealerInventory.css"

const DealerInventory = () => {
  const [shops, setShops] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const dealerId = localStorage.getItem("dealerId")

  useEffect(() => {
    const fetchShops = async () => {
      try {
        // This is a mock API call - in a real app, you would have an endpoint to fetch shops by dealer ID
        // const response = await axios.get(`http://localhost:8000/dealer/${dealerId}/shops`);

        // For demo purposes, we'll use mock data
        const mockShops = [
          {
            shopkeeper_id: 1,
            name: "John Doe",
            shop_name: "JD Electronics",
            location_name: "Downtown",
            domain: "Electronics",
          },
          {
            shopkeeper_id: 2,
            name: "Jane Smith",
            shop_name: "Smith Groceries",
            location_name: "Uptown",
            domain: "Grocery",
          },
          {
            shopkeeper_id: 3,
            name: "Bob Johnson",
            shop_name: "Fashion Hub",
            location_name: "Midtown",
            domain: "Fashion",
          },
          {
            shopkeeper_id: 4,
            name: "Alice Brown",
            shop_name: "Tech World",
            location_name: "West End",
            domain: "Electronics",
          },
        ]

        setShops(mockShops)
      } catch (err) {
        console.error("Error fetching shops:", err)
        setError("Failed to load shops. Please try again later.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchShops()
  }, [dealerId])

  if (isLoading) {
    return <div className="loading-container">Loading shops...</div>
  }

  return (
    <div className="dealer-inventory">
      <div className="dealer-inventory-header">
        <h1>Manage Your Shops</h1>
        <p>View and manage inventory predictions for all your connected shops</p>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="shops-grid">
        {shops.length > 0 ? (
          shops.map((shop) => <ShopCard key={shop.shopkeeper_id} shop={shop} />)
        ) : (
          <div className="no-shops">
            <p>You don't have any connected shops yet.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default DealerInventory

