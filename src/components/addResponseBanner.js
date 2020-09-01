import React, { useState } from "react"
import AllResponsePreviews from "./responses/allResponsePreviews"
import AddResponse from "./pieces/addResponse"
import { graphql, useStaticQuery } from "gatsby"

export default function AddResponseBanner({ locale }) {
  const data = useStaticQuery(graphql`
    query {
      allSiteTextJson {
        edges {
          node {
            en {
              buttons {
                addResponse
                closeAddAResponse
              }
            }
            es {
              buttons {
                addResponse
                closeAddAResponse
              }
            }
          }
        }
      }
    }
  `)

  const [addResponseOpen, setAddResponseOpen] = useState(false)
  const buttonNames = data.allSiteTextJson.edges[0].node
  const buttonNamesInLocale = buttonNames[locale].buttons

  function getAddResponseButton() {
    let closeText = buttonNamesInLocale.closeAddAResponse
    let openText = buttonNamesInLocale.addResponse

    let text = addResponseOpen ? closeText : openText

    return (
      <div
        onClick={() => setAddResponseOpen(addResponseOpen => !addResponseOpen)}
        key={0}
        className="button"
      >
        {text}
      </div>
    )
  }

  function closeResponseCallback() {
    setAddResponseOpen(addResponseOpen => false)
  }
  function getAddResponseDialogue() {
    if (addResponseOpen) {
      return (
        <AddResponse
          isOpen={addResponseOpen}
          closeResponseCallback={() => closeResponseCallback()}
        >
          {" "}
        </AddResponse>
      )
    } else {
      return ""
    }
  }
  return (
    <div style={{ height: "100%" }}>
      {getAddResponseDialogue()}
      <div className="addResponseBanner">{getAddResponseButton()}</div>
      <AllResponsePreviews></AllResponsePreviews>
    </div>
  )
}
