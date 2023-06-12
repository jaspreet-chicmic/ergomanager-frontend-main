import React from "react";
import useTranslation from "next-translate/useTranslation";
import { useRouter  } from "next/router";

const ForgetPassword = () => {
  let { t } = useTranslation();
  const router = useRouter();
  const url = router.route
  const { locale } = router;
  const handleLanguageToggle = () => {
    switch(locale) {
      case "en-US":
        router.push(`${url}`,`${url}`, { locale: "el" });
        break;
      case "el":
        router.push(`${url}`,`${url}`, { locale: "en-US" });
        break; 
    }
  }

  return (
    <div className="forgotpassword">
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
          <div className="accountFrame ">
            <div className="account_sec borderradius_six">
              <h3 className="heading18SemiBold mb_16">
                {t("forget-password:forgetpw")}
              </h3>
              <p className="runningTextParagraph_16 mb_16">
                {t("forget-password:emailDesc")}
              </p>
              <form>
                <div className="mb_16">
                  <input
                    type="text"
                    className="input_form width_100per"
                    placeholder={t("forget-password:email")}
                  />
                </div>
                <button className="darkGray_btn">
                  {t("forget-password:submit")}
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="ergonomia_logo textAligncenter">
          <img src="/images/ergonomia_logo.png" />
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
