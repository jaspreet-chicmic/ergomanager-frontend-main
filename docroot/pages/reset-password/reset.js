import React from 'react'
const UserId = () => {
  return (
    <div className="forgotpassword">
      <div className="center_align height_100vh">
        <div className="ml_auto">
          <a href="#" className="language_selector padding_32">
            ΕΛ
            <img className="ml_8" src="/images/ea_language.png" />
          </a>
        </div>
        <div>
          <div className="logo_section">
            <img src="/images/logo.png" />
          </div>
          <div className="accountFrame " style={{ display: "none" }}>
            <div className="account_sec borderradius_six">
              <h3 className="heading18SemiBold mb_16">Create new Password</h3>
              <p className="runningTextParagraph_16 mb_16">
                Please add below your new password
              </p>
              <form>
                <div className="mb_16">
                  <input
                    type="text"
                    className="input_form width_100per"
                    placeholder="Add password"
                  />
                </div>
                <div className="mb_16">
                  <input
                    type="text"
                    className="input_form width_100per"
                    placeholder="Confirm password"
                  />
                </div>
                <button className="darkGray_btn">Save</button>
              </form>
            </div>
          </div>

          <div className="accountFrame ">
            <div className="confirmationFrame textAligncenter">
              <img className="mb_8" src="/images/circle_success.svg" />
              <h3 className="heading18SemiBold mb_16">Success!</h3>
              <p className="mb_24 runningTextParagraphgray_16">
                You created a new password successfully
              </p>
              <div className="textAligncenter">
                <button className="darkGray_btn">Lets go to login page</button>
              </div>
            </div>
          </div>
        </div>
        <div className="ergonomia_logo">
          <img src="/images/ergonomia_logo.png" />
        </div>
      </div>
    </div>
  );
}

export default UserId
