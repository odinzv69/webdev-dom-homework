import { errorAlert } from "./tools.js";
import { registrationFetch, loginFetch } from "./api.js";

const nameElement = document.querySelector('.login-form-name');
const loginElement = document.querySelector('.login-form-login');
const passwordElement = document.querySelector('.login-form-password');
const registrationLink = document.querySelector('.login-form-registration');
const titleElement = document.querySelector('.login-form-title');
const buttonLoginElement = document.querySelector('.login-form-button');
const enterLink = document.querySelector('.login-form-enter');
let isEnterForm = true;
let apiToRegistration = 'https://webdev-hw-api.vercel.app/api/user';
let apiToLogin = 'https://webdev-hw-api.vercel.app/api/user/login';



nameElement.style.display='none';
enterLink.style.display='none';
nameElement.value ='qwerty';
loginElement.value='';
passwordElement.value='';


colorValidate();

registrationLink.addEventListener('click',()=>{
    toRegistrationForm();
})

enterLink.addEventListener('click',()=>{
    toEnterForm();
})

buttonLoginElement.addEventListener('click',()=>{
    
    if(!isEnterForm) {
        
        registrationFetch (apiToRegistration, nameElement, loginElement, passwordElement)
        .then((responseData) =>{            
            alert ('Вы успешно зарегистрировались!\nДля продолжения работы введите логин,пароль\nи нажмите кнопку "Войти"');
            toEnterForm();
        })
        .catch((error) => {        
            errorAlert(error);             
        });

    } else{\

        window.localStorage.clear();

        loginFetch(apiToLogin, loginElement, passwordElement)
        .then((responseData) =>{            
            window.localStorage.setItem('token', responseData.user.token );
            window.localStorage.setItem('name', responseData.user.name );            
            window.location.href='index.html';
        })
        .catch((error) => {        
            errorAlert(error);             
        });        
    }
})

//------------------------------------------------------------------------------------------------

function toEnterForm(){
    titleElement.textContent = 'Форма входа';
    buttonLoginElement.textContent='Войти';
    nameElement.style.display='none';
    enterLink.style.display='none';
    registrationLink.style.display='flex';
    nameElement.value='';
    loginElement.value='';
    passwordElement.value='';
    isEnterForm=true;
    buttonLoginElement.disabled = false;
    nameElement.value ='qwerty';
    nameElement.style.backgroundColor = '#FFF';
    loginElement.style.backgroundColor = '#FFF';
    passwordElement.style.backgroundColor = '#FFF';
}

//----------------------------------------------------------------------------------------------------

function toRegistrationForm(){
    titleElement.textContent = 'Форма регистрации';
    buttonLoginElement.textContent='Зарегистрироваться';
    nameElement.style.display='block';
    enterLink.style.display='flex';
    registrationLink.style.display='none';
    nameElement.value='';
    loginElement.value='';
    passwordElement.value='';
    isEnterForm = false;
    buttonLoginElement.disabled = true;
    nameElement.style.backgroundColor = '#FFF';
    loginElement.style.backgroundColor = '#FFF';
    passwordElement.style.backgroundColor = '#FFF';
}
//-----------------------------------------------------------------------------------------------------------------------------------

function colorValidate(){
    nameElement.addEventListener('input',()=>{
        nameElement.value.length < 3 ? nameElement.style.backgroundColor = '#F794C9FC': nameElement.style.backgroundColor = '#B4F7A3FC'; 
        if(nameElement.value.length >= 3 && loginElement.value.length >= 3 && passwordElement.value.length >= 3){
            buttonLoginElement.disabled = false;
        } else buttonLoginElement.disabled = true;
    });

    loginElement.addEventListener('input',()=>{
        loginElement.value.length < 3 ? loginElement.style.backgroundColor = '#F794C9FC': loginElement.style.backgroundColor = '#B4F7A3FC'; 
        if(nameElement.value.length >= 3 && loginElement.value.length >= 3 && passwordElement.value.length >= 3){
            buttonLoginElement.disabled = false;
        } else buttonLoginElement.disabled = true;
    });
    passwordElement.addEventListener('input',()=>{
        passwordElement.value.length < 3 ? passwordElement.style.backgroundColor = '#F794C9FC': passwordElement.style.backgroundColor = '#B4F7A3FC'; 
        if(nameElement.value.length >= 3 && loginElement.value.length >= 3 && passwordElement.value.length >= 3){
            buttonLoginElement.disabled = false;
        } else buttonLoginElement.disabled = true;
    });
}