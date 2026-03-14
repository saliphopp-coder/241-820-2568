const BASE_URL = "http://localhost:8000";
window.onload = async () => {
    await loadData();
}

const loadData = async () => {
    const response = await axios.get(`${BASE_URL}/users`);
    console.log(response.data);
    const userDOM = document.getElementById("user");
    let htmlData = '<div>';
    for (let i = 0; i < response.data.length; i++) {
        let user = response.data[i];
        htmlData += ` <div>
        ${user.id}${user.firstname} ${user.lastname}
        <a href="index.html?id=${user.id}"><button>Edit</button></a>
        <button class='delete-btn' data-index='${i}'>Delete</button>
        </div>`
    }
    htmlData += '</div>';
    userDOM.innerHTML = htmlData;

    const deleteDOMs = document.getElementsByClassName("delete-btn");
    const users = response.data;
    for (let i = 0; i < deleteDOMs.length; i++) {
        deleteDOMs[i].addEventListener("click", async (event) => {
            // ดึง index ของ user ที่ต้องการลบ
            const index = event.target.dataset.index;
            const user = users[index];
            try{
                // ใช้ firstname และ lastname เป็น identifier เพราะ table ไม่มี id
                await axios.post(`${BASE_URL}/users-delete`, { firstname: user.firstname, lastname: user.lastname });
                loadData(); // โหลดข้อมูลใหม่หลังจากลบสำเร็จ
            }catch(error){
                console.error("Error deleting user:", error);
            }    
        });
    }
}