import React from "react"
import Image from "gatsby-image"
import LinkedElement from "../linkedElement"

export default function PiecePreview(props) {
  function renderImageIfExists() {
    if (props.pieceImageData) {
      return (
        <LinkedElement elementClass="thumb" linkTo={props.pieceUrl}>
          <Image fluid={props.pieceImageData} />
        </LinkedElement>
      )
    }
  }

  return (
    <div className="piece-preview half">
      <div className="preview-content">
        {renderImageIfExists()}
        <LinkedElement elementClass="name" linkTo={props.pieceUrl}>
          {props.pieceName}
        </LinkedElement>
      </div>
    </div>
  )
}
