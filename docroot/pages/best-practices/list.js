import React,{useState,useEffect,useContext} from 'react'
import Cusmodal from "../../components/model";
import BestPractice from '../api/BestPractice';
import IssueTable from '../../components/IssueTable';
import Search from '../../components/search'
import Filter from '../../components/filter'
import useTranslation from "next-translate/useTranslation";
import UserRoute from '../../routes/useRoutes'
import axios from 'axios'
import { useRouter } from "next/router";
import {UserContext} from '../../context'
import ReactLoading from 'react-loading'

const BestPracticesId = ({locdropdown}) => {
  const [state,setState] = useContext(UserContext)
  const router = useRouter();
  useEffect(() => {
    if(state !== null){
    console.log('list--->',state,state.token,state.userID,state.appSessionID)
    getBestPractices(state.token,state.userID,state.appSessionID)
    }
  },[state&&state.token&&state.userID&&state.appSessionID])

  const [data, setData ] = useState([])
  const [done, setDone] = useState(undefined)

  const getBestPractices = async (token,userID,appSessionID) => {
    try{
      console.log("token,userID,appSessionID",token,userID,appSessionID)
    const res = await axios.post("/getBestPractices",{token,userID,appSessionID})

    console.log("BestPractices---->", res.data.response.data);
    setData(res.data.response.data)
    setDone(true)
    console.log('mapit',fieldData);
    if(res.data.status === 401){
      toast.error(res.data.statusText)
      router.push('/login')
    }
    }
    catch(err){
      console.log("error--->",err)
  }
   };
   useEffect(()=>{
    console.log("loaded")
    getBestPractices();
},[])

  let { t } = useTranslation()
  console.log('---->',data);
  var title = t("propstitle:bestpractice")

  const [ globalSearch, setGlobalSearch ] = useState('')
  const [ categoryFilter, setCategoryFilter ] = useState([])
  const [ dateAddedFilter, setDateAddedFilter ] = useState([])
  const [ dueDateFilter, setDueDateFilter] = useState([])
  const [ filter, setFilter ] = useState(false)

  const header = ['bestPractice','IDf_Location','date']  //category need to be added here

  // useEffect(()=>{
  //   setData(BestPractice)
  // },[])
  const query = (data) => {
    console.log("table----===>",data)
    return data.filter(
      item => 
     (globalSearch.length === 0 ? item.fieldData.bestPractice.includes('') : header.some((key)=> item.fieldData[key].includes(globalSearch))) 
     && (categoryFilter.length === 0 ? item.fieldData.bestPractice.includes('') : categoryFilter.some((key)=> item.fieldData['bestPractice'].includes(key)))
     && (dateAddedFilter.length === 0 ? item.fieldData.bestPractice.includes('') : dateAddedFilter.some((key)=>item.fieldData['IDf_Location'].includes(key)))
     && (dueDateFilter.length === 0 ? item.fieldData.bestPractice.includes('') : dueDateFilter.some((key)=>item.fieldData['date'].includes(key)))
     )
  }

  return (
    <div>
      <div className="page_info">
        <div>
          <h3 className="heading24_bold">{t("allpagelist:best_practices")}</h3>
        </div>
        <div>
        <Cusmodal title={title} locdropdown={locdropdown} />
        </div>
      </div>
      <div className="ActionBar">
      <Search setGlobalSearch={setGlobalSearch} />
        <div className="mr_23">
          <img src="/images/border_line.svg" />
        </div>
        <div className="mr_16">
        <button className="lightGrayborder_btn" onClick={ () => setFilter(filter => !filter)}>
            <img className="mr_12" src="/images/filter_icon.svg" />
            {t("allpagelist:filters")}
          </button>
        </div>
        <div>
          <button className="lightGrayborder_btn">
            <img className="mr_12" src="/images/download_icon.svg" />
            {t("allpagelist:export")}
          </button>
        </div>
      </div>
      {filter && 
        <Filter data={data} setGlobalSearch={setGlobalSearch} setCategoryFilter={setCategoryFilter} fil="best" setDateAddedFilter={setDateAddedFilter} setDueDateFilter={setDueDateFilter}
        />}
      { 
      !done ?  <div className="loaderdiv"><ReactLoading type="spin" color="#D93A49" height={50} width={50} /></div> :
      <IssueTable data={query(data)} page="Practices"/>
      }
    </div>
  );
}

export default BestPracticesId
