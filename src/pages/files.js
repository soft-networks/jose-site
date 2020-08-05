import React from "react"
import { graphql } from "gatsby"

export default function Files({ data }) {
  console.log(data)
  return (
    <div>
      All files visible to graphIQL:
      <ul>
        {data.allFile.edges.map(({ node }, index) => (
          <li key={index}> {node.relativePath} </li>
        ))}
      </ul>
    </div>
  )
}

export const query = graphql`
  query {
    allFile {
      edges {
        node {
          relativePath
          name
        }
      }
    }
  }
`
