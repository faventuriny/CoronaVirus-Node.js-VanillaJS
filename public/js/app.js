// admin page - event listener to submit new city (vaccine)
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
        console.log(data);

        let xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener("readystatechange", function() {
        if(this.readyState === 4) {
            console.log(this.responseText);
            let jsonData = JSON.parse(this.responseText)
            if(jsonData.vaccineIndices){
                alert('Your details have been successfully uploaded!')
                window.location.href = "/admin-view"
            } else {
                alert('opsss! something want wrong :( Please try to upload again')
            }
            window.location.href = "/admin-view"
        }
        });

        xhr.open("POST", "http://localhost:3000/vaccine-indices");
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

        fetch(`/vaccine-indices/search/${cityName}/${date}`)
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

        xhr.open("PATCH", "/vaccine-indices/edit");
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

// admin page - event listener to submit new infected and decease info
function addEventListenerToAddInfoButtonInfected() {
    let button = document.querySelector('#addInfoButtonInfected')
    button.addEventListener('click', (e)=>{
        e.preventDefault()
        console.log('submit!');

        let addDateInfected = document.querySelector('#addDateInfected').value

        let addInfecteds = document.querySelector('#addInfecteds').value
        let addInfectedsFromMidNight = document.querySelector('#addInfectedsFromMidNight').value

        let addActivePatients = document.querySelector('#addActivePatients').value
        let addActivePatientsFromMidNight = document.querySelector('#addActivePatientsFromMidNight').value
        let addActiveAtHome = document.querySelector('#addActiveAtHome').value
        let addActiveAtHospital = document.querySelector('#addActiveAtHospital').value
        let addActiveAtHotel = document.querySelector('#addActiveAtHotel').value

        let addSeriouslyIll = document.querySelector('#addSeriouslyIll').value
        let addSeriouslyIllFromMidNight = document.querySelector('#addSeriouslyIllFromMidNight').value
        let addCriticalIll = document.querySelector('#addCriticalIll').value
        let addRespiratoryPatients = document.querySelector('#addRespiratoryPatients').value

        let addDeceased = document.querySelector('#addDeceased').value

        let addPositiveResults = document.querySelector('#addPositiveResults').value
        let addTotalLabsTest = document.querySelector('#addTotalLabsTest').value

        let data = JSON.stringify({
            date: addDateInfected,

            newInfecteds: addInfecteds,
            newInfectedsFromMidNight: addInfectedsFromMidNight,

            activePatients: addActivePatients,
            activePatientsFromMidNight: addActivePatientsFromMidNight,
            activePatientsAtHoma: addActiveAtHome,
            activePatientsAtHotel: addActiveAtHospital,
            activePatientsAtHospital: addActiveAtHotel,

            seriouslyIll: addSeriouslyIll, 
            seriouslyIllFromMidNight: addSeriouslyIllFromMidNight,
            criticalIll: addCriticalIll,
            respiratoryPatients: addRespiratoryPatients,

            deceased: addDeceased,
            
            positiveLabTests: addPositiveResults,
            totalLabTest: addTotalLabsTest

        })

        let xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener("readystatechange", function() {
        if(this.readyState === 4) {
            console.log(this.responseText);
            let jsonData = JSON.parse(this.responseText)
            if(jsonData.data){
                alert('Your details have been successfully uploaded!')
                window.location.href = "/admin-view"
            } else {
                alert('opsss! something want wrong :( Please try to upload again')
            }
            // window.location.href = "/admin-view"
        }
        });

        xhr.open("POST", "http://localhost:3000/infected-and-deceased");
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.send(data);
    })
}
// admin page - searching for a date (infections) 
function addEventListenerToSearchDateButton() {
    document.querySelector('#searchButtonInfected').addEventListener('click', (e) => {
        e.preventDefault()
        let date = document.querySelector('#searchDateInfected').value

        fetch(`/infected-and-deceased/date/${date}`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            setInfectedTable(data)
        });
    })
    
}
function setInfectedTable(jsonObj) {
    let editInfoInfectedDiv = document.querySelector('#editInfoInfected')
    let list1 = [['newInfecteds', 'newInfectedsFromMidNight', 'totalInfecteds'],
                ['activePatients','activePatientsFromMidNight','activePatientsAtHoma', 'activePatientsAtHotel', 'activePatientsAtHospital'],
                ['seriouslyIll','seriouslyIllFromMidNight','criticalIll','respiratoryPatients'],
                ['deceased'],
                ['positiveLabTests', 'totalLabTest']]

    let list2 = [['מאומתים חדשים','מאומתים חדשים מחצות','סה"כ מאומתים'],
                ['חולים פעילים','חולים פעילים מחצות','חולים בבית','חולים במלון','חולים בי"ח']
                ['חולים קשים','חולים קשים מחצות','חולים קריטים','חולים מונשמים']
                ['נפטרים']
                ['אחוז בדיקות חיוביות','בדיקות מאתמול']]

    for(let i = 0 ; i < list1.length ; i++){
        let div = document.createElement('div')
        div.classList.add('infected')
        editInfoInfectedDiv.appendChild(div)

        for(let j = 0 ; j < list1[i].length ; j++){
            let label = document.createElement('label')
            label.textContent = list2[i][j]
            div.appendChild(label)

            let input = document.createElement('input')
            input.value = jsonObj[0][list1[i][j]]
            input.id = list1[i][j]
            div.appendChild(input)
        }
       
    }



    // // div 1 
    // let div1 = document.createElement('div')
    // div1.classList.add('infected')
    // editInfoInfectedDiv.appendChild(div1)

    // let newInfectedsLabel = document.createElement('label')
    // newInfectedsLabel.textContent = 'מאומתים חדשים'
    // div1.appendChild(newInfectedsLabel)

    // let newInfectedsInput = document.createElement('input')
    // newInfectedsInput.value = jsonObj[0].newInfecteds
    // newInfectedsInput.id = 'editDateInfected'
    // div1.appendChild(newInfectedsInput)

    // let newInfectedsFromMidNightLabel = document.createElement('label')
    // newInfectedsFromMidNightLabel.textContent = 'מאומתים חדשים מחצות'
    // div1.appendChild(newInfectedsFromMidNightLabel)

    // let newInfectedsFromMidNightInput = document.createElement('input')
    // newInfectedsFromMidNightInput.value = jsonObj[0].newInfectedsFromMidNight
    // newInfectedsFromMidNightInput.id = 'editnewInfectedsFromMidNight'
    // div1.appendChild(newInfectedsFromMidNightInput)

    // // div 2 

    // let div2 = document.createElement('div')
    // div2.classList.add('infected')
    // editInfoInfectedDiv.appendChild(div2)

    // let activePatientsLabel = document.createElement('label')
    // activePatientsLabel.textContent = 'חולים פעילים '
    // div2.appendChild(activePatientsLabel)

    // let activePatients = document.createElement('input')
    // activePatients.value = jsonObj[0].activePatients
    // activePatients.id = 'activePatients'
    // div2.appendChild(activePatients)

    // let activePatientsFromMidNightLabel = document.createElement('label')
    // activePatientsFromMidNightLabel.textContent = 'חולים פעילים מחצות'
    // div2.appendChild(activePatientsFromMidNightLabel)

    // let activePatientsFromMidNight = document.createElement('input')
    // activePatientsFromMidNight.value = jsonObj[0].activePatientsFromMidNight
    // activePatientsFromMidNight.id = 'activePatientsFromMidNight'
    // div2.appendChild(activePatientsFromMidNight)



    




}

if(document.querySelector('.adminView')!== null){
    window.onload = (e) => {
        addEventListenerToAddInfoButton()
        addEventListenerToSearchButton()
        addEventListenerToAddInfoButtonInfected()
        addEventListenerToSearchDateButton()
    }
}
