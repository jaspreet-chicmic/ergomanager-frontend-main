import React from "react";
import axios from "axios";
import useTranslation from "next-translate/useTranslation";
import PieChart from "../components/PieChart";
import BarChart from "../components/BarChart";
import { UserContext } from "../context";
import { useEffect, useState, useContext } from "react";
import Doc from "./api/Document";
import Dummy from "./api/Dummy";
import Modal from "react-bootstrap/Modal";
import DashboardDatePicker from "../components/DashboardDatePicker";
import moment from "moment";
import ReactLoading from 'react-loading'
import Header from '../components/header'

const Dashboard = () => {
  const [state, setState] = useContext(UserContext);
  useEffect(() => {
    if (state !== null) {
      console.log(
        "list--->",
        state,
        state.token,
        state.userID,
        state.appSessionID
      );
      getIssues(state.token, state.userID, state.appSessionID);
    }
  }, [state && state.token && state.userID && state.appSessionID]);

  const [data, setData] = useState([]);
  const [done, setDone] = useState(undefined)

  const getIssues = async (token, userID, appSessionID) => {
    try {
      console.log("token,userID,appSessionID", token, userID, appSessionID);
      const res = await axios.post("/getIssues", {
        token,
        userID,
        appSessionID,
      });

      console.log("issues---->", res.data.response.data);
      setData(res.data.response.data);
      setDone(true)
      console.log("mapit", fieldData);
      if (res.data.status === 401) {
        toast.error(res.data.statusText);
        router.push("/login");
      }
    } catch (err) {
      console.log("error--->", err);
      // console.log("issues--->",message)
    }
  };

  const test = new Date().getFullYear();

  const [dates, setDates] = useState([]);
  const [year, setYear] = useState(test);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const range = [
    {
      // startDate: new Date(), default
      startDate: moment("01/03/2022", "DD/MM/YYYY"), //----Change Later
      endDate: moment(new Date()).add(30, "days"),
    },
  ];

  if (dates.length === 0) {
    let dateArray = [];
    let currentDate = moment(range[0].startDate);
    let stopDate = moment(range[0].endDate._d);
    while (currentDate <= stopDate) {
      dateArray.push(moment(currentDate).format("MM/DD/YYYY"));
      currentDate = moment(currentDate).add(1, "days");
    }
    setDates(dateArray);
  }
  // console.log(dates);

  const filterPie = data.filter((item) =>
    dates.some((key) => item.fieldData["dueDate"].includes(key))
  );
  console.log(filterPie);

  const filterBar = data.filter((item) =>
    item.fieldData["dueDate"].includes(year)
  );
  console.log("Bar", filterBar);
  let { t } = useTranslation();

  return (
    <div>
      <div className="page_info mb_16">
     
        <div>
          <h3 className="heading24_bold">{t("dashboard:dashboard")}</h3>
        </div>
        <div>
          <button className="lightGrayborder_btn" onClick={handleShow}>
            <img className="mr_12" src="/images/filter_icon.svg" />
            {t("dashboard:setdate")}
          </button>
          <Modal
            show={show}
            onHide={handleClose}
            className="filterBydate_popup"
          >
            <Modal.Header closeButton>
              <h4 className="heading18SemiBold mr_16">Set Timeframe for</h4>
            </Modal.Header>
            <Modal.Body>
              <DashboardDatePicker setDates={setDates} />
            </Modal.Body>
          </Modal>
        </div>
      </div>
      <div className="mlr_16 mb_16">
        <div className="row">
          <div className="col-md-8">
            <div className="WhiteFrame">
            { 
              !done ?  <div style={{display:'flex',justifyContent:'center'}}><ReactLoading type="spin" color="#D93A49" height={50} width={50} /></div> : ( <>
              <div className="mediaObject mb_24 justifycontent_spacebetween">
                <div className="DisplayFlex AlignItem_center ">
                  {" "}
                  <div className="mediaObject_left">
                    <img className="mr-3" src="/images/Flag_icon.svg" />
                  </div>
                  <div className="mediaObject_body">
                    <div className="DisplayFlex AlignItem_center">
                      <div className="pr_13">
                        {" "}
                        <h5 className="heading18SemiBold">{t("dashboard:allissues")}</h5>
                      </div>
                      <div className="mtopmin6">
                        {" "}
                        <img className="mr-3" src="/images/right_arrow.svg" />
                      </div>
                    </div>
                    <p className="runningTextParagraph_16">{t("dashboard:total")}: {filterBar.length}</p>
                  </div>
                </div>

                <div className="DisplayFlex AlignItem_center ">
                  <div className="mr_4">
                    <button
                      name="Prev"
                      onClick={() => setYear(year - 1)}
                      className="prev_btn"
                    >
                      <img src="/images/left_arrow.svg" />
                    </button>
                  </div>
                  <input
                    type="text"
                    className="Textinput"
                    value={year}
                    style={{ width: 50 }}
                    readOnly
                  />
                  <div>
                    <button
                      name="Next"
                      onClick={() => setYear(year + 1)}
                      className="next_btn"
                    >
                      <img src="/images/right_arrow.svg" />
                    </button>
                  </div>
                </div>
              </div>
              <BarChart data={filterBar} />
              </> ) }
            </div>
          </div>
          <div className="col-md-4">
            <div className="WhiteFrame minheight433">
            { 
              !done ?  <div style={{display:'flex',justifyContent:'center',paddingTop: '9em'}}><ReactLoading type="spin" color="#D93A49" height={50} width={50} /></div> : ( <>
              <div className="mediaObject mb_24">
                <div className="mediaObject_left">
                  <img className="mr-3" src="/images/gray_exclamation.svg" />
                </div>
                <div className="mediaObject_body">
                  <h5 className="heading18SemiBold">{t("dashboard:openissuespriority")}</h5>
                  <p className="runningTextParagraph_16">
                  {t("dashboard:total")}: {filterPie.length}
                  </p>
                </div>
              </div>
              <PieChart data={filterPie} />
              </> ) }
            </div>
          </div>
        </div>
      </div>
      <div className="mlr_16 mb_16">
        <div className="row">
          <div className="col-md-8">
            <div className="WhiteFrame">
              <div className="DisplayFlex AlignItem_center justifycontent_spacebetween mb_24  ">
                <div className="mediaObject ">
                  <div className="mediaObject_left">
                    <img
                      className="mr-3"
                      src="/images/inputDocument_icon.svg"
                    />
                  </div>
                  <div className="mediaObject_body">
                    <div className="DisplayFlex AlignItem_center">
                      <div className="pr_13">
                        {" "}
                        <h5 className="heading18SemiBold">
                          {" "}
                          {t("dashboard:expiringdocuments")}
                        </h5>
                      </div>
                      <div className="mtopmin6">
                        {" "}
                        <img className="mr-3" src="/images/right_arrow.svg" />
                      </div>
                    </div>

                    {/* <p className="runningTextParagraph_16">Total: 210</p> */}
                  </div>
                </div>
                <div>
                  <button className="lightGrayborder_btn">
                    <img
                      className="mr_12"
                      src="/images/gray_filder_icon.svg"
                    ></img>
                    {t("dashboard:documenttype")}
                  </button>
                </div>
              </div>
              <div className="Table_wrapper Table_responsive">
                <table>
                  <thead>
                    <tr>
                      <th>{t("dashboard:title")}</th>
                      <th>{t("dashboard:type")}</th>
                      <th>{t("dashboard:expiration")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Doc.map((e, i) => {
                      return (
                        <tr key={i}>
                          <td>{e.title}</td>
                          <td>{e.type}</td>
                          <td>{e.expirationDate}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="WhiteFrame">
              <div className="mediaObject mb_24">
                <div className="mediaObject_left">
                  <img className="mr-3" src="/images/Flag_icon.svg" />
                </div>
                <div className="mediaObject_body">
                  <h5 className="heading18SemiBold">{t("dashboard:upcomingvisits")}</h5>
                  <p className="runningTextParagraph_16">{t("dashboard:total")}: 210</p>
                </div>
              </div>
              <div className="Table_wrapper Table_responsive">
                <table>
                  <thead>
                    <tr>
                      <th>{t("dashboard:date")}</th>
                      <th>{t("dashboard:auditor")}</th>
                      <th>{t("dashboard:location")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Dummy.map((e, i) => {
                      return (
                        <tr key={i}>
                          <td>{e.duedate}</td>
                          <td>{e.assignee}</td>
                          <td>{e.location}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mlr_16 mb_16">
        <div className="row">
          <div className="col-md-4">
            <div className="WhiteFrame">
              <div className="DisplayFlex AlignItem_center justifycontent_spacebetween mb_24  ">
                <div className="mediaObject ">
                  <div className="mediaObject_left">
                    <img className="mr-3" src="/images/news-icon.svg" />
                  </div>
                  <div className="mediaObject_body">
                    <div className="DisplayFlex">
                      <h5 className="heading18SemiBold pr_13"> {t("dashboard:news")}</h5>
                      <img className="mr-3" src="/images/right_arrow.svg" />
                    </div>
                  </div>
                </div>
                <div></div>
              </div>

              <div className="articlesection">
                <div className="graybg mb_8 cursorPointer">
                  <div className="DisplayFlex AlignItem_center justifycontent_spacebetween">
                    <div>
                      <div className="articletitle"> Article title</div>
                      <div className="articletext">
                        Article intro text placeholder.
                      </div>
                    </div>
                    <div>
                      <img src="/images/right_arrow.svg" />
                    </div>
                  </div>
                </div>
                <div className="graybg cursorPointer mb_8">
                  <div className="DisplayFlex AlignItem_center justifycontent_spacebetween">
                    <div>
                      <div className="articletitle"> Article title</div>
                      <div className="articletext">
                        Article intro text placeholder.
                      </div>
                    </div>
                    <div>
                      <img src="/images/right_arrow.svg" />
                    </div>
                  </div>
                </div>
                <div className="graybg cursorPointer mb_8">
                  <div className="DisplayFlex AlignItem_center justifycontent_spacebetween">
                    <div>
                      <div className="articletitle"> Article title</div>
                      <div className="articletext">
                        Article intro text placeholder.
                      </div>
                    </div>
                    <div>
                      <img src="/images/right_arrow.svg" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-8">
            <div className="WhiteFrame minheight300">
              <div className="mediaObject mb_24">
                <div className="mediaObject_left">
                  <img className="mr-3" src="/images/contact-icon.svg" />
                </div>
                <div className="mediaObject_body">
                  <h5 className="heading18SemiBold">{t("dashboard:contact")}</h5>
                </div>
              </div>

              <div className="row">
                <div className="col-md-3">
                  <div className="graybg pr0 DisplayFlex AlignItem_center minheight72 mb_8 ">
                    <div className="pr19">
                      <img src="/images/phone-icon.svg" />
                    </div>
                    <div className="contacttxt"> 210 2773327</div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="graybg pr0 DisplayFlex AlignItem_center minheight72 mb_8 ">
                    <div className="pr19">
                      <img src="/images/mail-icon.svg" />
                    </div>
                    <div className="contacttxt">
                      <a href="mailto:ergonomia@ergonomia.gr">
                        ergonomia@ergonomia.gr
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="graybg pr0 DisplayFlex AlignItem_center minheight72 mb_8 ">
                    <div className="pr19">
                      <img src="/images/linkedin-icon.svg" />
                    </div>
                    <div className="contacttxt"> @ergonomia</div>
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="graybg pr0 DisplayFlex AlignItem_center minheight72 ">
                    <div className="pr19">
                      <img src="/images/map-pin-icon.svg" />
                    </div>
                    <div>
                      <div className="articletitle">
                        {" "}
                        53-57, Karaoli Michail, Nea Ionia, 14231
                      </div>
                      <div className="articletext">View on map</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
