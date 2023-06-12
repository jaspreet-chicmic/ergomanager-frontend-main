import React from "react";
import UserRoute from '../../routes/useRoutes'

const Overview = () => {
  return (
    // <UserRoute>
    <div>
      <div className="divider_issue">
        <div className="issue_review">
          <div style={{ padding: 16 }}>
            <h3 className="heading24_bold mb_24">Log book</h3>

            <div className="image_parent">
              <div className="imagePlaceholder"></div>
              <div className="imagePlaceholder"></div>
              <div className="imagePlaceholder"></div>
              <div className="imagePlaceholder"></div>
              <div className="imagePlaceholder"></div>
              <div className="imagePlaceholder"></div>
              <div className="imagePlaceholder"></div>
              <div className="imagePlaceholder"></div>
              <div className="imagePlaceholder"></div>
              <div className="imagePlaceholder"></div>
              <div className="imagePlaceholder"></div>
              <div className="imagePlaceholder"></div>
              <div className="imagePlaceholder"></div>
              <div className="imagePlaceholder"></div>
              <div className="imagePlaceholder"></div>
              <div className="imagePlaceholder"></div>
              <div className="imagePlaceholder"></div>
              <div className="imagePlaceholder"></div>
            </div>
          </div>
        </div>
        <div className="issue_information">
          <div style={{ padding: 16 }}>
            <h4 className="heading14_Bold mb_16">INFORMATION</h4>

            <div className="information_table mb_16">
              <table>
                <tbody>
                  <tr>
                    <td colSpan="4">
                      <div className="DisplayFlex">
                        <div className="mr_12">
                          <img src="/images/location_icon.svg" />
                        </div>
                        <div>
                          <h5 className="Text14Reg mb_8">Location</h5>
                          <h3 className="runningTextParagraph_16 mb_14">
                            [BuildingName]
                          </h3>
                          <p className="Text16Reg">
                            Placeholder for location description. Max 50 chars
                          </p>
                        </div>
                      </div>
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
};

export default Overview;
