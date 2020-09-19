import React from "react"
import AllPiecePreview from "../components/pieces/allPiecePreview"
import { graphql } from "gatsby"
import { LocaleConsumer } from "../layouts/coreLayout"
import LinkedElement from "../components/linkedElement"

export default function Home({ data }) {
  //const homeContent = data.home

  const homeData = data.allSiteTextJson.edges[0].node

  function getHomeText(locale) {
    if (!locale) {
      locale = "en"
    }
    const homeDataInLocale = homeData[locale].home
    return homeDataInLocale.map((paragraph, index) => (
      <div key={index}> {paragraph} </div>
    ))
  }

  function getIntroTitle(locale) {
    const introTitleInLocale = homeData[locale].introTitle
    const introTitleLinkInLocale = homeData[locale].introTitleLink
    return (
      <div>
        {introTitleInLocale}{" "}
        <LinkedElement to="/intro">{introTitleLinkInLocale}</LinkedElement>:
      </div>
    )
  }

  function getIntroExcerpt(locale) {
    const introExcerptInLocale = homeData[locale].introExcerpt
    const introExcerptHTML = introExcerptInLocale.childMarkdownRemark.html
    return (
      <div
        className="content-container flex intro"
        dangerouslySetInnerHTML={{ __html: introExcerptHTML }}
      />
    )
    return "nothing"
  }

  return (
    <div id="home-container" className="core-container">
      <LocaleConsumer>
        {locale => {
          return (
            <div>
              <div className="content-container  header-container">
                {getHomeText(locale)}
              </div>
              <div className="content-container header-container title">
                {getIntroTitle(locale)}
              </div>
              {getIntroExcerpt(locale)}
            </div>
          )
        }}
      </LocaleConsumer>

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
            introTitle
            introTitleLink
            introExcerpt {
              childMarkdownRemark {
                html
              }
            }
          }
          es {
            home
            introTitle
            introTitleLink
            introExcerpt {
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
