import React from "react"
import { graphql } from "gatsby"

export default function About({ data }) {
  //const homeContent = data.home
  const aboutData = data.allSiteTextJson.edges[0].node.en.learnMore
  return (
    <div id="about-container" className="core-container">
      <div className="content-container flex header-container">
        {aboutData.map((paragraph, index) => (
          <div className="half" key={index}>
            {" "}
            {paragraph}{" "}
          </div>
        ))}
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
        }
      }
    }
  }
`
