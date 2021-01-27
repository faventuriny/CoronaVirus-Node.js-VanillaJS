// admin page - event listener to submit new city 
function addEventListenerToAddInfoButton() {
    let button = document.querySelector('#addInfoButton')
    button.addEventListener('click', (e)=>{
        e.preventDefault()
        console.log('submit!');

        let cityName = document.querySelector('#newCity').value
        let cityCode = document.querySelector('#newCode').value
        let cityDate = document.querySelector('#newDate').value
        let firstDose = document.querySelector('#newDose1').value
        let secDose = document.querySelector('#newDose1').value

        let data = JSON.stringify({
            "city": cityName,
            "cityCode": cityCode,
            "date":cityDate,
            "firstDose": firstDose,
            "secoundDose": secDose
        })

        let xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener("readystatechange", function() {
        if(this.readyState === 4) {
            console.log(this.responseText);
            window.location.href = "/admin-view"
        }
        });

        xhr.open("POST", "http://localhost:3000/immunization-indices");
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.send(data);
    })
}

// admin page - searching for a city 
function addEventListenerToSearchButton() {
    document.querySelector('#searchButton').addEventListener('click', (e) => {
        e.preventDefault()
        let cityName = document.querySelector('#searchCity').value
        let date = document.querySelector('#searchDate').value

        fetch(`/immunization-indices/search/${cityName}/${date}`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            setVaccinTable(data)
        });
    })
    
}

// admin page - Edit vaccin
function addEventListenerToEditButton() {
    document.querySelector('#editInfoButton').addEventListener('click', (e) => {
        e.preventDefault()
    
        let data = JSON.stringify({
            "city": document.querySelector('#editCityName').value,
            "cityCode": document.querySelector('#editCityCodInput').value,
            "date": document.querySelector('#editDateInput').value,
            "firstDose": document.querySelector('#editFirstDoseInput').value,
            "secoundDose": document.querySelector('#editSecoundDoseInput').value
        });
        console.log('data', data);
        

        let xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener("readystatechange", function() {
        if(this.readyState === 4) {
            console.log(this.responseText);
            alert(this.responseText)
            window.location.href = '/admin-view'
        }
        });

        xhr.open("PATCH", "/immunization-indices/edit");
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.send(data);
    })
    
}

function setVaccinTable(jsonObj) {
    let div = document.querySelector('#editCityDateInfoDiv')
    let form = document.createElement('form')
    form.classList.add('grid')
    form.classList.add('vaccinForm')
    div.appendChild(form)
    
    // add labels
    let cityNameLabel = document.createElement('label')
    cityNameLabel.textContent = 'ישוב'
    form.appendChild(cityNameLabel)

    let cityCodLabel = document.createElement('label')
    cityCodLabel.textContent = 'קוד ישוב'
    form.appendChild(cityCodLabel)

    let dateLabel = document.createElement('label')
    dateLabel.textContent = 'תאריך'
    form.appendChild(dateLabel)

    let firstDoseLabel = document.createElement('label')
    firstDoseLabel.textContent = 'מתחסנים מנה ראשונה'
    form.appendChild(firstDoseLabel)

    let secoundDoseLabel = document.createElement('label')
    secoundDoseLabel.textContent = 'מתחסנים מנה שניה'
    form.appendChild(secoundDoseLabel)
    
    // add inputs
    let cityNameInput = document.createElement('input')
    cityNameInput.value = jsonObj[0].city
    cityNameInput.id = 'editCityName'
    form.appendChild(cityNameInput)

    let cityCodInput = document.createElement('input')
    cityCodInput.value = jsonObj[0].cityCode
    cityCodInput.id = 'editCityCodInput'
    form.appendChild(cityCodInput)

    let dateInput = document.createElement('input')
    dateInput.value = jsonObj[0].date
    dateInput.id = 'editDateInput'
    form.appendChild(dateInput)

    let firstDoseInput = document.createElement('input')
    firstDoseInput.value = jsonObj[0].firstDose
    firstDoseInput.id = 'editFirstDoseInput'
    form.appendChild(firstDoseInput)

    let secoundDoseInput = document.createElement('input')
    secoundDoseInput.value = jsonObj[0].secoundDose
    secoundDoseInput.id = 'editSecoundDoseInput'
    form.appendChild(secoundDoseInput)

    // add button
    let buttonDiv = document.createElement('div')
    buttonDiv.classList.add('divButton')
    div.appendChild(buttonDiv)

    let button = document.createElement('button')
    button.id='editInfoButton'
    button.textContent = 'ערוך'
    
    buttonDiv.appendChild(button) 

    addEventListenerToEditButton()
}

if(document.querySelector('.adminView')!== null){
    window.onload = (e) => {
        addEventListenerToAddInfoButton()
        addEventListenerToSearchButton()
    }
}
