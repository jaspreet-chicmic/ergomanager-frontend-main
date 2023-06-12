import React, { useState, useEffect ,useContext } from "react";
import CalenderView from "./CalenderView";
import useTranslation from "next-translate/useTranslation";
import { toast } from "react-toastify";
import axios from 'axios'
import { useRouter } from "next/router";
import {UserContext} from '../../context';
import IssueTable from "../../components/IssueTable";
import ReactLoading from 'react-loading'
import Filter from "../../components/filter";

const view = ({locdataz,cusID}) => {
  const [selectView, setSelectedView] = useState(true);
  const [visitStatus, setVisitStatus ] = useState([])
  const [visitType, setVisitType] = useState([])

  const handleSelect = (event) => {
    if (event.target.value === "Calender View") {
      setSelectedView(false);
    } else {
      setSelectedView(true);
    }
  };


  console.log('L->',locdataz,'C->',cusID);

  const [state,setState] = useContext(UserContext)
  const router = useRouter();
  useEffect(() => {
    if(state !== null){
    console.log('visits--UE->',state,state.token,state.userID,state.appSessionID)
    getVisits(state.token,state.userID,state.appSessionID)
    }
  },[state&&state.token&&state.userID&&state.appSessionID,cusID])

  const [data, setData ] = useState([])
  const [done, setDone] = useState(undefined)

  const getVisits = async (token,userID,appSessionID) => {
    try{
      console.log("token,userID,appSessionID---Fn",token,userID,appSessionID,locdataz.locId)
    const res = await axios.post("/getVisits",{
      token: token,
      userID: userID,
      appSessionID: appSessionID,
      LocationID: locdataz.locId,
      customerID: cusID
    })
    console.log("visits---->", res.data.response.data);
    setData(res.data.response.data)
    setDone(true)
    if(res.data.status === 401){
      toast.error(res.data.statusText)
      router.push('/login')
    }
    if(res.data.status === 500) 
    {toast.error(res.data.error)}
    }
    catch(err){
      console.log("error--->",err)
      // console.log("issues--->",message)
  }
   };

  useEffect(()=>{
    console.log("loaded")
    getVisits();
  },[])

  const query = (data) => {
    return data.filter(
      item => 
      (visitType.length === 0 ? item.fieldData.title.includes('') : visitType.some((key)=> item.fieldData['visitType'].includes(key))) 
      && (visitStatus.length === 0 ? item.fieldData.title.includes('') : visitStatus.some((key)=> item.fieldData['status'].includes(key)))
    )
  }

  let { t } = useTranslation()
  console.log('---->',data);
  console.log([...new Set(data.map((Val) => Val.fieldData.status))]);


  return (
    <div>
      <div className="page_info  ">
        <div className="DisplayFlex AlignItem_center">

          <div className="DisplayFlex">
            <div className={`tabdiv ${selectView && 'tabactive'}`} onClick={()=>setSelectedView(true)}>{t("visits:visitslist")}</div>
            <div className={`tabdiv ${!selectView && 'tabactive'}`} onClick={()=>setSelectedView(false)}>{t("visits:visitscalender")}</div>
          </div>

          {/* <h3 className="heading24_bold mr_12"> View</h3>
          <select onChange={handleSelect} className="input_form ">
            <option>List View</option>
            <option>Calender View</option>
          </select> */}
        </div>
        {/* <div className="VisitsTabBar mb_24">
          <ul>
            <li>
              <a href="#" className="active">
                List View
              </a>
            </li>
            <li>
              <a href="#">
                Calender View
              </a>
            </li>
          </ul>
        </div> */}
        <div>
          <button className="darkGray_btn" type="button">
            <img src="/images/add_icon.svg" className="mr_12" />
            {t("visits:addnewaudit")}
          </button>
        </div>
      </div>

      <div className="page_info  ">
        <div className="DisplayFlex AlignItem_center">
          {/* <button className="lightGrayborder_btn mr_12">
          {t("visits:filterbyvisitstatus")}
          </button>
          <button className="lightGrayborder_btn">{t("visits:filterbyvisittype")}</button> */}
          <Filter data={data} setVisitType={setVisitType} setVisitStatus={setVisitStatus} fil='view'/>
        </div>
        <div></div>
      </div>
      <div></div>
      {selectView ? 
      ( 
      !done ?  <div className="loaderdiv"><ReactLoading type="spin" color="#D93A49" height={50} width={50} /></div> : 
      <IssueTable data={query(data)} page='Visits'/> ) : 
      <CalenderView data={query(data)}/>}
    </div>
  );
};

export default view;
