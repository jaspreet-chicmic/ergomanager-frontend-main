import React, { useState, useEffect,useContext } from "react";
import ReactDOM from "react-dom";
// import { Button, Modal } from 'antd';
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import useTranslation from "next-translate/useTranslation";
import { UserContext} from '../context/index'
import axios from 'axios'
import { toast } from "react-toastify";
import moment from "moment";

const Cusmodal = ({ title,setCloseComment,closeComment,closeType,setCloseType,issueID,locdataz,locdropdown,category }) => {

  console.log("locdataz model--------->",locdataz,category)
  const [state,setState] = useContext(UserContext)
  console.log("title--->", title);
  let { t } = useTranslation();

  const [show, setShow] = useState(false);
  const [subCategory, setSubCategory] = useState([]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  console.log("%\%\%",locdropdown);

  

  const [values, setValues] = useState((title === "Add New Issue" || title === "Προσθήκη νέου τεύχους") ? {
    building: "",
    locationDescription: "",
    category: "",
    subCategory: "",
    subCategoryDescription: "",
    issueTitle: "",
    issueDescription: "",
    correctiveAction: "",
    priority: "",
    issueImage: "",
    assignTo: "",
    dueDate: ""
  } : ( title === "Add New Best Practice" || title === "Προσθέστε νέες βέλτιστες πρακτικές" ) ? {
    building: "",
    locationDescription: "",
    category: "",
    subCategory: "",
    subCategoryDescription: "",
    bestPractice: "",
    date: `${moment(new Date()).format('MM/DD/YYYY')}`
  } : ( title === "Add New Document" || title === "Προσθήκη νέου εγγράφου" ) ? {
    building: "",
    locationDescription: "",
    documentTitle: "",
    documentDescription: "",
    expiration: "",
    expirationDate: "",
    customerID: "",
    date: `${moment(new Date()).format('MM/DD/YYYY')}`
  } : {
    building: "",
    locationDescription: "",
    category: "",
    subCategory: "",
    subCategoryDescription: "",
    issueTitle: "",
    issueDescription: "",
    correctiveAction: "",
    priority: "",
    issueImage: "",
    assignTo: "",
    dueDate: "",
    bestPracticeDescription: "",
    documentTitle: "",
    documentDescription: "",
    expiration: "",
    expirationDate: ""
  });

  useEffect(()=>{
    setValues({...values, customerID: window.sessionStorage.getItem('CusID')})
  },[])

  useEffect(()=>{
    getCategory(state.token);
    getSubCategory(state.token);
  },[state&&state.token&&state.userID&&state.appSessionID,locdataz])

  const clearAll = (e) => {
    e.preventDefault();
    // e.target.reset();
  }

  const onChange = (e) => {
    if(e.target.name == 'dueDate' || e.target.name == 'expirationDate'){
    const date = e.target.value
    setValues({ ...values, [e.target.name]: moment(date,'YYYY-MM-DD').format('MM/DD/YYYY')})  
    }
    else if (e.target.name == 'category') {

      setValues({ ...values, [e.target.name]: e.target.value });
  
      getSubCategory(state.token ,e.target.value);
      console.log("hhhhhhhhhh",e.target.value)
  
      } 
    
    else{
    setValues({ ...values, [e.target.name]: e.target.value });
    }
  };

  const onchangeCategoryId = (e)=>{

  }

  const postIssues = async (allvalues) => {
    if(allvalues.building === "")
    {
      allvalues.building = locdataz.locId
    }
    console.log("allvaluesissue",allvalues)
    debugger
    await axios.post("/postIssues", allvalues )
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      if (error.response) {
        console.log(error.response);
        console.log("server responded");
      } else if (error.request) {
        console.log("network error");
      } else {
        console.log(error);
      }
    });
   };

   const postBest = async (allvalues) => {
    if(allvalues.building === "")
    {
      allvalues.building = locdataz.locId
    }
    console.log("allvaluesbest",allvalues)
    await axios.post("/postBest", allvalues )
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      if (error.response) {
        console.log(error.response);
        console.log("server responded");
      } else if (error.request) {
        console.log("network error");
      } else {
        console.log(error);
      }
    });
   };
   
   const postDoc = async (allvalues) => {
    if(allvalues.building === "")
    {
      allvalues.building = locdataz.locId
    }
    console.log("allvaluesdocument",allvalues)
    await axios.post("/postDoc", allvalues )
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      if (error.response) {
        console.log(error.response);
        console.log("server responded");
      } else if (error.request) {
        console.log("network error");
      } else {
        console.log(error);
      }
    });
   };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(Object.assign(state,values));
    (title === "Add New Issue" || title === "Προσθήκη νέου τεύχους") ? postIssues(Object.assign(state,values)) :
    ( title === "Add New Best Practice" || title === "Προσθέστε νέες βέλτιστες πρακτικές" ) ? postBest(Object.assign(state,values)) :
    ( title === "Add New Document" || title === "Προσθήκη νέου εγγράφου" ) ? postDoc(Object.assign(state,values)) :
    alert('Not found')
  };

  const closeIssue = async () => {
    try{
    var check = window.sessionStorage.getItem('issuesUserID')
    console.log("issuesUserID--->", check)
     if(state.userID !== check){
      console.log(true, closeComment,closeType )
      const res = await axios.post("/closeIssue",{
        token:state.token,
        userID:state.userID,
        appSessionID:state.appSessionID,
        issueID,
        closeComment,
        closeType})
        if(res.data.status === 401){
          toast.error(res.data.error)
          router.push('/login')
        }else{
        
          toast.success("This issue has been [closed] successfully")
         setShow(false);
         setCloseComment('')
         title = ''
         console.log("title----?")
        //  setShow(true)
        // setTimeout(() => {
        //   handleShow()
        // },100)
        }
     }else{
      console.log("setIssueClosedUser",true, closeComment,closeType )
      const res = await axios.post("/closeIssueUser",{
        token:state.token,
        userID:state.userID,
        appSessionID:state.appSessionID,
        issueID,
        closeComment,
        closeType})
        if(res.data.status === 401){
          toast.error(res.data.error)
          router.push('/login')
        }else{
        
          toast.success("This issue has been [closed] successfully")
         setShow(false);
         setCloseComment('')
         title = ''
         console.log("title----?")
     }}
  }catch(err){
    console.log("error close Issue",err)
  }
  }

