<<<<<<< HEAD
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
=======

// ทำการimport 
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');
const app = express();
const http = require('express');
const port = 8000; 

app.use(bodyParser.json());

let users = []
let counter = 1;
let conn = null

const initMySQL = async () => {
  conn = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password:'root',
    database: 'webdb',
    port: 8820
  });
}

// path = GET /users  สำหรับ get users ทั้งหมด
app.get('/users', (req, res) => {
  const result = conn.query('SELECT * FROM users');
  res.json(result[0]);
});
// path = Post /user สำหรับเพิ่ม user ใหม่
try {

} catch (error) {

}
//กำหนดค่า้ริ่มต้นขแง server
const requirelistener = function (req, res) {
  res.writeHead(200);
  res.end('My First Server!');
}

//runserver
const server = http.createServer(requirelistener);
server.listen(port, host, () => {
  console.log(`Server is running at http://${host}:${port}`);
const express = require('express');
const bodyParser = require('body-parser');
const e = require('express');
const app = express();
const port = 8000;
// path = GET /users  สำหรับ get users ทั้งหมด
app.get('/users', (req, res) => {
  const filterUsers users.map(user => {
    return {
      id: user.id,
      firstName: user.name,
      lastname: user.lastname,
      fullname: user.name + ' ' + user.lastname
    }
  }

  app.get('/test-new', (req, res) => {
    try {
        const con = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password:'root',
            database: 'webdb'
            port: 8820
        });
    const result = await con.execute('SELECT * FROM users');
    res.json(result[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error connecting to database', error: error.message });
    }
  })

app.use(bodyParser.json());
let users = []
let counter = 1;
//path = /users
app.get('/users', (req, res) => {
  res.json(users);
});
//path = Post /user
app.post('/user', (req, res) => {
  let user = req.body;
  user.id = counter++;
  users.push(user);
  res.json({ message: 'User added successfully', user: user });
})
//path = Post /user สำหรับเพิ่ม user ใหม่
app.post('/user', (req, res) => {
  let user = req.body;
  user.id = counter++;
  users.push(user);
  res.json({ message: 'User added successfully', user: user });
})
// Delete /user/:id สำหรับลบ user ที่มี id ตรงกับที่ส่งมา
app.delete('/user/:id',async (req, res) => {
  try {
    let id = req.params.id;
    const result = await conn.execute('DELETE FROM users WHERE id = ?', [id])
    if (result[0].affectedRows === 0) {
      throw new Error('User not found');
    }
    res.json({ message: 'User deleted successfully' });
  
//Put /user/:id สำหรับ update user ที่มี id ตรงกับที่ส่งมา
app.get('/user/:id',async (req, res) => {
  try {
    let id = req.params.id;
    const result = await conn.execute('SELECT * FROM users WHERE id = ?', [id])
    if (result[0].length > 0) {
      throw new Error('User not found');
    } 
    res.json(result[0][0]);
  } catch (error) {
    console.error('Error fetching user:', error.message);
    let statuscode = error.statusCode || 500;
    res.status(statuscode).json({ message: error.message });
  //หา users จาก id
  let selectedindex = users.findIndex(user => {
  //update user นั้น
  users[selectedindex].firstName = updateUser.firstName || users[selectedindex].firstName
  users[selectedindex].lastname = updateUser.lastname|| users[selectedindex].lastname
  users[selectedindex].age = updateUser.age || users[selectedindex].age
  users[selectedindex].gender = updateUser.gender || users[selectedindex].gender
  //ส่ง response กลับไปว่า update users ที่เลือกสำเร็จ
//path = put /user/:id
app.patch('/user/:id', (req, res) => {
  let id = req.params.id;
  //หา users จาก id
  let selectedindex = users.findIndex(user => {
    if (user.id == id) {
      return true;
    } else {
      return false;
    }
  })
  //update user นั้น
;
  //ส่ง response กลับไปว่า update users ที่เลือกสำเร็จ
  res.json({
    message: 'User updated successfully',
    data : {
      user: updateUser,
      indexUpdated: selectedindex
    }
  })
})
app.delete('/user/:id', (req, res) => {
  let id = req.params.id;
  let selectedindex = users.findIndex(user => user.id == id);
  if (selectedindex !== -1) {
    users.splice(selectedindex, 1);
    res.json({ 
      message: 'User deleted successfully',
      data: {
        indexDeleted: selectedindex
      }
    })
  } else {
    res.status(404).json({ 
      message: 'User not found'
     })
  }
})
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})
app.listen(port, async () => {
  await initMySQL();
  console.log(`Server is running on port ${port}`);
>>>>>>> 43af3411fce7b7823b9e2cad2468dea7b45e8ace
});