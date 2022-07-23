const form = document.querySelector('form')
const btn = document.querySelector('#s-btn')
const input = document.querySelector('#city-weather-search')
const m1 = document.querySelector('.m-1')
const m2 = document.querySelector('.m-2')
form.addEventListener('submit', (e) => {
    e.preventDefault();
    m1.textContent = "Loading..";
    m2.textContent = "";
    fetch(`http://localhost:3000/weather?address=${input.value}`).then(response => {
        response.json().then(data => {
            if (data.error) {
                m1.textContent = data.error;
                return;
            }
            // console.log(data.location, data.weather)
            m1.textContent = data.location;
            m2.textContent = data.weather;
        })
    })
})
