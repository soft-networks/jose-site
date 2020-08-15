import React, { useState } from "react"
import responseStyles from "../../styles/response.module.css"
import AllResponsePreviews from "./allResponsePreviews"
import LinkedElement from "../linkedElement"
import AddResponse from "../pieces/addResponse"

export default function ResponseBanner({ pageURL }) {
  const [addResponseOpen, setAddResponseOpen] = useState(false)

  function getAddResponseButton() {
    let text = addResponseOpen ? "close" : "Add a response"
    return (
      <div
        className={`${responseStyles.add} ${responseStyles.button}`}
        onClick={() => setAddResponseOpen(addResponseOpen => !addResponseOpen)}
      >
        {text}
      </div>
    )
  }

  function getAddResponseDialogue() {
    if (addResponseOpen) {
      return <AddResponse isOpen={addResponseOpen}> </AddResponse>
    } else {
      return ""
    }
  }

  function getNavButton() {
    let src, title
    src = "/responses"
    title = "See responses"

    if (pageURL) {
      if (pageURL.pathname === "/responses") {
        src = "/"
        title = "back"
      }
    }
    return (
      <LinkedElement
        elementClass={`${responseStyles.see} ${responseStyles.button}`}
        linkTo={src}
      >
        {title}
      </LinkedElement>
    )
  }
  return (
    <div>
      {getAddResponseDialogue()}
      <div className={responseStyles.responseBanner}>
        <div className="content-container">
          {getAddResponseButton()}
          {getNavButton()}
        </div>
        <AllResponsePreviews></AllResponsePreviews>
      </div>
    </div>
  )
}
