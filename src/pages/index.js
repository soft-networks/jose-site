import React from "react"
import AllPiecePreview from "../components/pieces/allPiecePreview"
import { graphql } from "gatsby"
import LocaleConsumer from "../layouts/coreLayout"

export default function Home({ data }) {
  //const homeContent = data.home

  return (
    <div id="home-container" className="core-container">
      <div className="content-container flex header-container">
        <LocaleConsumer>
          {locale => {
            if (!locale) {
              alert("No locale available")
              locale = "en"
            }
            console.log("Locale is..." + locale)
            const homeData = data.allSiteTextJson.edges[0].node.locale.home
            homeData.map((paragraph, index) => (
              <div className="half" key={index}>
                {" "}
                {paragraph}{" "}
              </div>
            ))
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
