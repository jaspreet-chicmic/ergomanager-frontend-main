import React,{useState,useEffect,useContext} from "react";
import useTranslation from "next-translate/useTranslation";
import UserRoute from '../../routes/useRoutes'
import { useRouter } from "next/router";
import {UserContext} from '../../context';
import axios from 'axios'


const BestPracticesId = () => {
  let { t } = useTranslation()
  const [state,setState] = useContext(UserContext)
  const [data, setData ] = useState([])
  const router = useRouter();
  var bestPracticeID = router.query.id

  useEffect(() => {
    console.log("router id", bestPracticeID)
    if(bestPracticeID){
      getBestPractices(state.token,state.userID,state.appSessionID)
      console.log("Bestpractice ID fetched")
    }
  },[bestPracticeID])

  const getBestPractices = async (token,userID,appSessionID) => {
    try{
      console.log("token,userID,appSessionID",token,userID,appSessionID)
    const res = await axios.post("/getBestPracticesId",{token,userID,appSessionID,bestPracticeID})
    console.log("BestPractice Id---->", res.data.response.data);
    setData(JSON.parse(res.data.response.data[0].fieldData.g_Result))
    console.log("BestPractice Id$#---->", res)
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
      </div>

      <div className="divider_issue">
        <div className="issue_review">
          <div style={{ padding: 16 }}>
            <h3 className="heading24_bold mb_16">{data[1]?.bestPractice}</h3>
            <div className="mb_16">
              <label>{t("pageid:issuedesc")}</label>
              <h5 className="mb_16" >{data[1]?.bestPractice}</h5>
              {/* <textarea
                className="textarea"
                placeholder={t("pageid:issueplaceholder")}
              >
                {data[1]?.bestPractice}
              </textarea> */}
            </div>

            <div>
              <label>{t("pageid:images")}</label>
              <div className="image_parent">
                <div className="imagePlaceholder"></div>
                <div className="imagePlaceholder"></div>
                <div className="imagePlaceholder"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="issue_information">
          <div style={{ padding: 16 }}>
            <h4 className="heading14_Bold mb_16">{t("pageid:information")}</h4>
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
                      <h4 className="Text14SemiBold">Πυρασφάλεια</h4>
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
                      <a className="DisplayFlex AlignItem_center" href="#">
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

                  <tr>
                    <td colSpan="4">
                      <div className="DisplayFlex">
                        <div className="mr_12">
                          <img src="/images/location_icon.svg" />
                        </div>
                        <div>
                          <h5 className="Text14Reg mb_8">{t("pageid:location")}</h5>
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
              <label>{t("pageid:createdby")}</label>
              <input type="text" className="input_form width_100per" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BestPracticesId
