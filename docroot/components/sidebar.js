import React, { useState, useEffect, useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";
import { UserContext } from "../context";

const Sidebar = () => {
  let { t } = useTranslation();
  const router = useRouter();
  const [state, setState] = useContext(UserContext);

  const logout = () => {
    window.sessionStorage.removeItem("token");
    setState(null);
    router.push("/login");
  };
  //First Commit
  return (
    <div className="sidebar_wrapper">
      <div className="sidebar_logo">
        <img src="/images/logo.png" />
      </div>
      <ul>
        <li>
          <Link href="/dashboard">
            <a className={router.pathname == "/dashboard" ? "active" : ""}>
              <div className="menuiconwidth">
                {" "}
                <img src="/images/dashboard.svg" />
              </div>

              <span className="menu_text">{t("sidebar:dashboard")}</span>
            </a>
          </Link>
        </li>
        <li>
          <Link href="/issues/list">
            <a className={router.pathname == "/issues/list" ? "active" : ""}>
              <div className="menuiconwidth">
                {" "}
                <img src="/images/issues_icon.svg" />
              </div>

              <span className="menu_text">{t("sidebar:issues")}</span>
            </a>
          </Link>
        </li>
        <li>
          <Link href="/best-practices/list">
            <a
              className={
                router.pathname == "/best-practices/list" ? "active" : ""
              }
            >
              <div className="menuiconwidth">
                {" "}
                <img src="/images/best_practices.svg" />
              </div>

              <span className="menu_text">{t("sidebar:bestPractices")}</span>
            </a>
          </Link>
        </li>
        <li>
          <Link href="/documents/list">
            <a className={router.pathname == "/documents/list" ? "active" : ""}>
              <div className="menuiconwidth">
                {" "}
                <img src="/images/document_icon.svg" />
              </div>

              <span className="menu_text">{t("sidebar:documents")}</span>
            </a>
          </Link>
        </li>
        <li>
          <Link href="/calender/view">
            <a className={router.pathname == "/calender/view" ? "active" : ""}>
              <div className="menuiconwidth">
                {" "}
                <img src="/images/calendar_icon.svg" />
              </div>

              <span className="menu_text">{t("sidebar:visitCalender")}</span>
            </a>
          </Link>
        </li>
        <li>
          <Link href="/logbook/list">
            <a className={router.pathname == "/logbook/list" ? "active" : ""}>
              <div className="menuiconwidth">
                {" "}
                <img src="/images/log-book-icon.svg" />
              </div>

              <span className="menu_text">{t("sidebar:logbook")}</span>
            </a>
          </Link>
        </li>
        <li>
          <Link href="/accidents/list">
            <a className={router.pathname == "/accidents/list" ? "active" : ""}>
              <div className="menuiconwidth">
                {" "}
                <img src="/images/accidents_icon.svg" />
              </div>

              <span className="menu_text">{t("sidebar:accidents")}</span>
            </a>
          </Link>
        </li>
        <li>
          <a onClick={logout}>
            <div className="menuiconwidth">
              {" "}
              <img src="/images/logout_icon.svg" />
            </div>

            <span className="menu_text">{t("sidebar:logout")}</span>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
