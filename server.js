const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');

// Create Express app
const app = express();
app.use(bodyParser.json());
app.use(cors({
  origin: '*', // Adjust this according to your security needs
}));


// Connect to MySQL database
const db = mysql.createConnection({
  host: '68.178.147.138', // Replace with your MySQL host
  user: 'thars', // Replace with your MySQL user
  password: 'thars@2004', // Replace with your MySQL password
  database: 'ishield' // The name of your database
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err.message);
    // Handle error, e.g., retry connecting or exit the application
    return;
  }
  console.log('Connected to MySQL database');

  // Create users table if it doesn't exist
  const createUserTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255),
      email VARCHAR(255) UNIQUE,
      phone VARCHAR(255) UNIQUE,
      empid VARCHAR(255),
      encrypted_password VARCHAR(255),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      district VARCHAR(255),
      bank_acc_no BIGINT,
      bank_acc_name VARCHAR(255),
      ifsc_code VARCHAR(255),
      daily_amount INT DEFAULT 0,
      weekly_amount INT DEFAULT 0,
      monthly_amount INT DEFAULT 0,
      total_amount INT DEFAULT 0,
      completed_tasks TEXT,
      incompleted_tasks TEXT,
      activation_plan BOOLEAN DEFAULT FALSE,
      withdrawal_amount INT DEFAULT 0
    )
  `;

  db.query(createUserTableQuery, (err, result) => {
    if (err) {
      console.error('Error creating users table:', err.message);
    }
  });
});
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  // Optionally, restart the server or exit
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  // Optionally, restart the server or exit
});

// Endpoint to create a new user
app.post('/users', async (req, res) => {
  const { name, email, phone, empid, password, pin } = req.body;

  // Check if email or phone number already exists
  const checkQuery = 'SELECT * FROM users WHERE email = ? OR phone = ?';
  db.query(checkQuery, [email, phone], async (err, results) => {
    if (err) {
      console.error('Error checking existing user:', err.message);
      return res.status(500).json({ error: 'Failed to create user', details: err.message });
    }
    if (results.length > 0) {
      return res.status(400).json({ error: 'Duplicate email or phone number', details: 'Email or phone number already exists.' });
    }

    try {
      // Hash the password
      const encryptedPassword = await bcrypt.hash(password, 10);

      // Insert new user into the database
      const insertQuery = `
        INSERT INTO users 
        (name, email, phone, empid, encrypted_password, pin, created_at) 
        VALUES (?, ?, ?, ?, ?, ?, NOW())
      `;
      const params = [name, email, phone, empid, encryptedPassword, pin];

      db.query(insertQuery, params, (err, results) => {
        if (err) {
          console.error('Error inserting user:', err.message);
          return res.status(500).json({ error: 'Failed to create user', details: err.message });
        }
        res.status(201).json({ id: results.insertId, name, email, phone, empid, pin, created_at: new Date() });
      });
    } catch (error) {
      console.error('Error hashing password:', error.message);
      res.status(500).json({ error: 'Failed to create user', details: error.message });
    }
  });
});
// Example of fetching user data
app.get('/user/:id', (req, res) => {
  const userId = req.params.id;
  const query = 'SELECT * FROM users WHERE id = ?';

  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error('Error fetching user:', err);
      res.status(500).json({ error: 'Failed to fetch user data.' });
    } else {
      res.json(results[0]);
    }
  });
});

// Endpoint to activate user account
app.post('/activate-account/:userId', (req, res) => {
  const userId = req.params.userId;

  // Current date and time
  const activationDate = new Date();

  const updateQuery = `
    UPDATE users 
    SET activation_plan = TRUE, activation_date = ? 
    WHERE id = ?`;
    
  db.query(updateQuery, [activationDate, userId], (err, result) => {
    if (err) {
      console.error('Failed to activate account:', err.message);
      return res.status(500).json({ error: 'Failed to activate account.', details: err.message });
    }

    if (result.affectedRows > 0) {
      res.status(200).json({ message: 'Account activated successfully.' });
    } else {
      res.status(404).json({ error: 'User not found or already activated.' });
    }
  });
});


// Endpoint to handle user login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const selectQuery = 'SELECT * FROM users WHERE email = ?';
  db.query(selectQuery, [email], async (err, results) => {
    if (err) {
      console.error('Error retrieving user:', err.message);
      return res.status(500).json({ error: 'Failed to login', details: err.message });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'User not found', details: 'User with this email does not exist.' });
    }

    const user = results[0];
    try {
      const isPasswordMatch = await bcrypt.compare(password, user.encrypted_password);

      if (isPasswordMatch) {
        // if (!user.activation_plan) {
        //   return res.status(403).json({ error: 'Account not activated', details: 'Please activate your account by making a payment.' });
        // }
        
        const userDetails = {
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          empid: user.empid,
          pin: user.pin,
          created_at: user.created_at,
          district: user.district,
          bank_acc_no: user.bank_acc_no,
          bank_acc_name: user.bank_acc_name,
          ifsc_code: user.ifsc_code,
          daily_amount: user.daily_amount,
          weekly_amount: user.weekly_amount,
          monthly_amount: user.monthly_amount,
          total_amount: user.total_amount,
          completed_tasks: user.completed_tasks,
          incompleted_tasks: user.incompleted_tasks,
          activation_plan: user.activation_plan,
          activation_date: user.activation_date,
          withdrawal_amount: user.withdrawal_amount,
          last_reward_date: user.last_reward_date
        };

        res.status(200).json({ success: true, message: 'Login successful', user: userDetails });
      } else {
        res.status(401).json({ error: 'Login failed', details: 'Incorrect email or password.' });
      }
    } catch (error) {
      console.error('Error comparing passwords:', error.message);
      res.status(500).json({ error: 'Failed to login', details: error.message });
    }
  });
});
// Middleware to parse JSON
app.use(express.json());

// Middleware to serve static files (uploaded images)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Change to your desired directory
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Upload profile image
app.post('/upload', upload.single('profileImage'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  // Return the URL of the uploaded image
  const imageUrl = `http://localhost:3306/uploads/${req.file.filename}`;
  res.json({ imageUrl });
});

