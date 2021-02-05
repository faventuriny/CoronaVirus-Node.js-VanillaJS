// admin page - vaccin per city - event listener to submit new city (vaccine)
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
        }
        });

        xhr.open("POST", "http://localhost:3000/vaccine-indices");
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.send(data);
    })
}
// admin page - vaccin per city - searching for a city 
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
// admin page - vaccin per city - Edit 
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
// admin page - vaccin per city - set table 
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
    document.querySelector('#searchButton').classList.toggle('notDisplay')
}


// admin page - infected and deceased - event listener to submit new info
function addEventListenerToAddInfoButtonInfected() {
    let button = document.querySelector('#addInfoButtonInfected')
    button.addEventListener('click', (e)=>{
        e.preventDefault()
        console.log('submit!');

        let addDateInfected = document.querySelector('#addDateInfected').value

        let addInfecteds = document.querySelector('#addInfecteds').value
        let addInfectedsFromMidNight = document.querySelector('#addInfectedsFromMidNight').value
        let totalInfecteds = document.querySelector('#addTotalInfecteds').value

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
            totalInfecteds: totalInfecteds,

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
        }
        });

        xhr.open("POST", "http://localhost:3000/infected-and-deceased");
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.send(data);
    })
}
// admin page - infected and deceased - searching for a date (infections) 
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
// admin page - infected and deceased - set table
function setInfectedTable(jsonObj) {
    let editInfoInfectedDiv = document.querySelector('#editInfoInfected')
    
    if(jsonObj.length === 0 ){
        let p = document.createElement('p')
        p.innerHTML = 'אין מידע על העיר הזה'
        p.id = 'noResultP'
        editInfoInfectedDiv.appendChild(p)
        return
    }

    let list1 = [['newInfecteds', 'newInfectedsFromMidNight', 'totalInfecteds'],
                ['activePatients','activePatientsFromMidNight','activePatientsAtHoma', 'activePatientsAtHotel', 'activePatientsAtHospital'],
                ['seriouslyIll','seriouslyIllFromMidNight','criticalIll','respiratoryPatients'],
                ['deceased'],
                ['positiveLabTests', 'totalLabTest']]

    let list2 = [['מאומתים חדשים','מאומתים חדשים מחצות','סה"כ מאומתים'],
                ['חולים פעילים','חולים פעילים מחצות','חולים בבית','חולים במלון','חולים בי"ח'],
                ['חולים קשים','חולים קשים מחצות','חולים קריטים','חולים מונשמים'],
                ['נפטרים'],
                ['אחוז בדיקות חיוביות','בדיקות מאתמול']]

    for(let i = 0 ; i < list1.length ; i++){
        let div = document.createElement('div')
        div.classList.add('infected')
        editInfoInfectedDiv.appendChild(div)

        for(let j = 0 ; j < list1[i].length ; j++){
            let label = document.createElement('label')
            label.textContent = list2[i][j] + ':'
            div.appendChild(label)

            let input = document.createElement('input')
            input.value = jsonObj[0][list1[i][j]]
            input.id = list1[i][j]
            input.size = input.value.length
            div.appendChild(input)
        }
    }

    let divButton = document.createElement('div')
    divButton.classList.add('infectedDivButton')
    editInfoInfectedDiv.appendChild(divButton)

    let button = document.createElement('button')
    button.id = 'editInfoInfectedButton'
    button.textContent = 'ערוך'
    divButton.appendChild(button)

    addEventListenerToEditButtonInfected()
    document.querySelector('#searchButtonInfected').classList.toggle('notDisplay')
    document.querySelector('#noResultP').classList.toggle('notDisplay')
}
// admin page - infected and deceased - edit infected info
function addEventListenerToEditButtonInfected() {
    document.querySelector('#editInfoInfectedButton').addEventListener('click', (e) => {
        e.preventDefault()
        
        let keys = ['newInfecteds', 'newInfectedsFromMidNight', 'totalInfecteds', 'activePatients', 'activePatientsFromMidNight', 'activePatientsAtHoma','activePatientsAtHotel', 'activePatientsAtHospital','seriouslyIll', 'seriouslyIllFromMidNight','criticalIll','respiratoryPatients', 'deceased', 'positiveLabTests', 'totalLabTest']
        let date = document.querySelector('#searchDateInfected').value

        let data = {date: date}
        for(let i = 0 ; i < keys.length ; i++){
            data[keys[i]] = document.querySelector('#' + keys[i]).value
        }
        console.log('data', data);

        let dataStr = JSON.stringify(data);
        
        let xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener("readystatechange", function() {
        if(this.readyState === 4) {
            console.log(this.responseText);
            let jsonData = JSON.parse(this.responseText)
            if(jsonData._id){
                alert('The details have been updated!')
                window.location.href = "/admin-view"
            } else {
                alert('opsss! something want wrong :( Please try again')
            }
        }
        });

        xhr.open("PATCH", "/infected-and-deceased/edit");
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.send(dataStr);
    })
}


// admin page - Traffic Light Plan - event listener to submit new city
function addEventListenerToAddInfoButtonTraffic() {
    let button = document.querySelector('#addInfoButtonTraffic')
    button.addEventListener('click', (e)=>{
        e.preventDefault()
        console.log('submit!');

        let city = document.querySelector('#cityTraffic').value
        let score = document.querySelector('#score').value
        let newInfectedsFor10KPeople = document.querySelector('#newInfectedsFor10KPeople').value
        let positiveTestPercentage = document.querySelector('#positiveTestPercentage').value
        let verifiedChangeRate = document.querySelector('#verifiedChangeRate').value
        let activePatients = document.querySelector('#activePatients').value

        let data = JSON.stringify({
            "city": city,
            "score": score,
            "newInfectedsFor10KPeople":newInfectedsFor10KPeople,
            "positiveTestPercentage": positiveTestPercentage,
            "verifiedChangeRate": verifiedChangeRate,
            "activePatients": activePatients
        })
        console.log(data);

        let xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener("readystatechange", function() {
        if(this.readyState === 4) {
            console.log(this.responseText);
            let jsonData = JSON.parse(this.responseText)
            console.log(jsonData);
            
            if(jsonData.data){
                alert('Your details have been successfully uploaded!')
                window.location.href = "/admin-view"
            } else {
                alert('opsss! something want wrong :( Please try to upload again')
            }
        }
        });

        xhr.open("POST", "/traffic-light-plan");
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.send(data);
    })
}
// admin page - Traffic Light Plan - searching for a city 
function addEventListenerToSearchButtonTrafficLightPlan() {
    document.querySelector('#searchButtonTraffic').addEventListener('click', (e) => {
        e.preventDefault()
        let cityName = document.querySelector('#searchCityTraffic').value

        fetch(`/traffic-light-plan/search/${cityName}`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            setTrafficLightTable(data)
        });
    }) 
}
// admin page - Traffic Light Plan - set table
function setTrafficLightTable(jsonObj) {
    let trafficDiv = document.querySelector('#editCityTrafficInfoDiv')
    
    if(jsonObj.length === 0 ){
        let p = document.createElement('p')
        p.innerHTML = 'אין מידע על התאריך הזה'
        p.id = 'noResultPTraffic'
        trafficDiv.appendChild(p)
        return
    }

    let labelList = ['ישוב','ציון','חולים חדשים לכל 10,000 נפש','% הבדיקות החיוביות','שיעור שינוי מאומתים','חולים פעילים']
    let keysList = ['city', 'score', 'newInfectedsFor10KPeople', 'positiveTestPercentage', 'verifiedChangeRate', 'activePatients']

    for(let i = 0 ; i < labelList.length ; i++){
        let label = document.createElement('label')
        label.textContent = labelList[i]
        label.classList.add('formTitle')
        trafficDiv.appendChild(label)
    }
    for(let i = 0 ; i < keysList.length ; i++){
        let input = document.createElement('input')
        input.value = jsonObj[0][keysList[i]]
        input.id = keysList[i] + 'EditTraffic'
        trafficDiv.appendChild(input)
    }

    let divButton = document.createElement('div')
    divButton.classList.add('trafficDivButton')
    trafficDiv.appendChild(divButton)

    let button = document.createElement('button')
    button.id = 'editInfoTrafficButton'
    button.textContent = 'ערוך'
    divButton.appendChild(button)

    addEventListenerToEditButtonTraffic()
    document.querySelector('#searchButtonTraffic').classList.toggle('notDisplay')
    document.querySelector('#noResultPTraffic').classList.toggle('notDisplay')
}
// admin page - Traffic Light Plan - edit infected info
function addEventListenerToEditButtonTraffic() {
    document.querySelector('#editInfoTrafficButton').addEventListener('click', (e) => {
        e.preventDefault()
        
        let keys = ['score', 'newInfectedsFor10KPeople', 'positiveTestPercentage', 'verifiedChangeRate', 'activePatients']
        let city = document.querySelector('#searchCityTraffic').value

        let data = {city: city}
        for(let i = 0 ; i < keys.length ; i++){
            data[keys[i]] = document.querySelector('#' + keys[i] + 'EditTraffic').value
        }
        console.log('data', data);

        let dataStr = JSON.stringify(data);
        
        let xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener("readystatechange", function() {
        if(this.readyState === 4) {
            console.log(this.responseText);
            let jsonData = JSON.parse(this.responseText)
            if(jsonData._id){
                alert('The details have been updated!')
                window.location.href = "/admin-view"
            } else {
                alert('opsss! something want wrong :( Please try again')
            }
        }
        });

        xhr.open("PATCH", "/traffic-light-plan/edit");
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.send(dataStr);
    })
}

