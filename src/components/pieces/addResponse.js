import React, { useState } from "react"
import ResponseStyles from "../../styles/response.module.css"
import firebase from "gatsby-plugin-firebase"

export default function AddResponse({ isOpen }) {
  let [inputAuthor, setInputAuthor] = useState("")
  let [inputResponse, setInputResponse] = useState("")
  const DBREF_STRING = "/joseSite/responses/"

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
      <div className="addResponse-container">
        <div className="header">
          We encourage visitors who visit this website, to respond to Jose's
          work. All responses are publically visible to website visitors. They
          will also be sent, via mail or read via phone to Jose. We expect to
          send the next set of responses to Jose on August 18th, 2020.
        </div>
        <div className={ResponseStyles.responseInput}>
          <label>
            <input
              type="text"
              name="inputAuthor"
              onChange={e => handleAuthorChange(e)}
              placeholder="who are you?"
            />
          </label>
        </div>
        <div className={ResponseStyles.responseInput}>
          <label alt="Response area">
            <textarea
              name="inputResponse"
              onChange={e => handleResponseChange(e)}
              placeholder="Your response. Tell Jose what you think about his work. Or
              consider giving him some prompts for new rap songs, or poems"
            ></textarea>
          </label>
        </div>
        <div className={ResponseStyles.responseInput}>
          <button onClick={() => submitResponse()}>Submit response</button>
        </div>
      </div>
    </div>
  )
}
