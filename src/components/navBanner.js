import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import LinkedElement from "./linkedElement"

export default function NavBanner({ path, locale, originalPath }) {
  const data = useStaticQuery(graphql`
    query {
      allSiteTextJson {
        edges {
          node {
            en {
              buttons {
                seeResponse
                seeHome
                seeAbout
                seeLang
              }
            }
            es {
              buttons {
                seeResponse
                seeHome
                seeAbout
                seeLang
              }
            }
          }
        }
      }
    }
  `)

  const buttonNames = data.allSiteTextJson.edges[0].node
  const buttonNamesInLocale = buttonNames[locale].buttons

  //TODO: ITS PROBABLY EASIER TO JUST DRIVE THIS FROM THE DATA ITSELF :)
  function getAllButtonsForLocale() {
    if (!locale) {
      locale = "en"
    }

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

    let langSwitcher = getLangSwitcher()
    return [homeButton, responseButton, aboutButton, langSwitcher]
  }

  function getLinkForButton(route, name, index) {
    return (
      <LinkedElement
        className="button"
        activeClassName="activeButton"
        to={route}
        key={index}
      >
        {name}
      </LinkedElement>
    )
  }

  function getLangSwitcher() {
    let text = buttonNamesInLocale.seeLang
    if (locale === "es") {
      return (
        <Link to={originalPath} className="button">
          {text}
        </Link>
      )
    } else {
      return (
        <Link to={`/es${path}`} className="button">
          {text}
        </Link>
      )
    }
  }
  return (
    <div className="navBanner">
      <div className="navBannerContentContainer">
        {getAllButtonsForLocale()}
      </div>
    </div>
  )
}
