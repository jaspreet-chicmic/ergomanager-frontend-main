import React, { useState,useEffect,useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import useTranslation from "next-translate/useTranslation";
import { useRouter  } from "next/router";
import {UserContext} from "../context/index"


const Login = () => {
  let { t } = useTranslation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [state,setState] = useContext(UserContext);


  const router = useRouter();
  const { locale } = router;
  const handleLanguageToggle = () => {
    switch(locale) {
      case "en-US":
        router.push("/","/", { locale: "el" });
        break;
      case "el":
        router.push("/","/", { locale: "en-US" });
        break; 
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("event passed--->", e, username, password);

    const {data} = await axios.post("/login",{
      username, password
    });

    console.log("res----->",data,JSON.parse(data.data))
    var token = data.data1.response.token
    var newData = JSON.parse(data.data)
    console.log("newData--->",newData)
    if(newData.message)toast.error(newData.message);
    var auth = {
      token : token,
      appSessionID: newData.appSessionID,
      userID: newData.contactID
    }
    setState({
      appSessionID: newData.appSessionID,
      token: token,
      userID: newData.contactID
  })
    window.sessionStorage.setItem('token',JSON.stringify(auth));

  };
  if(state && state.token && state.appSessionID) router.push('/dashboard');
  return (
    <div className="fullFrame">
      <div className="leftsidecontent">
        {/* <img src="/images/login_bg.png" /> */}
      </div>
      <div className="rightsidecontent">
        <div className="center_align">
          <div className="textAlignright">
            <a
              onClick={handleLanguageToggle}
              href="#"
              className="language_selector padding_32"
            >
              {locale}
              <img
                className="ml_8"
                src={
                  locale === "el"
                    ? "/images/ea_language.png"
                    : "/images/us_language.svg"
                }
              />
            </a>
          </div>
          <div>
            <div className="logo_section">
              <img src="/images/logo.png" />
            </div>
            <div className="accountFrame">
              <div className="account_sec">
                <h3 className="heading18SemiBold mb_16">{t("login:login")}</h3>
                <form onSubmit={handleSubmit}>
                  <div className="mb_12">
                    <input
                      type="text"
                      className="input_form width_100per"
                      placeholder={t("login:username")}
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <div className="mb_16">
                    <input
                      type="password"
                      className="input_form width_100per"
                      placeholder={t("login:password")}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  <div className="DisplayFlex AlignItem_center justifycontent_spacebetween">
                    <div>
                      <a href="#" className="forgotpassword_btn">
                        {t("login:forgotpw")}
                      </a>
                    </div>
                    <div>
                      <button
                        className="darkGray_btn"
                        disabled={!username || !password}
                      >
                        {t("login:login")}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
              <div className="Social_sec">
                <button className="socialconnect_btn mb_12">
                  <img src="/images/google_icon.svg" className="mr_8" />
                  {t("login:loginwGoogle")}
                </button>
                <button className="socialconnect_btn">
                  <img src="/images/office_icon.svg" className="mr_8" />
                  {t("login:loginwmicrosoft")}
                </button>
              </div>
            </div>
          </div>
          <div className="ergonomia_logo textAligncenter">
            <img src="/images/ergonomia_logo.png" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
