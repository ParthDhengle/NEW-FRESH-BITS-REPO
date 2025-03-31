"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "../styles/DealerConnections.css";
import { Store, User, MapPin, X } from "lucide-react";

// Dynamically import react-leaflet components with SSR disabled
const MapContainer = dynamic(() => import("react-leaflet").then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then(mod => mod.Popup), { ssr: false });

// Fix Leaflet icon issue
delete L.Icon.Default.prototype._getIconUrl;

const dealerIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const shopkeeperIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const DealerConnections = () => {
  const [dealerInfo, setDealerInfo] = useState(null);
  const [connectedShopkeepers, setConnectedShopkeepers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedShopkeeper, setSelectedShopkeeper] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDealerData = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const mockDealer = {
          dealer_id: 1,
          name: "John Doe",
          company_name: "Global Distribution Inc.",
          location_name: "123 Business Park, New York, NY",
          latitude: 40.7128,
          longitude: -74.006,
          email: "john.doe@example.com",
          phone: "+1 (555) 123-4567",
        };
        const mockShopkeepers = [
          {
            shopkeeper_id: 1,
            name: "Alice Smith",
            shop_name: "Tech Haven",
            location_name: "456 Main St, Brooklyn, NY",
            latitude: 40.6782,
            longitude: -73.9442,
            domain: "Electronics",
            email: "alice@techhaven.com",
            phone: "+1 (555) 987-6543",
          },
          // ... other mock shopkeepers ...
        ];
        setDealerInfo(mockDealer);
        setConnectedShopkeepers(mockShopkeepers);
      } catch (err) {
        console.error("Error fetching dealer data:", err);
        setError("Failed to load dealer connections. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchDealerData();
  }, []);

  const openShopkeeperProfile = (shopkeeper) => setSelectedShopkeeper(shopkeeper);
  const closeShopkeeperProfile = () => setSelectedShopkeeper(null);

  if (isLoading) {
    return (
      <div className="connections-loading">
        <div className="spinner"></div>
        <p>Loading connections...</p>
      </div>
    );
  }

  if (error) {
    return <div className="connections-error">{error}</div>;
  }

  return (
    <div className="dealer-connections">
      <div className="connections-header">
        <h1>Your Connections</h1>
        <p>View and manage your connected shopkeepers</p>
      </div>
      {/* ... rest of your JSX remains unchanged ... */}
    </div>
  );
};

export default DealerConnections;