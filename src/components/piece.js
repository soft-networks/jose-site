import React from "react"
import { Link } from "gatsby"

export default function Piece(props) {
  //   const project = data.projectJSON;

  function renderImageIfExists() {
    if (props.pieceImageUrl) {
      return <img src={props.pieceImageUrl} />
    }
  }

  return (
    <div className="piece-detail">
      <h1 className="name"> The page for {props.pieceName} </h1>
      <Link to="/"> go home </Link>
    </div>
  )
}
