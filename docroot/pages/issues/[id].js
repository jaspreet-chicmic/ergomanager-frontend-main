import React,{ useState, useEffect, useContext } from 'react'
import Cusmodal from "../../components/model";
import useTranslation from "next-translate/useTranslation";
import UserRoute from '../../routes/useRoutes'
import { useRouter } from "next/router";
import {UserContext} from '../../context';
import axios from 'axios'
import { toast } from "react-toastify";


const IssuesId = () => {
  let { t } = useTranslation()
  var title = t("pageid:closeissue")
  const [state,setState] = useContext(UserContext)
  const [data, setData ] = useState([])
  const [closeComment, setCloseComment ] = useState("")
  const [closeType,setCloseType] = useState("Demo-Type")
  const router = useRouter();
  var issueID = router.query.id
  const [location, setLocation] = useState("")
 
  useEffect(() => {
    console.log("router id", issueID,state)
    if(issueID){
      getIssues(state.token,state.userID,state.appSessionID)
      setLocation(window.sessionStorage.getItem('LocName'))
      console.log("hdvajhhfjdhavbjdabk")
    }
  },[issueID])


  const getIssues = async (token,userID,appSessionID) => {
    try{
      console.log("token,userID,appSessionID",token,userID,appSessionID)
    const res = await axios.post("/getIssuesId",{token,userID,appSessionID,issueID})
    if(res.data.status === 401){
      toast.error(res.data.error)
      router.push('/login')
    }else{
    console.log("Issue Idz1---->", res)
    console.log("issues Id---->", res.data.response.data);
    setData(JSON.parse(res.data.response.data[0].fieldData.g_Result))
    console.log("data [id]--->",JSON.parse(res.data.response.data[0].fieldData.g_Result))
    var ndata = JSON.parse(res.data.response.data[0].fieldData.g_Result)
    window.sessionStorage.setItem("issuesUserID",ndata[1]?.userID)
    }
    }
    catch(err){
      console.log("error--->",err)
      // console.log("issues--->",message)
      }
};

  let StatusColor = (data[1]?.status === 'Σε Εκκρεμότητα' ? "#CC0905" : data[1]?.status === 'Υλοποιήθηκε' ? '#F8C51B' : data[1]?.status === 'Κλειστό' ? '#22C348' : '#ffffff')
  let SevernityColor = (data[1]?.severity === 'High'? "#CC0905" : data[1]?.severity === 'Medium' ? '#F8C51B' : data[1]?.severity === 'Low' ? '#22C348' : '#ffffff') 
   
  return (

    <div>
      <div className="page_info">
        <div>
          <ol className="bread_crumb">
            <li>
              <img src="/images/dots_horizontal.svg" />
            </li>
            <li>
              <img className="mr_8" src="/images/location_marker.svg" />
              <span>{location}</span>
            </li>
            <li>
              <img className="mr_8" src="/images/calendar_icon.svg" />
              <span>Visit: 14-Mar-2022</span>
            </li>
            <li className="active">
              <img className="mr_8" src="/images/textDocument.svg" />
              <span>Test 1234</span>
            </li>
          </ol>
        </div>
        <div>
          <Cusmodal title={title} closeComment={closeComment} setCloseComment={setCloseComment}  closeType={closeType} setCloseType={setCloseType}
          issueID={issueID}
          />
          
        </div>
      </div>

      <div className="divider_issue">
        <div className="issue_review">
          <div style={{ padding: 16 }}>
            <h3 className="heading24_bold mb_16">{data[1]?.title}</h3>
            <div className="mb_16">
              <label>{t("pageid:issuedesc")}</label>
              <h5 className="mb_16" >{data[1]?.issue}</h5>
            </div>
            <div className="mb_16">
              <label>{t("pageid:correctaction")}</label>
              
              <h5 className="mb_16" >{data[1]?.correctiveAction}</h5>
            </div>

            <div className="mb_16">
              <label>{t("pageid:images")}</label>
              <div className="image_parent">
                <div className="imagePlaceholder"></div>
                <div className="imagePlaceholder"></div>
                <div className="imagePlaceholder"></div>
              </div>
            </div>

            <div className="mb_16">
              <label>{t("pageid:comments")} (2)</label>

              <div className="comments_sec">
                <div className="comments_item">
                  <h4 className="Text14SemiBold">John Smith</h4>
                  <span className="Text12Reg mb_8 Displayblock">
                    February 19, 7:37 AM
                  </span>
                  <p className="runningTextParagraph_16 mb_8">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.{" "}
                  </p>
                  <div className="imagePlaceholder"></div>
                </div>
                <div className="comments_item">
                  <h4 className="Text14SemiBold">John Smith</h4>
                  <span className="Text12Reg mb_8 Displayblock">
                    February 19, 7:37 AM
                  </span>
                  <p className="runningTextParagraph_16 mb_8">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.{" "}
                  </p>
                  <div className="imagePlaceholder"></div>
                </div>
                <div className="comments_item">
                  <textarea
                    className="textarea width_100per mb_16"
                    placeholder={t("pageid:commentsplaceholder")}
                  ></textarea>

                  <div className="Desktopflex_Mobileblock justifycontent_spacebetween AlignItem_center">
                    <div className="mobspace_mb16">
                      <button className="lightGrayborder_btn">
                        <img
                          className="mr_12"
                          src="/images/photograph_image.svg"
                        />
                        {t("pageid:addimage")}
                      </button>
                    </div>
                    <div className="DisplayFlex justifycontent_spacebetween AlignItem_center">
                      <div>
                        <button className="lightGrayborder_btn mr_16">
                        {t("pageid:cancel")}
                        </button>
                      </div>
                      <div>
                        <button className="SmalldarkGray_btn">
                        {t("pageid:addcomment")}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="issue_information">
          <div style={{ padding: 16 }}>
            <h4 className="heading14_Bold mb_16">{t("pageid:information")}</h4>
            <div className="DisplayFlex AlignItem_center justifycontent_spacebetween mb_16">
              <div className="DisplayFlex AlignItem_center">
                <p className="pr_5 Text14Reg">{t("pageid:status")}</p>
                <button className="yellow_btn" style={{backgroundColor: StatusColor, border: `1px solid ${StatusColor}`}}>{data[1]?.status}</button>
              </div>

              <div className="DisplayFlex AlignItem_center">
                <p className="pr_5 Text14Reg">{t("pageid:priority")}</p>
                <button className="yellow_btn" style={{backgroundColor: SevernityColor, border: `1px solid ${SevernityColor}`}}>{data[1]?.severity}</button>
              </div>
            </div>
            <div className="information_table mb_16">
              <table>
                <tbody>
                  <tr>
                    <td colSpan="2">
                      <div className="DisplayFlex AlignItem_center">
                        <div className="mr_12">
                          <img src="/images/category_icon.svg" />
                        </div>
                        <div>
                          <h5 className="Text14Reg">{t("pageid:category")}</h5>
                        </div>
                      </div>
                    </td>
                    <td colSpan="2">
                      <h4 className="Text14SemiBold">{data[1]?.issueSubCategoryID}</h4>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="2">
                      <div className="DisplayFlex AlignItem_center">
                        <div className="mr_12">
                          <img src="/images/visit_icon.svg" />
                        </div>
                        <div>
                          <h5 className="Text14Reg">{t("pageid:visit")}</h5>
                        </div>
                      </div>
                    </td>
                    <td>
                      <h4 className="Text14SemiBold">14 Mar 2022</h4>
                    </td>
                    <td>
                      <a className="DisplayFlex AlignItem_center">
                        <img src="/images/chevron_right.svg" />
                      </a>
                    </td>
                  </tr>

                  <tr>
                    <td colSpan="2">
                      <div className="DisplayFlex AlignItem_center">
                        <div className="mr_12">
                          <img src="/images/date_calendar_icon.svg" />
                        </div>
                        <div>
                          <h5 className="Text14Reg">{t("pageid:createdon")}</h5>
                        </div>
                      </div>
                    </td>
                    <td colSpan="3">
                      <h4 className="Text14SemiBold">{data[1]?.date}</h4>
                    </td>
                  </tr>

                  <tr className="due_date">
                    <td colSpan="2">
                      <div className="DisplayFlex AlignItem_center">
                        <div className="mr_12">
                          <img src="/images/date_calendar_icon.svg" />
                        </div>
                        <div>
                          <h5 className="Text14Reg">{t("pageid:duedate")}</h5>
                        </div>
                      </div>
                    </td>
                    <td colSpan="3">
                      <h4 className="Text14SemiBold">{data[1]?.dueDate}</h4>
                    </td>
                  </tr>

                  <tr>
                    <td colSpan="4">
                      <div className="DisplayFlex">
                        <div className="mr_12">
                          <img src="/images/location_icon.svg" />
                        </div>
                        <div>
                          <h5 className="Text14Reg mb_8">{t("pageid:location")}</h5>
                          <h3 className="runningTextParagraph_16 mb_14">
                            {location}
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

            <div className="mb_16">
              <label>{t("pageid:createdby")}</label>
              <input type="text" className="input_form width_100per" />
            </div>
            <div>
              <label>{t("pageid:assignedto")}</label>
              <select className="input_form width_100per">
                <option>John Smith</option>
                <option>..</option>
                <option>..</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
 
  );
}

export default IssuesId
