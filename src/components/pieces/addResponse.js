import React from "react"
import ResponseStyles from "../../styles/response.module.css"

export default function AddResponse({ isOpen }) {
  return (
    <div
      className={`secondary-container ${isOpen ? "expanded" : "collapsed"} ${
        ResponseStyles.addResponse
      }`}
    >
      <div className="FLEXTEST">Whatever test me UP baby</div>
    </div>
  )
}
