import React, { useState } from "react"
import responseStyles from "../styles/response.module.css"
import AllResponsePreviews from "./responses/allResponsePreviews"
import AddResponse from "./pieces/addResponse"
import { Link, graphql, useStaticQuery } from "gatsby"

export default function NavBanner({ pageURL }) {
  const data = useStaticQuery(graphql`
    query {
      allSiteTextJson {
        edges {
          node {
            en {
              buttons {
                addResponse
                seeResponse
                seeHome
                seeAbout
                closeAddAResponse
              }
            }
          }
        }
      }
    }
  `)

  const buttonNames = data.allSiteTextJson.edges[0].node.en.buttons

  const [addResponseOpen, setAddResponseOpen] = useState(false)

  function getAddResponseButton() {
    let text = addResponseOpen
      ? buttonNames.closeAddResponse
      : buttonNames.addResponse
    return (
      <div
        className={`${responseStyles.button}`}
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

  function getLinkForButton(route, name) {
    return (
      <Link
        className={responseStyles.button}
        activeClassName={responseStyles.activeButton}
        to={route}
      >
        {name}
      </Link>
    )
  }
  return (
    <div>
      {getAddResponseDialogue()}
      <div className={responseStyles.responseBanner}>
        <div
          className={`content-container ${responseStyles.responseBannerContentContainer}`}
        >
          {getLinkForButton("/", buttonNames.seeHome)}
          {getAddResponseButton()}
          {getLinkForButton("/responses", buttonNames.seeResponse)}
          {getLinkForButton("/about", buttonNames.seeAbout)}
        </div>
      </div>
      <AllResponsePreviews></AllResponsePreviews>
    </div>
  )
}
