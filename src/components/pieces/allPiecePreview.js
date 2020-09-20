import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import PiecePreview from "./piecePreview"

export default function AllPiecePreview({ id }) {
  const data = useStaticQuery(graphql`
    query {
      allPiecesJson {
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
    }
  `)

  function renderPiece(node, index) {
    if (node.sectionBreak) {
      return (
        <div className="piece-preview full" key={index}>
          {node.sectionBreak}
        </div>
      )
    } else {
      if (node.slug == "/jose/") {
        return
      }
      return (
        <PiecePreview
          pieceName={node.name}
          pieceUrl={node.slug}
          pieceImageUrl={node.thumb ? node.thumb.publicURL : undefined}
          pieceImageData={
            node.thumb ? node.thumb.childImageSharp.fluid : undefined
          }
          key={index}
          className="piece-preview half"
        ></PiecePreview>
      )
    }
  }

  return (
    <div className="content-container flex" id={id}>
      {data.allPiecesJson.edges.map(({ node }, index) =>
        renderPiece(node, index)
      )}
    </div>
  )
}
