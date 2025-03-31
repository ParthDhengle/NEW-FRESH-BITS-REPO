"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import "./ShopkeeperLanding.css"

function ShopkeeperLanding() {
  const [shopkeeperInfo, setShopkeeperInfo] = useState({
    name: "Jane Smith",
    shop_name: "Tech Gadgets Store",
    location: "Downtown",
    domain: "Electronics",
    stats: {
      totalProducts: 450,
      topSellingProduct: "Wireless Earbuds",
      avgAccuracy: 89.7,
      lastPrediction: "2023-06-10",
    },
    recentPredictions: [
      { id: 1, product: "Smartphone X", demand: 120, date: "2023-06-10" },
      { id: 2, product: "Wireless Earbuds", demand: 200, date: "2023-06-10" },
      { id: 3, product: "Smart Watch", demand: 85, date: "2023-06-10" },
    ],
  })

  // In a real app, you would fetch shopkeeper info from the backend
  useEffect(() => {
    // Simulating API call
    const fetchShopkeeperInfo = async () => {
      try {
        // const response = await fetch(`http://localhost:8000/shopkeeper/${localStorage.getItem('shopkeeperId')}`);
        // const data = await response.json();
        // setShopkeeperInfo(data);

        // Using mock data for now
        console.log("Shopkeeper dashboard loaded with mock data")
      } catch (error) {
        console.error("Error fetching shopkeeper info:", error)
      }
    }

    fetchShopkeeperInfo()
  }, [])

  return (
    <div className="shopkeeper-landing">
      <div className="shopkeeper-header">
        <div className="shopkeeper-welcome">
          <h1>Welcome, {shopkeeperInfo.name}</h1>
          <p>
            {shopkeeperInfo.shop_name} • {shopkeeperInfo.location}
          </p>
        </div>
        <Link to="/inventory" className="btn btn-primary">
          <i className="fas fa-chart-line"></i> Predict Inventory
        </Link>
      </div>

      <div className="dashboard-grid">
        <div className="stats-card">
          <div className="stats-header">
            <h3>Shop Overview</h3>
            <div className="stats-icon">
              <i className="fas fa-store"></i>
            </div>
          </div>
          <div className="stats-body">
            <div className="stat-item">
              <div className="stat-value">{shopkeeperInfo.stats.totalProducts}</div>
              <div className="stat-label">Total Products</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">{shopkeeperInfo.stats.topSellingProduct}</div>
              <div className="stat-label">Top Selling</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">{shopkeeperInfo.stats.avgAccuracy}%</div>
              <div className="stat-label">Prediction Accuracy</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">{shopkeeperInfo.stats.lastPrediction}</div>
              <div className="stat-label">Last Prediction</div>
            </div>
          </div>
        </div>

        <div className="predictions-card">
          <div className="predictions-header">
            <h3>Recent Predictions</h3>
            <Link to="/inventory" className="view-all">
              View All
            </Link>
          </div>
          <div className="predictions-list">
            {shopkeeperInfo.recentPredictions.map((prediction) => (
              <div className="prediction-item" key={prediction.id}>
                <div className="prediction-info">
                  <h4>{prediction.product}</h4>
                  <p>Predicted on {prediction.date}</p>
                </div>
                <div className="prediction-demand">
                  <span className="demand-value">{prediction.demand}</span>
                  <span className="demand-label">units</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="quick-actions-card">
          <h3>Quick Actions</h3>
          <div className="actions-grid">
            <Link to="/inventory" className="action-item">
              <div className="action-icon">
                <i className="fas fa-chart-line"></i>
              </div>
              <span>Predict Demand</span>
            </Link>
            <Link to="/workflow" className="action-item">
              <div className="action-icon">
                <i className="fas fa-project-diagram"></i>
              </div>
              <span>View Workflow</span>
            </Link>
            <button className="action-item">
              <div className="action-icon">
                <i className="fas fa-file-csv"></i>
              </div>
              <span>Upload Data</span>
            </button>
            <button className="action-item">
              <div className="action-icon">
                <i className="fas fa-cog"></i>
              </div>
              <span>Settings</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShopkeeperLanding

