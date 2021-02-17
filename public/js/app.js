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

        let vaccinatedDose1 = document.querySelector('#vaccinatedDose1').value
        let vaccinatedDose1FomMidNight = document.querySelector('#vaccinatedDose1FromMidNight').value
        let vaccinatedDose2 = document.querySelector('#vaccinatedDose2').value
        let vaccinatedDose2FomMidNight = document.querySelector('#vaccinatedDose2FromMidNight').value

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

            vaccinatedDose1: vaccinatedDose1,
            vaccinatedDose1FomMidNight: vaccinatedDose1FomMidNight,
            vaccinatedDose2: vaccinatedDose2,
            vaccinatedDose2FomMidNight: vaccinatedDose2FomMidNight,

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
        addEventListenerToHamburger() 

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
//load first section
function loadSection1(){
    console.log('fetch');
    
    fetch('/infected-and-deceased')
    .then(response => response.json())
    .then(data => {
        let latestData = data[data.length-1]
        console.log(latestData) 
        loadNewInfected(latestData) 
        loadActivePatients(latestData)
        loadSeriouslyIll(latestData)
        loadVaccinated(latestData)
        loadDeceased(latestData)
        loadTestPercentage(latestData)
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
    let activePatientsDiv = document.querySelector('#activePatients')

    let h1 = document.createElement('h1')
    h1.innerHTML = returnNumberWithComma(data.activePatients) 
    activePatientsDiv.appendChild(h1)

    let div1 = document.createElement('div')
    activePatientsDiv.appendChild(div1)

    let p1 = document.createElement('p')
    p1.innerHTML = `${returnNumberWithComma(data.activePatientsFromMidNight)}+`
    p1.classList.add('bold')
    div1.appendChild(p1)

    let p2 = document.createElement('p')
    p2.innerHTML = 'מחצות'
    div1.appendChild(p2)

    let activePatientsDistributionDiv = document.querySelector('#activePatientsDistribution')
    let div2 = document.createElement('div')
    div2.classList.add('activePatGrid')
    div2.classList.add('part3')
    activePatientsDistributionDiv.appendChild(div2)

    let p3 = document.createElement('p')
    p3.innerHTML = 'בית / קהילה'
    div2.appendChild(p3)

    let p4 = document.createElement('p')
    p4.innerHTML = 'מלון'
    div2.appendChild(p4)
    
    let p5 = document.createElement('p')
    p5.innerHTML = 'בי"ח'
    div2.appendChild(p5)

    let p6 = document.createElement('p')
    p6.innerHTML = `${returnNumberWithComma(data.activePatientsAtHoma)}+`
    p6.classList.add('bold')
    div2.appendChild(p6)

    let p7 = document.createElement('p')
    p7.innerHTML = `${returnNumberWithComma(data.activePatientsAtHotel)}+`
    p7.classList.add('bold')
    div2.appendChild(p7)

    let p8 = document.createElement('p')
    p8.innerHTML = `${returnNumberWithComma(data.activePatientsAtHospital)}+`
    p8.classList.add('bold')
    div2.appendChild(p8)
}
function loadSeriouslyIll(data) {
    let newInfectedDiv = document.querySelector('#seriouslyIll')
    let h1 = document.createElement('h1')
    h1.innerHTML = returnNumberWithComma(data.seriouslyIll) 
    newInfectedDiv.appendChild(h1)

    let div1 = document.createElement('div')
    newInfectedDiv.appendChild(div1)

    let p1 = document.createElement('p')
    p1.innerHTML = `${returnNumberWithComma(data.seriouslyIllFromMidNight)}+`
    p1.classList.add('bold')
    div1.appendChild(p1)

    let p2 = document.createElement('p')
    p2.innerHTML = 'מחצות'
    div1.appendChild(p2)

    let seriouslyIllDistribution = document.querySelector('#seriouslyIllDistribution')
    let div2 = document.createElement('div')
    div2.classList.add('criticalAndRespiratory')
    div2.classList.add('part3')
    seriouslyIllDistribution.appendChild(div2)

    let div3 = document.createElement('div')
    div2.appendChild(div3)

    let div4 = document.createElement('div')
    div2.appendChild(div4)

    let p3_1 = document.createElement('p')
    p3_1.innerHTML = '<i class="fas fa-circle"></i>'//עיגול
    p3_1.classList.add('redDot')
    div3.appendChild(p3_1)
    
    let p3_2 = document.createElement('p')
    p3_2.innerHTML = "מתוכם קריטי"
    div3.appendChild(p3_2)

    let p3_3 = document.createElement('p')
    p3_3.innerHTML = `${returnNumberWithComma(data.criticalIll)}`
    p3_3.classList.add('bold')
    div3.appendChild(p3_3)

    let p4_1 = document.createElement('p')
    p4_1.innerHTML = '<i class="fas fa-circle"></i>'//עיגול
    p4_1.classList.add('orangeDot')
    div4.appendChild(p4_1)
    
    let p4_2 = document.createElement('p')
    p4_2.innerHTML = "מונשמים"
    div4.appendChild(p4_2)

    let p4_3 = document.createElement('p')
    p4_3.innerHTML = `${returnNumberWithComma(data.respiratoryPatients)}`
    p4_3.classList.add('bold')
    div4.appendChild(p4_3)
}
function loadVaccinated(data) {
    let vaccinDose1 = document.querySelector('#vaccinDose1')
    let h1 = document.createElement('h1')
    h1.classList.add('vaccineNum')
    h1.innerHTML = returnNumberWithComma(data.vaccinatedDose1) 
    vaccinDose1.appendChild(h1)

    let div1 = document.createElement('div')
    vaccinDose1.appendChild(div1)

    let p1 = document.createElement('p')
    p1.innerHTML = `${returnNumberWithComma(data.vaccinatedDose1FomMidNight)}+`
    p1.classList.add('bold')
    div1.appendChild(p1)


    let vaccinDose2 = document.querySelector('#vaccinDose2')
    let h2 = document.createElement('h1')
    h2.innerHTML = returnNumberWithComma(data.vaccinatedDose2) 
    h2.classList.add('vaccineNum')
    vaccinDose2.appendChild(h2)

    let div2 = document.createElement('div')
    vaccinDose2.appendChild(div2)

    let p2 = document.createElement('p')
    p2.innerHTML = `${returnNumberWithComma(data.vaccinatedDose2FomMidNight)}+`
    p2.classList.add('bold')
    div2.appendChild(p2)
}
function loadDeceased(data) {
    let deceased = document.querySelector('#deceased')
    let h1 = document.createElement('h1')
    h1.innerHTML = returnNumberWithComma(data.deceased) 
    deceased.appendChild(h1)
}
function loadTestPercentage(data) {
    let testPercentage = document.querySelector('#testPercentage')
    let h1 = document.createElement('h1')
    h1.innerHTML = `${data.positiveLabTests}%`
    testPercentage.appendChild(h1)

    let div1 = document.createElement('div')
    testPercentage.appendChild(div1)

    let p1 = document.createElement('p')
    p1.innerHTML = `${returnNumberWithComma(data.totalLabTest)}+`
    p1.classList.add('bold')
    div1.appendChild(p1)

    let p2 = document.createElement('p')
    p2.innerHTML = 'בדיקות מאתמול'
    div1.appendChild(p2)
}

function returnNumberWithComma(num) {
    return num.toLocaleString('en', {useGrouping:true})
}

if(document.querySelector('.index') !== null){
    window.onload = (e) => {
        addEventListenerToHamburger()
        addEventListenerToAccessiblityButton()
        loadSection1()
        loadSection2()
        loadSection3()
        loadSection6()
        loadSection7()
    }
}

function loadSection2() {
    let _28days = 28 
    loadDataForNumOfVaccinate(_28days)
    loadDataForCumulativeNumOfVaccinate(_28days)
    loadDataForPercentOfVaccinate(_28days)
}
// num of vaccinates graph
function loadDataForNumOfVaccinate(period){
    fetch('/vaccine-population')
    .then(response => response.json())
    .then(data => {
        console.log('section 2 Data', data);
        
        let y1Data = []
        let y2Data = []
        let dates = []

        let n = data.length - 1

        if(period === 0 ){
            period = data.length
        }
        for (let i = n; i > data.length-period; i--) {   
            y1Data.unshift(data[i].dailyFirstDose)
            y2Data.unshift(data[i].dailySecDose) 
            dates.unshift(data[i].date[8]+data[i].date[9]+"."+data[i].date[5]+data[i].date[6]) 
        }
        setNumOfVaccinatedGraph(y1Data, y2Data, dates)
        addEventListenerToPeriodButtonNumOfVaccinated()
    });
}
function setNumOfVaccinatedGraph(y1Data, y2Data, dates){
    Highcharts.setOptions({
        lang: {
          decimalPoint: '.',
          thousandsSep: ','
        }
    });
    Highcharts.chart('dailyNumOfVaccinatedsGraph', {
        chart: {
            zoomType: 'xy',
            panning: true,
            panKey: 'shift',
            type: 'column',
            backgroundColor: null,
            backgroundColor: 'transparent'
        },
        credits:{
            enabled: false
        },
        title: {
            text: 'מספר מתחסנים יומי',
            style: {
                color: 'white'
            }
        },
        colors: ['#1c7d7e','#b6ca51'],
        yAxis: {
            lineWidth: 1,
            tickWidth: 1,
            title: {
                // text: "מספר מתחסנים",
                text: 'מספר<br>מתחסנים',
                align: 'high',
                textAlign: "right",
                offset: 0,
                rotation: 0,
                y: -30,
                x: 10,
                style: {
                    fontSize: '14px',
                    fontFamily: 'OpenSans',
                    textAlign: "right",
                    // width: '50px'
                }
            },
            tickInterval: 50000,
            endOnTick: false,

        },
        xAxis: {
            title: {
                text: 'תאריך',
                style: {
                    fontSize: '14px',
                    fontFamily: 'OpenSans',
                    textAlign: "right"
                }
            },
            categories: dates,
            tickInterval: 5,
            crosshair: true
        },
        series: [
            {
                name: 'מתחסנים מנה שניה',
                data: y2Data,
                color: '#b6ca51'
            },
            {
                name: 'מתחסנים מנה ראשונה',
                data: y1Data,
                color: '#1c7d7e',
            },
            
        ],
        plotOptions: {
            series: {
                stacking: 'overlap',
                lineWidth: 1
            },
            column: {
                pointPadding: -0.15,
                borderWidth: 0
            }
        },
        legend: {
            enabled: false
        },
        tooltip: {
            valueDecimals: 2,
            shared: true,
            backgroundColor: 'white',
            borderColor: '#d8d8d9',
            borderRadius: 8,
            followPointer: true,
            useHTML: true,
            style: {
                color: '#black',
                direction: 'rtl',
                fontFamily: 'OpenSans'
            }
        }
    })
}
function addEventListenerToPeriodButtonNumOfVaccinated(){
    document.querySelector('#periodButtonNumOfVaccinated').addEventListener('click', (e) => {
        e.preventDefault()
        let menu = document.querySelector('#section2MenuNumOfVaccinated')
        menu.classList.toggle('toggle')

        let ids = ['#untilNowNumOfVaccinated','#lastWeekNumOfVaccinated', '#twolastWeeksNumOfVaccinated', '#lastMonthNumOfVaccinated']
        let period = [0,7,14,28]

        for(let i = 0 ; i < ids.length ; i++){
            document.querySelector(ids[i]).addEventListener('click', (e) => {
                e.preventDefault()
                loadDataForNumOfVaccinate(period[i])
                ids.forEach(id => {
                    document.querySelector(id).classList.remove('checked')
                })
                document.querySelector(ids[i]).classList.toggle('checked')
            })
        }
    
    })
}

// cumulative number of vaccines graph
function loadDataForCumulativeNumOfVaccinate(period){
    fetch('/vaccine-population')
    .then(response => response.json())
    .then(data => {
        
        let y1Data = []
        let y2Data = []
        let dates = []

        let n = data.length - 1

        if(period === 0 ){
            period = data.length
        }
        for (let i = n; i > data.length-period; i--) {   
            y1Data.unshift(data[i].totalFirstDose)
            y2Data.unshift(data[i].totalSecDose) 
            dates.unshift(data[i].date[8]+data[i].date[9]+"."+data[i].date[5]+data[i].date[6]) 
        }
        setNumOfCumulativeVaccinatedGraph(y1Data, y2Data, dates)
        addEventListenerToPeriodButtonCumulativeNumOfVaccinated()
    });
}
function setNumOfCumulativeVaccinatedGraph(y1Data, y2Data, dates){
    Highcharts.setOptions({
        lang: {
          decimalPoint: '.',
          thousandsSep: ','
        },
    });
    Highcharts.chart('cumulativeNumOfVaccinatedsGraph', {
        chart: {
            type: 'area',
            backgroundColor: 'transparent'
        },
        credits:{
            enabled: false
        },
        title: {
            text: 'מספר מתחסנים יומי',
            style: {
                color: 'white'
            }
        },
        colors: ['#1c7d7e','#b6ca51'],
        yAxis: {
            lineWidth: 1,
            tickWidth: 1,
            title: {
                // text: "מספר מתחסנים",
                text: 'מספר<br>מתחסנים',
                align: 'high',
                textAlign: "right",
                offset: 0,
                rotation: 0,
                y: -30,
                x: 10,
                style: {
                    fontSize: '14px',
                    fontFamily: 'OpenSans',
                    textAlign: "right",
                    // width: '50px'
                },
                labels: {
                    formatter: function () {
                        return this.value;
                    }
                },
            },
            tickInterval: 1000000,
            endOnTick: false,

        },
        xAxis: {
            title: {
                text: 'תאריך',
                style: {
                    fontSize: '14px',
                    fontFamily: 'OpenSans',
                    textAlign: "right"
                }
            },
            categories: dates,
            tickInterval: 5,
            crosshair: true
        },
        series: [
            {
                name: 'מתחסנים מנה שניה',
                data: y1Data,
                color: '#1c7d7e',
                showInLegend: false,
                fillColor: 
                {
                    linearGradient: { x1: 1, x2: 1, y1: 0, y2: 1 },
                    stops: 
                    [
                        [0, 'rgb(28, 125, 126)'],
                        [1, 'rgb(28, 125, 126, 0.0)']
                    ],
                }
            },
            {
                name: 'מתחסנים מנה ראשונה',
                data: y2Data,
                color: '#b6ca51',
                showInLegend: false,
                fillColor: 
                {
                    linearGradient: { x1: 1, x2: 1, y1: 0, y2: 1 },
                    stops: 
                    [
                        [0, 'rgb(182, 202, 81)'],
                        [1, 'rgb(182, 202, 81, 0.0)']
                    ]
                }
            },
            
        ],
        plotOptions: {
            series: {
                stacking: 'overlap',
                lineWidth: 1
            },
        },
        legend: {
            enabled: false
        },
        tooltip: {
            valueDecimals: 2,
            shared: true,
            backgroundColor: 'white',
            borderColor: '#d8d8d9',
            borderRadius: 8,
            followPointer: true,
            useHTML: true,
            style: {
                color: '#black',
                direction: 'rtl',
                fontFamily: 'OpenSans'
            }
        }
    })
}
function addEventListenerToPeriodButtonCumulativeNumOfVaccinated(){
    document.querySelector('#periodButtonCumNumOfVaccinated').addEventListener('click', (e) => {
        e.preventDefault()
        let menu = document.querySelector('#section2MenuCumNumOfVaccinated')
        menu.classList.toggle('toggle')

        let ids = ['#untilNowCumNumOfVaccinated','#lastWeekCumNumOfVaccinated', '#twolastCumWeeksNumOfVaccinated', '#lastMonthCumNumOfVaccinated']
        let period = [0,7,14,28]

        for(let i = 0 ; i < ids.length ; i++){
            document.querySelector(ids[i]).addEventListener('click', (e) => {
                e.preventDefault()
                loadDataForCumulativeNumOfVaccinate(period[i])
                ids.forEach(id => {
                    document.querySelector(id).classList.remove('checked')
                })
                document.querySelector(ids[i]).classList.toggle('checked')
            })
        }
    
    })
}

//percent of vaccines graph
function loadDataForPercentOfVaccinate(period){
    fetch('/vaccine-population')
    .then(response => response.json())
    .then(data => {
        
        let y1Data = []
        let y2Data = []
        let dates = []

        let n = data.length - 1

        if(period === 0 ){
            period = data.length
        }
        for (let i = n; i > data.length-period; i--) {   
            y1Data.unshift(data[i].percentFirstDose)
            y2Data.unshift(data[i].percentSecDose) 
            dates.unshift(data[i].date[8]+data[i].date[9]+"."+data[i].date[5]+data[i].date[6]) 
        }
        setPercentVaccinatedGraph(y1Data, y2Data, dates)
        addEventListenerToPeriodButtonPercentOfVaccinated()
    });
}
function setPercentVaccinatedGraph(y1Data, y2Data, dates){
    Highcharts.setOptions({
        lang: {
          decimalPoint: '.',
          thousandsSep: ','
        },
    });
    Highcharts.chart('numOfVaccinatedsFromAllPopulationGraph', {
        chart: {
            zoomType: 'xy',
            panning: true,
            panKey: 'shift',
            type: 'line',
            backgroundColor: null,
            backgroundColor: 'transparent'
        },
        credits:{
            enabled: false
        },
        title: {
            text: 'מספר מתחסנים יומי',
            style: {
                color: 'white'
            }
        },
        colors: ['#1c7d7e','#b6ca51'],
        yAxis: {
            lineWidth: 1,
            tickWidth: 1,
            title: {
                // text: "מספר מתחסנים",
                text: 'מספר<br>מתחסנים',
                align: 'high',
                textAlign: "right",
                offset: 0,
                rotation: 0,
                y: -30,
                x: 10,
                style: {
                    fontSize: '14px',
                    fontFamily: 'OpenSans',
                    textAlign: "right",
                    // width: '50px'
                },
                labels: 
                {
                    format: '{value}%'
                },
                plotLines: [{
                    value: 0,
                    width: 2,
                    color: 'silver'
                }]
            },
            tickInterval: 25,
            endOnTick: false,

        },
        xAxis: {
            title: {
                text: 'תאריך',
                style: {
                    fontSize: '14px',
                    fontFamily: 'OpenSans',
                    textAlign: "right"
                }
            },
            categories: dates,
            tickInterval: 5,
            crosshair: true
        },
        series: [
            {
                name: 'מתחסנים מנה שניה',
                data: y1Data,
                color: '#1c7d7e'
            },
            {
                name: 'מתחסנים מנה ראשונה',
                data: y2Data,
                color: '#b6ca51',
            },
            
        ],
        plotOptions: {
            series: {
                stacking: 'overlap',
                lineWidth: 1
            },

        },
        legend: {
            enabled: false
        },
        tooltip: {
            valueDecimals: 2,
            shared: true,
            backgroundColor: 'white',
            borderColor: '#d8d8d9',
            borderRadius: 8,
            followPointer: true,
            useHTML: true,
            style: {
                color: '#black',
                direction: 'rtl',
                fontFamily: 'OpenSans'
            }
        }
    })
}
function addEventListenerToPeriodButtonPercentOfVaccinated(){
    document.querySelector('#periodButtonPrecentOfVaccinated').addEventListener('click', (e) => {
        e.preventDefault()
        let menu = document.querySelector('#section2MenuPercentOfVaccinated')
        menu.classList.toggle('toggle')

        let ids = ['#untilNowPercentOfVaccinated','#lastWeekPercentVaccinated', '#twolastWeeksPercentOfVaccinated', '#lastMonthPercentOfVaccinated']
        let period = [0,7,14,28]

        for(let i = 0 ; i < ids.length ; i++){
            document.querySelector(ids[i]).addEventListener('click', (e) => {
                e.preventDefault()
                loadDataForPercentOfVaccinate(period[i])
                ids.forEach(id => {
                    document.querySelector(id).classList.remove('checked')
                })
                document.querySelector(ids[i]).classList.toggle('checked')
            })
        }
    
    })
}

function loadSection3() {
    loadDataForTableVaccinationByCity()
}

// table vccination by city
function loadDataForTableVaccinationByCity() {
    fetch('/vaccination-by-city')
    .then(response => response.json())
    .then(data => {
        setTableVaccination(data)
    });
}
function setTableVaccination(data) {
    // create header
    let containerTitle = document.querySelector('#tableVaccinationByCityTitle')
    let headerList = ['ישוב','% מתחסנים מנה ראשנה','% מתחסנים מנה שנייה','חולים פעילים','חולים פעילים לכל 10,000 נפש','ציון יומי ממוחשב',]
    let idList = ['cityButton', 'firstDoseVaccinateButton', 'secDoseVaccinateButton', 'activePatienteButton','patiente10KButton', 'scoreButton']


    for(let i = 0 ; i < headerList.length ; i++){
        let div = document.createElement('div')
        div.classList.add('title')
        containerTitle.appendChild(div)

        if(i === 0){
            div.classList.add('vaccineCityDiv')
        }

        let button = document.createElement('button')
        button.id = idList[i]
        button.innerHTML = headerList[i]
        div.appendChild(button)
    }
  

    //create table
    let container = document.querySelector('#tableVaccinationByCity')
    data.forEach((obj) => {
        //city
        let div = document.createElement('div')
        div.classList.add('item')
        div.classList.add('item-title')
        container.appendChild(div)

        let h2 = document.createElement('h2')
        h2.innerHTML = obj.city
        div.appendChild(h2)

        //vaccine first dose
        let divFirstDoseContainer = document.createElement('div')
        divFirstDoseContainer.classList.add('divDoseContainer')
        divFirstDoseContainer.classList.add('item')
        container.appendChild(divFirstDoseContainer)

        let div1DoseProgress = document.createElement('div')
        div1DoseProgress.classList.add('progress')
        divFirstDoseContainer.appendChild(div1DoseProgress)

        let div1DoseProgressLeft = document.createElement('div')
        div1DoseProgress.appendChild(div1DoseProgressLeft)

        let div1DoseProgressRight = document.createElement('div')
        div1DoseProgressRight.style.width = obj.firstDose +'%'
        div1DoseProgressRight.style.height = '10px'
        div1DoseProgressRight.classList.add('firstDoseProgressRight')
        div1DoseProgress.appendChild(div1DoseProgressRight)

        let div1DosePercent = document.createElement('div')
        divFirstDoseContainer.appendChild(div1DosePercent)

        let p1Dose = document.createElement('p')
        p1Dose.innerHTML = obj.firstDose + '%'
        div1DosePercent.appendChild(p1Dose)

        //vaccine secound dose
        let divSecDoseContainer = document.createElement('div')
        divSecDoseContainer.classList.add('item')
        divSecDoseContainer.classList.add('divDoseContainer')
        container.appendChild(divSecDoseContainer)

        let div2DoseProgress = document.createElement('div')
        div2DoseProgress.classList.add('progress')
        divSecDoseContainer.appendChild(div2DoseProgress)

        let div2DoseProgressLeft = document.createElement('div')
        div2DoseProgress.appendChild(div2DoseProgressLeft)

        let div2DoseProgressRight = document.createElement('div')
        div2DoseProgressRight.style.width = obj.secoundDose +'%'
        div2DoseProgressRight.style.height = '10px'
        div2DoseProgressRight.classList.add('secDoseProgressRight')
        div2DoseProgress.appendChild(div2DoseProgressRight)

        let div2DosePercent = document.createElement('div')
        divSecDoseContainer.appendChild(div2DosePercent)

        let p2Dose = document.createElement('p')
        p2Dose.innerHTML = obj.secoundDose + '%'
        div2DosePercent.appendChild(p2Dose)

        //active patients
        let divActivePatients = document.createElement('div')
        divActivePatients.classList.add('item')
        container.appendChild(divActivePatients)

        let pActivePatients = document.createElement('p')
        pActivePatients.innerHTML = obj.activePatients
        divActivePatients.appendChild(pActivePatients)

        //active patients for 10K
        let divActivePat10K = document.createElement('div')
        divActivePat10K.classList.add('item')
        container.appendChild(divActivePat10K)

        let pActivePat10K = document.createElement('p')
        pActivePat10K.innerHTML = obj.activePatientsFor10K
        divActivePat10K.appendChild(pActivePat10K)

        //score
        let divScore = document.createElement('div')
        divScore.classList.add('item')
        container.appendChild(divScore)

        let spanScore = document.createElement('span')
        spanScore.innerHTML = obj.CalDailyScore
        divScore.appendChild(spanScore)
        spanScore.classList.add('spanScore')

        if(obj.CalDailyScore > 7.5){
            spanScore.classList.add('red')
        } else if (obj.CalDailyScore < 7.5 && obj.CalDailyScore > 6 ){
            spanScore.classList.add('orange')
        } else if (obj.CalDailyScore < 6 && obj.CalDailyScore > 4.5 ){
            spanScore.classList.add('yellow')
        } else {
            spanScore.classList.add('green')
        }
        addEventListenerToSearchInput(data)
    })

}
function addEventListenerToSearchInput(data) {
    let input = document.querySelector('#searchInputVaccinate')

    input.addEventListener('input', (e) => {
        e.preventDefault()
        
        let foundCities = []
        data.forEach((obj) => {
            if(obj.city.includes(input.value)){
                foundCities.push(obj)
            }
        })
        console.log('foundCities', foundCities);

        document.querySelector('#tableVaccinationByCityTitle').innerHTML = ''
        document.querySelector('#tableVaccinationByCity').innerHTML = ''
        if(foundCities.length === 0){
            setTableVaccination(data)
        } else {
            setTableVaccination(foundCities)
        }
    })
}
function loadSection6() {
    loadDataForTrafficLightPlan()
}
// table traffic light plan
function loadDataForTrafficLightPlan() {
    fetch('/traffic-light-plan')
    .then(response => response.json())
    .then(data => {
        setTableTrafficLightPlan(data)
    });
}
function setTableTrafficLightPlan(data) {
    // create header
    let containerTitle = document.querySelector('#tableTrafficTitle')
    let headerList = ['ישוב','ציון וצבע יומי','חולים חדשים לכל 10,000 נפש *','% הבדיקות החיוביות *','שיעור שינוי מאומתים *','חולים פעילים',]
    let idList = ['trafficCityButton', 'trafficScore', 'traffic10K', 'trafficPercentagePositiveTest','verifiedRateOfChange', 'trafficActivePatients']


    for(let i = 0 ; i < headerList.length ; i++){
        let div = document.createElement('div')
        div.classList.add('title')
        containerTitle.appendChild(div)

        if(i === 0){
            div.classList.add('trafficCityDiv')
        }

        let button = document.createElement('button')
        button.id = idList[i]
        button.innerHTML = headerList[i]
        div.appendChild(button)
    }
  

    //create table
    let container = document.querySelector('#tableTraffic')
    data.forEach((obj) => {
        //city
        let div = document.createElement('div')
        div.classList.add('item')
        div.classList.add('item-title')
        container.appendChild(div)

        let h2 = document.createElement('h2')
        h2.innerHTML = obj.city
        div.appendChild(h2)
       
        //score
        let divScore = document.createElement('div')
        divScore.classList.add('item')
        divScore.classList.add('item-score')
        container.appendChild(divScore)

        let spanScore = document.createElement('span')
        spanScore.innerHTML = obj.score
        divScore.appendChild(spanScore)
        divScore.classList.add('divScore')

        if(obj.score > 7.5){
            spanScore.classList.add('red')
        } else if (obj.score < 7.5 && obj.score > 6 ){
            spanScore.classList.add('orange')
        } else if (obj.score < 6 && obj.score > 4.5 ){
            spanScore.classList.add('yellow')
        } else {
            spanScore.classList.add('green')
        }

        //active patients for 10K
        let divActivePat10K = document.createElement('div')
        divActivePat10K.classList.add('item')
        container.appendChild(divActivePat10K)

        let pActivePat10K = document.createElement('p')
        pActivePat10K.innerHTML = obj.newInfectedsFor10KPeople
        divActivePat10K.appendChild(pActivePat10K)

        //Percentage of positive tests
        let divPercentagePositiveTests = document.createElement('div')
        divPercentagePositiveTests.classList.add('item')
        container.appendChild(divPercentagePositiveTests)

        let pPercentagePositiveTests = document.createElement('p')
        pPercentagePositiveTests.innerHTML = obj.positiveTestPercentage + '%'
        divPercentagePositiveTests.appendChild(pPercentagePositiveTests)

        //verified Change Rate
        let divVerifiedChangeRate = document.createElement('div')
        divVerifiedChangeRate.classList.add('item')
        container.appendChild(divVerifiedChangeRate)

        let pVerifiedChangeRate = document.createElement('p')
        pVerifiedChangeRate.innerHTML = obj.verifiedChangeRate  + '%'
        divVerifiedChangeRate.appendChild(pVerifiedChangeRate)

        //active patients
        let divActivePatients = document.createElement('div')
        divActivePatients.classList.add('item')
        container.appendChild(divActivePatients)

        let pActivePatients = document.createElement('p')
        pActivePatients.innerHTML = obj.activePatients
        divActivePatients.appendChild(pActivePatients)

        

        
        addEventListenerToSearchTrafficLightPlan(data)
    })

}
function addEventListenerToSearchTrafficLightPlan(data) {
    let input = document.querySelector('#searchInputTraffic')

    input.addEventListener('input', (e) => {
        e.preventDefault()
        
        let foundCities = []
        data.forEach((obj) => {
            if(obj.city.includes(input.value)){
                foundCities.push(obj)
            }
        })
        console.log('foundCities', foundCities);

        document.querySelector('#tableTrafficTitle').innerHTML = ''
        document.querySelector('#tableTraffic').innerHTML = ''
        if(foundCities.length === 0){
            setTableTrafficLightPlan(data)
        } else {
            setTableTrafficLightPlan(foundCities)
        }
    })
}
function loadSection7() {
    loadDataForHospitalStatus()
}
//table hospital status
function loadDataForHospitalStatus() {
    fetch('/hospital-status')
    .then(response => response.json())
    .then(data => {
        setTableHospitalStatus(data)
    });
}
function setTableHospitalStatus(data) {
    // create header
    let containerTitle = document.querySelector('#tableHospitalStatusTitle')
    let headerList = ['בית חולים','% תפוסה כללי','% תפוסה קורונה','אנשי צוות מאומתים<br>ובבידוד']
    let idList = ['hospitalName', 'occupancyRate', 'occupancyCorona', 'staffInIsolation']


    for(let i = 0 ; i < headerList.length ; i++){
        let div = document.createElement('div')
        div.classList.add('title')
        containerTitle.appendChild(div)

        if(i === 0){
            div.classList.add('firstTitle')
        }

        let button = document.createElement('button')
        button.id = idList[i]
        button.innerHTML = headerList[i]
        div.appendChild(button)
    }
  

    //create table
    let container = document.querySelector('#tableHospitalStatus')
    data.forEach((obj) => {
        //hospital
        let div = document.createElement('div')
        div.classList.add('item')
        div.classList.add('item-title')
        container.appendChild(div)

        let h2 = document.createElement('h2')
        h2.innerHTML = obj.hospitalName
        div.appendChild(h2)
       
        //occupancy rate
        let divOccupancyRateContainer = document.createElement('div')
        divOccupancyRateContainer.classList.add('divDoseContainer')
        divOccupancyRateContainer.classList.add('item')
        container.appendChild(divOccupancyRateContainer)

        let divOccupancyRateProgress = document.createElement('div')
        divOccupancyRateProgress.classList.add('progress')
        divOccupancyRateContainer.appendChild(divOccupancyRateProgress)

        let divOccupancyRateProgressLeft = document.createElement('div')
        divOccupancyRateProgress.appendChild(divOccupancyRateProgressLeft)

        let divOccupancyRateProgressRight = document.createElement('div')
        divOccupancyRateProgressRight.style.width = obj.occupancy +'%'
        divOccupancyRateProgressRight.style.height = '10px'
        divOccupancyRateProgressRight.classList.add('occupancyProgressRight')
        divOccupancyRateProgress.appendChild(divOccupancyRateProgressRight)

        let divOccupancyPercent = document.createElement('div')
        divOccupancyRateContainer.appendChild(divOccupancyPercent)

        let pOccupancy = document.createElement('p')
        pOccupancy.innerHTML = obj.occupancy + '%'
        divOccupancyPercent.appendChild(pOccupancy)

        //corona occupancy rate
        let divCoronaOccupancyRateContainer = document.createElement('div')
        divCoronaOccupancyRateContainer.classList.add('divDoseContainer')
        divCoronaOccupancyRateContainer.classList.add('item')
        container.appendChild(divCoronaOccupancyRateContainer)

        let divCoronaOccupancyRateProgress = document.createElement('div')
        divCoronaOccupancyRateProgress.classList.add('progress')
        divCoronaOccupancyRateContainer.appendChild(divCoronaOccupancyRateProgress)

        let divCoronaOccupancyRateProgressLeft = document.createElement('div')
        divCoronaOccupancyRateProgress.appendChild(divCoronaOccupancyRateProgressLeft)

        let divCoronaOccupancyRateProgressRight = document.createElement('div')
        divCoronaOccupancyRateProgressRight.style.width = obj.coronaOccupancy === -1 ? 0 : obj.coronaOccupancy +'%'
        divCoronaOccupancyRateProgressRight.style.height = '10px'
        divCoronaOccupancyRateProgressRight.classList.add('occupancyProgressRight')
        divCoronaOccupancyRateProgress.appendChild(divCoronaOccupancyRateProgressRight)

        let divCoronaOccupancyPercent = document.createElement('div')
        divCoronaOccupancyRateContainer.appendChild(divCoronaOccupancyPercent)

        let pCoronaOccupancy = document.createElement('p')
        pCoronaOccupancy.innerHTML = obj.coronaOccupancy === -1 ? 'אין מידע' : obj.coronaOccupancy +'%'
        divCoronaOccupancyPercent.appendChild(pCoronaOccupancy)

        //staff in isolation
        let divStaff = document.createElement('div')
        divStaff.classList.add('item')
        container.appendChild(divStaff)

        let pStaff = document.createElement('p')
        pStaff.innerHTML = obj.staffInIsolation
        divStaff.appendChild(pStaff)
    })

}

//accessiblity button
function addEventListenerToAccessiblityButton() {
    document.querySelector('#accessiblityButton').addEventListener('click', (e) => {
        e.preventDefault()


        let header = document.querySelector('.header')
        header.classList.toggle('headerAccessible')

        let accessiblityButton = document.querySelector('#accessiblityButton')
        accessiblityButton.classList.toggle('accessiblityPressed')

        let general = document.querySelector('.general')
        general.classList.toggle('generalAccessiblity')

        let dates = document.querySelector('.section6-first-section-dates')
        dates.classList.toggle('section6-first-section-dates-accessible')

        let graphIcon = document.querySelectorAll('.graphIcon')
        graphIcon.forEach((container) => {
            container.classList.toggle('graphIconAccessible')
        })
        let innerContainers = document.querySelectorAll('.innerContainer')
        innerContainers.forEach((container) => {
            container.classList.toggle('innerContainerAccessiblity')
        })
        let openMenu = document.querySelectorAll('.section2-openMenu')
        openMenu.forEach((container) => {
            container.classList.toggle('section2-openMenuAccessible')
        })
        let title = document.querySelectorAll('.title')
        title.forEach((container) => {
            container.classList.toggle('titleAccessible')
        })
        let input = document.querySelectorAll('input')
        input.forEach((container) => {
            container.classList.toggle('searchAccessible')
        })
        let firstDoseProgressRight = document.querySelectorAll('.firstDoseProgressRight')
        firstDoseProgressRight.forEach((container) => {
            container.classList.toggle('firstDoseProgressRightAccessible')
        })
        let secDoseProgressRight = document.querySelectorAll('.secDoseProgressRight')
        secDoseProgressRight.forEach((container) => {
            container.classList.toggle('secDoseProgressRightAccessible')
        })
        let progress = document.querySelectorAll('.progress')
        progress.forEach((container) => {
            container.classList.toggle('progressAccessible')
        })
        let spanScore = document.querySelectorAll('.spanScore')
        spanScore.forEach((container) => {
            container.classList.toggle('spanScoreAccessible')
        })
        let divScore = document.querySelectorAll('.divScore')
        divScore.forEach((container) => {
            container.classList.toggle('divScoreAccessible')
        })

        let occupancyProgressRight = document.querySelectorAll('.occupancyProgressRight')
        occupancyProgressRight.forEach((container) => {
            container.classList.toggle('occupancyProgressRightAccessible')
        })
    })
}