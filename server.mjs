
import { Sequelize } from 'sequelize';
import { DataTypes } from "sequelize";
import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors({ origin: 'http://localhost:4200' }));
app.use(express.json());

/* Login */
const sequelize = new Sequelize("admin", "root", "", {
  host: "localhost",
  dialect: "mysql",
});
const User = sequelize.define("User", {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,  // Stored as plain text
    allowNull: false,
  },

}, {
  timestamps: false,
  tableName: 'login',

},
);
sequelize.sync()
  .then(() => console.log("Database connected"))
  .catch(err => console.error("Database connection error:", err));
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    res.json({ message: "Login successful" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
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
    const result = await sequelize.query(
      `UPDATE orders 
       SET customerName = :customerName, totalAmount = :totalAmount, status = :status, date = :date 
       WHERE id = :id`,
      {
        replacements: { customerName, totalAmount, status, date, id },
        type: sequelize.QueryTypes.UPDATE,
      }
    );

    if (result[0] > 0) {  
      res.json({
        message: 'Order updated successfully',
        updatedOrderId: id,
      });
    } else {
      res.status(404).json({ error: 'Order not found' });
    }
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
  
    const result = await sequelize.query(
      `DELETE FROM orders WHERE id = :id`,
      {
        replacements: { id: orderId },  
        type: sequelize.QueryTypes.DELETE, 
      }
    );

  
    if (result[0] === 0) { 
      return res.status(404).json({ error: 'Order not found' });
    }

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
    const result = await sequelize.query(
      `UPDATE products 
       SET name = :name, price = :price, category = :category, description = :description
       WHERE id = :id`,
      {
        replacements: { name, price, category, description, id },
        type: sequelize.QueryTypes.UPDATE,
      }
    );

    if (result[0] > 0) {  
      res.json({
        message: 'Product updated successfully',
        updatedProductId: id,
      });
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
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
  
    const result = await sequelize.query(
      `DELETE FROM products WHERE id = :id`,
      {
        replacements: { id: productId }, 
        type: sequelize.QueryTypes.DELETE,  
      }
    ) 
    if (result[0] === 0) {  // `result[0]` contains the number of affected rows
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(204).send();  // No content (product deleted successfully)
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Error deleting product' });
  }
});

// Listerning
const PORT = process.env['PORT'] || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
export default app;