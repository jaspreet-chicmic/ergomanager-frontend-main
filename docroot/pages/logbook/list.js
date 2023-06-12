import React from "react";

const List = () => {
  return (
    <div>
      <div className="page_info  ">
        <div>
          <h3 className="heading24_bold">Log book</h3>
        </div>
        <div>
          <button className="darkGray_btn" type="button">
            <img src="/images/download-arrow.svg" className="mr_12" />
            Download log book photos
          </button>
        </div>
      </div>

      <div className="logbookmargin ">
        <div className="row ">
          <div className="col-md-3 plr0">
            <div className="logleftsection">
              <div className="header mb_16">AVAILABLE LOCATIONS</div>

              <div className="menu mb_16">
                <div className="pr19">
                  <img src="/images/map-pin-icon.svg" />
                </div>
                <div className="menutxt"> [friendly name]</div>
              </div>
              <div className="menu mb_16">
                <div className="pr19">
                  <img src="/images/map-pin-icon.svg" />
                </div>
                <div className="menutxt"> [friendly name]</div>
              </div>
              <div className="menu mb_16">
                <div className="pr19">
                  <img src="/images/map-pin-icon.svg" />
                </div>
                <div className="menutxt"> [friendly name]</div>
              </div>
              <div className="menu mb_16">
                <div className="pr19">
                  <img src="/images/map-pin-icon.svg" />
                </div>
                <div className="menutxt"> [friendly name]</div>
              </div>
              <div className="menu mb_16">
                <div className="pr19">
                  <img src="/images/map-pin-icon.svg" />
                </div>
                <div className="menutxt"> [friendly name]</div>
              </div>
            </div>
          </div>
          <div className="col-md-9">
            <div className="logrightsection">
              {/* <div className="noselectedblock">
                <div className="mb_16">
                  {" "}
                  <img src="/images/info-icon.svg" />{" "}
                </div>

                <div className="titletxt mb_8"> No location selected</div>
                <div className="txt mb_8">
                  {" "}
                  Please select a location from the list on the left
                </div>
              </div> */}

              <div className="imgplaceholder">
                <img src="/images/placeholder.png" />
                <img src="/images/placeholder.png" />
                <img src="/images/placeholder.png" />
                <img src="/images/placeholder.png" />
                <img src="/images/placeholder.png" />
                <img src="/images/placeholder.png" />
                <img src="/images/placeholder.png" />
                <img src="/images/placeholder.png" />
                <img src="/images/placeholder.png" />
                <img src="/images/placeholder.png" />
                <img src="/images/placeholder.png" />
                <img src="/images/placeholder.png" />
                <img src="/images/placeholder.png" />
                <img src="/images/placeholder.png" />
                <img src="/images/placeholder.png" />
                <img src="/images/placeholder.png" />
                <img src="/images/placeholder.png" />
                <img src="/images/placeholder.png" />
                <img src="/images/placeholder.png" />
                <img src="/images/placeholder.png" />
                <img src="/images/placeholder.png" />
                <img src="/images/placeholder.png" />
                <img src="/images/placeholder.png" />
                <img src="/images/placeholder.png" />
                <img src="/images/placeholder.png" />
                <img src="/images/placeholder.png" />
                <img src="/images/placeholder.png" />
                <img src="/images/placeholder.png" />
                <img src="/images/placeholder.png" />
                <img src="/images/placeholder.png" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
