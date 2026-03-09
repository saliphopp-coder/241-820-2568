const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');
const app = express();
const cors = require('cors');
const port = 8000;

app.use(bodyParser.json());
app.use(cors());

// เก็บ Connection ไว้ใช้งาน
let conn = null;

// ฟังก์ชันเชื่อมต่อ Database
const initMySQL = async () => {
    try {
        conn = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'webdb',
            port: 8820
        });
        console.log('Connected to MySQL Database');
    } catch (error) {
        console.error('Database connection failed:', error);
    }
}

// 1. GET /users - ดึงข้อมูลผู้ใช้ทั้งหมด
app.get('/users', async (req, res) => {
    try {
        const [rows] = await conn.execute('SELECT * FROM users');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error: error.message });
    }
});

// 2. GET /user/:id - ดึงข้อมูลผู้ใช้รายคน
app.get('/users/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const [rows] = await conn.execute('SELECT * FROM users WHERE id = ?', [id]);
        
        if (rows.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user', error: error.message });
    }
});

// 3. POST /user - เพิ่มผู้ใช้ใหม่
app.post('/users', async (req, res) => {
    try {
        const { name, lastname, age, gender } = req.body;
        const [result] = await conn.execute(
            'INSERT INTO users (name, lastname, age, gender) VALUES (?, ?, ?, ?)',
            [name, lastname, age, gender]
        );
        res.json({ message: 'User added successfully', userId: result.insertId });
    } catch (error) {
        res.status(500).json({ message: 'Error adding user', error: error.message });
    }
});

// 4. PATCH /user/:id - อัปเดตข้อมูลผู้ใช้
app.patch('/users/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const { name, lastname, age, gender } = req.body;
        
        const [result] = await conn.execute(
            'UPDATE users SET name = ?, lastname = ?, age = ?, gender = ? WHERE id = ?',
            [name, lastname, age, gender, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'User not found or no changes made' });
        }
        res.json({ message: 'User updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating user', error: error.message });
    }
});

// 5. DELETE /user/:id - ลบผู้ใช้
app.delete('/users/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const [result] = await conn.execute('DELETE FROM users WHERE id = ?', [id]);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error: error.message });
    }
});
// รัน Server
app.listen(port, async () => {
    await initMySQL();
    console.log(`Server is running at http://localhost:${port}`);
});