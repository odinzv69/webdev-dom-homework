const buttonInputElement = document.querySelector('.add-form-button');
const buttonExitElement = document.querySelector('.exit-button');
const nameInputElement = document.querySelector('.add-form-name');
const commentInputElement = document.querySelector('.add-form-text');
const listElement = document.querySelector('.comments');
buttonInputElement.disabled = true;
let arrayOfComments=[];
let formElement = document.querySelector('.add-form');
let loadElement = document.querySelector('.loading');
let containerElement =document.querySelector('.container-loading');
let apiUrl = "https://webdev-hw-api.vercel.app/api/v2/egor-zuev/comments";
let loginText = document.querySelector('.login-text');
let token = '';

import { renderComment } from "./render.js";
import { getDataFromAPI, postDataToAPI, deleteFetch, likeFetch} from "./api.js";
import { errorAlert, myDate} from "./tools.js";

//---------------------------------------------------------------------------------------------

  if(window.localStorage.getItem('token')){
    token = 'Bearer ' + window.localStorage.getItem('token');
  }
  if(window.localStorage.getItem('name')){
    nameInputElement.value = window.localStorage.getItem('name');
    nameInputElement.disabled = true;
  }

containerElement.textContent  = 'Пожалуйста подождите, загружаю комментарии';

reload();
 
formElement.classList.add('add-form-load');
loginText.style.display = 'none';

//-------------------------------------------------------------------------------------------

// 1. Функция получает данные из API в формате JSON, обрабатывает их и обновляет список комментариев

function reload() {

    getDataFromAPI(apiUrl, token)

    .then((responseData) => {  
            
          
          arrayOfComments = responseData.comments.map(el => {

                return{
                    index: el.id,
                    name: el.author.name,
                    time: myDate(el.date),
                    text: el.text,
                    'likes-counter': el.likes,
                    'likes-class': el.isLiked == true ? '-active-like' : '',
                };              
          });    

          renderComment(listElement, arrayOfComments, token, deleteFetch, likeFetch, reload);
    
          
          loadElement.classList.remove('loading-on');
          containerElement.textContent ='';
          if (token !='')  formElement.classList.remove('add-form-load');
          (token =='') ?  loginText.style.display = 'block' : loginText.style.display = 'none';          
          
    });
};

//-------------------------------------------------------------------------------------------------------

// 2. Функция проверяет введенные данные, преобразовывает в формат JSON. 
//      Отправляет в API и по обратному запросу обновляет комментарии


function postAndGetComments() {

  if(nameInputElement.value == '' || commentInputElement.value == '') return;

  nameInputElement.value = nameInputElement.value.replaceAll("&", "&amp;")
                                                .replaceAll("<", "&lt;")
                                                .replaceAll(">", "&gt;");
      
  commentInputElement.value = commentInputElement.value.replaceAll("&", "&amp;")
                                                      .replaceAll("<", "&lt;")
                                                      .replaceAll(">", "&gt;")
                                                      .replaceAll('◄', '<div class ="quote">')
                                                      .replaceAll('►', '</div><br>');

                                                      
  formElement.classList.add('add-form-load');  
  loadElement.classList.add('loading-on');  
  buttonInputElement.disabled = true;

  postDataToAPI (apiUrl, commentInputElement, token)
  
  .then((responseData) => {
        
      reload();  
      
      commentInputElement.value = ''; 

  }).catch((error) => {
        
      errorAlert(error,postAndGetComments, formElement , loadElement, buttonInputElement);       

  });

}

//-------------------------------------------------------------------------------------------------------

// 3. Функция снимает блокировку кнопки ввода комментариев

  nameInputElement.addEventListener('input',checkValue);
  commentInputElement.addEventListener('input',checkValue);

  function checkValue() {
    if( nameInputElement.value != '' && commentInputElement.value != '') buttonInputElement.disabled = false; 
    if(commentInputElement.value != '') buttonInputElement.disabled = false; 
  }

//-------------------------------------------------------------------------------------------------------  

// 4. Функция - обработчик клика на кнопку отправки комментариев

  buttonInputElement.addEventListener('click',postAndGetComments); 

//-------------------------------------------------------------------------------------------------------

// 5. Функция - обработчик клика на кнопку выхода

  buttonExitElement.addEventListener('click', ()=>{
    window.localStorage.clear();
    window.location.href='login.html';
  })