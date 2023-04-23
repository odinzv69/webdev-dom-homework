
export function renderComment(list, obj, token, deleteFetch, likeFetch, reload) {
    
    list.innerHTML = obj.map((el,index)=> el=`
          <li class="comment" data-index='${el.index}'>
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
              <button class="delete-button">Удалить</button>
              <div class="likes">
                <span class="likes-counter">${el['likes-counter']}</span>
                <button class="like-button ${el['likes-class'] } "></button>
              </div>
            </div>
          </li>`).join('');  

    //if (token) likes(list);         
    if (token) deleteComment(list, token, deleteFetch,reload);    
    if (token) likeComment(list, token, likeFetch, reload);                  
}

//---------------------------------------------------------------------------------------

function deleteComment(list, token, deleteFetch, reload) {
 
    const listItems = list.querySelectorAll('.comment');  

    for(let key of listItems) {

        const deleteButton = key.querySelector('.delete-button');      
        
        deleteButton.addEventListener ('click',(event) => {
          
              event.stopPropagation();            
              
              let apiAdress=`https://webdev-hw-api.vercel.app/api/v2/egor-zuev/comments/${key.dataset.index}`;         

              
            deleteFetch (apiAdress, token)

            .then((responseData) =>{
              reload();
            })          
        })
    }
}

//---------------------------------------------------------------------------------------


function likeComment(list, token, likeFetch, reload) {
 
  const listItems = list.querySelectorAll('.comment');  

  for(let key of listItems) {

      const likeButton = key.querySelector('.like-button');
      
      
      likeButton.addEventListener ('click',(event) => {
            likeButton.classList.add('-loading-like');
            event.stopPropagation();            
            
            let apiAdress=`https://webdev-hw-api.vercel.app/api/v2/egor-zuev/comments/${key.dataset.index}/toggle-like`;         

            
          likeFetch (apiAdress, token)

          .then((responseData) => {
            reload();
            likeButton.classList.remove('-loading-like');            
          })          
      })
  }
}