
const apiUrl = `https://randomuser.me/api/?results=12&inc=name, picture,
email, location, phone, dob &noinfo &nat=US`;
let employees = [];
const overlay = document.querySelector('.overlay');
const errorDiv = document.querySelector('.error');
const card = document.querySelector('.card');
const container = document.querySelector('.container');
let grid = document.querySelector('.grid');
let page = document.querySelector('body');

overlay.style.display = "none";
card.style.display = "none";


function fetchData(url){
    fetch(url)
    .then(res => res.json())
    .then(displayEmployees)
    .catch(err => {
        console.log(err)
        errorDiv.textContent = 'Sorry, it seems like there was an error fetching the data. Please Refresh';
    })

    function displayEmployees(data){
        employees = data.results;
        console.log(employees)

        for(let i = 0; i < employees.length; i++){
            let user = employees[i];
            
            let employeeHTML = `
            <div class="employee" id="${i}">
                <img src="${user.picture.large}" class="image">
                <div class="details">
                    <h3 class="name">${user.name.first} ${user.name.last}</h3>
                    <div class="info">
                    <p class="email">${user.email}</p>
                    <p class="city">${user.location.city}</p>
                    </div>
                </div>
            </div>`;
            document.querySelector('.grid').innerHTML += employeeHTML;
        }  
    }
}

fetchData(apiUrl);

page.addEventListener('click', (e)=>{
    if(e.target.tagName !== 'body'){
        let index = e.target.closest('.employee').id;
        console.log(index)
        showCard(index);       
    }
})

function showCard(index){
    let user = employees[index];
    console.log(employees)
    let birthDate = user.dob.date;
    card.innerHTML = `
    <button id="close"><p class="Xp">✖</p></button>
    <img src="${user.picture.large}" class="image">
    <div class="card-details">
        <h3 class="name">${user.name.first} ${user.name.last}</h3>
        <div class="info">
            <p class="email">${user.email}</p>
            <p class="city">${user.location.city}</p>
            <p class="city">${user.phone}</p>
            <p class="city">${user.location.street.number} ${user.location.street.name}</p>
            <p class="email">${birthDate.substr(0,10).replace('-', '/').replace('-', '/')}</p>
        </div>
    </div>
    `;
    overlay.style.display = "block";
    card.style.display = "block";
}

setInterval(() => {
    let Xbutton = document.getElementById('close');
Xbutton.addEventListener('click', ()=>{
    overlay.style.display = "none";
    card.style.display = "none";
})
}, 1000);












