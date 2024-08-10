// const db = require('../config/db');

// const createLead = (req, res) => {
//     const { title, description, status } = req.body;
//     const userId = req.user.id; // Use user ID from the JWT payload

//     // Ensure you have userId before proceeding
//     if (!userId) {
//         return res.status(401).json({ message: 'Unauthorized: User ID not available' });
//     }

//     const sql = 'INSERT INTO leads (title, description, status, user_id) VALUES (?, ?, ?, ?)';
//     db.query(sql, [title, description, status, userId], (err, results) => {
//         if (err) {
//             console.error('Error during lead creation:', err);
//             return res.status(500).json({ message: 'Server error', error: err });
//         }
//         res.status(201).json({ message: 'Lead created successfully', leadId: results.insertId });
//     });
// };

// const updateLead = async (req, res) => {
//     const { id, title, description, status } = req.body;
//     try {
//         await db.query('UPDATE leads SET title = ?, description = ?, status = ? WHERE id = ? AND user_id = ?', [title, description, status, id, req.user.userId]);
//         res.json({ message: 'Lead updated' });
//     } catch (error) {
//         res.status(500).json({ message: 'Server error', error });
//     }
// };

// const deleteLead = async (req, res) => {
//     const { id } = req.body;
//     try {
//         await db.query('DELETE FROM leads WHERE id = ? AND user_id = ?', [id, req.user.userId]);
//         res.json({ message: 'Lead deleted' });
//     } catch (error) {
//         res.status(500).json({ message: 'Server error', error });
//     }
// };

// module.exports = { createLead, updateLead, deleteLead };


const db = require('../config/db');

const createLead = (req, res) => {
    const { title, description, status } = req.body;
    const userId = req.user.id;

    if (!userId) {
        return res.status(401).json({ message: 'Unauthorized: User ID not available' });
    }

    const sql = 'INSERT INTO leads (title, description, status, user_id) VALUES (?, ?, ?, ?)';
    db.query(sql, [title, description, status, userId], (err, results) => {
        if (err) {
            console.error('Error during lead creation:', err);
            return res.status(500).json({ message: 'Server error', error: err });
        }
        res.status(201).json({ message: 'Lead created successfully', leadId: results.insertId });
    });
};

const updateLead = (req, res) => {
    const { id, title, description, status } = req.body;
    const sql = 'UPDATE leads SET title = ?, description = ?, status = ? WHERE id = ?';
    db.query(sql, [title, description, status, id], (err, results) => {
        if (err) {
            console.error('Error during lead update:', err);
            return res.status(500).json({ message: 'Server error', error: err });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Lead not found' });
        }
        res.status(200).json({ message: 'Lead updated successfully' });
    });
};

const deleteLead = (req, res) => {
    const { id } = req.body;
    const sql = 'DELETE FROM leads WHERE id = ?';
    db.query(sql, [id], (err, results) => {
        if (err) {
            console.error('Error during lead deletion:', err);
            return res.status(500).json({ message: 'Server error', error: err });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Lead not found' });
        }
        res.status(200).json({ message: 'Lead deleted successfully' });
    });
};

const getAllLeads = (req, res) => {
    const userId = req.user.id;
    if (!userId) {
        return res.status(401).json({ message: 'Unauthorized: User ID not available' });
    }
    const sql = 'SELECT * FROM leads WHERE user_id = ?';
    db.query(sql, [userId], (err, results) => {
        if (err) {
            console.error('Error fetching leads:', err);
            return res.status(500).json({ message: 'Error fetching leads', error: err });
        }
        res.status(200).json(results);
    });
};

module.exports = {
    createLead,
    updateLead,
    deleteLead,
    getAllLeads
};
