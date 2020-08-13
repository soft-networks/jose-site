import React, { useState, useEffect } from "react"
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

  const responseNodeList = data.allResponsesJson.edges.map(({ node }) => node)
  const listOfIndices = responseNodeList.map(({ node }, index) => index)
  const waitTime = 5000
  const [activeNodeIndices, setActiveNodeIndices] = useState([])

  //TODO: We can clean this up by using another state variable probably.
  //Right now we do this dance where we maintain state for activeIndexes and list of indices (a constant)
  //Then every single time, to see whats left, we clone listofindices, and remove the stuff from activeIndices..
  //its fine.. but it can be cleaner :)
  useEffect(() => {
    if (activeNodeIndices.length < responseNodeList.length) {
      let indexArray = listOfIndices
      activeNodeIndices.forEach(usedIndex => {
        let usedIndexPos = indexArray.indexOf(usedIndex)
        indexArray.splice(usedIndexPos, 1)
      })
      let randomUnusedIndex =
        indexArray[Math.floor(Math.random() * indexArray.length)]
      console.log(
        `FYI: Adding a response with index of ${randomUnusedIndex} in ${waitTime} ms`
      )
      const interval_ID = setInterval(() => {
        setActiveNodeIndices(activeNodeIndices => [
          ...activeNodeIndices,
          randomUnusedIndex,
        ])
      }, waitTime)
      return () => {
        clearInterval(interval_ID)
      }
    }
  })

  //This then works because it just is returning new things and only the new ones are rendered :)
  function renderAllPreviews() {
    return activeNodeIndices.map(nodeIndex => {
      let node = responseNodeList[nodeIndex]
      return (
        <ResponsePreview
          author={node.author}
          response={node.response}
          key={nodeIndex}
        ></ResponsePreview>
      )
    })
  }

  return renderAllPreviews() || "None"
}

function ResponsePreview({ author, response }) {
  const [bottomPos, setBottomPos] = useState(0)
  const [animPlaying, setAnimPlaying] = useState(true)
  const animLength = 100

  useEffect(() => {
    if (bottomPos < 100 && animPlaying) {
      const interval_ID = setInterval(() => {
        setBottomPos(bottomPos => bottomPos + 1)
      }, animLength)
      return () => {
        clearInterval(interval_ID)
      }
    }
  })

  return (
    <div
      className={ResponseStyles.responsePreview}
      style={{ bottom: bottomPos + "vh" }}
      onMouseOver={() => {
        setAnimPlaying(false)
      }}
      onFocus={() => {
        setAnimPlaying(false)
      }}
      onMouseOut={() => {
        setAnimPlaying(true)
      }}
      onBlur={() => {
        setAnimPlaying(true)
      }}
    >
      {author} : {animPlaying ? response.substring(0, 10) + "..." : response}
    </div>
  )
}
