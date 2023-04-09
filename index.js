const buttonInputElement = document.querySelector('.add-form-button');
const nameInputElement = document.querySelector('.add-form-name');
const commentInputElement = document.querySelector('.add-form-text');
const listElement = document.querySelector('.comments');
buttonInputElement.disabled = true;
let arrayOfComments=[];
let formElement = document.querySelector('.add-form');
let loadElement = document.querySelector('.loading');
let containerElement =document.querySelector('.container-loading');

containerElement.textContent  = 'Пожалуйста подождите, загружаю комментарии';

reload();


checkValue();

  function reload() {

    fetch("https://webdev-hw-api.vercel.app/api/v1/egor-zuev/comments", {
      method: "GET"
    }).then((response) => {
          return response.json()
    }).then((responseData) => {            

          arrayOfComments = responseData.comments.map(el => {

                return{
                    name: el.author.name,
                    time: myDate(el.date),
                    text: el.text,
                    likes1: el.likes,
                    likes2: el.isLiked == true ? '-active-like' : '',
                };              
          });    

          renderComment();
    
          formElement.classList.remove('add-form-load');
          loadElement.classList.remove('loading-on');
          containerElement.textContent ='';
          
      });
  };

  function renderComment() {

      const listElement = document.querySelector('.comments');
      
      listElement.innerHTML = arrayOfComments.map((el,index)=> el=`
            <li class="comment" data-index='${index}'>
              <div class="comment-header">
                <div class="comment-author">${el.name}</div>
                <div class="comment-time">${el.time}</div>
              </div>
              <div class="comment-body">
                <div class="comment-text">
                  ${el.text}
                </div>
              </div>
              <div class="comment-footer">
                
                <div class="likes">
                  <span class="likes-counter">${el.likes1}</span>
                  <button class="like-button ${el.likes2} "></button>
                </div>
              </div>
            </li>`).join('');  

      likes();         
  }

  function checkValue() {
    if( nameInputElement.value != '' && commentInputElement.value != '') buttonInputElement.disabled = false; 
  }

  buttonInputElement.addEventListener('click',() => {

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

    fetch("https://webdev-hw-api.vercel.app/api/v1/egor-zuev/comments", {

      method: "POST",

      body: JSON.stringify({ 
                text:commentInputElement.value,
                name: nameInputElement.value,
                likes1: el.likes,
                })
    }).then((response) => {

       return response.json()

    }).then((responseData) => {
          
       reload();   

    });
     

    nameInputElement.value = '';
    commentInputElement.value = '';
     
  });

  function myDate (a) {
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

  function likes() {
 
    const listItems = listElement.querySelectorAll('.comment');

      for(let key of listItems) {

          const likeButton = key.querySelector('.like-button');
          const likeCounter = key.querySelector('.likes-counter');
         
          likeButton.addEventListener('click',(event) => {
           
              event.stopPropagation();  

              likeButton.classList.add('-loading-like');
              
              delay(2000).then(() => {

                  likeButton.classList.toggle('-active-like');
                  likeButton.classList.contains('-active-like') ? likeCounter.innerHTML++ : likeCounter.innerHTML--;
                  likeButton.classList.remove('-loading-like');

              })                   

          })
      }

  }

    function delay(interval = 300) {

        return new Promise((resolve) => {

          setTimeout(() => {
            resolve();
          }, interval);

        });
    }
