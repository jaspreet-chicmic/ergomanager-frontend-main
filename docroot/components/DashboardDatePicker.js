import React,{ useState } from 'react'
import { DateRangePicker } from 'react-date-range'; //packages for dates
import { addDays } from 'date-fns';
import moment from 'moment';

const DashboardDatePicker = ({setDates}) => {

    const [ range , setRange ] = useState([{ 
        startDate : new Date(),
        endDate: new Date(),
        key: 'selection'
    }]) // ranges we select in calender
      
    const getDates = () => {
    let dateArray = []
    let currentDate = moment( range[0].startDate);
    let stopDate = moment(range[0].endDate);
    while (currentDate <= stopDate) {
        dateArray.push( moment(currentDate).format('MM/DD/YYYY') )
        currentDate = moment(currentDate).add(1, 'days');
    }
    setDates(dateArray)
    }

  return (
    <>
      <div className="DisplayFlex AlignItem_center">
        {/* <div>
          <h4 className="heading18SemiBold mr_16">Set Timeframe for</h4>
        </div> */}
      </div>
      <div>
        <DateRangePicker
          onChange={(item) => setRange([item.selection])}
          editableDateInputs={true}
          moveRangeOnFirstSelection={false}
          ranges={range}
          defaultValue={null}
          showDateDisplay={false}
          months={2}
          direction="horizontal"
          className="calenderElement"
          rangeColors={["#a3a096"]}
        />
      </div>
      <div className="DisplayFlex justifycontent_end">
        <button
          onClick={() => getDates()}
          className="mr_8 SmalldarkGray_btn"
        >
          Set Timeframe
        </button>
        <button
          className="SmalldarkGray_btn"
          onClick={() =>
            setDates([])
          }
        >
          Clear Timeframe
        </button>
      </div>
    </>
  )
}

export default DashboardDatePicker