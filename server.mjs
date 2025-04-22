
import { Sequelize } from 'sequelize';
import { DataTypes } from "sequelize";
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
app.use(cors({ origin: 'http://localhost:4200' }));
app.use(express.json());
const PORT = process.env['PORT']|| 3000;
/* Login */
const sequelize = new Sequelize(
  process.env.DBName,
  process.env.DBUser,
  process.env.DBPass,
  {
    host: process.env.DBHost,
    dialect: 'mysql',
    port: 3306,
    logging: console.log,
  }
);
// const sequelize = new Sequelize(
//   'b8ivdahm8w6uqhwmkvdb', // DB name
//   'uhcscgl9jadbcdvw',     // DB user
//   '67Nikxl1ssBgTeO44nZw', // DB password
//   {
//     host: 'b8ivdahm8w6uqhwmkvdb-mysql.services.clever-cloud.com',
//     dialect: 'mysql',
//     logging: false, // Optional: turn off SQL logs
//   }
// );
const User = sequelize.define("login", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true, // Auto-increment the id
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,  // Stored as plain text
    allowNull: false,
  }

}, {
  timestamps: false,
  tableName: 'login',

},
);
sequelize
  .authenticate()
  .then(() => {
    console.log("Database connected");
    app.listen(PORT, () => console.log("Server running on port 3000"));
  })
  .catch((err) => console.error("Database connection error:", err));

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    console.log("Login attempt:", email); // Log email to track request flow
    const user = await User.findOne({ where: { email } });
    if (!user) {
      
      return res.status(401).json({ message: "Invalid email or password" });
    }
    if ( user.password !== password) {
      console.log("Invalid login attempt");
      return res.status(401).json({ message: "Invalid email or password" });
    }
    res.json({ message: "Login successful" });
  } catch (error) {
    console.error("Error in login:", error); // Log full error details
    res.status(500).json({ message: "Server error", error: error.message });
  }
});


/*Order */
const Order = sequelize.define('Order', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  customerName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  totalAmount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  tableName: 'orders', 
  timestamps: false,    
});

app.get('/orders', async (req, res) => {
  try {
    const orders = await Order.findAll();
    res.json(orders); 
  } catch (error) {
    res.status(500).json({ error: 'Error fetching orders' });
  }
});

app.post('/orders/new', async (req, res) => {
  const { customerName, totalAmount, status, date } = req.body;

  try {

    const result = await sequelize.query(
      `INSERT INTO orders (customerName, totalAmount, status, date) 
       VALUES (:customerName, :totalAmount, :status, :date)`,
      {
        replacements: { customerName, totalAmount, status, date },
        type: sequelize.QueryTypes.INSERT,
      }
    );
    res.status(201).json({
      message: 'Order added successfully',
      orderId: result[0]
    });
  } catch (error) {
    console.error('Error adding order:', error);
    res.status(500).json({ error: 'Error adding order' });
  }
});

app.put('/orders/:id', async (req, res) => {
  const { id } = req.params;
  const { customerName, totalAmount, status, date } = req.body;

  try {
    // Check if the order exists
    const order = await Order.findByPk(id);

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Update the order
    await order.update({ customerName, totalAmount, status, date });

    res.json({
      message: 'Order updated successfully',
      updatedOrderId: id,
    });
  } catch (error) {
    console.error('Error updating order:', error);
    res.status(500).json({ error: 'Error updating order' });
  }
});


app.get('/orders/:id', async (req, res) => {
  try {
    const orderId = req.params.id;

  
    const order = await Order.findByPk(orderId);  

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    console.error('Error fetching order by ID:', error);
    res.status(500).json({ error: 'Error fetching order' });
  }
});

app.delete('/orders/:id', async (req, res) => {
  const orderId = req.params.id;

  try {

      const order = await Order.findByPk(req.params.id);
      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }

      await order.destroy();

    res.status(204).send();  
  } catch (error) {
    console.error('Error deleting order:', error);
    res.status(500).json({ error: 'Error deleting order' });
  }
});


/* Products*/
const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,  
  }
}, {
  tableName: 'products',  
  timestamps: false,     
});
app.get('/products', async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);  
  } catch (error) {
    res.status(500).json({ error: 'Error fetching products' });
  }
});

app.post('/products/new', async (req, res) => {
  const { name, price, category, description } = req.body;

  try {
    const result = await sequelize.query(
      `INSERT INTO products (name, price, category, description) 
       VALUES (:name, :price, :category, :description)`,
      {
        replacements: { name, price, category, description },
        type: sequelize.QueryTypes.INSERT,
      }
    );
    res.status(201).json({
      message: 'Product added successfully',
      productId: result[0]
    });
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ error: 'Error adding product' });
  }
});
app.put('/products/:id', async (req, res) => {
  const { id } = req.params;
  const { name, price, category, description } = req.body;

  try {
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    await product.update({ name, price, category, description });

    res.json({
      message: 'Product updated successfully',
      updatedProductId: id,
    });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Error updating product' });
  }
});

app.get('/products/:id', async (req, res) => {
  try {
    const productId = req.params.id;

   
    const product = await Product.findByPk(productId);  

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    res.status(500).json({ error: 'Error fetching product' });
  }
});
app.delete('/products/:id', async (req, res) => {
  const productId = req.params.id;

  try {
  
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    await product.destroy();
    res.status(204).send();  // No content (product deleted successfully)
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Error deleting product' });
  }
});

// Listerning

// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });
export default app;