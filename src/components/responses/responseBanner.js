import React from "react"
import responseStyles from "../../styles/response.module.css"
import ResponsePreviews from "./responsePreviews"

//Eventually this will get its own data source
export default function ResponseBanner() {
  return (
    <div className={responseStyles.responseBanner}>
      <div className="content-container">
        <div className={responseStyles.add}>Add a response</div>
        <div className={responseStyles.see}>See responses</div>
      </div>
      <ResponsePreviews></ResponsePreviews>
    </div>
  )
}
