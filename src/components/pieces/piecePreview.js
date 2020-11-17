import React from "react"
import Image from "gatsby-image"
import LinkedElement from "../linkedElement"

export default function PiecePreview(props) {
  function renderResponseIfExists() {
    if (props.response) {
      return (
        <div class="response-floaty">
          {props.response}
        </div>
      )
    }
  }
  function renderImageIfExists() {
    if (props.pieceImageData) {
      return (
        <LinkedElement className="thumb" to={props.pieceUrl}>
          <Image
            fluid={props.pieceImageData}
            fadeIn={true}
            title={props.pieceName}
            alt={props.pieceName}
          />
        </LinkedElement>
      )
    }
  }

  return (
    <div className={props.className}>
      <div className="preview-content">
        {renderImageIfExists()}
        <LinkedElement className="name" to={props.pieceUrl}>
          {props.pieceName}{renderResponseIfExists()}
        </LinkedElement>
        
      </div>
    </div>
  )
}
