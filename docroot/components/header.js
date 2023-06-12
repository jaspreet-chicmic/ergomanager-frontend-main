import React,{useState, useEffect, useContext} from 'react'
import Link from "next/link";
import { useRouter  } from "next/router";
import axios from 'axios'
import {UserContext} from '../context'
import ReactLoading from 'react-loading'
import { kk } from 'date-fns/locale';

const Header = ({setLocdataz,setLocdropdown,setCusID}) => {
  const router = useRouter();
  const [state,setState] = useContext(UserContext)
  const [data, setData ] = useState([])
  const [locdata, setLocdata ] = useState([])
  const [passvalue,setPassvalue] = useState([])
  const [passvalueN,setPassvalueN] = useState([{ locName: "Select Location"}])
  const [done, setDone] = useState(undefined)
    
  useEffect(() => {
    if(state !== null){
    console.log('Customers header--->',state,state.token,state.userID,state.appSessionID)
    getCustomers(state.token,state.userID,state.appSessionID)
    // getCustomersbyUsers(state.token,state.userID,state.appSessionID)
     getLocation()
    }
  },[state&&state.token&&state.userID&&state.appSessionID,setLocdataz])
  //get all customers
  const getCustomers = async (token,appSessionID) => {
    try{
      console.log("token,appSessionID",token,appSessionID)
    const res = await axios.post("/getCustomersByContact",{token,appSessionID})
    console.log("CustomersList!@#$%^&*---->", res.data.response.data);
    // setData(JSON.parse(res.data.response.data[0].fieldData.g_Result))
    setData(res.data.response.data)
   
    const L1 =  res.data.response.data.map((e) => {return  {id: e.fieldData.IDf_Customer, name: e.fieldData.customerName , organizationName : e.fieldData.organizationName}})
    setPassvalue(L1)
    // console.log('mapit-------->CUS',cus);
    setDone(true)
    if(res.data.status === 401){
      toast.error(res.data.statusText)
      router.push('/login')
    }
    }
    catch(err){
      console.log("error--->",err)
  }
   };

   console.log("popopopop",passvalue);

  //get allcustomers based on users ---- need to work here ----
  // const getCustomersbyUsers = async (token,userID,appSessionID) => {
  //   try{
  //     console.log("token,appSessionID,userID",token,appSessionID,userID)
  //   const res = await axios.post("/getCustomersByUser",{token,userID,appSessionID})
  //   console.log("CustomersListByUSERS-8-8-8-8-8-8---->", res.data.response.data);
  //   // setData(JSON.parse(res.data.response.data[0].fieldData.g_Result))
  //   setData(res.data.response.data)
   
  //   const L1 =  res.data.response.data.map((e) => {return  {id: e.fieldData.ID, IDf_Customer: e.fieldData.IDf_Customer , IDf_User : e.fieldData.IDf_User}})
  //   setPassvalue(L1)
  //   // console.log('mapit-------->CUS',cus);
  //   setDone(true)
  //   if(res.data.status === 401){
  //     toast.error(res.data.statusText)
  //     router.push('/login')
  //   }
  //   }
  //   catch(err){
  //     console.log("error--->",err)
  // }
  //  };
  
  const getLocation = async (e) => {
    try{
      console.log("location----------->",e.target.value)
      var cusID = e.target.value;
      window.sessionStorage.setItem('CusID',cusID)
      setCusID(cusID)
    const res = await axios.post("/getLocation",{
      token:state.token,
      userID:state.userID,
      appSessionID:state.appSessionID,
      cusID
    })

    setLocdata(res.data.response.data)
    console.log('DATA',res.data.response.data);
    const L2 = res.data.response.data.map((e)=> {return {id: e.fieldData.ID, idf_cus: e.fieldData.IDf_Customer , locName : e.fieldData.locationNameAndCodeCombo}})
    setPassvalueN(L2)
    setLocdropdown(L2)
    setDone(true)
    window.sessionStorage.setItem('location',L2[0].id);
    window.sessionStorage.setItem('LocName',L2[0].locName);
    var locId= L2[0].id
    setLocdataz({locId})
    // console.log("after set---->",setLocdataz)
    if(res.data.status === 401){
      toast.error(res.data.statusText)
      router.push('/login')
    }
    }
    catch(err){
      console.log("error--->",err)
  }
   };

   const getLocationdrop = async (e) => {
    try{
      console.log("location drop----------->",e.target.value)
      window.sessionStorage.setItem('LocName',e.target.value)
    var locId= e.target.value
    setLocdataz({locId})

      
    }
    catch(err){
      console.log("error--->",err)
  }
   };
   

  //  const setLocation = async (e)=>{
  //   console.log("setlocationId----------->",e.target.value)
  //   window.sessionStorage.setItem("location",e.target.value)
  //   setLocdataz({locId})
  //  }
  // const field1 = [...new Set(data.map((Val) => Val.fieldData.name))];
  //  console.log("field1---->MF",passvalue)
  //  console.log("field1---->",passvalueN)
  

  const url = router.route
  const { locale } = router;
  const handleLanguageToggle = () => {
    switch(locale) {
      case "en-US":
        router.push(`${url}`,`${url}`, { locale: "el" });
        break;
      case "el":
        router.push(`${url}`,`${url}`, { locale: "en-US" });
        break; 
    }
  }
  return (
    <div className="top_header">
      <div className="Desktopflex_Mobileblock AlignItem_center">
       <div className="desktopMr16_mobileMb16">
          <button className="gray_btn">LOGO</button>
        </div>
        <div className="desktopMr16_mobileMb16">
        <>
          { !done ?  <div className='input_form width_340' style={{paddingLeft: '8em'}}><ReactLoading type="cylon" color="#D93A49" height={40} width={40} /></div> : (
           
              <select className="input_form width_340"  onChange={getLocation}>
                <option>Select Customer</option>
              {
                passvalue.map((e,i)=>{
                  return <option key={i} value={e.id}> {e.name} </option>
                })
              }
            </select>
          )}
          </>
        </div> 
        <div className="desktopMr16_mobileMb16">
           <>
          { !done ?  <div className='input_form width_340' style={{paddingLeft: '8em'}}><ReactLoading type="cylon" color="#D93A49" height={40} width={40} /></div> : (           
              <select className="input_form width_340" onChange={getLocationdrop}>
              {
                passvalueN.map((e,i)=>{
                  return <option key={i} value={e.id}> {e.locName} </option>
                })
              }
            </select>
            
          )}
          </>
        </div>
        <div className="mobspace_mb16">
          <button className="bookopen_btn">
            <img src="/images/book_open.svg" />
          </button>
        </div> 
      </div>


      <div className="DisplayFlex AlignItem_center">
        <div className="mr_12">
          <a onClick={handleLanguageToggle} className="language_selector">
            {locale}
            <img className="ml_8" src={ locale === "el"  ? "/images/ea_language.png" : "/images/us_language.svg" } />
          </a>
        </div>
        <div>
        <Link href="/settings/personal">
          <a className="user_profile">
            <img className="ml_8" src="/images/user_profile.svg" />
          </a>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Header