// admin page - hospital status - event listener to submit new city
function addEventListenerToAddInfoButtonHospital() {
    let button = document.querySelector('#addInfoButtonHospital')
    button.addEventListener('click', (e)=>{
        e.preventDefault()
        console.log('submit!');

        let hospitalName = document.querySelector('#hospitalName').value
        let occupancy = document.querySelector('#occupancy').value
        let coronaOccupancy = document.querySelector('#coronaOccupancy').value
        let staffInIsolation = document.querySelector('#staffInIsolation').value

        let data = JSON.stringify({
            "hospitalName": hospitalName,
            "occupancy": occupancy,
            "coronaOccupancy":coronaOccupancy,
            "staffInIsolation": staffInIsolation
        })
        console.log(data);

        let xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener("readystatechange", function() {
        if(this.readyState === 4) {
            console.log(this.responseText);
            let jsonData = JSON.parse(this.responseText)
            console.log(jsonData);
            
            if(jsonData.data){
                alert('Your details have been successfully uploaded!')
                window.location.href = "/admin-view"
            } else {
                alert('opsss! something want wrong :( Please try to upload again')
            }
        }
        });

        xhr.open("POST", "/hospital-status");
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.send(data);
    })
}
// admin page - hospital status - searching for a city 
function addEventListenerToSearchButtonHospital() {
    document.querySelector('#searchButtonHospital').addEventListener('click', (e) => {
        e.preventDefault()
        let hospitalName = document.querySelector('#searchHospital').value

        fetch(`/hospital-status/search/${hospitalName}`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            setHospitalTable(data)
        });
    }) 
}
// admin page - hospital status - set table
function setHospitalTable(jsonObj) {
    let hospitalDiv = document.querySelector('#editHospitalInfoDiv')
    
    if(jsonObj.length === 0 ){
        let p = document.createElement('p')
        p.innerHTML = 'אין מידע על בית החולים הזה'
        p.id = 'noResultPHospital'
        hospitalDiv.appendChild(p)
        return
    }

    let labelList = ['אנשי צוות מאומתים ובבידוד','% תפוסת קורונה','% תפוסה כללי','בית חולים']
    let keysList = ['hospitalName', 'occupancy', 'coronaOccupancy', 'staffInIsolation']

    for(let i = 0 ; i < labelList.length ; i++){
        let label = document.createElement('label')
        label.textContent = labelList[i]
        label.classList.add('formTitle')
        hospitalDiv.appendChild(label)
    }
    for(let i = 0 ; i < keysList.length ; i++){
        let input = document.createElement('input')
        input.value = jsonObj[0][keysList[i]]
        input.id = keysList[i] + 'EditHospital'
        hospitalDiv.appendChild(input)
    }

    let divButton = document.createElement('div')
    divButton.classList.add('hospitalDivButton')
    hospitalDiv.appendChild(divButton)

    let button = document.createElement('button')
    button.id = 'editInfoHospitalButton'
    button.textContent = 'ערוך'
    divButton.appendChild(button)

    addEventListenerToEditButtonHospital()
    document.querySelector('#searchButtonHospital').classList.toggle('notDisplay')
    document.querySelector('#noResultPHospital').classList.toggle('notDisplay')
}
// admin page - hospital status - edit infected info
function addEventListenerToEditButtonHospital() {
    document.querySelector('#editInfoHospitalButton').addEventListener('click', (e) => {
        e.preventDefault()

        let keys = ['occupancy', 'coronaOccupancy', 'staffInIsolation']
        let hospitalName = document.querySelector('#searchHospital').value

        let data = {hospitalName: hospitalName}
        for(let i = 0 ; i < keys.length ; i++){
            data[keys[i]] = document.querySelector('#' + keys[i] + 'EditHospital').value
        }
        console.log('data', data);

        let dataStr = JSON.stringify(data);
        
        let xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener("readystatechange", function() {
        if(this.readyState === 4) {
            console.log(this.responseText);
            let jsonData = JSON.parse(this.responseText)
            if(jsonData._id){
                alert('The details have been updated!')
                window.location.href = "/admin-view"
            } else {
                alert('opsss! something want wrong :( Please try again')
            }
        }
        });

        xhr.open("PATCH", "/hospital-status/edit");
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.send(dataStr);
    })
}

