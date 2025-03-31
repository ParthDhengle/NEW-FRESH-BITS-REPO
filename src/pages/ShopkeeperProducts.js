"use client"

import { useState, useEffect } from "react"
import "../styles/ShopkeeperProducts.css"
import { Plus, Edit, Trash2, Search, X, Save, Package } from "lucide-react"

const ShopkeeperProducts = () => {
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    description: "",
  })

  useEffect(() => {
    // In a real app, fetch products from API
    // For demo purposes, we'll use mock data
    const fetchProducts = async () => {
      try {
        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Mock products data
        const mockProducts = [
          {
            id: 1,
            name: "Smartphone X",
            category: "Electronics",
            price: 799.99,
            stock: 25,
            description: "Latest smartphone with advanced features",
            image: "/placeholder.svg?height=100&width=100",
          },
          {
            id: 2,
            name: "Wireless Earbuds",
            category: "Electronics",
            price: 129.99,
            stock: 50,
            description: "High-quality wireless earbuds with noise cancellation",
            image: "/placeholder.svg?height=100&width=100",
          },
          {
            id: 3,
            name: "Smart Watch",
            category: "Electronics",
            price: 249.99,
            stock: 15,
            description: "Fitness tracker and smartwatch with heart rate monitor",
            image: "/placeholder.svg?height=100&width=100",
          },
          {
            id: 4,
            name: "Laptop Pro",
            category: "Electronics",
            price: 1299.99,
            stock: 10,
            description: "Powerful laptop for professionals",
            image: "/placeholder.svg?height=100&width=100",
          },
          {
            id: 5,
            name: "Bluetooth Speaker",
            category: "Electronics",
            price: 79.99,
            stock: 30,
            description: "Portable Bluetooth speaker with excellent sound quality",
            image: "/placeholder.svg?height=100&width=100",
          },
        ]

        setProducts(mockProducts)
      } catch (err) {
        console.error("Error fetching products:", err)
        setError("Failed to load products. Please try again later.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const resetForm = () => {
    setFormData({
      name: "",
      category: "",
      price: "",
      stock: "",
      description: "",
    })
    setEditingProduct(null)
  }

  const openAddModal = () => {
    resetForm()
    setShowAddModal(true)
  }

  const closeAddModal = () => {
    setShowAddModal(false)
    resetForm()
  }

  const openEditModal = (product) => {
    setFormData({
      name: product.name,
      category: product.category,
      price: product.price.toString(),
      stock: product.stock.toString(),
      description: product.description,
    })
    setEditingProduct(product)
    setShowAddModal(true)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Validate form
    if (!formData.name || !formData.category || !formData.price || !formData.stock) {
      setError("Please fill in all required fields")
      return
    }

    // Create new product object
    const productData = {
      name: formData.name,
      category: formData.category,
      price: Number.parseFloat(formData.price),
      stock: Number.parseInt(formData.stock),
      description: formData.description,
      image: "/placeholder.svg?height=100&width=100", // Default image
    }

    if (editingProduct) {
      // Update existing product
      const updatedProducts = products.map((product) =>
        product.id === editingProduct.id ? { ...productData, id: product.id } : product,
      )
      setProducts(updatedProducts)
    } else {
      // Add new product
      const newProduct = {
        ...productData,
        id: products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1,
      }
      setProducts([...products, newProduct])
    }

    // Close modal and reset form
    closeAddModal()
  }

  const handleDeleteProduct = (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      const updatedProducts = products.filter((product) => product.id !== productId)
      setProducts(updatedProducts)
    }
  }

  if (isLoading) {
    return (
      <div className="products-loading">
        <div className="spinner"></div>
        <p>Loading products...</p>
      </div>
    )
  }

  return (
    <div className="shopkeeper-products">
      <div className="products-header">
        <h1>Product Management</h1>
        <p>Add, edit, and manage your inventory</p>
      </div>

      <div className="products-actions">
        <div className="search-container">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
          />
          {searchTerm && (
            <button className="clear-search" onClick={() => setSearchTerm("")}>
              <X size={16} />
            </button>
          )}
        </div>
        <button className="add-product-btn" onClick={openAddModal}>
          <Plus size={16} /> Add Product
        </button>
      </div>

      {error && <div className="products-error">{error}</div>}

      {filteredProducts.length === 0 ? (
        <div className="no-products">
          <Package size={48} />
          <p>No products found. {searchTerm ? "Try a different search term." : "Add your first product!"}</p>
          {!searchTerm && (
            <button className="add-product-btn" onClick={openAddModal}>
              <Plus size={16} /> Add Product
            </button>
          )}
        </div>
      ) : (
        <div className="products-table-container">
          <table className="products-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id}>
                  <td>
                    <img src={product.image || "/placeholder.svg"} alt={product.name} className="product-image" />
                  </td>
                  <td>
                    <div className="product-name">{product.name}</div>
                    <div className="product-description">{product.description}</div>
                  </td>
                  <td>{product.category}</td>
                  <td>${product.price.toFixed(2)}</td>
                  <td>
                    <span className={`stock-badge ${product.stock < 10 ? "low-stock" : ""}`}>{product.stock}</span>
                  </td>
                  <td>
                    <div className="product-actions">
                      <button className="edit-btn" onClick={() => openEditModal(product)}>
                        <Edit size={16} />
                      </button>
                      <button className="delete-btn" onClick={() => handleDeleteProduct(product.id)}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add/Edit Product Modal */}
      {showAddModal && (
        <div className="product-modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2>{editingProduct ? "Edit Product" : "Add New Product"}</h2>
              <button className="close-modal" onClick={closeAddModal}>
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="product-form">
              <div className="form-group">
                <label htmlFor="name">Product Name*</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} required />
              </div>

              <div className="form-group">
                <label htmlFor="category">Category*</label>
                <select id="category" name="category" value={formData.category} onChange={handleInputChange} required>
                  <option value="">Select Category</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Fashion">Fashion</option>
                  <option value="Grocery">Grocery</option>
                  <option value="Home">Home</option>
                  <option value="Beauty">Beauty</option>
                  <option value="Sports">Sports</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="price">Price (₹)*</label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    min="0"
                    step="0.01"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="stock">Stock*</label>
                  <input
                    type="number"
                    id="stock"
                    name="stock"
                    value={formData.stock}
                    onChange={handleInputChange}
                    min="0"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="4"
                ></textarea>
              </div>

              <div className="form-actions">
                <button type="button" className="cancel-btn" onClick={closeAddModal}>
                  Cancel
                </button>
                <button type="submit" className="save-btn">
                  <Save size={16} /> {editingProduct ? "Update Product" : "Add Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default ShopkeeperProducts

