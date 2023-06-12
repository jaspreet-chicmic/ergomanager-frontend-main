import React from 'react'
import useTranslation from "next-translate/useTranslation";
import UserRoute from '../../routes/useRoutes'
const DocumentId = () => {
  let { t } = useTranslation()

  return (
    // <UserRoute>
    <div>
      <div className="page_info">
        <div>
          <ol className="bread_crumb">
            <li>
              <img src="/images/dots_horizontal.svg" />
            </li>
            <li>
              <img className="mr_8" src="/images/location_marker.svg" />
              <span>Kifisias 3</span>
            </li>
            <li>
              <img className="mr_8" src="/images/calendar_icon.svg" />
              <span>Visit: 14-Mar-2022</span>
            </li>
            <li className="active">
              <img className="mr_8" src="/images/textDocument.svg" />
              <span>Test 1234</span>
            </li>
          </ol>
        </div>
      </div>

      <div className="divider_issue">
        <div className="issue_review">
          <div style={{ padding: 16 }}>
            <div className="DisplayFlex AlignItem_center justifycontent_spacebetween mb_16">
              <div>
                <h3 className="heading24_bold ">
                  Test_Document_Certificate0243
                </h3>
              </div>
              <div>
                <button className="Delete_btn">
                  <img src="/images/deletebtn_icon.svg" className="mr_12" />
                  {t("pageid:delete")}
                </button>
              </div>
            </div>

            <div className="mb_16">
              <label>{t("pageid:documentdesc")}</label>
              <textarea
                className="textarea"
                placeholder={t("pageid:documentplaceholder")}
              ></textarea>
            </div>
          </div>
        </div>
        <div className="issue_information">
          <div style={{ padding: 16 }}>
            <h4 className="heading14_Bold mb_16">{t("pageid:information")}</h4>
            <div className="DisplayFlex AlignItem_center justifycontent_spacebetween mb_16">
              <div className="DisplayFlex AlignItem_center">
                <p className="pr_5 Text14Reg">{t("pageid:status")}</p>
                <button className="GreenButton">Valid</button>
              </div>
            </div>
            <div className="information_table mb_16">
              <table>
                <tbody>
                  <tr>
                    <td colSpan="2">
                      <div className="DisplayFlex AlignItem_center">
                        <div className="mr_12">
                          <img src="/images/category_icon.svg" />
                        </div>
                        <div>
                          <h5 className="Text14Reg">{t("pageid:type")}</h5>
                        </div>
                      </div>
                    </td>
                    <td colSpan="2">
                      <h4 className="Text14SemiBold">Certificate</h4>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="2">
                      <div className="DisplayFlex AlignItem_center">
                        <div className="mr_12">
                          <img src="/images/date_calendar_icon.svg" />
                        </div>
                        <div>
                          <h5 className="Text14Reg">{t("pageid:addedon")}</h5>
                        </div>
                      </div>
                    </td>
                    <td colSpan="3">
                      <h4 className="Text14SemiBold">14 Mar 2022</h4>
                    </td>
                  </tr>

                  <tr>
                    <td colSpan="2">
                      <div className="DisplayFlex AlignItem_center">
                        <div className="mr_12">
                          <img src="/images/date_calendar_icon.svg" />
                        </div>
                        <div>
                          <h5 className="Text14Reg">{t("pageid:expireson")}</h5>
                        </div>
                      </div>
                    </td>
                    <td colSpan="3">
                      <h4 className="Text14SemiBold">14 Jun 2022</h4>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="2">
                      <div className="DisplayFlex AlignItem_center">
                        <div className="mr_12">
                          <img src="/images/link_icon.svg" />
                        </div>
                        <div>
                          <h5 className="Text14Reg">{t("pageid:file")}</h5>
                        </div>
                      </div>
                    </td>
                    <td>
                      <h4 className="Text14SemiBold">Certificate.pdf</h4>
                    </td>
                    <td>
                      <a href="#" className="DisplayFlex AlignItem_center">
                        <img src="/images/chevron_right.svg" />
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    // </UserRoute>
  );
}

export default DocumentId
