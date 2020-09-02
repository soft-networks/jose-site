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
    let learnMoreTextHTML = getLearnMoreTextLocalized.childMarkdownRemark.html
    return learnMoreTextHTML
  }

  return (
    <div id="about-container" className="core-container">
      <LocaleConsumer>
        {locale => {
          let aboutHTML = getLearnMoreText(locale)
          return (
            <div
              style={{ paddingBottom: "96px" }}
              className="content-container header-container"
              dangerouslySetInnerHTML={{ __html: aboutHTML }}
            />
          )
        }}
      </LocaleConsumer>
    </div>
  )
}

export const query = graphql`
  query {
    allSiteTextJson {
      edges {
        node {
          en {
            learnMore {
              childMarkdownRemark {
                html
              }
            }
          }
          es {
            learnMore {
              childMarkdownRemark {
                html
              }
            }
          }
        }
      }
    }
  }
`
