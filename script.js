// Fecthing the data
let countryArr = []; // countryArr for select option
let maleNameArr = [];
let femaleNameArr = [];
let surnameArr = [];
let countryNameArr = []; // countryNameArr for searching purpose;

fetch('https://raw.githubusercontent.com/thm/uinames/master/uinames.com/api/names.json')
    .then((response) => response.json())
    .then((data) => {
        for (let i = 0; i < data.length; i++) {
            countryArr.push(data[i].region);
            countryNameArr.push(data[i].region);
            maleNameArr.push(data[i].male)
            femaleNameArr.push(data[i].female)
            surnameArr.push(data[i].surnames)
        }
    });

// query selectors are here
const selectCountryName = document.querySelector('#countryName');
const searchButton = document.querySelector('.searchButton');
const displaySection = document.querySelector('#displaySection');
const selectGender = document.querySelector('#gender');
const nameDisplayHeading = document.querySelector('.nameDisplayHeading');
const surnameDisplayHeading = document.querySelector('.surnameDisplayHeading');
const nameDisplayContent = document.querySelector('.nameDisplayContent');
const surnameDisplayContent = document.querySelector('.surnameDisplayContent');

const checkCountryName = setInterval(() => {
    if (countryArr.length > 0) {
        for (let i = 0; i < countryArr.length; i++) {
            let option = document.createElement('option')
            option.textContent = countryArr[i];
            option.value = countryArr[i];
            selectCountryName.appendChild(option)
        }
        countryArr = [];
    }
}, 10)
// addEventListeners are here
selectCountryName.addEventListener('change', (event) => {
    selectCountryName.value = event.target.value;
})

selectGender.addEventListener('change', (event) => {
    selectGender.value = event.target.value;
})

let submit = false;

const check = setInterval(() => {
    if (submit) {
        submit = false
    }
}, 1000)


searchButton.addEventListener('click', () => {
    if (!submit) {
        submit = true
        // console.log('on', submit);
        if (selectCountryName.value.length > 0 && selectGender.value.length > 0) {
            // console.log('You can show name');
            displaySection.style.visibility = 'visible';
            displayContent(selectCountryName.value, selectGender.value);
        }

        if (selectCountryName.value.length === 0 || selectGender.value.length === 0) {
            displaySection.style.visibility = 'hidden';
        }
    }
})


const displayContent = (countryName, genderName) => {
    nameDisplayHeading.textContent = `${genderName} Name(s)`;
    surnameDisplayHeading.textContent = 'Surname(s)';

    nameDisplayContent.innerHTML = '';
    surnameDisplayContent.innerHTML = '';


    let searchIndex = countryNameArr.indexOf(countryName);
    let nameArr, surArr;
    surArr = surnameArr[searchIndex]
    if (genderName === 'Male') {
        nameArr = maleNameArr[searchIndex]
    }
    if (genderName === 'Female') {
        nameArr = femaleNameArr[searchIndex]
    }

    for (let i = 0; i < nameArr.length; i++) {
        let Pname = document.createElement('p');
        Pname.textContent = `${i + 1}.  ${nameArr[i]}`;
        Pname.className = 'same';
        nameDisplayContent.appendChild(Pname)
    }
    for (let i = 0; i < surArr.length; i++) {
        let Psur = document.createElement('p');
        Psur.textContent = `${i + 1}.  ${surArr[i]}`;
        Psur.className = 'same';
        surnameDisplayContent.appendChild(Psur)
    }
    // console.log(nameArr, surArr);
}