// catecory

const getCategory = async (token) => {
  try{
    console.log("token,userID,appSessionID",token)
  const res = await axios.post("/getIssueCategories",{token:token,locId:locdataz.locId})
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

 const getSubCategory = async (token , categoryId=null) => {
  try{
    
  const res = await axios.post("/getSubCategories",{token:token,categoryId:categoryId})
  console.log("Category---->", res.data.response.data);
  setSubCategory(res.data.response.data)
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




 

  return (
    <>
      <button className="darkGray_btn" onClick={handleShow}>
        <img src="/images/add_icon.svg" className="mr_12" />
        {title}
      </button>
      {title === "Add New Issue" || title === "Προσθήκη νέου τεύχους" ? (
        <Modal show={show} onHide={handleClose} className="addnewpopup">
          <form onSubmit={handleSubmit} id="form">
            <Modal.Header>
              <h4 className="heading24_bold">{title}</h4>
              <div className="DisplayFlex">
                <button className="lightGrayborder_btn mr_16" onChange={clearAll}>
                  {t("model:clear")}
                </button>
                <button className="SmalldarkGray_btn" onClick={handleSubmit}>
                  {t("model:submit")}
                </button>
              </div>
            </Modal.Header>

            <div className="modelScroll">
              <Modal.Body>
                <div className="row mb_16">
                  <div className="col-md-3">
                    <label>{t("model:location")}</label>
                  </div>
                  <div className="col-md-9">
                    <div className="mb_16">
                      <h5 className="Text14SemiBold mb_4">
                        {t("model:building")}
                      </h5>
                      <div className="select_dropdown_icon">
                        <div className="input-group-prepend">
                          <span className="inputGroup_text">
                            <img src="/images/inputlocation_icon.svg" />
                          </span>
                        </div>
                        <select
                          name="building"
                          onChange={onChange}
                          defaultValue={"DEFAULT"}
                        >
                          <option defaultValue disabled>Building</option>
                          {
                          locdropdown.map((e,i)=>{
                          return <option key={i} value={e.id}> {e.locName} </option>
                          })
                          }
                        </select>
                      </div>
                    </div>

                    <div>
                      <h5 className="Text14SemiBold mb_4">
                        {t("model:locationdesc")}{" "}
                      </h5>
                      <div className="select_dropdown_icon">
                        <div className="input-group-prepend">
                          <span className="inputGroup_text">
                            <img src="/images/inputDocument_icon.svg" />
                          </span>
                        </div>
                        <select
                          name="locationDescription"
                          onChange={onChange}
                          defaultValue={"DEFAULT"}
                        >
                          <option defaultValue disabled>Location Description</option>
                          <option>33</option>
                          <option>334</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row mb_16">
                  <div className="col-md-3">
                    <label>{t("model:issuecategory")}</label>
                  </div>
                  <div className="col-md-9">
                    <div className="mb_16">
                      <h5 className="Text14SemiBold mb_4">
                        {t("model:category")}*{" "}
                      </h5>
                      <div className="select_dropdown_icon">
                        <div className="input-group-prepend">
                          <span className="inputGroup_text">
                            <img src="/images/input_tag_icon.svg" />
                          </span>
                        </div>
                        <select
                          name="category"
                          onChange={onChange}
                         
                        >
                          <option defaultValue disabled> Select Category</option>
                          
                          {
                            category.map((e,i)=>{
                          return <option key={i} value={e.fieldData.ID}> {e.fieldData.category} </option>
                          })
                          }
                        </select>
                      </div>
                    </div>

                    <div>
                      <h5 className="Text14SemiBold mb_4">
                        {t("model:subcategory")}
                      </h5>
                      <div className="select_dropdown_icon mb_16">
                        <div className="input-group-prepend">
                          <span className="inputGroup_text">
                            <img src="/images/input_tag_icon.svg" />
                          </span>
                        </div>
                        <select
                          name="subCategory"
                          onChange={onChange}
                        
                        >
                          <option defaultValue disabled>SubCategory</option>
                          {
                            subCategory.map((e,i)=>{
                          return <option key={i} value={e.fieldData.ID}> {e.fieldData.Name} </option>
                          })
                          }
                        </select>
                      </div>

                      <textarea className="textarea" name="subCategoryDescription" onChange={onChange}></textarea>
                    </div>
                  </div>
                </div>

                <div className="row mb_16">
                  <div className="col-md-3">
                    <label>{t("model:details")}</label>
                  </div>
                  <div className="col-md-9">
                    <div className="mb_16">
                      <h5 className="Text14SemiBold mb_4">
                        {t("model:issuetitle")}*{" "}
                      </h5>
                      <textarea className="textarea" name="issueTitle" onChange={onChange}></textarea>
                    </div>

                    <div className="mb_16">
                      <h5 className="Text14SemiBold mb_4">
                        {t("model:issuedesc")}*
                      </h5>
                      <textarea className="textarea" name="issueDescription" onChange={onChange}></textarea>
                    </div>

                    <div>
                      <h5 className="Text14SemiBold mb_4">
                        {t("model:correctaction")}
                      </h5>
                      <textarea className="textarea" name="correctiveAction" onChange={onChange}></textarea>
                    </div>
                  </div>
                </div>

                <div className="row mb_16">
                  <div className="col-md-3">
                    <label>{t("model:priority")}</label>
                  </div>
                  <div className="col-md-9">
                    <div className="DisplayFlex AlignItem_center">
                      <div className="prefer_method mr_24">
                        <input type="radio" id="Low" name="priority" value='Low' onChange={onChange}/>
                        <label htmlFor="Low">
                          <button className="GreenButton">Low</button>
                        </label>
                      </div>

                      <div className="prefer_method mr_24">
                        <input type="radio" id="Medium" name="priority" value='Medium' onChange={onChange}/>
                        <label htmlFor="Medium">
                          <button className="yellow_btn">Medium</button>
                        </label>
                      </div>

                      <div className="prefer_method">
                        <input type="radio" id="High" name="priority" value='High' onChange={onChange}/>
                        <label htmlFor="High">
                          <button className="RedButton">High</button>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row mb_16">
                  <div className="col-md-3">
                    <label>{t("model:media")}</label>
                  </div>
                  <div className="col-md-9">
                    <div className="mb_16">
                      <label
                        className="lightGrayborder_btn textTransform_unset DisplayinlineFlex"
                        htmlFor="BrowsetoaddImages"
                      >
                        <img
                          className="mr_12"
                          src="/images/photograph_image.svg"
                        />
                        {t("model:addimages")}
                      </label>
                    </div>
                    <div className="mb_16">
                      <input type="file" id="BrowsetoaddImages" hidden />
                    </div>
                    <div className="image_parent">
                      <div className="imagePlaceholder"></div>
                      <div className="imagePlaceholder"></div>
                      <div className="imagePlaceholder"></div>
                    </div>
                  </div>
                </div>

                <div className="row mb_16">
                  <div className="col-md-3">
                    <label>{t("model:settings")}</label>
                  </div>
                  <div className="col-md-9">
                    <div className="mb_16">
                      <h5 className="Text14SemiBold mb_4">
                        {" "}
                        {t("model:assignto")}{" "}
                      </h5>
                      <div className="select_dropdown_icon mb_16">
                        <div className="input-group-prepend">
                          <span className="inputGroup_text">
                            <img src="/images/input_user_icon.svg" />
                          </span>
                        </div>
                        <select
                          name="assignTo"
                          onChange={onChange}
                          defaultValue={"DEFAULT"}
                        >
                          <option defaultValue disabled>Employee Name</option>
                          <option>Gerrard</option>
                          <option>Smith</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <h5 className="Text14SemiBold mb_4">
                        {t("model:duedate")}
                      </h5>
                      <div className="select_dropdown_icon">
                        {/* <div className="input-group-prepend">
                          <span className="inputGroup_text">
                            <img src="/images/calendar_input_icon.svg" />
                          </span>
                        </div> */}
                        {/* <select>
                          <option selected>Empty</option>
                          <option value="2">33</option>
                          <option value="3">334</option>
                        </select> */}
                        <input type='date' className="form-control" name="dueDate" onChange={onChange}/>
                      </div>
                    </div>
                  </div>
                </div>
              </Modal.Body>
            </div>
            <Modal.Footer>
              <button
                onClick={handleClose}
                className="lightGrayborder_btn mr_12"
              >
                {t("model:cancel")}
              </button>

              <button className="SmalldarkGray_btn" onClick={handleClose}>
                {t("model:close")}
              </button>
            </Modal.Footer>
          </form>
        </Modal>
      ) : title === "Add New Best Practice" ||
        title === "Προσθέστε νέες βέλτιστες πρακτικές" ? (
        <Modal show={show} onHide={handleClose} className="addnewpopup">
          <Modal.Header>
            <h4 className="heading24_bold">{title}</h4>
            <div className="DisplayFlex">
              <button className="lightGrayborder_btn mr_16">
                {t("model:clear")}
              </button>
              <button className="SmalldarkGray_btn" onClick={handleSubmit}>
                {" "}{t("model:submit")}{" "}
              </button>
            </div>
          </Modal.Header>

          <div className="modelScroll">
            <Modal.Body>
              <div className="row mb_16">
                <div className="col-md-3">
                  <label>{t("model:location")}</label>
                </div>
                <div className="col-md-9">
                  <div className="mb_16">
                    <h5 className="Text14SemiBold mb_4">
                      {t("model:building")}{" "}
                    </h5>
                    <div className="select_dropdown_icon">
                      <div className="input-group-prepend">
                        <span className="inputGroup_text">
                          <img src="/images/inputlocation_icon.svg" />
                        </span>
                      </div>
                      <select
                        name="building"
                        onChange={onChange}
                        defaultValue={"DEFAULT"}
                      >
                        <option defaultValue disabled>Building</option>
                        {
                        locdropdown.map((e,i)=>{
                        return <option key={i} value={e.id}> {e.locName} </option>
                        })
                        }
                      </select>
                    </div>
                  </div>

                  <div>
                    <h5 className="Text14SemiBold mb_4">
                      {t("model:locationdesc")}
                    </h5>
                    <div className="select_dropdown_icon">
                      <div className="input-group-prepend">
                        <span className="inputGroup_text">
                          <img src="/images/inputDocument_icon.svg" />
                        </span>
                      </div>
                      <select
                          name="locationDescription"
                          onChange={onChange}
                          defaultValue={"DEFAULT"}>
                        <option selected>
                          wertyuiopqwertyuiopqwertyuiopquiopqwertyuiopqwerty
                        </option>
                        <option value="2">33</option>
                        <option value="3">334</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row mb_16">
                <div className="col-md-3">
                  <label>{t("model:issuecategory")}</label>
                </div>
                <div className="col-md-9">
                  <div className="mb_16">
                    <h5 className="Text14SemiBold mb_4">
                      {t("model:category")}*{" "}
                    </h5>
                    <div className="select_dropdown_icon">
                      <div className="input-group-prepend">
                        <span className="inputGroup_text">
                          <img src="/images/input_tag_icon.svg" />
                        </span>
                      </div>
                      <select
                        name="category"
                        onChange={onChange}
                        defaultValue={"DEFAULT"}
                      >
                        <option selected>
                          Επιθεώρηση Εγκαταστάσεων Κτηρίου
                        </option>
                        <option value="2">33</option>
                        <option value="3">334</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <h5 className="Text14SemiBold mb_4">
                      {t("model:subcategory")}
                    </h5>
                    <div className="select_dropdown_icon mb_16">
                      <div className="input-group-prepend">
                        <span className="inputGroup_text">
                          <img src="/images/input_tag_icon.svg" />
                        </span>
                      </div>
                      <select
                        name="subCategory"
                        onChange={onChange}
                        defaultValue={"DEFAULT"}
                      >
                        <option selected>Ηλεκτρολογικές Εγκαταστάσεις</option>
                        <option value="2">33</option>
                        <option value="3">334</option>
                      </select>
                    </div>

                    <textarea className="textarea" name="subCategoryDescription" onChange={onChange}></textarea>
                  </div>
                </div>
              </div>

              <div className="row mb_16">
                <div className="col-md-3">
                  <label>{t("model:details")}</label>
                </div>
                <div className="col-md-9">
                  <div className="mb_16">
                    <h5 className="Text14SemiBold mb_4">
                      {t("model:bestpracticedesc")}*
                    </h5>
                    <textarea className="textarea" name="bestPractice" onChange={onChange}></textarea>
                  </div>
                </div>
              </div>
              <div className="row mb_16">
                <div className="col-md-3">
                  <label>{t("model:media")}</label>
                </div>
                <div className="col-md-9">
                  <div className="mb_16">
                    <label
                      className="lightGrayborder_btn textTransform_unset DisplayinlineFlex"
                      htmlFor="bestPracticesAddimage"
                    >
                      <img
                        className="mr_12"
                        src="/images/photograph_image.svg"
                      />
                      {t("model:addimages")}
                    </label>
                  </div>
                  <div className="mb_16">
                    <input type="file" id="bestPracticesAddimage" hidden />
                  </div>
                  <div className="image_parent">
                    <div className="imagePlaceholder"></div>
                    <div className="imagePlaceholder"></div>
                    <div className="imagePlaceholder"></div>
                  </div>
                </div>
              </div>
            </Modal.Body>
          </div>
          <Modal.Footer>
            <button onClick={handleClose} className="lightGrayborder_btn mr_12">
              {t("model:cancel")}
            </button>

            <button className="SmalldarkGray_btn" onClick={handleClose}>
              {t("model:close")}
            </button>
          </Modal.Footer>
        </Modal>
      ) : title === "Add New Document" || title === "Προσθήκη νέου εγγράφου" ? (
        <Modal show={show} onHide={handleClose} className="addnewpopup">
          <Modal.Header>
            <h4 className="heading24_bold">{title}</h4>
            <div className="DisplayFlex">
              <button className="lightGrayborder_btn mr_16">
                {t("model:clear")}
              </button>
              <button className="SmalldarkGray_btn" onClick={handleSubmit}>{t("model:save")}</button>
            </div>
          </Modal.Header>

          <div className="modelScroll">
            <Modal.Body>
              <div className="row mb_16">
                <div className="col-md-3">
                  <label>{t("model:location")}</label>
                </div>
                <div className="col-md-9">
                  <div className="mb_16">
                    <h5 className="Text14SemiBold mb_4">
                      {t("model:building")}{" "}
                    </h5>
                    <div className="select_dropdown_icon">
                      <div className="input-group-prepend">
                        <span className="inputGroup_text">
                          <img src="/images/inputlocation_icon.svg" />
                        </span>
                      </div>
                      <select
                        name="building"
                        onChange={onChange}
                        defaultValue={"DEFAULT"}
                      >
                        <option defaultValue disabled>Building</option>
                          {
                          locdropdown.map((e,i)=>{
                          return <option key={i} value={e.id}> {e.locName} </option>
                          })
                          }
                      </select>
                    </div>
                  </div>

                  <div>
                    <h5 className="Text14SemiBold mb_4">
                      {t("model:locationdesc")}
                    </h5>
                    <div className="select_dropdown_icon">
                      <div className="input-group-prepend">
                        <span className="inputGroup_text">
                          <img src="/images/inputDocument_icon.svg" />
                        </span>
                      </div>
                      <select
                      name="locationDescription"
                      onChange={onChange}
                      defaultValue={"DEFAULT"}
                      >
                        <option selected>
                          wertyuiopqwertyuiopqwertyuiopquiopqwertyuiopqwerty
                        </option>
                        <option value="2">33</option>
                        <option value="3">334</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mb_16">
                <div className="col-md-3">
                  <label>{t("model:details")}</label>
                </div>
                <div className="col-md-9">
                  <div className="mb_16">
                    <h5 className="Text14SemiBold mb_4">
                      {t("model:doctitle")}*
                    </h5>
                    <textarea className="textarea" name="documentTitle" onChange={onChange}></textarea>
                  </div>
                  <div>
                    <h5 className="Text14SemiBold mb_4">
                      {t("model:docdesc")}*
                    </h5>
                    <textarea className="textarea" name="documentDescription" onChange={onChange}></textarea>
                  </div>
                </div>
              </div>
              <div className="row mb_16">
                <div className="col-md-3">
                  <label>{t("model:file")}</label>
                </div>
                <div className="col-md-9">
                  <div className="mb_16">
                    <label
                      className="lightGrayborder_btn textTransform_unset DisplayinlineFlex"
                      htmlFor="Browsetoaddfile"
                    >
                      <img
                        className="mr_12"
                        src="/images/photograph_image.svg"
                      />
                      {t("model:addfile")}
                    </label>
                  </div>
                  <div className="mb_16">
                    <input type="file" id="Browsetoaddfile" hidden />

                    <div className="upload_list">
                      <div className="DisplayFlex AlignItem_center">
                        <div className="mr_12">
                          <img src="/images/document_list_icon.svg" />
                        </div>
                        <div>
                          <h5 className="mt-0">document_test.pdf</h5>
                          <p>165.7 KB</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-3">
                  <label>{t("model:expiration")} </label>
                </div>
                <div className="col-md-9">
                  <div className="prefer_method mb_16">
                    <input type="radio" id="Low" name="expiration" value="yes" onChange={onChange} />
                    <label htmlFor="Low">
                      <button className="GreenButton">
                        {t("model:expiry_yes")}
                      </button>
                    </label>
                  </div>

                  <div className="prefer_method mb_16">
                    <input type="radio" id="Medium" name="expiration" value='no' onChange={onChange} />
                    <label htmlFor="Medium">
                      <button className="blue_btn">
                        {t("model:expiry_no")}
                      </button>
                    </label>
                  </div>

                  <div>
                    <h5 className="Text14SemiBold mb_4">
                      {t("model:expiry_ifyes")}{" "}
                    </h5>
                    <div className="select_dropdown_icon">
                      {/* <div className="input-group-prepend">
                        <span className="inputGroup_text">
                          <img src="/images/calendar_input_icon.svg" />
                        </span>
                      </div>
                      <select>
                        <option value="DEFAULT" disabled>
                          Select date
                        </option>
                        <option> Select date</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                      </select> */}
                      <input type='date' className="form-control" name="expirationDate" onChange={onChange}/>
                    </div>
                  </div>
                </div>
              </div>
            </Modal.Body>
          </div>
          <Modal.Footer>
            <button onClick={handleClose} className="lightGrayborder_btn mr_12">
              {t("model:cancel")}
            </button>

            <button className="SmalldarkGray_btn" onClick={handleClose}>
              {t("model:close")}
            </button>
          </Modal.Footer>
        </Modal>
      ) : title === "Close Issue" || title === "Κλείσιμο θέματος" ? (
        <Modal show={show} onHide={handleClose} className="closeissue_popup">
          <Modal.Header>
            <h4 className="heading24_bold">{title}</h4>
            {/* <div className="DisplayFlex">
              <button className="lightGrayborder_btn mr_16">
                Best Practices Test
              </button>
              <button className="SmalldarkGray_btn">Submit </button>
            </div> */}
          </Modal.Header>
          <Modal.Body>
            <p className="runningTextParagraphgray_16 mb_16">
              {t("pageid:p1")}
            </p>
            <p className="runningTextParagraphgray_16 mb_24">
              {t("pageid:p2")}
            </p>

            <textarea
              className="textarea mb_16"
              placeholder={t("pageid:commentsplaceholder")}
              value={closeComment}
              onChange={(e)=>setCloseComment(e.target.value)}
            ></textarea>

            <div className="DisplayFlex AlignItem_center justifycontent_spacebetween">
              <div>
                <button className="lightGrayborder_btn">
                  <img className="mr_12" src="/images/photograph_image.svg" />
                  {t("pageid:addimage")}
                </button>
              </div>
              <div>
                <button className="lightGrayborder_btn" onClick={closeIssue}>
                  {t("pageid:addcomment")}
                </button>
              </div>
            </div>
          </Modal.Body>

          <Modal.Footer>
            <button onClick={handleClose} className="lightGrayborder_btn mr_12">
              {t("pageid:cancel")}
            </button>

            <button className="SmalldarkGray_btn" onClick={handleClose}>
              {t("pageid:closeissue")}
            </button>
          </Modal.Footer>
        </Modal>
      ) : title === "Edit" || title === "Επεξεργασία" ? (
        <Modal show={show} onHide={handleClose} className="addnewpopup">
          <Modal.Header closeButton>
            <div className="DisplayFlex AlignItem_center justifycontent_spacebetween width_100per">
              <div>
                {" "}
                <div className="popuptitle">Edit Personal Settings</div>
              </div>
              <div className="DisplayFlex AlignItem_center ">
                <button className="lightGrayborder_btn mr_12">
                  {" "}
                  Clear All Fields
                </button>
                <button className="darkGray_btn mr_12 h32px"> Save</button>
              </div>
            </div>
          </Modal.Header>
          <Modal.Body>
            <div>
              <div className="DisplayFlex   ">
                <div className="modelbodytitle w180px">PROFILE PIC</div>
                <div>
                  <div className="profileimg">
                    {" "}
                    <img
                      className="profileclose"
                      src="/images/profile-close.svg"
                    />
                  </div>
                </div>
                <div>
                  <button className="darkGray_btn mr_12 h32px changebutton">
                    <div className="DisplayFlex AlignItem_center ">
                      <img className="mr_12" src="/images/pencil.svg" />
                      <div> Change</div>
                    </div>
                  </button>
                </div>
              </div>
              <div className="DisplayFlex   ">
                <div className="modelbodytitle w180px">personal details</div>
                <div className="w73per">
                  <div className="form-group mb_8">
                    <label className="modellabel">First Name</label>
                    <input type="text" className="form-control" />
                  </div>
                  <div className="form-group mb_8">
                    <label className="modellabel">Last Name</label>
                    <input type="text" className="form-control" />
                  </div>
                  <div className="form-group mb_8">
                    <label className="modellabel">Role</label>
                    <input type="text" className="form-control" />
                  </div>

                  <div className="inner-addon left-addon mb_8">
                    <label className="modellabel">Phone Number</label>

                    <img
                      className="mr_8 icon"
                      src="/images/profile-phone-icon.svg"
                    />

                    <input type="text" className="form-control" />
                  </div>
                  <div className="inner-addon left-addon mb_8">
                    <label className="modellabel">Address</label>

                    <img
                      className="mr_8 icon"
                      src="/images/profile-map-icon.svg"
                    />

                    <input type="text" className="form-control" />
                  </div>
                </div>
              </div>

              <div className="DisplayFlex   ">
                <div className="modelbodytitle w180px">PLATFORM access</div>
                <div className="w73per">
                  <div className="form-group mb_8">
                    <label className="modellabel">Email</label>
                    <input type="text" className="form-control" />
                  </div>
                  <div className="form-group mb_8">
                    <label className="modellabel">Current Password</label>
                    <input type="text" className="form-control" />
                  </div>

                  <div className="bluebg">
                    <div className="form-group mb_8">
                      <label className="modellabel">Create New Password</label>
                      <input type="text" className="form-control" />
                    </div>
                    <div className="form-group mb_8">
                      <label className="modellabel">Confim New Password</label>
                      <input type="text" className="form-control" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      ) : (
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <h4 className="heading24_bold">{title}</h4>
            {/* <div className="DisplayFlex">
              <button className="lightGrayborder_btn mr_16">
                Close Test-Final Modal
              </button>
              <button className="SmalldarkGray_btn">Docs Submit</button>
            </div> */}
          </Modal.Header>

          <Modal.Body>
            <div className="confirmationFrame textAligncenter">
              <img className="mb_8" src="/images/circle_success.svg" />
              <h3 className="heading18SemiBold mb_16">
                {t("pageid:issueclose")}
              </h3>
              <p className="mb_24 runningTextParagraphgray_16">
                {t("pageid:newpassword")}
              </p>
              <div className="textAligncenter">
                <button className="darkGray_btn">
                  {t("pageid:backtoissue")}
                </button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      )}
    </>
  );
};

export default Cusmodal;
