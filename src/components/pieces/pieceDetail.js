import React from "react"
import { Link } from "gatsby"
import detailStyles from "../../styles/pieceDetail.module.css"
import Image from "gatsby-image"
import CoreLayout from "../../layouts/coreLayout"
import ReactPlayer from "react-player"

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

  function renderTranslationIfExists() {
    if (props.translationHTML) {
      return (
        <div
          className={detailStyles.translation}
          dangerouslySetInnerHTML={{ __html: props.translationHTML }}
        />
      )
    }
  }

  function renderTimeIfExists() {
    if (props.date) {
      return <div className={detailStyles.subheader}> {props.date} </div>
    }
  }

  function renderAudioIfExists() {
    if (props.audioURL) {
      return (
        <div className={detailStyles.audio}>
          <ReactPlayer
            height="100%"
            width="100%"
            url={props.audioURL}
            controls
            autoplay
            playing
          />
        </div>
      )
    }
  }

  return (
    <CoreLayout>
      <div className={detailStyles.detailContainer}>
        <div className="content-container">
          <div className={detailStyles.header}>
            <div> {props.pieceName}</div>
            {renderTimeIfExists()}
          </div>
          {renderAudioIfExists()}
          {renderTranslationIfExists()}
          {renderImagesIfExists()}
        </div>
      </div>
    </CoreLayout>
  )
}
