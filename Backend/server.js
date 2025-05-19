const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const path = require("path");
const jwt = require("jsonwebtoken");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MySQL connection setup
const db = mysql.createConnection({
  host: "localhost",
  user: "root", // Your MySQL username
  password: "", // Your MySQL password
  database: "crud", // Your database name
});

// Connect to database
db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    process.exit(1);
  }
  console.log("Connected to MySQL database");
});

// Serve images statically
app.use('/images', express.static(path.join(__dirname, 'images')));

// JWT secret key (Use environment variable in production)
const secretKey = "your_secret_key";//This is the secret key used to sign and verify JWT tokens.

// =================== JWT Middleware ===================
const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).json({ message: "Authorization header missing" });
  }

  const token = authHeader.split(' ')[1]; // bearer token
  if (!token) {
    return res.status(401).json({ message: "Token missing" });
  }

  jwt.verify(token, secretKey, (err, decoded) => { // error (null) decoded (token ke andhr jo data tha)
    if (err) {
      return res.status(403).json({ message: "Invalid or expired token" });
    }
    req.user = decoded; // user info attach
    next();
  });
};
// ========================================================

// Root route
app.get("/", (req, res) => {
  res.json("Server is running");
});

// Register user (no token needed)
app.post("/registeruser", (req, res) => {
  const { name, email, contact, password } = req.body; //from request body
  if (!name || !email || !contact || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const sql = "INSERT INTO users (name, email, contact, password) VALUES (?, ?, ?, ?)";
  db.query(sql, [name, email, contact, password], (err, result) => {
    if (err) {
      console.error("Registration error:", err);
      return res.status(500).json({ message: "Database error" });
    }
    const token = jwt.sign({ userId: result.insertId, email }, secretKey, { expiresIn: "1y" });
    res.json({ message: "User registered successfully", token });
  });
});

// Login user (no token needed)
app.post("/loginuser", (req, res) => {
  const { email, password } = req.body;
  const sql = "SELECT * FROM users WHERE email = ? AND password = ?";
  db.query(sql, [email, password], (err, results) => {
    if (err) {
      console.error("Error checking user:", err);
      return res.status(500).json({ error: "Database error" });
    }
    if (results.length > 0) { // kam se kam ek record
      const user = results[0];
      const token = jwt.sign({ userId: user.id, email: user.email }, secretKey, { expiresIn: "1h" });
      res.json({ message: "Login successful", user, token });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  });
});

// Get user profile by id (protected route)
app.get("/user-profile", verifyToken, (req, res) => {
  // Use id from token (recommended)
  const id = req.user.userId || req.query.id;
  if (!id) return res.status(400).json({ error: "User id is required" });

  const sql = "SELECT * FROM users WHERE id = ?";
  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error("Error fetching user profile:", err);
      return res.status(500).json({ error: "Database error" });
    }
    if (results.length > 0) {
      res.json(results[0]);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  });
});

// Update user profile (protected route)
app.put("/update-profile", verifyToken, (req, res) => {
  const id = req.user.userId || req.query.id;
  const { name, contact, password } = req.body;
  if (!id) return res.status(400).json({ error: "User id is required" });

  const sql = "UPDATE users SET name = ?, contact = ?, password = ? WHERE id = ?";
  db.query(sql, [name, contact, password, id], (err) => {
    if (err) {
      console.error("Error updating profile:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json({ message: "Profile updated successfully" });
  });
});

// Delete user account (protected route)
app.delete("/delete-user", verifyToken, (req, res) => {
  const id = req.user.userId || req.query.id;
  if (!id) return res.status(400).json({ error: "User id is required" });

  const sql = "DELETE FROM users WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Error deleting user:", err);
      return res.status(500).json({ error: "Database error" });
    }
    if (result.affectedRows > 0) {
      res.json({ message: "User deleted successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  });
});

// Get all products (no token needed)
app.get("/products", (req, res) => {
  const sql = "SELECT * FROM products";  // Add LIMIT 15 here if needed
  db.query(sql, (err, data) => {
    if (err) {
      console.error("Error fetching products:", err);
      return res.status(500).json({ error: "Database error" });
    }
    return res.json(data);
  });
});

// Get single product by id (no token needed)
app.get("/products/:id", (req, res) => {
  const productId = req.params.id;
  const sql = "SELECT * FROM products WHERE id = ?";
  db.query(sql, [productId], (err, data) => {
    if (err) {
      console.error("Error fetching product:", err);
      return res.status(500).json({ error: "Database error" });
    }
    if (data.length > 0) {
      res.json(data[0]);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  });
});

// Add new product (protected route)
app.post("/add-product", verifyToken, (req, res) => {
  const { name, description, price, category } = req.body;
  const imageUrl = "http://192.168.18.56:3000/images/image1.jpg"; // You may change this or handle image uploads later
  const sql = "INSERT INTO products (name, description, price, imageUrl, category) VALUES (?, ?, ?, ?, ?)";
  db.query(sql, [name, description, price, imageUrl, category], (err, result) => {
    if (err) {
      console.error("Error adding product:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json({ message: "Product added successfully", result });
  });
});

// Update product by id (protected route)
app.put("/update-product/:id", verifyToken, (req, res) => {
  const productId = req.params.id;
  const { name, description, price, imageUrl, category } = req.body;

  const sql = "UPDATE products SET name = ?, description = ?, price = ?, imageUrl = ?, category = ? WHERE id = ?";
  db.query(sql, [name, description, price, imageUrl, category, productId], (err) => {
    if (err) {
      console.error("Error updating product:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json({ message: "Product updated successfully" });
  });
});

// Delete product by id (protected route)
app.delete("/delete-product/:id", verifyToken, (req, res) => {
  const productId = req.params.id;
  const sql = "DELETE FROM products WHERE id = ?";
  db.query(sql, [productId], (err, result) => {
    if (err) {
      console.error("Error deleting product:", err);
      return res.status(500).json({ error: "Database error" });
    }
    if (result.affectedRows > 0) {
      res.json({ message: "Product deleted successfully" });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  });
});

// Search products by name and save search keyword (no token needed)
app.get("/search-products", (req, res) => {
  const searchTerm = req.query.q;
  if (!searchTerm) return res.status(400).json({ message: "Search term is required" });

  // Save the search keyword in history
  const saveSql = "INSERT INTO search_history (keyword) VALUES (?)";
  db.query(saveSql, [searchTerm], (saveErr) => {
    if (saveErr) {
      console.error("Failed to save search keyword:", saveErr);
      // Not critical - continue to search products
    }

    // Search products with keyword
    const searchSql = "SELECT * FROM products WHERE name LIKE ?";
    db.query(searchSql, [`%${searchTerm}%`], (searchErr, results) => {
      if (searchErr) {
        console.error("Error searching products:", searchErr);
        return res.status(500).json({ error: "Database error" });
      }
      res.json(results);
    });
  });
});

// Get all search history (no token needed)
app.get('/search-history', (req, res) => {
  const sql = 'SELECT * FROM search_history ORDER BY id DESC LIMIT 10'; // latest 10
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Failed to fetch history:", err);
      return res.status(500).json({ error: "Failed to fetch history" });
    }
    res.json(results);
  });
});

// Delete search history entry by id (no token needed)
app.delete('/search-history/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM search_history WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to delete' });
    }
    if (result.affectedRows > 0) {
      return res.status(200).json({ message: 'Deleted successfully' });
    } else {
      return res.status(404).json({ error: 'Not found' });
    }
  });
});

// Start server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
