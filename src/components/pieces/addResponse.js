import React, { useState } from "react"
import ResponseStyles from "../../styles/response.module.css"
import firebase from "gatsby-plugin-firebase"
import { useStaticQuery, graphql } from "gatsby"
import { LocaleConsumer } from "../../layouts/coreLayout"

export default function AddResponse({ isOpen }) {
  const data = useStaticQuery(graphql`
    query {
      allSiteTextJson {
        edges {
          node {
            en {
              addResponse {
                intro
                authorPlaceholder
                responsePlaceholder
              }
            }
            es {
              addResponse {
                intro
                authorPlaceholder
                responsePlaceholder
              }
            }
          }
        }
      }
    }
  `)

  let [inputAuthor, setInputAuthor] = useState("")
  let [inputResponse, setInputResponse] = useState("")
  const DBREF_STRING = "/joseSite/responses/"

  function getAddresponseText(locale) {
    if (!locale) {
      locale = "en"
    }
    let addResponseText = data.allSiteTextJson.edges[0].node
    let addResponseTextInLocale = addResponseText[locale].addResponse
    return addResponseTextInLocale
  }

  function handleAuthorChange(event) {
    const target = event.target
    const author = target.value
    setInputAuthor(author)
  }

  function handleResponseChange(event) {
    const target = event.target
    const response = target.value
    setInputResponse(response)
  }

  function submitResponse() {
    let author = inputAuthor
    let response = inputResponse

    if (author === "" || response === "") {
      alert("Please fill out author or response")
      return
    }

    let dataLocation = firebase.database().ref(DBREF_STRING)
    let newChild = dataLocation.push()
    let childKey = newChild.key
    let dbUpdates = {}
    dbUpdates[DBREF_STRING + childKey] = {
      author: author,
      response: response,
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
              <div className="header">
                {addResponseText.intro.map((paragraph, index) => (
                  <div key={index} className={ResponseStyles.addResponseText}>
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
                <label alt="Response area">
                  <textarea
                    name="inputResponse"
                    onChange={e => handleResponseChange(e)}
                    placeholder={addResponseText.responsePlaceholder}
                  ></textarea>
                </label>
              </div>
              <div className={ResponseStyles.responseInput}>
                <button onClick={() => submitResponse()}>
                  Submit response
                </button>
              </div>
            </div>
          )
        }}
      </LocaleConsumer>
    </div>
  )
}