if(document.querySelector('.adminView')!== null){
    window.onload = (e) => {
        addEventListenerToAddInfoButton()
        addEventListenerToSearchButton()

        addEventListenerToAddInfoButtonInfected()
        addEventListenerToSearchDateButton()

        addEventListenerToAddInfoButtonTraffic()
        addEventListenerToSearchButtonTrafficLightPlan()

        addEventListenerToAddInfoButtonHospital()
        addEventListenerToSearchButtonHospital()
    }
}

// add class name to hamburger to display the menue
function toggleClassMainMenu(){
    let menu = document.querySelector(".rt-menu");
    menu.classList.toggle("toggleCls");
}
function changeHamburgerIcon(){
    let span1 = document.querySelector("#span1");
    let span2 = document.querySelector("#span2");
    let span3 = document.querySelector("#span3");
    span1.classList.toggle("hamburger-open-top");
    span2.classList.toggle("hamburger-open-middle");
    span3.classList.toggle("hamburger-open-bottom");
}
//Event Listener to click on the hamburger
function addEventListenerToHamburger(){
    let hamburger = document.querySelector(".hamburger");
    hamburger.addEventListener("click", ()=>{
        console.log('hamburger clicked');
        
        toggleClassMainMenu(); 
        changeHamburgerIcon();
    })
}
function loadSection1(){
    fetch('/infected-and-deceased')
    .then(response => response.json())
    .then(data => {
        let latestData = data[data.length-1]
        console.log(latestData) 
        loadNewInfected(latestData) 
        // loadActivePatients(latestData)
    }); 
}
function loadNewInfected(data) {
    let newInfectedDiv = document.querySelector('#newInfected')
    let h1 = document.createElement('h1')
    h1.innerHTML = returnNumberWithComma(data.newInfecteds) 
    newInfectedDiv.appendChild(h1)

    let div1 = document.createElement('div')
    newInfectedDiv.appendChild(div1)

    let p1 = document.createElement('p')
    p1.innerHTML = `${returnNumberWithComma(data.newInfectedsFromMidNight)}+`
    p1.classList.add('bold')
    div1.appendChild(p1)

    let p2 = document.createElement('p')
    p2.innerHTML = 'מחצות'
    div1.appendChild(p2)

    let div2 = document.createElement('div')
    newInfectedDiv.appendChild(div2)

    let p3 = document.createElement('p')
    p3.innerHTML = `${returnNumberWithComma(data.totalInfecteds)}+`
    p3.classList.add('bold')
    div2.appendChild(p3)

    let p4 = document.createElement('p')
    p4.innerHTML = 'סה"כ'
    div2.appendChild(p4)
}
function loadActivePatients(data) {
    let newInfectedDiv = document.querySelector('#activePatients')
    let h1 = document.createElement('h1')
    h1.innerHTML = returnNumberWithComma(data.activePatients) 
    newInfectedDiv.appendChild(h1)

    let div1 = document.createElement('div')
    newInfectedDiv.appendChild(div1)

    let p1 = document.createElement('p')
    p1.innerHTML = `${returnNumberWithComma(data.activePatientsFromMidNight)}+`
    p1.classList.add('bold')
    div1.appendChild(p1)

    let p2 = document.createElement('p')
    p2.innerHTML = 'מחצות'
    div1.appendChild(p2)

    let div2 = document.createElement('div')
    newInfectedDiv.appendChild(div2)

    let p3 = document.createElement('p')
    p3.innerHTML = `${returnNumberWithComma(data.totalInfecteds)}+`
    p3.classList.add('bold')
    div2.appendChild(p3)

    let p4 = document.createElement('p')
    p4.innerHTML = 'סה"כ'
    div2.appendChild(p4)
}

