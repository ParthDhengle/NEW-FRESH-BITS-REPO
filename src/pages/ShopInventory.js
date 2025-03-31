"use client"

import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import FileUpload from "../components/FileUpload"
import PredictionGraph from "../components/PredictionGraph"
import "../styles/ShopInventory.css"

const ShopInventory = () => {
  const { shopId } = useParams()
  const [shop, setShop] = useState(null)
  const [predictionData, setPredictionData] = useState(null)
  const [predictionComplete, setPredictionComplete] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // In a real app, fetch shop details from API
    // For demo, we'll use mock data
    const mockShop = {
      shopkeeper_id: Number.parseInt(shopId),
      name: "John Doe",
      shop_name: "JD Electronics",
      location_name: "Downtown",
      domain: "Electronics",
    }

    setShop(mockShop)
    setIsLoading(false)
  }, [shopId])

  const handlePredictionComplete = (data) => {
    setPredictionData(data)
    setPredictionComplete(true)
  }

  if (isLoading) {
    return <div className="loading-container">Loading shop details...</div>
  }

  return (
    <div className="shop-inventory">
      <div className="shop-inventory-header">
        <h1>{shop.shop_name}</h1>
        <p>
          <strong>Owner:</strong> {shop.name} |<strong> Location:</strong> {shop.location_name} |
          <strong> Domain:</strong> {shop.domain}
        </p>
      </div>

      <div className="inventory-content">
        <div className="upload-section">
          <FileUpload onPredictionComplete={handlePredictionComplete} />
        </div>

        {predictionComplete && (
          <div className="prediction-section">
            <div className="prediction-header">
              <h2>Prediction Results</h2>
              <div className="prediction-status">
                <span className="status-indicator"></span>
                Prediction Complete
              </div>
            </div>

            <div className="prediction-results">
              <PredictionGraph data={predictionData} />

              <div className="prediction-summary">
                <h3>Summary</h3>
                <p>
                  Based on the uploaded data, our machine learning model has predicted the following demand patterns:
                </p>
                <ul>
                  {predictionData &&
                    predictionData.map((item, index) => (
                      <li key={index}>
                        <strong>{item.date}:</strong> {item.value.toFixed(2)} units
                      </li>
                    ))}
                </ul>
                <p className="prediction-note">
                  Note: These predictions are based on historical data patterns. For more accurate results, ensure your
                  CSV contains complete and accurate data.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ShopInventory

