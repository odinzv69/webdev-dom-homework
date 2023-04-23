
 


export async function getDataFromAPI (apiUrl, token) {

    let response = await fetch(apiUrl, {

          method: "GET",

          headers: {
                Authorization: token,
          },
    });
    let responseData =await response.json(); 
    return responseData;  
  
}

//---------------------------------------------------------------------------------------

export async function postDataToAPI (apiUrl, comment, token) {
    
    let response = await fetch(apiUrl, {

          method: "POST",
    
          body: JSON.stringify({ 
                    text:comment.value,
                }),

          headers: {
                 Authorization: token,
          },
    });

    if (response.status == 400) {
          throw new Error(400);
    }

    if (response.status == 500) {
          throw new Error(500);
    }
          
    let responseData = await response.json();
    return responseData;
}

//---------------------------------------------------------------------------------------

export async function getUserFromAPI (apiToRegistration) {

    let response = await fetch(apiToRegistration);
    let responseData =await response.json(); 
    return responseData;  
  
}

//---------------------------------------------------------------------------------------

export async function registrationFetch (apiToRegistration, nameElement, loginElement, passwordElement){

    let response =await fetch(apiToRegistration, {
        method: "POST",

        body: JSON.stringify({
            
                "login": loginElement.value,
                "name": nameElement.value,
                "password": passwordElement.value
            
        })
        
    });
    if (response.status == 400) {
        throw new Error(4001);
    }
    let responseData = await response.json();
    return responseData;
} 

//---------------------------------------------------------------------------------------

export async function loginFetch (apiToLogin,loginElement, passwordElement){
    let response =await fetch(apiToLogin, {
          method: "POST",
  
          body: JSON.stringify({
              
                  "login": loginElement.value,
                  "password": passwordElement.value
              
          })
          
      });
      if (response.status == 400) {
          throw new Error(4002);
      }
      let responseData = await response.json();
      return responseData;

}

//---------------------------------------------------------------------------------------

export async function deleteFetch (apiAdress, token){

    let response =await fetch(apiAdress, {
      method: "DELETE",   
  
      headers: {
             Authorization: token,
      },
          
      });              
      let responseData = await response.json();
      return responseData;
  
   }
//---------------------------------------------------------------------------------------

export async function likeFetch (apiAdress, token){

    let response =await fetch(apiAdress, {
      method: "POST",   
  
      headers: {
             Authorization: token,
      },
          
      });              
      let responseData = await response.json();
      return responseData;
  
   }