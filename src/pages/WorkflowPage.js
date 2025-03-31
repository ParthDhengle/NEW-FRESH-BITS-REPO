import { Link } from "react-router-dom"
import "./WorkflowPage.css"

function WorkflowPage() {
  return (
    <div className="workflow-page">
      <div className="workflow-header">
        <h1>SupplyConnect Workflow</h1>
        <p>Understanding the complete process of inventory prediction</p>
      </div>

      <div className="workflow-container">
        <div className="workflow-timeline">
          <div className="workflow-step">
            <div className="step-number">1</div>
            <div className="step-content">
              <h3>User Registration</h3>
              <div className="step-description">
                <p>Users register as either Dealers or Shopkeepers in the system.</p>
                <ul>
                  <li>
                    <strong>Dealers:</strong> Manage multiple shops and analyze demand across locations
                  </li>
                  <li>
                    <strong>Shopkeepers:</strong> Manage individual shops and predict product demand
                  </li>
                </ul>
                <div className="step-actions">
                  <Link to="/dealer_signup" className="btn btn-sm btn-outline">
                    Dealer Signup
                  </Link>
                  <Link to="/shopkeeper_signup" className="btn btn-sm btn-outline">
                    Shopkeeper Signup
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="workflow-step">
            <div className="step-number">2</div>
            <div className="step-content">
              <h3>Data Collection</h3>
              <div className="step-description">
                <p>Users prepare and upload CSV files containing historical sales data.</p>
                <div className="csv-format">
                  <h4>Required CSV Format:</h4>
                  <table className="format-table">
                    <thead>
                      <tr>
                        <th>Historical_Sales</th>
                        <th>Promotion</th>
                        <th>Day_of_Week</th>
                        <th>Month</th>
                        <th>Product_ID</th>
                        <th>Demand</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>150</td>
                        <td>1</td>
                        <td>3</td>
                        <td>6</td>
                        <td>101</td>
                        <td>165</td>
                      </tr>
                      <tr>
                        <td>200</td>
                        <td>0</td>
                        <td>4</td>
                        <td>6</td>
                        <td>102</td>
                        <td>180</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div className="workflow-step">
            <div className="step-number">3</div>
            <div className="step-content">
              <h3>Data Processing</h3>
              <div className="step-description">
                <p>The system processes the uploaded data through several steps:</p>
                <ol>
                  <li>Data validation and cleaning</li>
                  <li>Feature extraction and normalization</li>
                  <li>Preparation for machine learning model</li>
                </ol>
                <div className="code-snippet">
                  <pre>
                    <code>
                      {`# Data preprocessing
features = ['Historical_Sales', 'Promotion', 'Day_of_Week', 'Month', 'Product_ID']
X = df[features]
y = df['Demand']
    
X = pd.get_dummies(X, columns=['Product_ID'], drop_first=True)
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)`}
                    </code>
                  </pre>
                </div>
              </div>
            </div>
          </div>

          <div className="workflow-step">
            <div className="step-number">4</div>
            <div className="step-content">
              <h3>Machine Learning Prediction</h3>
              <div className="step-description">
                <p>The system uses a Random Forest Regressor model to predict product demand.</p>
                <div className="model-details">
                  <h4>Model Details:</h4>
                  <ul>
                    <li>Algorithm: Random Forest Regressor</li>
                    <li>Estimators: 100</li>
                    <li>Features: Historical sales, promotions, seasonality, product information</li>
                    <li>Target: Product demand</li>
                  </ul>
                </div>
                <div className="code-snippet">
                  <pre>
                    <code>
                      {`# Model training and prediction
model = RandomForestRegressor(n_estimators=100, random_state=42)
model.fit(X, y)
predictions = model.predict(X)`}
                    </code>
                  </pre>
                </div>
              </div>
            </div>
          </div>

          <div className="workflow-step">
            <div className="step-number">5</div>
            <div className="step-content">
              <h3>Results Visualization</h3>
              <div className="step-description">
                <p>The system presents prediction results through interactive visualizations.</p>
                <ul>
                  <li>Product-specific demand forecasts</li>
                  <li>Comparative analysis across shops</li>
                  <li>Trend identification and insights</li>
                </ul>
                <div className="step-actions">
                  <Link to="/inventory" className="btn btn-primary">
                    Try Inventory Prediction
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WorkflowPage

