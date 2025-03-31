"use client"

import { useState } from "react"
import axios from "axios"
import "../styles/FileUpload.css"

const FileUpload = ({ onPredictionComplete }) => {
  const [file, setFile] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile && selectedFile.type === "text/csv") {
      setFile(selectedFile)
      setError("")
    } else {
      setFile(null)
      setError("Please select a valid CSV file")
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!file) {
      setError("Please select a CSV file")
      return
    }

    setIsLoading(true)
    setError("")

    const formData = new FormData()
    formData.append("file", file)

    try {
      const response = await axios.post("http://localhost:8000/inventory/predict", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      // Transform the prediction data for the graph
      const predictionData = response.data.predictions.map((value, index) => ({
        date: `Prediction ${index + 1}`,
        value,
      }))

      onPredictionComplete(predictionData)
    } catch (err) {
      console.error("Error uploading file:", err)
      setError(err.response?.data?.detail || "Error processing file. Please check the format.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="file-upload">
      <h3>Upload Inventory Data</h3>
      <form onSubmit={handleSubmit}>
        <div className="file-input-container">
          <input type="file" onChange={handleFileChange} accept=".csv" id="csv-file" className="file-input" />
          <label htmlFor="csv-file" className="file-label">
            {file ? file.name : "Choose CSV File"}
          </label>
        </div>

        {error && <p className="error-message">{error}</p>}

        <button type="submit" className="upload-button" disabled={!file || isLoading}>
          {isLoading ? "Processing..." : "Predict Demand"}
        </button>
      </form>
    </div>
  )
}

export default FileUpload

