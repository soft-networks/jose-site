import React from "react"
import AllPiecePreview from "../components/pieces/allPiecePreview"
import { graphql } from "gatsby"
import { LocaleConsumer } from "../layouts/coreLayout"
import LinkedElement from "../components/linkedElement"
import PiecePreview from "../components/pieces/piecePreview"

export default function Home({ data }) {
  //const homeContent = data.home

  const homeData = data.allSiteTextJson.edges[0].node

  function getJosePhoto() {
    const node = data.allPiecesJson.edges[0].node
    return (
      <PiecePreview
        pieceName={node.name}
        pieceUrl={node.slug}
        pieceImageUrl={node.thumb ? node.thumb.publicURL : undefined}
        pieceImageData={
          node.thumb ? node.thumb.childImageSharp.fluid : undefined
        }
        className="piece-preview full"
      ></PiecePreview>
    )
  }

  function getHomeText(locale) {
    if (!locale) {
      locale = "en"
    }
    const homeDataInLocale = homeData[locale].home
    return homeDataInLocale.map((paragraph, index) => (
      <div key={index} className="full">
        {paragraph}
      </div>
    ))
  }

  function getIntroTitle(locale) {
    const introTitleInLocale = homeData[locale].introTitle
    const introTitleLinkInLocale = homeData[locale].introTitleLink
    return (
      <div className="intro-title">
        {introTitleInLocale}{" "}
        <LinkedElement to="/intro">{introTitleLinkInLocale}</LinkedElement>
      </div>
    )
  }

  function getIntroExcerpt(locale) {
    const introExcerptInLocale = homeData[locale].introExcerpt
    const introExcerptHTML = introExcerptInLocale.childMarkdownRemark.html
    return (
      <div
        className="intro-excerpt"
        dangerouslySetInnerHTML={{ __html: introExcerptHTML }}
      />
    )
  }

  function getIntro(locale) {
    return (
      <div className="intro full">
        {getIntroExcerpt(locale)}
        {getIntroTitle(locale)}
      </div>
    )
  }

  return (
    <div id="home-container" className="core-container">
      <LocaleConsumer>
        {locale => {
          return (
            <div id="home-info-container" className="content-container flex">
              {getJosePhoto()}
              {getIntro(locale)}
              {getHomeText(locale)}
            </div>
          )
        }}
      </LocaleConsumer>
      <AllPiecePreview id="home-preview-container"> </AllPiecePreview>
    </div>
  )
}

export const query = graphql`
  query {
    allPiecesJson(filter: { slug: { eq: "/jose/" } }) {
      edges {
        node {
          id
          name
          slug
          thumb {
            childImageSharp {
              fluid(grayscale: true) {
                ...GatsbyImageSharpFluid_noBase64
              }
            }
          }
        }
      }
    }
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
