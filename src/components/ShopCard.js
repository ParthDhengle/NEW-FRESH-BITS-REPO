import { Link } from "react-router-dom"
import "../styles/ShopCard.css"

const ShopCard = ({ shop }) => {
  return (
    <div className="shop-card">
      <div className="shop-card-content">
        <h3>{shop.shop_name}</h3>
        <p>
          <strong>Owner:</strong> {shop.name}
        </p>
        <p>
          <strong>Location:</strong> {shop.location_name}
        </p>
        <p>
          <strong>Domain:</strong> {shop.domain}
        </p>
      </div>
      <Link to={`/shop/inventory/${shop.shopkeeper_id}`} className="shop-card-button">
        View Inventory
      </Link>
    </div>
  )
}

export default ShopCard

