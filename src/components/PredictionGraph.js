"use client"

import { useEffect, useRef } from "react"
import Chart from "chart.js/auto"
import "../styles/PredictionGraph.css"

const PredictionGraph = ({ data }) => {
  const chartRef = useRef(null)
  const chartInstance = useRef(null)

  useEffect(() => {
    if (!data || !data.length) return

    // Destroy previous chart if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy()
    }

    const ctx = chartRef.current.getContext("2d")

    // Sample data structure
    const labels = data.map((item) => item.date || "Prediction")
    const values = data.map((item) => item.value)

    // Create new chart
    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Product Demand Prediction",
            data: values,
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 2,
            tension: 0.4,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: "Product Demand Forecast",
            font: {
              size: 18,
            },
          },
          legend: {
            position: "top",
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: "Demand",
            },
          },
          x: {
            title: {
              display: true,
              text: "Time Period",
            },
          },
        },
      },
    })

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [data])

  return (
    <div className="prediction-graph">
      <canvas ref={chartRef}></canvas>
    </div>
  )
}

export default PredictionGraph

