import React from "react";
import Header from "../../components/header";
import UserRoute from "../../routes/useRoutes";
import useTranslation from "next-translate/useTranslation";
import Cusmodal from "../../components/model";

const Personal = () => {
  let { t } = useTranslation();

  var title = t("propstitle:edit");
  const header = ["title"];
  return (
    // <UserRoute>
      <div>
        <div>
          <div className="page_info">
            <div className="DisplayFlex AlignItem_center justifycontent_spacebetween width_100per">
              <ol className="bread_crumb">
                <li>
                  <img className="mr_8" src="/images/setting-icon.svg" />
                  <span>Settings</span>
                </li>
                <li className="active">
                  <img className="mr_8" src="/images/profile-icon.svg" />
                  <span>Personal Settings</span>
                </li>
              </ol>
              <div>
                {" "}
                <Cusmodal title={title} />
              </div>
            </div>
          </div>

          <div className="profleSection">
            <div className="profileBlock mb_16">
              <div className="profileimg"></div>
              <div className="profilename"> John Smith</div>
              <div className="designation"> Manager</div>

              <div className=" DisplayFlex AlignItem_center mb_8">
                <div>
                  <img className="mr_8" src="/images/profile-phone-icon.svg" />
                </div>
                <div>+30 6944 445566</div>
              </div>
              <div className=" DisplayFlex AlignItem_center mb_8">
                <div>
                  <img className="mr_8" src="/images/profile-map-icon.svg" />
                </div>
                <div>26, Kritis st, 12212 Athens</div>
              </div>
            </div>

            <div className="profiledetailblock">
              <div className="DisplayFlex AlignItem_center justifycontent_spacebetween">
                <div className="title"> Platform Access</div>
                <div>
                  {" "}
                  <button type="button" className="GreenButton">
                    [Auditor type]{" "}
                  </button>{" "}
                </div>
              </div>

              <div className="email mb_8"> johnsmith@somecompany.com</div>
              <div className="email"> ************</div>
            </div>
          </div>
        </div>
      </div>
    // </UserRoute>
  );
};

export default Personal;
