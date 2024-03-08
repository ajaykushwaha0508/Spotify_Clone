import { BackendUrl } from "./config" ;

export const makeUnauthenticatedPOSTRequest = async(route , body)=>{
      const response = await fetch(BackendUrl + route , {
        method : "POST" ,
        headers : {
            "Content-type" : "application/json"
        },
        body : JSON.stringify(body)
      })

      const formattedResponse = await response.json();
      return formattedResponse;
};
const getToken=()=>{
  //here we use regex 
  // because we can use react cookie in front end 
  const accessToken = document.cookie.replace(
    /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,"$1"
  );
  return accessToken;
};

export const makeAuthenticatedPOSTRequest = async(route , body)=>{
  console.log("post request for ==> " , route);
  const token = getToken();
      const response = await fetch(BackendUrl + route , {
        method : "POST" ,
        headers : {
            "Content-type" : "application/json",
            Authorization : `Bearer ${token}`  // this is the authorization token 
        },
        body : JSON.stringify(body)
      })

      const formattedResponse = await response.json();
      return formattedResponse;
};

export const makeAuthenticatedGETRequest = async(route)=>{
  console.log("get request for ==> " , route);
      const token = getToken();
      const response = await fetch(BackendUrl + route , {
        method : "GET" ,
        headers : {
            "Content-type" : "application/json",
            Authorization : `Bearer ${token}`  // this is the authorization token 
        }       
      })

      const formattedResponse = await response.json();
      return formattedResponse;
};



