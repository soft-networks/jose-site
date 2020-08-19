import React from "react"
import AllPiecePreview from "../components/pieces/allPiecePreview"
import { graphql } from "gatsby"
import { LocaleConsumer } from "../layouts/coreLayout"

export default function Home({ data }) {
  //const homeContent = data.home

  function getHomeText(locale) {
    if (!locale) {
      locale = "en"
    }
    const homeData = data.allSiteTextJson.edges[0].node
    const homeDataInLocale = homeData[locale].home
    return homeDataInLocale.map((paragraph, index) => (
      <div className="half" key={index}>
        {" "}
        {paragraph}{" "}
      </div>
    ))
  }

  return (
    <div id="home-container" className="core-container">
      <div className="content-container flex header-container">
        <LocaleConsumer>
          {locale => {
            return getHomeText(locale)
          }}
        </LocaleConsumer>
      </div>
      <AllPiecePreview></AllPiecePreview>
    </div>
  )
}

export const query = graphql`
  query {
    allSiteTextJson {
      edges {
        node {
          en {
            home
          }
          es {
            home
          }
        }
      }
    }
  }
`
