/*
array
*/
let a = 10
let b = 20
let c = 30
console.log('a:',a,'b:',b, 'c:',c)
let age =[10,20,30] // array 3 items
console.log('ages:', ages)
console.log('ages[1]:', ages[1])

 //1.เเทนที่ค่าข้อมุลในarray
 ages = [15,25]
 console.log('ages list:',ages)
 //2. ต่อ array
 ages.push(35)
 console.log('age after push:', ages)
 //3 ลบข้อมุลตัวสุดท้ายarray 
 ages.pop()
 console.log('ages after pop:', ages)

 let ages =[25,30,35,40,45]
 console.log('Ages:', ages)

 let fruits = ['apple','banana','cherry']
 console.log('Fruits:', fruits)
 fruits.push('mango')
 console.log('fruits after push:',fruits)
 console.log('first fruits:',fruits.length)

 for (let i = 0; i < fruits.length; i++) {
    console.log('fruist')
 }
 let stUdent = {
  age :30,
  name : 'john',
  grade :'A',
 }
 console.log(student);
 console.log('name:',student.name)

 /*
 function
 */
let score1 = 10
let score2 = 80
//ประกาศ
function calculation_grade(score){
if (score >= 80){
    grade = 'A'
}else if(score >=70){
    grade = 'B'
}else if(score >=60){
    grade = 'C'
}else if(score >= 50){
    grade = 'D'
} else {
    garde = 'F'
}
return grade 
}
//เรียกใช้
let grade1 = calculation_grade(score1)
let grade2 = calculation_grade(score2)
console.log('Score1:' +score1+ ', Grade:' + grade1)
console.log('Score2:' + score2 + ',Grade:'+ grade2)

/*
array
*/
let Score = [90,80,70,60,50];
for (let i = 0; i <score.length; i++){
    console.log(`score ${i + 1}: ${score[i]}`);
}
score.forEach ((s) => {
    console.log('score:', s);

})
// map, filter

/*
array
*/
let score = [90,80,70,60,50];
let NewScores = []

for (let i = 0; i <score.length; i++){
    console.log(scores[i]);
   // if (score[i] >= 60) {
    //    newScores.push(score[i]);
    //}
}
let newScores = score.filter(function(score){
    return score >= 60;
})
newScores.forEach((ns) => {
 console.log('new score: ' + ns);
})

/*
object function
*/

let student = [
    {name: "john",age:20 ,grade: "A"},
    {name: "jane",age:22 ,grade: "B"},
]
console.log('Student',student[0]);
let Student = student.find((s) => {
    if (s.name === "jim") {
        return true;
    } 
})
let dubblescoreStudent = student.map((s) => {
    s.age =s.age * 2;
    return s;
});
let highGradeStudents = student.filter((s) => {
    return s.grade === "A"
})
console.log('Student',student);
console.log('Dubble scores student',dubblescoreStudent);
console.log('high grade student',highGradeStudents)
