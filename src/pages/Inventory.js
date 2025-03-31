"use client"

import { useState } from "react"
import { Bar } from "react-chartjs-2"
import axios from "axios"
import "./Inventory.css"

import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from "chart.js"

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend)

function Inventory() {
  const [fileData, setFileData] = useState({})
  const [predictionData, setPredictionData] = useState({})
  const [isLoading, setIsLoading] = useState({})
  const [chartData, setChartData] = useState({
    labels: ["Shop 1", "Shop 2", "Shop 3", "Shop 4", "Shop 5", "Shop 6"],
    datasets: [
      {
        label: "Average Predicted Demand",
        data: [0, 0, 0, 0, 0, 0],
        backgroundColor: [
          "rgba(106, 17, 203, 0.7)",
          "rgba(37, 117, 252, 0.7)",
          "rgba(142, 45, 226, 0.7)",
          "rgba(74, 0, 224, 0.7)",
          "rgba(116, 55, 245, 0.7)",
          "rgba(89, 0, 255, 0.7)",
        ],
        borderColor: "rgba(255, 255, 255, 0.3)",
        borderWidth: 2,
      },
    ],
  })

  const handleFileChange = (event, shopIndex) => {
    const file = event.target.files[0]
    if (!file) {
        alert("No file selected")
        return
    }
    if (!file.name.endsWith(".csv")) {
        alert("Please upload a CSV file")
        return
    }
    if (file.size === 0) {
        alert("Uploaded file is empty")
        return
    }
    alert("Ensure your CSV includes: Historical_Sales, Promotion, Day_of_Week, Month, Product_ID, Demand (null for future periods)")
    setFileData((prev) => ({ ...prev, [shopIndex]: file }))
    setPredictionData((prev) => ({ ...prev, [shopIndex]: [] }))
}

  const handlePredict = async (shopIndex) => {
    const file = fileData[shopIndex]
    if (!file) {
      alert(`No file uploaded for Shop ${shopIndex + 1}`)
      return
    }

    setIsLoading((prev) => ({ ...prev, [shopIndex]: true }))
    const formData = new FormData()
    formData.append("file", file)

    try {
      const response = await axios.post("http://localhost:8000/inventory/predict", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      console.log("Response for Shop", shopIndex + 1, ":", response.data)

      if (response.data.success && response.data.predictions.length > 0) {
        const predictions = response.data.predictions
        setPredictionData((prev) => ({ ...prev, [shopIndex]: predictions }))

        // Update chart with average prediction for the shop
        const avgPrediction = predictions.reduce((sum, p) => sum + p.predicted_demand, 0) / predictions.length
        updateChart(shopIndex, avgPrediction)
      } else {
        alert(`No valid predictions returned for Shop ${shopIndex + 1}`)
      }
    } catch (error) {
      const errorMsg = error.response?.data?.detail || "Unknown error occurred"
      console.error("Prediction failed for Shop", shopIndex + 1, ":", errorMsg)
      alert(`Failed to predict sales for Shop ${shopIndex + 1}: ${errorMsg}`)
    } finally {
      setIsLoading((prev) => ({ ...prev, [shopIndex]: false }))
    }
  }

  const updateChart = (shopIndex, avgPrediction) => {
    const updatedData = [...chartData.datasets[0].data]
    updatedData[shopIndex] = avgPrediction
    setChartData((prev) => ({
      ...prev,
      datasets: [{ ...prev.datasets[0], data: updatedData }],
    }))
  }

  return (
    <div className="inventory-page">
      <div className="inventory-header">
        <h1>Inventory Prediction Dashboard</h1>
        <p>Upload CSV files for each shop to predict product demand using machine learning</p>
      </div>

      <div className="shops-grid">
        {Array.from({ length: 6 }).map((_, index) => (
          <div className="shop-card" key={index}>
            <div className="shop-card-header">
              <h3>Shop {index + 1}</h3>
              <div className="shop-icon">
                <i className="fas fa-store"></i>
              </div>
            </div>
            <div className="shop-card-body">
              <div className="file-upload-container">
                <label htmlFor={`file-input-${index}`} className="file-upload-label">
                  <i className="fas fa-file-csv"></i>
                  <span>{fileData[index] ? fileData[index].name : "Choose CSV File"}</span>
                </label>
                <input
                  type="file"
                  id={`file-input-${index}`}
                  className="file-upload-input"
                  accept=".csv"
                  onChange={(event) => handleFileChange(event, index)}
                />
              </div>
              <button
                className={`predict-button ${isLoading[index] ? "loading" : ""}`}
                onClick={() => handlePredict(index)}
                disabled={!fileData[index] || isLoading[index]}
              >
                {isLoading[index] ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i> Processing...
                  </>
                ) : (
                  <>
                    <i className="fas fa-chart-line"></i> Predict Demand
                  </>
                )}
              </button>

              {predictionData[index] && predictionData[index].length > 0 && (
                <div className="prediction-results">
                  <h4>Top Products by Demand</h4>
                  <div className="results-table-container">
                    <table className="results-table">
                      <thead>
                        <tr>
                          <th>Product</th>
                          <th>Predicted Demand</th>
                        </tr>
                      </thead>
                      <tbody>
                        {predictionData[index].map((pred, idx) => (
                          <tr key={idx}>
                            <td>{pred.product_name}</td>
                            <td>{pred.predicted_demand.toFixed(2)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="chart-container">
        <h2>Comparative Demand Analysis</h2>
        <div className="chart-wrapper">
          <Bar
            data={chartData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: "top",
                  labels: {
                    color: "white",
                  },
                },
                title: {
                  display: true,
                  text: "Average Predicted Demand by Shop",
                  color: "white",
                  font: {
                    size: 16,
                  },
                },
                tooltip: {
                  backgroundColor: "rgba(0, 0, 0, 0.8)",
                  titleColor: "white",
                  bodyColor: "white",
                  borderColor: "rgba(255, 255, 255, 0.1)",
                  borderWidth: 1,
                },
              },
              scales: {
                y: {
                  beginAtZero: true,
                  grid: {
                    color: "rgba(255, 255, 255, 0.1)",
                  },
                  ticks: {
                    color: "white",
                  },
                },
                x: {
                  grid: {
                    color: "rgba(255, 255, 255, 0.1)",
                  },
                  ticks: {
                    color: "white",
                  },
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default Inventory

