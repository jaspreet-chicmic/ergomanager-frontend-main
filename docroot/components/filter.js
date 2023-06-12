import React,{useState} from "react";
import Select from "react-select";
import DatePicker from './dataPicker'
import Modal from "react-bootstrap/Modal";
import useTranslation from "next-translate/useTranslation";

const Filter = ({
  data,
  setPriorityFilter,
  setStatusFilter,
  setAssigneeFilter,
  setCategoryFilter,
  setGlobalSearch,
  setTypeFilter,
  setStatusdocFilter,
  setDateAddedFilter,
  setDueDateFilter,
  setVisitType,
  setVisitStatus,
  fil,
}) => {
  console.log("filters fieldData-->", data, fil);
  // console.log("check--->", fieldData[0]);

  //datefiltering
// for calender open close
  const [ calenderOpen, setCalenderOpen ] = useState(false) 

      const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    const handleShow = () => setShow(true);

  const uniqueCategory = [...new Set(data.map((Val) => Val.fieldData.IDf_IssueSubCategory))];
  const optionCategory = [];
  if (optionCategory.length === 0) {
    for (let i = 0; i < uniqueCategory.length; i++) {
      optionCategory.push({
        value: uniqueCategory[i],
        label: uniqueCategory[i],
      });
    }
  }

  const categoryChange = (e) => {
    let copy = e;
    let newArray = [];
    for (let n = 0; n < copy.length; n++) {
      newArray.push(copy[n].label);
    }
    setCategoryFilter(newArray);
  };

  // Assignee Filtering
  const uniqueAssignee = [...new Set(data.map((Val) => Val.assignee))];
  const optionAssignee = [];
  if (optionAssignee.length === 0) {
    for (let i = 0; i < uniqueAssignee.length; i++) {
      console.log(uniqueAssignee.length);
      optionAssignee.push({
        value: uniqueAssignee[i],
        label: uniqueAssignee[i],
      });
    }
  }

  const uniqueType = [...new Set(data.map((Val) => Val.type))];
  const optionType = [];
  if (optionType.length === 0) {
    for (let i = 0; i < uniqueType.length; i++) {
      console.log(uniqueType);
      optionType.push({ value: uniqueType[i], label: uniqueType[i] });
    }
  }
  const typeChange = (e) => {
    let copy = e;
    let newArray = [];
    for (let n = 0; n < copy.length; n++) {
      newArray.push(copy[n].label);
    }
    setTypeFilter(newArray);
  };

  const uniqueDocstat = [...new Set(data.map((Val) => Val.status))];
  const optionDocstat = [];
  if (optionDocstat.length === 0) {
    for (let i = 0; i < uniqueDocstat.length; i++) {
      console.log(uniqueType);
      optionDocstat.push({ value: uniqueDocstat[i], label: uniqueDocstat[i] });
    }
  }

  const docstatChange = (e) => {
    let copy = e;
    let newArray = [];
    for (let n = 0; n < copy.length; n++) {
      newArray.push(copy[n].label);
    }
    setStatusdocFilter(newArray);
  };

  const assigneeChange = (e) => {
    let copy = e;
    let newArray = [];
    for (let n = 0; n < copy.length; n++) {
      newArray.push(copy[n].label);
    }
    setAssigneeFilter(newArray);
  };

  const statusChange = (e) => {
    let copy = e;
    let newArray = [];
    for (let n = 0; n < copy.length; n++) {
      newArray.push(copy[n].label);
    }
    setStatusFilter(newArray);
  };

  const priorityChange = (e) => {
    let copy = e;
    let newArray = [];
    for (let n = 0; n < copy.length; n++) {
      newArray.push(copy[n].label);
    }
    setPriorityFilter(newArray);
  };

  // Status Filter
  const optionStatus = [
    { value: "Σε Εκκρεμότητα", label: "Σε Εκκρεμότητα", color: "#CC0905" },
    { value: "Υλοποιήθηκε", label: "Υλοποιήθηκε", color: "#F8C51B" },
    { value: "Κλειστό", label: "Κλειστό", color: "#22C348" },
  ];

  const optionPriority = [
    { value: "low", label: "Low", color: "#22C348" },
    { value: "medium", label: "Medium", color: "#F8C51B" },
    { value: "high", label: "High", color: "#CC0905" },
  ];

  const colorStyles = {
    control: (styles) => ({ ...styles, backgroundColor: "white" }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return { ...styles, color: data.color };
    },
    multiValue: (styles, { data }) => {
      return {
        ...styles,
        backgroundColor: data.color,
        color: "#fff",
      };
    },
    multiValueLabel: (styles, { data }) => {
      return {
        ...styles,
        color: "#fff",
      };
    },
    multiValueRemove: (styles, { data }) => {
      return {
        ...styles,
        color: "#fff",
        cursor: "pointer",
        ":hover": {
          color: "#fff",
        },
      };
    },
  };

  const uniqueVisitType = [...new Set(data.map((Val) => Val.fieldData.visitType))]
  const optionVisitType = []
  if (optionVisitType.length === 0) {
    for (let i = 0; i < uniqueVisitType.length; i++) {
      optionVisitType.push({
        value: uniqueVisitType[i],
        label: uniqueVisitType[i],
      });
    }
  }
  const visitTypeChange = (e) => {
    let copy = e;
    let newArray = [];
    for (let n = 0; n < copy.length; n++) {
      newArray.push(copy[n].label);
    }
    setVisitType(newArray);
  };

  const uniqueVisitStatus = [...new Set(data.map((Val) => Val.fieldData.status))]
  const optionVisitStatus = []
  if (optionVisitStatus.length === 0) {
    for (let i = 0; i < uniqueVisitStatus.length; i++) {
      optionVisitStatus.push({
        value: uniqueVisitStatus[i],
        label: uniqueVisitStatus[i],
      });
    }
  }
  const visitStatusChange = (e) => {
    let copy = e;
    let newArray = [];
    for (let n = 0; n < copy.length; n++) {
      newArray.push(copy[n].label);
    }
    setVisitStatus(newArray);
  };

  const ClearAll = () => {
    {
      fil === "issues" ? (
        (setCategoryFilter([]),
        setAssigneeFilter([]),
        setStatusFilter([]),
        setPriorityFilter([]))
      ) : fil === "best" ? (
        (setCategoryFilter([]), (<></>))
      ) : fil === "doc" ? (
        (setTypeFilter([]), setStatusdocFilter([]))
      ) : fil === "view" ? (
        (setVisitType([]), setVisitStatus([]))
      ) : (
        <></>
      );
    }
  };

  let { t } = useTranslation();

  return (
    <>
      <div className="Filters_sec">
        {fil === "issues" ? (
          <>
            <div className="mr_16">
              <Select
                options={optionCategory}
                placeholder={t("filters:category")}
                isMulti
                hideSelectedOptions={false}
                closeMenuOnSelect={false}
                onChange={categoryChange}
              />
            </div>

            <div className="mr_16">
              <Select
                options={optionAssignee}
                placeholder={t("filters:assignee")}
                isMulti
                hideSelectedOptions={false}
                closeMenuOnSelect={false}
                onChange={assigneeChange}
              />
            </div>
            <div className="mr_16">
              <Select
                options={optionStatus}
                placeholder={t("filters:status")}
                isMulti
                hideSelectedOptions={false}
                closeMenuOnSelect={false}
                styles={colorStyles}
                onChange={statusChange}
              />
            </div>
            <div className="mr_16">
              <Select
                options={optionPriority}
                placeholder={t("filters:priority")}
                isMulti
                hideSelectedOptions={false}
                closeMenuOnSelect={false}
                styles={colorStyles}
                onChange={priorityChange}
              />
            </div>
          </>
        ) : fil === "doc" ? (
          <>
            <div className="mr_16">
              <Select
                options={optionType}
                placeholder={t("filters:type")}
                isMulti
                hideSelectedOptions={false}
                closeMenuOnSelect={false}
                onChange={typeChange}
              />
            </div>
            <div className="mr_16">
              <Select
                options={optionDocstat}
                placeholder={t("filters:status")}
                isMulti
                hideSelectedOptions={false}
                closeMenuOnSelect={false}
                onChange={docstatChange}
              />
            </div>
          </>
        ) : fil === "best" ? (
          <>
            <div className="mr_16">
              <Select
                options={optionCategory}
                placeholder={t("filters:category")}
                isMulti
                hideSelectedOptions={false}
                closeMenuOnSelect={false}
                onChange={categoryChange}
              />
            </div>
          </>
        ) : fil === "view" ? (
          <>
            <div className="mr_16">
              <Select
                options={optionVisitType}
                placeholder={t("visits:filterbyvisittype")}
                isMulti
                hideSelectedOptions={false}
                closeMenuOnSelect={false}
                onChange={visitTypeChange}
              />
            </div>
            <div className="mr_16">
              <Select
                options={optionVisitStatus}
                placeholder={t("visits:filterbyvisitstatus")}
                isMulti
                hideSelectedOptions={false}
                closeMenuOnSelect={false}
                onChange={visitStatusChange}
              />
            </div>
          </>
        ) : (
          <></>
        )}
        { fil !== 'view' && (<>
        <div className="mr_16">
          <input
            readOnly
            value={t("filters:date")}
            className="filderDropdownoutline"
            onClick={handleShow}
          />
          <Modal
            show={show}
            onHide={handleClose}
            className="filterBydate_popup"
          >
            <Modal.Header closeButton>
              {/* <div className="DisplayFlex AlignItem_center justifycontent_spacebetween">
                <div className="DisplayFlex AlignItem_center">
                  <div>
                    <h4 className="heading18SemiBold mr_16">
                      Set Timeframe for
                    </h4>
                  </div>
                  <div className="prefer_method mr_24">
                    <input id="dateadded" type="radio" name="settimeframe" />
                    <label for="dateadded">Date Added</label>
                  </div>

                  <div className="prefer_method">
                    <input id="duedate" type="radio" name="settimeframe" />
                    <label for="duedate">Due Date</label>
                  </div>
                </div>
                <div>
                  <button className="lightGrayborder_btn">Show Today</button>
                </div>
              </div> */}
            </Modal.Header>

            <Modal.Body>
              <DatePicker
                setDateAddedFilter={setDateAddedFilter}
                setDueDateFilter={setDueDateFilter}
              />
            </Modal.Body>
          </Modal>
        </div>
        
        <div>
          <button className="clear_btn" onClick={() => ClearAll()}>
            <img className="mr_12" src="/images/close_icon.svg" />
            {t("filters:clear")}
          </button>
        </div>
        </>)}
      </div>
    </>
  );
};

export default Filter;
