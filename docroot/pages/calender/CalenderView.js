import FullCalendar from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import { useRef, useState, useEffect } from "react";
import UserRoute from '../../routes/useRoutes'
import { useRouter } from "next/router";
import moment from "moment";

const CalenderView = ({data}) => {

  const [ CalenderData, setCalenderData ] = useState([])
  const router = useRouter()
  useEffect(()=>{ setCalenderData(data)})
  const calendarRef = useRef(null);
  // console.log(data[0].fieldData.date,'------>',moment(data[0].fieldData.date,'MM/DD/YYYY').format('DD MMM YYYY'));
  function rendereventcontent(eventInfo) {
      let icons = (eventInfo.event.id == 'A' ? '/images/medium_hat.svg' : eventInfo.event.status == 'B' ? '/images/low_briefcase.svg' : eventInfo.event.status == 'C' ? '/images/high_plus.svg' : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBEKRYXicmzzIRS4wBubLX71V7KOGCL0Fy-w&usqp=CAU')
      // console.log(eventInfo.event.id.split(',')[0]);
    return <div style={{display: 'flex', flexDirection: 'row'}}>
      <img style={{ width:12, height:12}} src={icons} alt=''/>
      <p>{eventInfo.event.title}</p>
    </div>
  }

  function dayrender(eventInfo){
    router.push(`/calender/${eventInfo.event.id.split(',')[1]}`)
  }

  return (
    // <UserRoute>
    <div>
      <div className="page_info">
        {/* <div>
          <h3 className="heading24_bold">August 2022</h3>
        </div> */}
        <div>
          {/* <button className="darkGray_btn">
            <img src="/images/add_icon.svg" className="mr_12" />
            Add new audit
          </button> */}
        </div>
      </div>

      <FullCalendar
        innerRef={calendarRef}
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        editable
        selectable
        eventContent={rendereventcontent}
        selectOverlap={false}
        eventClick={dayrender}
        events={
            CalenderData.map((e)=>{
            const dates = moment(e.fieldData.date,'MM/DD/YYYY').format('YYYY-MM-DD')
            let translate = (e.fieldData.status === 'Προγραμματισμένη' ? "A" : e.fieldData.status === 'Ολοκληρωμένη' ? 'B' : e.fieldData.status === 'Ακυρωμένη' ? 'C' : 'D')
            return { title: e.fieldData.title , date: dates, color: '#ffffff', textColor: '#000000', id: `${translate},${dates}`}    
        })
        }
      />
    </div>
    // </UserRoute>
  );
};

export default CalenderView;
