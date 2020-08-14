import React, { useState } from "react"
import responseStyles from "../../styles/response.module.css"
import AllResponsePreviews from "./allResponsePreviews"
import LinkedElement from "../linkedElement"
import AddResponse from "../pieces/addResponse"

export default function ResponseBanner() {
  const [addResponseOpen, setAddResponseOpen] = useState(false)

  return (
    <div>
      {addResponseOpen ? (
        <AddResponse isOpen={addResponseOpen}> </AddResponse>
      ) : (
        ""
      )}
      <div className={responseStyles.responseBanner}>
        <div className="content-container">
          <div
            className={`${responseStyles.add} ${responseStyles.button}`}
            onClick={() =>
              setAddResponseOpen(addResponseOpen => !addResponseOpen)
            }
          >
            Add a response
          </div>
          <LinkedElement
            elementClass={`${responseStyles.see} ${responseStyles.button}`}
            linkTo={"/responses"}
          >
            See responses
          </LinkedElement>
        </div>
        <AllResponsePreviews></AllResponsePreviews>
      </div>
    </div>
  )
}
