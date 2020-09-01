import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import PiecePreview from "./piecePreview"

export default function AllPiecePreview() {
  const data = useStaticQuery(graphql`
    query {
      allPiecesJson {
        edges {
          node {
            id
            name
            slug
            sectionBreak
            thumb {
              publicURL
              childImageSharp {
                fluid(grayscale: true) {
                  ...GatsbyImageSharpFluid
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
      return (
        <PiecePreview
          pieceName={node.name}
          pieceUrl={node.slug}
          pieceImageUrl={node.thumb ? node.thumb.publicURL : undefined}
          pieceImageData={
            node.thumb ? node.thumb.childImageSharp.fluid : undefined
          }
          key={index}
        ></PiecePreview>
      )
    }
  }

  return (
    <div>
      <div className="content-container flex" id="preview-container">
        {data.allPiecesJson.edges.map(({ node }, index) =>
          renderPiece(node, index)
        )}
      </div>
    </div>
  )
}
