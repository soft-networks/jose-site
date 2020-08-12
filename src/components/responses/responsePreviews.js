import React, { useState } from "react"
import { graphql, useStaticQuery } from "gatsby"
import ResponseStyles from "../../styles/response.module.css"

export default function ResponsePreviews() {
  let data = useStaticQuery(graphql`
    query {
      allResponsesJson {
        edges {
          node {
            author
            response
          }
        }
      }
    }
  `)
  console.log(data)

  function renderAllPreviews() {
    return data.allResponsesJson.edges.map(({ node }, index) => (
      <ResponsePreview
        author={node.author}
        response={node.response}
        key={index}
      ></ResponsePreview>
    ))
  }

  return renderAllPreviews() || "None"
}

function ResponsePreview({ author, response }) {
  const [bottomPos, setBottomPos] = useState(50)

  return (
    <div
      className={ResponseStyles.responsePreview}
      style={{ bottom: bottomPos + "vh" }}
      onClick={() => setBottomPos(bottomPos - 1)}
    >
      {author} : {response.substring(0, 10) + "..."}
    </div>
  )
}
