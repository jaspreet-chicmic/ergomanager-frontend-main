import React,{useState, useEffect, useContext} from 'react'
import IssueTable from '../../components/IssueTable'
import Cusmodal from "../../components/model";
import Search from '../../components/search'
import Filter from '../../components/filter'
import useTranslation from "next-translate/useTranslation";
import UserRoute from '../../routes/useRoutes'
import { toast } from "react-toastify";
import axios from 'axios'
import { useRouter } from "next/router";
import {UserContext} from '../../context'
import ReactLoading from 'react-loading'

const List = ({locdropdown}) => {
  const [state,setState] = useContext(UserContext)
  const router = useRouter();
  useEffect(() => {
    if(state !== null){
    console.log('documents--->',state,state.token,state.userID,state.appSessionID)
    getDoc(state.token,state.userID,state.appSessionID)
    }
  },[state&&state.token&&state.userID&&state.appSessionID])

  const [data, setData ] = useState([])
  const [done, setDone] = useState(undefined)

  const getDoc = async (token,userID,appSessionID) => {
    try{
      console.log("token,userID,appSessionID",token,userID,appSessionID)
    const res = await axios.post("/getDocuments",{token,userID,appSessionID})

    console.log("documents---->", res.data.response.data);
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
      // console.log("issues--->",message)
  }
   };

  console.log('---->',data);


  let { t } = useTranslation()
  var title = t("propstitle:documents")

  const [ globalSearch, setGlobalSearch ] = useState('')
  const [ typeFilter, setTypeFilter ] = useState([])
  const [ statusdocFilter, setStatusdocFilter ] = useState([])
  const [ dateAddedFilter, setDateAddedFilter ] = useState([])
  const [ dueDateFilter, setDueDateFilter] = useState([])
  
  const [ filter, setFilter ] = useState(false)

  const header = ['title','type','status','dateadded','expirationDate']

  console.log("document-->",data)


  const query = (data) => {
 
    return data.filter(
      item => 
     (globalSearch.length === 0 ? item.fieldData.type.includes('') : header.some((key)=> item.fieldData[key].includes(globalSearch))) 
     && (typeFilter.length === 0 ? item.fieldData.type.includes('') : typeFilter.some((key)=> item.fieldData['type'].includes(key)))
     &&(statusdocFilter.length === 0 ? item.fieldData.status.includes(''):statusdocFilter.some((key)=> item.fieldData['status'].includes(key)))
     && (dateAddedFilter.length === 0 ? item.fieldData.date.includes('') : dateAddedFilter.some((key)=>item.fieldData['dateadded'].includes(key)))
    //  && (dueDateFilter.length === 0 ? item.fieldData.dateadded.includes('') : dueDateFilter.some((key)=>item.fieldData['expirationDate'].includes(key)))
     )
  }

  return (
    <div>
      <div className="page_info">
        <div>
          <h3 className="heading24_bold">{t("allpagelist:documents")}</h3>
        </div>
        <div>
        <Cusmodal title={title} locdropdown={locdropdown}/>
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
        <Filter data={data} setGlobalSearch={setGlobalSearch} setTypeFilter={setTypeFilter} setStatusdocFilter={setStatusdocFilter} fil="doc" setDateAddedFilter={setDateAddedFilter} setDueDateFilter={setDueDateFilter}
        />
      }
      { 
      !done ?  <div className="loaderdiv"><ReactLoading type="spin" color="#D93A49" height={50} width={50} /></div> :
      <IssueTable data={query(data)} page="Documents"/>
      }
    </div>
  );
}

export default List
