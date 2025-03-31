import { Link } from "react-router-dom"
import "./Landing.css"

function Landing() {
  return (
    <div className="landing-page">
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="fade-in">SupplyConnect</h1>
          <h2 className="slide-up">Intelligent Inventory Management</h2>
          <p className="slide-up delay-1">Predict product demand with machine learning to optimize your supply chain</p>
          <div className="hero-buttons slide-up delay-2">
            <Link to="/inventory" className="btn btn-primary">
              Explore Inventory
            </Link>
            <Link to="/workflow" className="btn btn-secondary">
              View Workflow
            </Link>
          </div>
        </div>
      </section>

      <section className="features-section">
        <div className="container">
          <h2 className="section-title">Our Features</h2>
          <div className="features-grid">
            <div className="feature-card fade-in">
              <div className="feature-icon">
                <i className="fas fa-chart-line"></i>
              </div>
              <h3>Demand Prediction</h3>
              <p>Use machine learning to accurately predict product demand for your inventory</p>
            </div>

            <div className="feature-card fade-in delay-1">
              <div className="feature-icon">
                <i className="fas fa-store"></i>
              </div>
              <h3>Multi-Shop Management</h3>
              <p>Dealers can manage multiple shops from a single dashboard</p>
            </div>

            <div className="feature-card fade-in delay-2">
              <div className="feature-icon">
                <i className="fas fa-file-csv"></i>
              </div>
              <h3>CSV Import</h3>
              <p>Easily import your inventory data using CSV files</p>
            </div>

            <div className="feature-card fade-in delay-3">
              <div className="feature-icon">
                <i className="fas fa-chart-bar"></i>
              </div>
              <h3>Visual Analytics</h3>
              <p>View demand forecasts with interactive graphs and visualizations</p>
            </div>
          </div>
        </div>
      </section>

      <section className="user-section">
        <div className="container">
          <h2 className="section-title">Who Can Benefit</h2>
          <div className="user-grid">
            <div className="user-card">
              <div className="user-icon">
                <i className="fas fa-user-tie"></i>
              </div>
              <h3>Dealers</h3>
              <ul>
                <li>Manage multiple shops</li>
                <li>Analyze demand across locations</li>
                <li>Optimize distribution networks</li>
                <li>Improve supply chain efficiency</li>
              </ul>
              <Link to="/dealer_signup" className="btn btn-outline">
                Join as Dealer
              </Link>
            </div>

            <div className="user-card">
              <div className="user-icon">
                <i className="fas fa-store-alt"></i>
              </div>
              <h3>Shopkeepers</h3>
              <ul>
                <li>Predict product demand</li>
                <li>Reduce stockouts and overstock</li>
                <li>Improve inventory turnover</li>
                <li>Increase customer satisfaction</li>
              </ul>
              <Link to="/shopkeeper_signup" className="btn btn-outline">
                Join as Shopkeeper
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <h2>Ready to optimize your inventory?</h2>
          <p>
            Get started with SupplyConnect today and transform your supply chain with intelligent demand prediction.
          </p>
          <div className="cta-buttons">
            <Link to="/inventory" className="btn btn-primary">
              Try Inventory Prediction
            </Link>
            <Link to="/dealer_signup" className="btn btn-secondary">
              Create Account
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Landing

