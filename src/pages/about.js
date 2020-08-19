import React from "react"
import { graphql } from "gatsby"
import { LocaleConsumer } from "../layouts/coreLayout"

export default function About({ data }) {
  //const homeContent = data.home
  function getLearnMoreText(locale) {
    if (!locale) {
      locale = "en"
    }
    let getLearnMoreText = data.allSiteTextJson.edges[0].node
    let getLearnMoreTextLocalized = getLearnMoreText[locale].learnMore
    return getLearnMoreTextLocalized
  }
  const aboutData = data.allSiteTextJson.edges[0].node.en.learnMore
  return (
    <div id="about-container" className="core-container">
      <div className="content-container flex header-container">
        <LocaleConsumer>
          {locale => {
            let aboutData = getLearnMoreText(locale)
            return aboutData.map((paragraph, index) => (
              <div className="half" key={index}>
                {" "}
                {paragraph}{" "}
              </div>
            ))
          }}
        </LocaleConsumer>
      </div>
    </div>
  )
}

export const query = graphql`
  query {
    allSiteTextJson {
      edges {
        node {
          en {
            learnMore
          }
          es {
            learnMore
          }
        }
      }
    }
  }
`
