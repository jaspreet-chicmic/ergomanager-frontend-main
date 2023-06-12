import React,{useEffect, useState, useContext} from 'react'
import UserRoute from '../../routes/useRoutes'
import useTranslation from "next-translate/useTranslation";
import { toast } from "react-toastify";
import axios from 'axios'
import { useRouter } from "next/router";
import {UserContext} from '../../context'
import ReactLoading from 'react-loading'
import moment from 'moment';

const Details = () => {

  const [state,setState] = useContext(UserContext)
  const router = useRouter();
  useEffect(() => {
    if(state !== null){
    console.log('list--->',state,state.token,state.userID,state.appSessionID)
    getIssues(state.token,state.userID,state.appSessionID)
    }
  },[state&&state.token&&state.userID&&state.appSessionID])

  const [data, setData ] = useState([])
  const [done, setDone] = useState(undefined)
  var DateClicked = router.query.details

  const getIssues = async (token,userID,appSessionID) => {
    try{
      console.log("token,userID,appSessionID",token,userID,appSessionID)
    const res = await axios.post("/getIssues",{token,userID,appSessionID})

    console.log("issues---->", res.data.response.data);
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

  const dateClickedNew = moment(DateClicked,'YYYY/MM/DD').format('MM/DD/YYYY')
  const newData = data.filter(items => items.fieldData.date.includes(dateClickedNew))
  console.log('Date',dateClickedNew,'/n','newData',newData);

   const findLength = (s) => {
    return newData.filter(items => items.fieldData.severity.includes(s)).length
   }

  let { t } = useTranslation()
  console.log('---->',data);

  console.log('URL---->',router.asPath);


  return (
    // <UserRoute>
    <div>
      <div className="page_info">
        <div>
          <ol className="bread_crumb">
            <li>
              <img src="/images/dots_horizontal.svg" />
            </li>
            <li>
              <img className="mr_8" src="/images/location_marker.svg" />
              <span>Kifisias 3</span>
            </li>
            <li className="active">
              <img className="mr_8" src="/images/calendar_icon.svg" />
              <span>{t("visits:visit")}: {moment(DateClicked,'YYYY/MM/DD').format('DD MMM YYYY')}</span>
            </li>
          </ol>
        </div>
        <div>
          <button className="darkGray_btn" type="button">
            <img src="/images/document_add_icon.svg" className="mr_12" />
            {t("visits:generatepdfreport")}
          </button>
        </div>
      </div>

      <div className="divider_issue">
        <div className="issue_review">
          <div style={{ padding: 16 }}>
          { 
          !done ?  <div style={{display:'flex',justifyContent:'center', paddingTop: '10em'}}><ReactLoading type="spin" color="#D93A49" height={50} width={50} /></div> :
          (<>
            <h3 className="heading24_bold mb_24">Visit: {moment(DateClicked,'YYYY/MM/DD').format('DD MMM YYYY')}</h3>
            <div className="VisitsTabBar mb_24">
              <ul>
                <li>
                  <a href="#" className="active">
                  {t("visits:issues_a")} <span>{newData.length}</span>
                  </a>
                </li>
                <li>
                  <a href="#">
                  {t("visits:issues_aa")} <span>25</span>
                  </a>
                </li>
                <li>
                  <a href="#">
                  {t("visits:bestpractices")} <span>25</span>
                  </a>
                </li>
                <li>
                  <a href="#">
                  {t("visits:additionalinfo")}<span>25</span>
                  </a>
                </li>
                <li>
                  <a href="#">{t("visits:customform")}</a>
                </li>
                <li>
                  <a href="#">{t("visits:certification")}</a>
                </li>
              </ul>
            </div>

            <div className="mb_24">
              <label className="mb_8">{t("tableheader:priority")}</label>

              <div className="DisplayFlex AlignItem_center">
                <div className="mr_16">
                  <button className="priorities_green">
                    <span className="mr_8 Editable_text">{findLength('Low')}</span> Low
                  </button>
                </div>
                <div className="mr_16">
                  <button className="priorities_yellow">
                    <span className="mr_8 Editable_text">{findLength('Medium')}</span> Medium
                  </button>
                </div>
                <div>
                  <button className="priorities_red">
                    <span className="mr_8 Editable_text">{findLength('High')}</span> High
                  </button>
                </div>
              </div>
            </div>

            <h4 className="Text14SemiBold mb_8">{t("visits:issuesadded")}</h4>

            <div className="Spreadsheet_wrapper">
              <table>
                <thead>
                  <tr>
                    <th>{t("tableheader:title")}</th>
                    <th>{t("tableheader:category")}</th>
                    <th>{t("tableheader:duedate")}</th>
                  </tr>
                </thead>
                <tbody>
                  { newData.map((e,i)=>{
                    return <tr key={i}>
                    <td>{e.fieldData.title}</td>
                    <td>{e.fieldData.IDf_IssueSubCategory}</td>
                    <td>
                      <div className="DisplayFlex AlignItem_center justifycontent_spacebetween">
                        <div className="mr_16">
                          <p className="extratable_td">{e.fieldData.dueDate}</p>
                        </div>
                        <div>
                          <a href="#">
                            <img src="/images/chevron_right.svg" />
                          </a>
                        </div>
                      </div>
                    </td>
                  </tr>
                  })}
                </tbody>
              </table>
            </div>
            </> ) }
          </div>
        </div>
        <div className="issue_information">
          <div style={{ padding: 16 }}>
            <h4 className="heading14_Bold mb_16">{t("visits:information")}</h4>

            <div className="DisplayFlex AlignItem_center mb_12 justifycontent_spacebetween">
              <p className="pr_5 Text14Reg">{t("visits:status")}</p>
              <button className="yellow_btn">Done</button>
            </div>
            <div className="DisplayFlex AlignItem_center mb_12 justifycontent_spacebetween">
              <p className="pr_5 Text14Reg">{t("visits:audittype")}</p>

              <div className="DisplayFlex AlignItem_center">
                <div className="mr_4">
                  <button className="DarkGray28_btn">Warehouse</button>
                </div>
                <div>
                  <button className="DarkGray28_btn">Office</button>
                </div>
              </div>
            </div>

            <div className="information_table mb_16">
              <table>
                <tbody>
                  <tr>
                    <td colSpan="2">
                      <div className="DisplayFlex AlignItem_center">
                        <div className="mr_12">
                          <img src="/images/date_calendar_icon.svg" />
                        </div>
                        <div>
                          <h5 className="Text14Reg"> {t("visits:doneon")}</h5>
                        </div>
                      </div>
                    </td>
                    <td colSpan="3">
                      <h4 className="Text14SemiBold">14 Mar 2022</h4>
                    </td>
                  </tr>
                  <tr className="due_date">
                    <td colSpan="2">
                      <div className="DisplayFlex AlignItem_center">
                        <div className="mr_12">
                          <img src="/images/date_calendar_icon.svg" />
                        </div>
                        <div>
                          <h5 className="Text14Reg"> Done on</h5>
                        </div>
                      </div>
                    </td>
                    <td colSpan="3">
                      <h4 className="Text14SemiBold">14 Mar 2022</h4>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="4">
                      <div className="DisplayFlex">
                        <div className="mr_12">
                          <img src="/images/location_icon.svg" />
                        </div>
                        <div>
                          <h5 className="Text14Reg mb_8">Location</h5>
                          <h3 className="runningTextParagraph_16 mb_14">
                            [BuildingName]
                          </h3>
                          <p className="Text16Reg">
                            Placeholder for location description. Max 50 chars
                          </p>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div>
              <label>{t("visits:submittedby")}</label>
              <input type="text" className="input_form width_100per" />
            </div>
          </div>
        </div>
      </div>
    </div>
    // </UserRoute>
  );
}

export default Details
