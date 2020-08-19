import React, { useState } from "react"
import responseStyles from "../styles/response.module.css"
import AllResponsePreviews from "./responses/allResponsePreviews"
import AddResponse from "./pieces/addResponse"
import { Link, graphql, useStaticQuery } from "gatsby"
import { LocaleConsumer } from "../layouts/coreLayout"
import LinkedElement from "./linkedElement"

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
            es {
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

  const [addResponseOpen, setAddResponseOpen] = useState(false)

  //TODO: ITS PROBABLY EASIER TO JUST DRIVE THIS FROM THE DATA ITSELF :)
  function getAllButtonsForLocale(locale) {
    if (!locale) {
      locale = "es"
    }
    const buttonNames = data.allSiteTextJson.edges[0].node
    const buttonNamesInLocale = buttonNames[locale].buttons

    let homeButton = getLinkForButton("/", buttonNamesInLocale.seeHome, 1)
    let responseButton = getLinkForButton(
      "/responses",
      buttonNamesInLocale.seeResponse,
      2
    )
    let aboutButton = getLinkForButton(
      "/about",
      buttonNamesInLocale.seeAbout,
      3
    )
    let addButton = getAddResponseButton(
      buttonNamesInLocale.closeAddAResponse,
      buttonNamesInLocale.addResponse
    )
    return [addButton, homeButton, responseButton, aboutButton]
  }

  function getAddResponseButton(closeText, openText) {
    let text = addResponseOpen ? closeText : openText
    return (
      <div
        className={`${responseStyles.button}`}
        onClick={() => setAddResponseOpen(addResponseOpen => !addResponseOpen)}
        key={0}
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

  function getLinkForButton(route, name, index) {
    return (
      <LinkedElement
        className={responseStyles.button}
        activeClassName={responseStyles.activeButton}
        to={route}
        key={index}
      >
        {name}
      </LinkedElement>
    )
  }
  return (
    <div>
      {getAddResponseDialogue()}
      <div className={responseStyles.responseBanner}>
        <div
          className={`content-container ${responseStyles.responseBannerContentContainer}`}
        >
          <LocaleConsumer>
            {locale => getAllButtonsForLocale(locale)}
          </LocaleConsumer>
        </div>
      </div>
      <AllResponsePreviews></AllResponsePreviews>
    </div>
  )
}
