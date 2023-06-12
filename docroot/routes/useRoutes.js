import { useState, useEffect , useContext } from 'react';
import axios from "axios";
import {useRouter} from 'next/router';
import { SyncOutlined } from '@ant-design/icons';
import { UserContext } from '../context';

 const UserRoute = ({children}) => {
    const [ok, setOK]= useState(false);
    const [state,setState]= useContext(UserContext);
    const router = useRouter();
    
    useEffect(()=>{
      if (state && state.token)  handleCheck()
    },[state && state.token]);

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
        setOK(true)
    }

   state === null && setTimeout(() => {
    handleCheck();
    },1000);
     
    return !ok ? (
        <> {children}</>
    ) : (
        <SyncOutlined spin className="d-flex justify-content-center display-1 text-primary p-5"
    />
        )
}

export default UserRoute;