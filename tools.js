export function errorAlert(error, fn, formElement, loadElement, buttonInputElement) {
    
    switch(error.message){
      case '400':              
          alert('Имя и комментарий должны быть не короче 3 символов');
          formElement.classList.remove('add-form-load');
          loadElement.classList.remove('loading-on');
          buttonInputElement.disabled = false;
          break;
      case '4001':  
          alert('Такой пользователь уже существует');
          break;  
      case '4002':  
          let answer = confirm('Вы ввели неправильный логин и(или) пароль\nХотите продолжить без регистрации?');
          
            if(answer) {
                window.localStorage.clear();
                window.location.href='index.html'; 
            } else {
                alert('Попробуйте повторить...');
            }
          
          break;  
        
      case 'Failed to fetch': 
          alert('Отсутствует интернет-соединение. Проверьте компьютер');
          formElement.classList.remove('add-form-load');          
          loadElement.classList.remove('loading-on');
          buttonInputElement.disabled = false;
          break;
      case '500': 
          console.log('Сервер сломался, попробуй позже');
          fn();                                        
          break;
      default :
          alert('Не знаю что за ошибка');
          break;
    }
}

//------------------------------------------------------------------------------------------------------------------

export function myDate (a) {
    let date = new Date(a) || new Date();
    let monthArray=['01','02','03','04','05','06','07','08','09','10','11','12'];
    let myMinutes = String(date.getMinutes()).length < 2 ? '0' + date.getMinutes() : date.getMinutes();
    let myHours = String(date.getHours()).length < 2 ? '0' + date.getHours() : date.getHours();
    let myDay = String(date.getDate()).length < 2 ? '0' + date.getDate() : date.getDate();
    let myMonth = monthArray[+date.getMonth()];
    let myYear = String( date.getFullYear() ).slice(2);
    let str= myDay + '.' + myMonth + '.' + myYear + ' ' + myHours + ':' + myMinutes;
    return str;
}