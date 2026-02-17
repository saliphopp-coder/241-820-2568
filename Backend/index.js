//อังคารที่ 17 กุมภาพันธ์ 2569//
const express = require ('express');
const bobyParser = require('body-parser');
const app = express();

const port = 8000;
app.use(bobyParser.json()); 
let users = []; //ประกาศตัวเเปร
let counter = 1;
//path =GET /users
//app.get('/',(req,res)=> { //ตำเเหน่ง path//
    app.get('/users',(req,res)=> {
        res.json(users);
    });
  /*let user = {
        name: "John Doe",
        age: 30,
        email: "john.doe@example.com"
*/     
//path= Post /user
app.post('/user',(req,res)=> {
let user = req.body;
user.id = counter;
counter += 1;
users.push(user);
res.json({
    message: "User added successfully",
    user: user });
});
//path = PUT/user/:id
app.patch("/user/:id",(req,res)=> {
  let id = req.params.id;
  let updateUser = req.body;
  //user จาก id ที่ส่งมา 
  let selectedIndex = users.findIndex(user => user.id == id);
});
  //อัพเดตข้อมูลของ user
  if (updateUser.name){
    users[selectedIndex].name = updateUser.name;
  }
  if (updateUser.age){
    users[selectedIndex].age = updateUser.age;
  }
  //เอาข้อมูลที่ update ส่ง response กลับไป
 res.json({
    message: "User updated successfully",
    data:{
      user: users[selectedIndex],
      indexUpdated: selectedIndex
    }
  });

  //path = Delete /user/:id
app.delete('/user/:id', (req, res) => {
  let id = req.params.id;
  //user จาก id ที่ส่งมา
  let selectedindex = users.findIndex(user => user.id == id);
   //ลบ user จาก Array users
  if (selectedindex !== -1) {
    users.splice(selectedindex, 1);
    
    res.json({ 
      message: 'User deleted successfully',
  
        indexDeleted: selectedindex
    });
      }
})
  
app.listen(port,()=> {
  console.log(`Server is running on port ${port}`);

});