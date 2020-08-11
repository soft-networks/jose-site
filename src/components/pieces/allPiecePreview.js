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
            thumb {
              publicURL
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid_tracedSVG
                }
              }
            }
          }
        }
      }
    }
  `)

  return (
    <div id="preview-container">
      <div className="content-container flex">
        {data.allPiecesJson.edges.map(({ node }, index) => (
          <PiecePreview
            pieceName={node.name}
            pieceUrl={node.slug}
            pieceImageUrl={node.thumb ? node.thumb.publicURL : undefined}
            pieceImageData={
              node.thumb ? node.thumb.childImageSharp.fluid : undefined
            }
            key={index}
          ></PiecePreview>
        ))}
      </div>
    </div>
  )
}
