let students = []
let filteredStudents = []

let sortAsc = true

const nameInput = document.getElementById("name")
const scoreInput = document.getElementById("score")
const addBtn = document.getElementById("addBtn")

const searchInput = document.getElementById("search")
const filterRank = document.getElementById("filterRank")
const sortScore = document.getElementById("sortScore")

const tableBody = document.getElementById("tableBody")
const stats = document.getElementById("stats")

function getRank(score){
    if(score >= 8.5) return "Giỏi"
    if(score >= 7) return "Khá"
    if(score >= 5) return "Trung bình"
    return "Yếu"
}

function addStudent(){

    const name = nameInput.value.trim()
    const score = parseFloat(scoreInput.value)

    if(name === "" || isNaN(score) || score < 0 || score > 10){
        alert("Dữ liệu không hợp lệ!")
        return
    }

    students.push({name,score})

    nameInput.value = ""
    scoreInput.value = ""
    nameInput.focus()

    applyFilters()
}

function applyFilters(){

    let keyword = searchInput.value.toLowerCase()
    let rankFilter = filterRank.value

    filteredStudents = students.filter(sv=>{

        let matchName = sv.name.toLowerCase().includes(keyword)

        let rank = getRank(sv.score)

        let matchRank = rankFilter === "all" || rank === rankFilter

        return matchName && matchRank
    })

    filteredStudents.sort((a,b)=>{
        return sortAsc ? a.score - b.score : b.score - a.score
    })

    renderTable()
}

function renderTable(){

    tableBody.innerHTML = ""

    if(filteredStudents.length === 0){
        tableBody.innerHTML =
        `<tr><td colspan="5">Không có kết quả</td></tr>`
        return
    }

    let total = 0

    filteredStudents.forEach((sv,index)=>{

        total += sv.score

        let rank = getRank(sv.score)

        let row = `
        <tr class="${sv.score < 5 ? 'yeu' : ''}">
        <td>${index+1}</td>
        <td>${sv.name}</td>
        <td>${sv.score}</td>
        <td>${rank}</td>
        <td><button data-index="${students.indexOf(sv)}">Xóa</button></td>
        </tr>
        `

        tableBody.innerHTML += row
    })

    let avg = students.length
        ? (students.reduce((a,b)=>a+b.score,0)/students.length).toFixed(2)
        : 0

    stats.innerText =
    "Tổng sinh viên: " + students.length +
    " | Điểm trung bình: " + avg
}

tableBody.addEventListener("click",function(e){

    if(e.target.tagName === "BUTTON"){

        const index = e.target.dataset.index
        students.splice(index,1)

        applyFilters()
    }

})

addBtn.addEventListener("click",addStudent)

searchInput.addEventListener("input",applyFilters)

filterRank.addEventListener("change",applyFilters)

sortScore.addEventListener("click",function(){

    sortAsc = !sortAsc

    sortScore.innerText = sortAsc ? "Điểm ▲" : "Điểm ▼"

    applyFilters()
})

scoreInput.addEventListener("keypress",function(e){
    if(e.key === "Enter"){
        addStudent()
    }
})

applyFilters()