function setVaccinTable(jsonObj) {

    for(let i = 0; i < 100 ; i ++){
        let form = document.querySelector('.vaccinFormEditInfo')
                
        let cityNameInput = document.createElement('input')
        cityNameInput.value = jsonObj[i].city
        form.appendChild(cityNameInput)

        let cityCodInput = document.createElement('input')
        cityCodInput.value = jsonObj[i].cityCode
        form.appendChild(cityCodInput)

        let dateInput = document.createElement('input')
        dateInput.value = jsonObj[i].date
        form.appendChild(dateInput)

        let firstDoseInput = document.createElement('input')
        firstDoseInput.value = jsonObj[i].firstDose
        form.appendChild(firstDoseInput)

        let secoundDoseInput = document.createElement('input')
        secoundDoseInput.value = jsonObj[i].secoundDose
        form.appendChild(secoundDoseInput)
    }


    // jsonObj.forEach((obj)=>{
    //             let form = document.querySelector('.vaccinForm')
                
    //             let cityNameInput = document.createElement('input')
    //             cityNameInput.value = obj.city
    //             form.appendChild(cityNameInput)
        
    //             let cityCodInput = document.createElement('input')
    //             cityCodInput.value = obj.cityCode
    //             form.appendChild(cityCodInput)
        
    //             let dateInput = document.createElement('input')
    //             dateInput.value = obj.date
    //             form.appendChild(dateInput)
        
    //             let firstDoseInput = document.createElement('input')
    //             firstDoseInput.value = obj.firstDose
    //             form.appendChild(firstDoseInput)
        
    //             let secoundDoseInput = document.createElement('input')
    //             secoundDoseInput.value = obj.secoundDose
    //             form.appendChild(secoundDoseInput)
    //         })   
}
function addEventListenerToAddInfoButton() {
    let button = document.querySelector('#addInfoButton')
    button.addEventListener('click', (e)=>{
        e.preventDefault()
        console.log('Click!');
        
        
    })
}
function addEventListenerToEditInfoButton() {
    let button = document.querySelector('#editInfoButton')
    button.addEventListener('click', (e)=>{
        e.preventDefault()
        console.log('Click!');
        
    })
}

if(document.querySelector('.adminView')!== null){
    window.onload = (e) => {
        fetch('/immunization-indices', {
            method: 'GET'
        })
        .then((res)=>{
            if(res.ok){
                return res.json()
            } else {
                throw new Error(res.status)
            }
        })
        .then(async (jsonObj) => {
            console.log(jsonObj);
            //setVaccinTable(jsonObj)

            addEventListenerToAddInfoButton()
            addEventListenerToEditInfoButton()
        })
        .catch((err)=>{
            console.log(err); 
        })
    }
}
