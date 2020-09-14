import React, { useState } from "react"
import ResponseStyles from "../../styles/response.module.css"
import firebase from "gatsby-plugin-firebase"
import { useStaticQuery, graphql } from "gatsby"
import { LocaleConsumer } from "../../layouts/coreLayout"

export default function AddResponse({ isOpen, closeResponseCallback }) {
  const data = useStaticQuery(graphql`
    query {
      allPiecesJson {
        edges {
          node {
            name
          }
        }
      }
      allSiteTextJson {
        edges {
          node {
            en {
              addResponse {
                intro
                authorPlaceholder
                responsePlaceholder
                locationPlaceholder
                respondingTo
                submitResponse
                error
              }
            }
            es {
              addResponse {
                intro
                authorPlaceholder
                responsePlaceholder
                locationPlaceholder
                respondingTo
                submitResponse
                error
              }
            }
          }
        }
      }
    }
  `)

  let [inputAuthor, setInputAuthor] = useState("")
  let [inputResponse, setInputResponse] = useState("")
  let [inputLocation, setInputLocation] = useState("")
  let [inputPiece, setInputPiece] = useState("")
  let [inputError, setInputError] = useState(false)
  const DBREF_STRING = "/joseSite/responses/"

  function getAddresponseText(locale) {
    if (!locale) {
      locale = "en"
    }
    let addResponseText = data.allSiteTextJson.edges[0].node
    let addResponseTextInLocale = addResponseText[locale].addResponse
    return addResponseTextInLocale
  }

  function getPieceOptions() {
    let allPieces = data.allPiecesJson.edges
    return allPieces.map(({ node }, index) => {
      if (node.name) {
        return <option> {node.name} </option>
      }
    })
  }
  function getPieceDropdown() {
    return (
      <select onChange={e => handlePieceChange(e)}>
        <option>-</option>
        {getPieceOptions()}
      </select>
    )
  }
  function handlePieceChange(event) {
    console.log(event)
    const target = event.target
    const piece = target.value
    console.log(piece)
    setInputPiece(piece)
  }

  function handleAuthorChange(event) {
    const target = event.target
    const author = target.value
    setInputAuthor(author)
  }

  function handleLocationChange(event) {
    const target = event.target
    const location = target.value
    setInputLocation(location)
  }

  function handleResponseChange(event) {
    const target = event.target
    const response = target.value
    setInputResponse(response)
  }

  function setErrorTrue() {
    setInputError(true)
    setTimeout(() => setInputError(false), 2000)
  }
  function getErrorDialogue(text) {
    if (inputError) {
      return <div className={ResponseStyles.responseError}>{text}</div>
    } else {
      return ""
    }
  }
  function submitResponse() {
    let author = inputAuthor ? inputAuthor : ""
    let response = inputResponse ? inputResponse : ""
    let location = inputLocation ? inputLocation : ""
    let piece = inputPiece ? inputPiece : ""

    if (author === "" || response === "") {
      setErrorTrue()
      return
    }

    closeResponseCallback()

    let dataLocation = firebase.database().ref(DBREF_STRING)
    let newChild = dataLocation.push()
    let childKey = newChild.key
    let dbUpdates = {}
    let time = new Date().toLocaleDateString()
    dbUpdates[DBREF_STRING + childKey] = {
      author: author,
      response: response,
      location: location,
      time: time,
      piece: piece,
    }
    firebase.database().ref().update(dbUpdates)
  }

  return (
    <div
      className={`secondary-container ${isOpen ? "expanded" : "collapsed"} ${
        ResponseStyles.addResponse
      }`}
    >
      <LocaleConsumer>
        {locale => {
          let addResponseText = getAddresponseText(locale)
          return (
            <div className="addResponse-container">
              <div className="header content-container flex">
                {addResponseText.intro.map((paragraph, index) => (
                  <div
                    key={index}
                    className={`${ResponseStyles.addResponseText} half`}
                  >
                    {" "}
                    {paragraph}{" "}
                  </div>
                ))}
              </div>
              <div className={ResponseStyles.responseInput}>
                <label>
                  <input
                    type="text"
                    name="inputAuthor"
                    onChange={e => handleAuthorChange(e)}
                    placeholder={addResponseText.authorPlaceholder}
                  />
                </label>
              </div>
              <div className={ResponseStyles.responseInput}>
                <label>
                  <input
                    type="location"
                    name="inputLocation"
                    onChange={e => handleLocationChange(e)}
                    placeholder={addResponseText.locationPlaceholder}
                  />
                </label>
              </div>
              <div className={ResponseStyles.responseInput}>
                <label alt="Response area">
                  <textarea
                    name="inputResponse"
                    onChange={e => handleResponseChange(e)}
                    placeholder={addResponseText.responsePlaceholder}
                    style={{ resize: "none" }}
                  ></textarea>
                </label>
              </div>
              <div className={ResponseStyles.responseInput}>
                <label>
                  {addResponseText.respondingTo}
                  {getPieceDropdown()}
                </label>
              </div>
              <div className={ResponseStyles.responseInput}>
                <button
                  onClick={() => submitResponse()}
                  className={
                    inputAuthor !== "" && inputResponse !== ""
                      ? ResponseStyles.active
                      : ""
                  }
                >
                  {addResponseText.submitResponse}
                </button>
              </div>
              {getErrorDialogue(addResponseText.error)}
            </div>
          )
        }}
      </LocaleConsumer>
    </div>
  )
}