// Update profile
app.put('/profile/:userId', (req, res) => {
  const userId = req.params.userId;
  const { name, bankId, ifsc, district, profileImage } = req.body;

  console.log('Received update request for user ID:', userId);
  console.log('New profile data:', req.body);

  let updateUserQuery = `UPDATE users SET `;
  let params = [];

  if (name) { updateUserQuery += `name = ?, `; params.push(name); }
  if (bankId) { updateUserQuery += `bank_acc_no = ?, `; params.push(bankId); }
  if (ifsc) { updateUserQuery += `ifsc_code = ?, `; params.push(ifsc); }
  if (district) { updateUserQuery += `district = ?, `; params.push(district); }
  if (profileImage) { updateUserQuery += `profileImage = ?, `; params.push(profileImage); }

  updateUserQuery = updateUserQuery.slice(0, -2);
  updateUserQuery += ` WHERE id = ?`;
  params.push(userId);

  db.query(updateUserQuery, params, (err, result) => {
    if (err) {
      console.error('Failed to update profile:', err);
      res.status(500).json({ error: 'Failed to update profile.' });
    } else {
      if (result.affectedRows > 0) {
        console.log('Profile updated successfully');
        res.status(200).json({ message: 'Profile updated successfully.' });
      } else {
        console.log('No rows affected. User not found or no changes made.');
        res.status(404).json({ error: 'User not found or no changes made.' });
      }
    }
  });
});




// Endpoint to handle daily reward
app.post('/daily-reward/:userId', async (req, res) => {
  const userId = req.params.userId;

  // Retrieve user with the provided ID from the database
  const selectQuery = 'SELECT * FROM users WHERE id = ?';
  db.query(selectQuery, [userId], async (err, results) => {
    if (err) {
      console.error('Error retrieving user:', err.message);
      return res.status(500).json({ error: 'Failed to process reward', details: err.message });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'User not found', details: 'User with this ID does not exist.' });
    }

    const user = results[0];
    const today = new Date();

    // Check if the last reward date is defined
    let lastRewardDate = user.last_reward_date ? new Date(user.last_reward_date) : null;

    if (lastRewardDate && lastRewardDate.toDateString() === today.toDateString()) {
      // Reward already claimed today
      return res.status(400).json({ error: 'Reward already claimed today.' });
    }

    // Fixed daily reward amount
    const dailyReward = 1;

    // Calculate new amounts
    const newDailyAmount = user.daily_amount + dailyReward;
    const newTotalAmount = newDailyAmount + user.weekly_amount + user.monthly_amount;

    // Update the user's daily amount, total amount, and set the last reward date
    const updateQuery = `
      UPDATE users 
      SET daily_amount = ?, total_amount = ?, last_reward_date = ?
      WHERE id = ?
    `;
    db.query(updateQuery, [newDailyAmount, newTotalAmount, today.toISOString(), userId], (err, result) => {
      if (err) {
        console.error('Failed to update daily reward:', err);
        res.status(500).json({ error: 'Failed to update daily reward.' });
      } else {
        res.status(200).json({
          message: `Reward processed successfully. Earned ${dailyReward} rupee today.`,
          daily_amount: newDailyAmount,
          total_amount: newTotalAmount
        });
      }
    });
  });
});




// Endpoint to get monthly tasks
app.get('/tasks/monthly', (req, res) => {
  const selectQuery = 'SELECT * FROM task WHERE type = ?';
  db.query(selectQuery, ['m'], (err, results) => {
    if (err) {
      console.error('Error retrieving monthly tasks:', err.message);
      return res.status(500).json({ error: 'Failed to fetch tasks', details: err.message });
    }
    res.status(200).json(results);
  });
});

// Endpoint to get weekly tasks
app.get('/tasks/weekly', (req, res) => {
  const selectQuery = 'SELECT * FROM task WHERE type = ?';
  db.query(selectQuery, ['w'], (err, results) => {
    if (err) {
      console.error('Error retrieving weekly tasks:', err.message);
      return res.status(500).json({ error: 'Failed to fetch tasks', details: err.message });
    }
    res.status(200).json(results);
  });
});

// Start the server
const PORT = process.env.PORT || 3306;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
