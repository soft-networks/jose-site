import React from "react"
import { graphql } from "gatsby"
import PiecePreview from "../components/piecePreview"

export default function Home({ data }) {
  console.log(data)
  return (
    <div>
      <div className="title">
        Hello world, here are the projects we have today:
      </div>
      {data.allPiecesJson.edges.map(({ node }, index) => (
        <PiecePreview
          pieceName={node.name}
          pieceUrl={node.slug}
          pieceImageUrl={node.thumb ? node.thumb.publicURL : undefined}
          key={index}
        ></PiecePreview>
      ))}
    </div>
  )
}

export const query = graphql`
  query {
    allPiecesJson {
      edges {
        node {
          id
          name
          slug
          thumb {
            publicURL
          }
        }
      }
    }
  }
`
