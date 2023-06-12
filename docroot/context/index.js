import {useState, createContext, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";



const UserContext = createContext();

const UserAccess = ({children})=>{
    const [state,setState] = useState({
        token:"",
        appSessionID:"",
        userID:""
      });

      const router = useRouter();

      const token = state && state.token ? state.token : "" ;
  
    //   axios.defaults.baseURL = 'https://backend.ergomanager.net/api';
      //for local environment --->use the below url
      axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;


    useEffect(()=>{
        handleCheck()
        var data = JSON.parse(window.sessionStorage.getItem("token"))
        console.log(data)
        
        if(data !== null){
            console.log("sasdsd")
               setState({
                token:data.token,
                appSessionID:data.appSessionID,
                userID: data.contactID
               }); 
               console.log("sasdsd2")
               console.log("state--->",state.token,state.appSessionID)
        }
    },[])
    
    const handleCheck = async ()=>{
        var data = JSON.parse(window.sessionStorage.getItem("token"))
        if(data === null){
            data = "null";
        }
        const res = await axios.get(`/appsession/${data.appSessionID}/${data.token}`)
        console.log("res------>",res)

        // && res.config && !res.config.__isRetryRequest
        if(res.data.status === 401 && res.config && !res.config.__isRetryRequest ){
            setState(null);
            window.sessionStorage.removeItem("token");
            router.push("/login");
        }
    }
  

 
    //to force logout in expiring of jwt
//     axios.interceptors.response.use(
//         function(response) {
//             console.log("resp-------", response)
//             return response;
//     }, 
//     function(error){

//         let response= error.response;
//         if(response.status === 401 && response.config && !response.config.__isRetryRequest){
//             setState(null);
//             window.sessionStorage.removeItem("token");
//             router.push("/login");
//         }
    
// }

    // );

    return(
        <UserContext.Provider value={[state , setState]}>
        {children}
        </UserContext.Provider>
    )

}

export {UserContext, UserAccess}