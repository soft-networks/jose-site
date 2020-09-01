import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import Image from "gatsby-image"
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
                seeHome {
                  childImageSharp {
                    fixed(height: 32, grayscale: false) {
                      ...GatsbyImageSharpFixed_tracedSVG
                    }
                  }
                }
                seeAbout
                seeLang
              }
            }
            es {
              buttons {
                seeResponse
                seeHome {
                  childImageSharp {
                    fixed(height: 32) {
                      ...GatsbyImageSharpFixed_tracedSVG
                    }
                  }
                }
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
    let homeButton = getHomeButton()

    let responseButton = getLinkForButton(
      "/responses",
      buttonNamesInLocale.seeResponse,
      "responses"
    )
    let aboutButton = getLinkForButton(
      "/about",
      buttonNamesInLocale.seeAbout,
      "about"
    )
    let langSwitcher = getLangSwitcher()
    return [homeButton, responseButton, aboutButton, langSwitcher]
  }

  function getLinkForButton(route, name, key) {
    return (
      <LinkedElement
        className={`button ${key}`}
        activeClassName="activeButton"
        to={route}
        key={key}
      >
        {name}
      </LinkedElement>
    )
  }

  function getHomeButton() {
    let homeImageData = buttonNamesInLocale.seeHome.childImageSharp.fixed
    let homeLink = "/"
    return (
      <LinkedElement
        className="button"
        activeClassName="activeButton"
        to={homeLink}
        key={0}
        id="jose-logo"
      >
        <Image fixed={homeImageData} alt="Jose Miguel" />
      </LinkedElement>
    )
  }
  function getLangSwitcher() {
    let text = buttonNamesInLocale.seeLang
    if (locale === "es") {
      return (
        <Link key={5} to={originalPath} className="button">
          {text}
        </Link>
      )
    } else {
      return (
        <Link key={5} to={`/es${path}`} className="button">
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
