// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const db = require('../config/db');

// const generateToken = (userId) => {
//     return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
// };

// const login = async (req, res) => {
//     const { email, password } = req.body;
//     try {
//         const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
//         const user = rows[0];
//         if (user && await bcrypt.compare(password, user.password_hash)) {
//             const token = generateToken(user.id);
//             res.json({ message: 'Login successful', token });
//         } else {
//             res.status(401).json({ message: 'Invalid credentials' });
//         }
//     } catch (error) {
//         res.status(500).json({ message: 'Server error', error });
//     }
// };

// const register = async (req, res) => {
//     const { email, name, password, number, fields } = req.body;

//     try {
//         // Check if user already exists
//         const [existingUsers] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        
//         // If the result is an array and has elements, the user exists
//         if (existingUsers.length > 0) {
//             return res.status(400).json({ message: 'User already exists' });
//         }

//         // Hash password
//         const passwordHash = await bcrypt.hash(password, 10);

//         // Insert new user
//         await db.query('INSERT INTO users (email, name, password_hash, number, fields) VALUES (?, ?, ?, ?, ?)', 
//                        [email, name, passwordHash, number, fields]);

//         res.json({ message: 'Registration successful' });
//     } catch (error) {
//         console.error('Error during registration:', error);
//         res.status(500).json({ message: 'Server error', error });
//     }
// };
// module.exports = { login, register };


// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const db = require('../config/db');
// require('dotenv').config(); // Load environment variables from .env file

// const register = async (req, res) => {
//     const { email, name, password, number, fields } = req.body;

//     try {
//         db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
//             if (err) {
//                 console.error('Error during user check:', err);
//                 return res.status(500).json({ message: 'Server error', error: err });
//             }

//             if (results.length > 0) {
//                 return res.status(400).json({ message: 'User already exists' });
//             }

//             const passwordHash = await bcrypt.hash(password, 10);

//             db.query('INSERT INTO users (email, name, password_hash, number, fields) VALUES (?, ?, ?, ?, ?)', 
//                      [email, name, passwordHash, number, fields], 
//                      (insertErr, insertResults) => {
//                 if (insertErr) {
//                     console.error('Error during registration:', insertErr);
//                     return res.status(500).json({ message: 'Server error', error: insertErr });
//                 }

//                 res.json({ message: 'Registration successful' });
//             });
//         });
//     } catch (error) {
//         console.error('Error during registration:', error);
//         res.status(500).json({ message: 'Server error', error });
//     }
// };

// const login = async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
//             if (err) {
//                 console.error('Error during user check:', err);
//                 return res.status(500).json({ message: 'Server error', error: err });
//             }

//             if (results.length === 0) {
//                 return res.status(400).json({ message: 'User not found' });
//             }

//             const user = results[0];
//             const isMatch = await bcrypt.compare(password, user.password_hash);

//             if (!isMatch) {
//                 return res.status(400).json({ message: 'Invalid credentials' });
//             }

//             const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

//             res.json({ message: 'Login successful', token });
//         });
//     } catch (error) {
//         console.error('Error during login:', error);
//         res.status(500).json({ message: 'Server error', error });
//     }
// };

// module.exports = { register, login };


const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db');
require('dotenv').config();

const register = async (req, res) => {
    const { email, name, password, number, fields } = req.body;
    try {
        const passwordHash = await bcrypt.hash(password, 10);
        db.query('INSERT INTO users (email, name, password_hash, number, fields) VALUES (?, ?, ?, ?, ?)', 
            [email, name, passwordHash, number, fields], 
            (err) => {
                if (err) {
                    console.error('Error during registration:', err);
                    return res.status(500).json({ message: 'Server error', error: err });
                }
                res.json({ message: 'Registration successful' });
            }
        );
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
            if (err) {
                console.error('Error during user check:', err);
                return res.status(500).json({ message: 'Server error', error: err });
            }
            if (results.length === 0) {
                return res.status(400).json({ message: 'User not found' });
            }

            const user = results[0];
            const isMatch = await bcrypt.compare(password, user.password_hash);

            if (!isMatch) {
                return res.status(400).json({ message: 'Invalid credentials' });
            }

            const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

            res.json({ message: 'Login successful', token });
        });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};

module.exports = {
    register,
    login
};
