import '../styles/globals.scss'
import Header from '../components/header'
import Sidebar from '../components/sidebar'
import { useRouter } from "next/router";
import "antd/dist/antd.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import {ToastContainer,toast} from 'react-toastify';
import {useState, useEffect} from "react";
import 'react-toastify/dist/ReactToastify.css';
import "@fullcalendar/common/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import {UserAccess} from '../context';
import Router from "next/router"
import Loader from "../components/loader"
function MyApp({ Component, pageProps }) {

  const router = useRouter()
  const [locdataz,setLocdataz] = useState([]);
  const [locdropdown, setLocdropdown] = useState([])
  const [cusID, setCusID] = useState('')
  console.log("console from ---------> ",locdataz)

        var idz = router.query.id
      
      useEffect(() => {
        require("bootstrap/dist/js/bootstrap.bundle.min.js");
        if (typeof window !== 'undefined') {
                const loader = document.getElementById('globalLoader');
            if (loader)
                loader.style.display = 'none';
        }
    }, []);
    const [loading, setloading] = useState(false)
    Router.events.on('routeChangeStart', (url)=>{
      console.log("route is changing....")
      setloading(true)
    })
    Router.events.on('routeChangeComplete', (url)=>{
      console.log("route changing is completed....")
      setloading(false)
    })
  return (
    <>
      {router.pathname !== "/" &&
      router.pathname !== "/forget-password" &&
      router.pathname !== `/reset-password/reset` &&
      router.pathname !== "/login" ? (
        <>
        <UserAccess>
          <div className={"page_wrapper"}>
            <Sidebar />

            <div className="content_wrapper">
              <Header setLocdataz={setLocdataz} setCusID={setCusID} setLocdropdown={setLocdropdown}/>
              <ToastContainer position="top-right"/>
              <Component {...pageProps} locdataz={locdataz} cusID={cusID} locdropdown={locdropdown}/>
            </div>
          </div>
        </UserAccess>
        </>
      ) : (
        <>
        <UserAccess>
          {/* <div className={"page_wrapper"}> */}
          {/* <div className="content_wrapper"> */}
          <ToastContainer position="top-right"/>
          {loading && <Loader />}
          <Component {...pageProps} />
          {/* </div> */}
          {/* </div> */}
        </UserAccess>
        </>
      )}
    </>
  );
    }

export default MyApp;
