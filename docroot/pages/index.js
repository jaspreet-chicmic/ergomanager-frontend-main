import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.scss";
import Login from "./login";
import FullCalendar from "@fullcalendar/react";
// The import order DOES MATTER here. If you change it, you'll get an error!
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
export default function Home() {
  return (
    <div className={styles.container}>
      <Login />
    </div>
  );
}
