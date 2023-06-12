import React from 'react'
import useTranslation from "next-translate/useTranslation";

const Search = ({setGlobalSearch}) => {
  let { t } = useTranslation()
  return (
    <>
       <div className="search_form mr_23">
          <div className="input_group">
            <input
              type="text"
              placeholder={t("search:search")}
              onChange={(e)=>setGlobalSearch(e.target.value)}
            />
            <div className="inputgroup_append">
              <span className="input_group_text">
                <img src="/images/search_icon.svg" />
              </span>
            </div>
          </div>
        </div>
    </>
  )
}

export default Search