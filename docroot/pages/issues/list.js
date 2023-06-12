import React,{ useEffect,useState,useContext } from "react";
import Cusmodal from "../../components/model";
import useModal from "../../hooks/useModal";
import IssueTable from '../../components/IssueTable';
import Dummy from '../api/Dummy';
import Search from '../../components/search'
import Filter from '../../components/filter'
import useTranslation from "next-translate/useTranslation";
import { toast } from "react-toastify";
import axios from 'axios'
import { useRouter } from "next/router";
import {UserContext} from '../../context'
import * as XLSX from 'xlsx'
import ReactLoading from 'react-loading'



const List = ({locdataz,locdropdown}) => {
  console.log("kjhcvsaygvukgfvisr----->",locdataz)
  const [state,setState] = useContext(UserContext)
  const [locId,setLocId] = useState("")
  const router = useRouter();
  const [done, setDone] = useState(undefined)
  // useEffect(() => {
  //   if(state !== null){
  //   console.log('list--->',state,state.token,state.userID,state.appSessionID)
  //   getIssues(state.token,state.userID,state.appSessionID)
  //   }
  // },[state&&state.token&&state.userID&&state.appSessionID])

  useEffect(() => {
    if(state !== null){
    console.log('list by Loc--->',state,state.token,state.userID,state.appSessionID)
    getIssuesbyLoc(state.token,state.userID,state.appSessionID);
    getCategory(state.token);
    getSubCategory(state.token);
    
    setDone(undefined)
    }
  },[state&&state.token&&state.userID&&state.appSessionID,locdataz])

  const [data, setData ] = useState([]);

  const [category,setCategory] = useState([]);
  

  const getIssues = async (token,userID,appSessionID) => {
    try{
      console.log("token,userID,appSessionID",token,userID,appSessionID)
    const res = await axios.post("/getIssues",{token,userID,appSessionID})
    console.log("issues---->", res.data.response.data);
    setData(res.data.response.data)
    setDone(true)
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

   const getIssuesbyLoc = async (token,userID,appSessionID) => {
    if(locdataz){
    try{
      console.log("token,userID,appSessionID",token,userID,appSessionID)
   
    const res = await axios.post("/getIssuesbyLoc",{
      token,
      userID,
      appSessionID,
      locId:locdataz.locId
    })
    console.log("issues by Loc error---->", res.data.error);
    if(res.data.status === 500) toast.error(res.data.error)
    console.log("issues by Loc---->", res.data.response.data);
    setData(res.data.response.data)
    setDone(true)

    

    }
    catch(err){
      console.log("error--->",err)
      // console.log("issues--->",message)
  }}
   };

   const getCategory = async (token) => {
    try{
      console.log("token,userID,appSessionID",token)
    const res = await axios.post("/getIssueCategories",{token:token,locId:locdataz.locId})
    console.log("Category---->", res.data.response.data);
    setCategory(res.data.response.data)
    // setDone(true)
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

   const getSubCategory = async (token) => {
    try{
      
    const res = await axios.post("/getSubCategories",{token:token})
    console.log("Category---->", res.data.response.data);
    // setData(res.data.response.data)
    // setDone(true)
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


  let { t } = useTranslation()
  console.log('############',locdataz);


//changes to dummy to be done as it is static we have taken unique values from it
var title = t("propstitle:issues")
const [ globalSearch, setGlobalSearch ] = useState('')
const [ categoryFilter, setCategoryFilter ] = useState([])
const [ assigneeFilter, setAssigneeFilter ] = useState([])
const [ statusFilter, setStatusFilter ] = useState([])
const [ priorityFilter, setPriorityFilter ] = useState([])
const [ dateAddedFilter, setDateAddedFilter ] = useState([])
const [ dueDateFilter, setDueDateFilter] = useState([])

const [ filter, setFilter ] = useState(false)

const header = ['title','IDf_Location' , 'IDf_IssueSubCategory','status','severity','date','dueDate']

const [ getExport, setGetExport ] = useState([]) 

const handleOnExport = () => {
  let blank = [header]
  for(let i = 0; i <= getExport.length - 1; i++){
    blank.push(getExport[i].split(','))
  }
  if(blank.length == 1){
    toast.error("First Select To Export")
  }else{
  var wb = XLSX.utils.book_new(),
  ws = XLSX.utils.aoa_to_sheet(blank);
  XLSX.utils.book_append_sheet(wb,ws,'Sheet1');
  XLSX.writeFile(wb, 'ErgoManager.xlsx')}
}

//filtering
const query = (data) => {

  return data.filter(
    item => 
   (globalSearch.length === 0 ? item.fieldData.title.includes('') : header.some((key)=> item.fieldData[key].includes(globalSearch))) 
   && (categoryFilter.length === 0 ? item.fieldData.title.includes('') : categoryFilter.some((key)=> item.fieldData['IDf_IssueSubCategory'].includes(key)))
   && (assigneeFilter.length === 0 ? item.fieldData.title.includes('') : assigneeFilter.some((key)=> item.fieldData['assignee'].includes(key)))
   && (statusFilter.length === 0 ? item.fieldData.title.includes('') : statusFilter.some((key)=> item.fieldData['status'].includes(key)))
   && (priorityFilter.length === 0 ? item.fieldData.title.includes('') : priorityFilter.some((key)=> item.fieldData['severity'].includes(key)))
   && (dateAddedFilter.length === 0 ? item.fieldData.title.includes('') : dateAddedFilter.some((key)=>item.fieldData['date'].includes(key)))
   && (dueDateFilter.length === 0 ? item.fieldData.title.includes('') : dueDateFilter.some((key)=>item.fieldData['dueDate'].includes(key)))
   )
}



//filter styling

  return (
    <div>
      {/* <Header/> */} 
      <div className="page_info">
        <div>
          <h3 className="heading24_bold">{t("allpagelist:issues")}</h3>
        </div>
        <div>
          <Cusmodal title={title} locdataz={locdataz} locdropdown={locdropdown}  category={category}/>
        </div>
      </div>
      <div className="ActionBar">
        <Search setGlobalSearch={setGlobalSearch} />
        <div className="mr_23">
          <img src="/images/border_line.svg" />
        </div>
        <div className="mr_16">
          <button className={filter ? "filterSelected_btn" : "lightGrayborder_btn"} onClick={ () => setFilter(filter => !filter)}>
            <img className="mr_12" src="/images/filter_icon.svg" />
            {t("allpagelist:filters")}
          </button>
        </div>
        <div className="mr_16">
          <button className="lightGrayborder_btn">
            <img className="mr_12" src="/images/assignto_icon.svg" />
            {t("allpagelist:assign_to")}
          </button>
        </div>
        <div>
          <button className="lightGrayborder_btn" onClick={handleOnExport}>
            <img className="mr_12" src="/images/download_icon.svg" />
            {t("allpagelist:export")}
          </button>
        </div>
      </div>     
      {
        filter && 
        <>
        <Filter data={data} setGlobalSearch={setGlobalSearch} setCategoryFilter={setCategoryFilter} 
        setAssigneeFilter={setAssigneeFilter}  setStatusFilter={setStatusFilter} setPriorityFilter={setPriorityFilter} fil="issues" setDateAddedFilter={setDateAddedFilter} setDueDateFilter={setDueDateFilter}
        />
        </>
      }
      { 
      !done ?  <div style={{display:'flex',justifyContent:'center', paddingTop: '10em'}}><ReactLoading type="spin" color="#D93A49" height={50} width={50} /></div> :
      ( locdataz && <IssueTable data={query(data)} page="Issues" setGetExport={setGetExport}/> )
      }
    </div>
  );
}

export default List


