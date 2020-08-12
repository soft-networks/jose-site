import { graphql } from "gatsby"
import React from "react"
import Piece from "../components/pieces/pieceDetail"

/**This entire component is built off the "query" below.
* Background: 
- Whats happening is that the query expects a variable "slug". 
- gatsby-node creates a page for every project/"piece"
- To create that page it calls this template, and sends it a single variable - slug
- This variable is put into the query by gatsby, and the query is run
- The result of the query is a single project (keyed by slug) and its data which we put into -> data

*TLDR
This all leads too... a page is created for each project, with all the JSON for that project passed in here
- Which in then just generates the PieceDetail component, which is what is actually rendered
**/
export const query = graphql`
  query($slug: String!) {
    piecesJson(slug: { eq: $slug }) {
      name
      id
      date
      audio {
        publicURL
      }
      translation {
        childMarkdownRemark {
          html
        }
      }
      images {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  }
`

export default function PieceTemplate({ data }) {
  const pieceData = data.piecesJson
  const title = pieceData.name
  const id = pieceData.id
  const date = pieceData.date
  const audioURL = pieceData.audio ? pieceData.audio.publicURL : undefined
  const imagesFluidData = pieceData.images
    ? pieceData.images.map(image => image.childImageSharp.fluid)
    : false

  const translationHTMLData = pieceData.translation
    ? pieceData.translation.childMarkdownRemark.html
    : false

  return (
    <Piece
      pieceName={title}
      date={date}
      imagesFluidData={imagesFluidData}
      translationHTML={translationHTMLData}
      audioURL={audioURL}
    ></Piece>
  )
}
