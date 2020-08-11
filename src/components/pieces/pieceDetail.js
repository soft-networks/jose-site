import React from "react"
import { Link } from "gatsby"
import detailStyles from "../../styles/pieceDetail.module.css"
import Image from "gatsby-image"
import CoreLayout from "../../layouts/coreLayout"

export default function PieceDetail(props) {
  //   const project = data.projectJSON;

  function renderImagesIfExists() {
    if (props.imagesFluidData) {
      let imageList = props.imagesFluidData.map((imageFluid, index) => (
        <Image fluid={imageFluid} key={index} className={detailStyles.image} />
      ))
      return <div className={detailStyles.images}>{imageList}</div>
    }
  }

  return (
    <CoreLayout>
      <div className={detailStyles.detailContainer}>
        <div className="content-container">
          <div className={detailStyles.header}>{props.pieceName}</div>
          {renderImagesIfExists()}
        </div>
      </div>
    </CoreLayout>
  )
}
