import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { createClient } from "@supabase/supabase-js"
import Navbar from "./components/Navbar"
import DealerLogin from "./pages/DealerLogin"
import DealerLanding from "./pages/DealerLanding"
import DealerConnections from "./pages/DealerConnections"
import Inventory from "./pages/Inventory"
import Landing from "./pages/Landing"
import DealerSignup from "./pages/DealerSignup"
import ShopkeeperLogin from "./pages/ShopkeeperLogin"
import ShopkeeperLanding from "./pages/ShopkeeperLanding"
import ShopkeeperSignup from "./pages/ShopkeeperSignup"
import ShopkeeperFindDealers from "./pages/ShopkeeperFindDealers"
import ShopkeeperProducts from "./pages/ShopkeeperProducts"
import ShopkeeperDashboard from "./pages/ShopkeeperDashboard"
import WorkflowPage from "./pages/WorkflowPage"
import "./App.css"
import ThemeProvider from "./components/ThemeProvider"

// Initialize Supabase client
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || "https://bjlluegxfelpqlmiuvko.supabase.co"
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJqbGx1ZWd4ZmVscHFsbWl1dmtvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI2MzkwNjIsImV4cCI6MjA1ODIxNTA2Mn0.2L5md3EKKg5lUe5uo1GPAWGXU5c5eJ9MAKplcOcdYmE"
const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Export Supabase client for use in other components
export { supabase }

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/dealer_login" element={<DealerLogin />} />
            <Route path="/dealer_landing" element={<DealerLanding />} />
            <Route path="/dealer_signup" element={<DealerSignup />} />
            <Route path="/dealer_connections" element={<DealerConnections />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/shopkeeper_login" element={<ShopkeeperLogin />} />
            <Route path="/shopkeeper_landing" element={<ShopkeeperLanding />} />
            <Route path="/shopkeeper_signup" element={<ShopkeeperSignup />} />
            <Route path="/shopkeeper_find_dealers" element={<ShopkeeperFindDealers />} />
            <Route path="/shopkeeper_products" element={<ShopkeeperProducts />} />
            <Route path="/shopkeeper_dashboard" element={<ShopkeeperDashboard />} />
            <Route path="/workflow" element={<WorkflowPage />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  )
}

export default App