function returnNumberWithComma(num) {
    return num.toLocaleString('en', {useGrouping:true})
}

window.onload = (e) => {
    addEventListenerToHamburger()
    loadSection1()
}
// document.addEventListener('DOMContentLoaded', ()=>{
//     Highcharts.chart('testChart', {
//         chart: {
//             type: 'areaspline',
//         },
//         credites:{
//             enabled: false
//         },
//         title: {
//             text: 'Our First Chart'
//         },
//         colors: ['#1c110a','#e4d6a7','#e9b44c','#9b2915','#50A2A7'],
//         tooltip: {
//             formatter(){
//                 let s = `<strong> X is: </strong> ${this.x}`;
//                 this.points.forEach(function(point){
//                     s += `<br> Y is: ${point.y}`
//                 })
//             },
//             shared: true,
//             backgroundColor: '#333333',
//             borderColor: 'red',
//             borderRadius: 20,
//             followPointer: true,
//             style: {
//                 color: '#ffffff'
//             }
//         },
//         yAxis: {
//             title: {
//                 text: 'Fruits Eaten'
//             }
//         },
//         xAxis: {
//             categories: ['Apples', 'Bananas', 'Orange']
//         },
//         series: [
//             {
//                 name: 'Fruit consumption',
//                 negativeColor: 'red',
//                 data: [1,2,3,4,10,-20,2,50,100,200,2,40,30,100,1]
//                 // data: [
//                 //     {
//                 //         name: 'Jack',
//                 //         y: 10,
//                 //         color: 'red',
//                 //         x: 2   
//                 //     },
//                 //     {
//                 //         name: 'Jane',
//                 //         y: 20,
//                 //         color: 'red',
//                 //         x: 4   
//                 //     },
//                 //     {
//                 //         name: 'Jenny',
//                 //         y: 13,
//                 //         color: 'red',
//                 //         x: 1   
//                 //     }
//                 // ]
//             }
//         ]
//     })
//     fetch('').then(res=>{
//         return res.JSON();
//     }).then(data=>{
//         options.dsts = {
//             data
//         }
//         Highcharts.chart('container', options)
//     })
// })

