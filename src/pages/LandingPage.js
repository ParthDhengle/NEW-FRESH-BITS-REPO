import { Link } from "react-router-dom"
import "../styles/LandingPage.css"

const LandingPage = () => {
  return (
    <div className="landing-page">
      <section className="hero-section">
        <div className="hero-content">
          <h1>SupplyConnect</h1>
          <h2>Intelligent Inventory Management</h2>
          <p>Predict product demand with machine learning to optimize your supply chain</p>
          <div className="hero-buttons">
            <Link to="/dealer/signup" className="btn btn-primary">
              Join as Dealer
            </Link>
            <Link to="/shopkeeper/signup" className="btn btn-secondary">
              Join as Shopkeeper
            </Link>
          </div>
        </div>
      </section>

      <section className="features-section">
        <h2>Our Features</h2>
        <div className="features-container">
          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-chart-line"></i>
            </div>
            <h3>Demand Prediction</h3>
            <p>Use machine learning to accurately predict product demand for your inventory</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-store"></i>
            </div>
            <h3>Multi-Shop Management</h3>
            <p>Dealers can manage multiple shops from a single dashboard</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-file-csv"></i>
            </div>
            <h3>CSV Import</h3>
            <p>Easily import your inventory data using CSV files</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-chart-bar"></i>
            </div>
            <h3>Visual Analytics</h3>
            <p>View demand forecasts with interactive graphs and visualizations</p>
          </div>
        </div>
      </section>

      <section className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps-container">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Upload Data</h3>
            <p>Import your historical inventory data using CSV files</p>
          </div>

          <div className="step">
            <div className="step-number">2</div>
            <h3>AI Analysis</h3>
            <p>Our machine learning model analyzes patterns in your data</p>
          </div>

          <div className="step">
            <div className="step-number">3</div>
            <h3>Get Predictions</h3>
            <p>Receive accurate demand forecasts for your products</p>
          </div>

          <div className="step">
            <div className="step-number">4</div>
            <h3>Optimize Inventory</h3>
            <p>Make data-driven decisions to optimize your supply chain</p>
          </div>
        </div>
      </section>

      <section className="user-types">
        <h2>Who Can Benefit</h2>
        <div className="user-types-container">
          <div className="user-type">
            <h3>Dealers</h3>
            <ul>
              <li>Manage multiple shops</li>
              <li>Analyze demand across different locations</li>
              <li>Optimize distribution networks</li>
              <li>Improve supply chain efficiency</li>
            </ul>
            <Link to="/dealer/signup" className="btn btn-outline">
              Sign Up as Dealer
            </Link>
          </div>

          <div className="user-type">
            <h3>Shopkeepers</h3>
            <ul>
              <li>Predict product demand</li>
              <li>Reduce stockouts and overstock</li>
              <li>Improve inventory turnover</li>
              <li>Increase customer satisfaction</li>
            </ul>
            <Link to="/shopkeeper/signup" className="btn btn-outline">
              Sign Up as Shopkeeper
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default LandingPage

