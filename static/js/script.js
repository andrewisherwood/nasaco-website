//Header Nav Functionality
const navOpen = document.querySelector('.nav-js');
const navItem = document.querySelector('.mobile-nav');
const bodyFixed = document.querySelector('.body-js');
const barTop = document.querySelector('.nav-bar-top');
const barCenter = document.querySelector('.nav-bar-center');
const barBottom = document.querySelector('.nav-bar-bottom');

navOpen.addEventListener('click', (e) => {
    navItem.classList.toggle('mobile-nav-active');
    bodyFixed.classList.toggle('body-active');
    navOpen.classList.toggle('nav-js-active');
    barTop.classList.toggle('nav-bar-top-active');
    barCenter.classList.toggle('nav-bar-center-active');
    barBottom.classList.toggle('nav-bar-bottom-active');
})

//Popup Functionality
const popupButton = document.querySelector('#pdf-button-js');
const popupForm = document.querySelector('.popup-js');
const popupMain = document.querySelector('.popup-main');
const popupCloses = document.querySelectorAll('.popup-close');

document.addEventListener('click', e => {
    let isClickInside = popupButton.contains(e.target);
    let isClickForm = popupForm.contains(e.target);
    if(isClickInside){
        popupForm.classList.add('popup-js-active');
        popupMain.classList.add('popup-main-active');
    }else if(isClickForm){

    }else{
        popupForm.classList.remove('popup-js-active');
        popupMain.classList.remove('popup-main-active');
    }
})
popupCloses.forEach((popupClose) => {
    popupClose.addEventListener('click', e => {
        popupForm.classList.remove('popup-js-active');
        popupMain.classList.remove('popup-main-active');
    })
})

//download

