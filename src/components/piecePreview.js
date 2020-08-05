import React from "react"
import { Link } from "gatsby"
import Image from "gatsby-image"

export default function PiecePreview(props) {
  function renderImageIfExists() {
    console.log("Checking image 4: " + props.pieceName)
    console.log(props.pieceImageUrl)
    if (props.pieceImageUrl) {
      return <img src={props.pieceImageUrl} />
    }
  }

  return (
    <div className="piece-preview">
      <div className="name"> {props.pieceName} </div>
      <div className="thumb"> {renderImageIfExists()}</div>
      <div className="link">
        {" "}
        <Link to={props.pieceUrl}>View piece</Link>{" "}
      </div>
    </div>
  )
}
