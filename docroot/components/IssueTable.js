import React,{ useState, useEffect, useMemo } from 'react'
import useTranslation from "next-translate/useTranslation";
import * as XLSX from 'xlsx'
import { useRouter } from "next/router";
   //to convert to excel file

const IssueTable = ({data,page,setGetExport}) => {  //header I have passed as props from issues page ----> should do for other pages
  let { t } = useTranslation();
  console.log(data,page)

  const [ sort, setSort ] = useState(data)  
  const [ order, setOrder ] = useState("ASC")
  const router = useRouter();

  useEffect(()=>{
    setSort(data)
    displayData
    setPerPage(1)
  },[data])

  //EXPORT OF THE SELECTED FILE
  const [ checked, setChecked ] = useState([])  //header passes here
  const handleCheck = (event) => {
    var updatedList = [...checked]; 
    if (event.target.checked) {
      updatedList = [...checked, event.target.value];
    } else {
      updatedList.splice(checked.indexOf(event.target.value), 1);
    }
    setChecked(updatedList);
    setGetExport(updatedList)
  };
  console.log(checked);
  //pagination
const [ itemPerPage, setitemPerPage ] = useState(25)
const [ perPage, setPerPage ] = useState(1)

const displayData = useMemo(()=>{
  const start = ( perPage - 1 ) * itemPerPage;
  const end = start + itemPerPage
  console.log(start,end);
  return sort.slice(start, end )
},[sort,perPage,itemPerPage])

const handlePage = (event) => {
  setitemPerPage(Number(event.target.value))
  setPerPage(1)
}

const handlePage1 = (e) => {
  setPerPage(e.target.value)
}

var totalpages = Math.ceil( sort.length / itemPerPage )
var enddoc = perPage * itemPerPage
var startdoc = ( enddoc - itemPerPage ) + 1

  const sorting = (col) => {
    if (order === "ASC") {
      const sorted = [...data].sort((a,b)=> 
        a.fieldData[col].toLowerCase() > b.fieldData[col].toLowerCase() ? 1 : -1
      );
      setSort(sorted);
      setPerPage(1)
      setOrder("DSC");
    }
    if (order === "DSC") {
      const sorted = [...data].sort((a,b)=> 
        a.fieldData[col].toLowerCase() < b.fieldData[col].toLowerCase() ? 1 : -1
      );
      setSort(sorted);
      setPerPage(1)
      setOrder("ASC");
    }
  }

  const [ sed, setsed ] = useState(false)

  const selectAll = () => {
    setsed(!sed)
    var newSeries = []
    if(sed === false){
    displayData.map((e)=>{
      newSeries.push(`${e.fieldData.title.replace(/[,\s]/g, '')}, ${e.fieldData.IDf_Location}, ${e.fieldData.IDf_IssueSubCategory}, ${e.fieldData.severity}, ${e.fieldData.date}, ${e.fieldData.dueDate}`)
    })    
    setGetExport(newSeries)
    console.log(newSeries);
    } // need to fix it
    else{
    setGetExport(newSeries)
    }
  }

  const handleTouch = async (id,page)=>{
    console.log("bacjhabjcjbdsd",id,page)
    if(page === 'Issues'){
      router.push(`/issues/${id}`)
    }
    if(page === 'Practices'){
      router.push(`/best-practices/${id}`)
    }
    if(page === 'Documents'){
      router.push(`/documents/${id}`)
    }
  }
  // console.log([...new Set(data.map((Val) => Val.fieldData.IDf_IssueSubCategory))]);

  return (
    <div className="Table_wrapper Table_responsive">
      <table>
        <thead>
          <tr>
            {page === "Issues" ? (
              <>
                <th><input type='checkbox' checked={sed} onChange={selectAll}/></th>
                <th onClick={() => sorting("title")}>
                  {t("tableheader:title")}
                </th>
                <th onClick={() => sorting("IDf_Location")}>
                  {t("tableheader:location")}
                </th>
                <th onClick={() => sorting("IDf_IssueSubCategory")}>
                  {t("tableheader:category")}
                </th>
                <th onClick={() => sorting("assignee")}>
                  {t("tableheader:assign_to")}
                </th>
                <th onClick={() => sorting("status")}>
                  {t("tableheader:status")}
                </th>
                <th onClick={() => sorting("severity")}>
                  {t("tableheader:priority")}
                </th>
                <th onClick={() => sorting("date")}>
                  {t("tableheader:dateadded")}
                </th>
                <>
                  <th onClick={() => sorting("dueDate")}>
                    {t("tableheader:duedate")}
                  </th>
                </>
              </>
            ) : page === "Practices" ? (
              <>
                <th onClick={() => sorting("bestPractice")}>
                  {t("tableheader:title")}
                </th>
                <th onClick={() => sorting("IDf_Location")}>
                  {t("tableheader:location")}
                </th>
                <th onClick={() => sorting("IDf_IssueSubCategory")}>
                  {t("tableheader:category")}
                </th>
                <th onClick={() => sorting("date")}>
                  {t("tableheader:dateadded")}
                </th>
              </>
            ) : page === "Documents" ? (
              <>
                <th onClick={() => sorting("title")}>
                  {t("tableheader:title")}
                </th>
                <th onClick={() => sorting("type")}>
                  {t("tableheader:type")}
                </th>
                <th onClick={() => sorting("status")}>
                  {t("tableheader:status")}
                </th>
                <th onClick={() => sorting("date")}>
                  {t("tableheader:dateadded")}
                </th>
                <th onClick={() => sorting("expirationDate")}>
                  {t("tableheader:expiration")}
                </th>
              </>
            ) : page === 'Visits' ? (
              <>
                <th onClick={()=> sorting("date")}>
                  {t("tableheader:date")}
                </th>
                <th onClick={()=> sorting("IDf_Location")}>
                  {t("tableheader:location")}
                </th>
                <th onClick={()=> sorting("visitType")}>
                  {t("tableheader:type")}
                </th>
                <th onClick={()=> sorting("status")}>
                  {t("tableheader:status")}
                </th>
              </>
            ) : (
              <></>
            )}
          </tr>
        </thead>
        <tbody>
          {displayData.map((e, i) => {
            let StatusColor = (e.fieldData.status === 'Σε Εκκρεμότητα' ? "#CC0905" : e.fieldData.status === 'Υλοποιήθηκε' ? '#F8C51B' : e.fieldData.status === 'Κλειστό' ? '#22C348' : '#ffffff')
            let SevernityColor = (e.fieldData.severity === 'High'? "#CC0905" : e.fieldData.severity === 'Medium' ? '#F8C51B' : e.fieldData.severity === 'Low' ? '#22C348' : '#ffffff') 
            return (
              <tr key={i} onClick={()=>handleTouch(e.fieldData.ID,page)}>
                {page === "Issues" ? (
                  <> 
                    {/* value must be passed as per headers and mapped -----> At last I have added a button for export*/}
                    {
                    sed ?
                    <td><input type='checkbox' checked={sed} value={undefined}/></td>: 
                    <td><input value={[e.fieldData.title.replace(/[,\s]/g, ''), e.fieldData.IDf_Location, e.fieldData.IDf_IssueSubCategory , e.fieldData.status, e.fieldData.severity, e.fieldData.date, e.fieldData.dueDate]} type='checkbox' onChange={handleCheck}/></td>
                    }
                    <td>{e.fieldData.title}</td>
                    <td>{e.fieldData.IDf_Location}</td>
                    <td>{e.fieldData.IDf_IssueSubCategory}</td>
                    <td>
                      <input
                        type="text"
                        className="Textinput"
                        value={e.assignee}
                        readOnly
                      />
                    </td>
                    <td>
                      <button className="RedButton" style={{width: 130, backgroundColor: StatusColor, border: `1px solid ${StatusColor}`}}>{e.fieldData.status}</button>
                    </td>
                    <td>
                      <button className="GreenButton" style={{width: 80, backgroundColor: SevernityColor, border: `1px solid ${SevernityColor}`}}>{e.fieldData.severity}</button>
                    </td>
                    <td>{e.fieldData.date}</td>
                    <td onClick={()=>handleTouch(e.fieldData.ID,page)}>
                      <div className="DisplayFlex AlignItem_center justifycontent_spacebetween">
                        <div>
                          <p className="extratable_td">{e.fieldData.dueDate}</p>
                        </div>
                        <div>
                          <a href="javascript:;">
                            <img src="/images/chevron_right.svg" />
                          </a>
                        </div>
                      </div>
                    </td>
                  </>
                ) : page === "Practices" ? (
                  <>
                    <td>{e.fieldData.bestPractice}</td>
                    <td>{e.fieldData.IDf_Location}</td>
                    <td>{e.IDf_IssueSubCategory}</td>
                    <td>
                      <div className="DisplayFlex AlignItem_center justifycontent_spacebetween">
                        <div>
                          <p className="extratable_td">{e.fieldData.date}</p>
                        </div>
                        {/* <div>
                          <a href="#"> */}
                           <div onClick={()=>handleTouch(e.fieldData.ID,page)}>
                           <a href="javascript:;">
                            <img src="/images/chevron_right.svg" />
                          </a>
                        </div>
                      </div>
                    </td>
                  </>
                ) : page === "Documents" ? (
                  <>
                    <td>{e.fieldData.title}</td>
                    <td>{e.fieldData.type}</td>
                    <td>{e.fieldData.status}</td>
                    <td>{e.fieldData.date}</td>
                    <td>
                      <div className="DisplayFlex AlignItem_center justifycontent_spacebetween">
                        <div>
                          <p className="extratable_td">{e.expirationDate}</p>
                        </div>
                        {/* <div>
                          <a href="#"> */}
                          <div onClick={()=>handleTouch(e.fieldData.ID,page)}>
                           <a href="javascript:;">
                            <img src="/images/chevron_right.svg" />
                          </a>
                        </div>
                      </div>
                    </td>
                  </>
                ) : page === "Visits" ? (
                  <>
                      <td>{e.fieldData.date}</td>
                      <td>{e.fieldData.IDf_Location}</td>
                      <td>{e.fieldData.visitType}</td>
                      <td>{e.fieldData.status}</td>
                  </>
                ) : (
                  <></>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
      {data.length === 0 && (
        <>
          <div>
            <div className="nodatafound">
              <div className="pb16">
                {" "}
                <img src="/images/info-icon.svg" />
              </div>

              <div className="searchtxt">
                Your search did not match any results
              </div>

              <div className="tryagaintxt">Please try again</div>
            </div>
          </div>
        </>
      )}
      {/* Pagination */}
      {data.length > 0 && 
      <div className="pagination_sec">
        <div className="DisplayFlex AlignItem_center">
          <div>
            <select
              value={itemPerPage}
              onChange={handlePage}
              className="mr_12 smalldropdown"
            >
              <option>25</option>
              <option>50</option>
              <option>100</option>
              <option>200</option> {/* option value can be changed here */}
            </select>
          </div>
          <div>
            <p className="Text14darkgray">{page} per Page</p>
          </div>
        </div>
        <div>
          <p className="Text14darkgray">
            {" "}
            {startdoc} - {perPage === totalpages ? sort.length : enddoc} of{" "}
            {sort.length} {page}{" "}
          </p>
        </div>
        <div className="DisplayFlex AlignItem_center">
          <div className='mr_8'>
            <input
              className="smalldropdown"
              type="number"
              width="30"
              max={totalpages}
              min={1}
              value={perPage}
              onChange={handlePage1}
            />
          </div>

          <div className='mr_24'>
            <p className="Text14darkgray"> of {totalpages} Pages</p>
          </div>
          <div className="DisplayFlex AlignItem_center">
            <div className="mr_4">
              <button
                name="Prev"
                className="prev_btn"
                onClick={() =>
                  perPage === 1 ? setPerPage(1) : setPerPage(perPage - 1)
                }
              >
                <img src="/images/left_arrow.svg" />
              </button>
            </div>
            <div>
              <button
                name="Next"
                className="next_btn"
                onClick={() =>
                  perPage === totalpages
                    ? setPerPage(totalpages)
                    : setPerPage(perPage + 1)
                }
              >
                <img src="/images/right_arrow.svg" />
              </button>
            </div>
          </div>
        </div>
      </div>
      }
    </div>
  );
}

export default IssueTable