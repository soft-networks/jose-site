import React from "react"
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


  function renderAudioIfExists() {
    if (props.audioURL) {
      return (
        <div className={detailStyles.audio}>
          <ReactPlayer
            height="100%"
            width="100%"
            url={props.audioURL}
            controls
            autoPlay
            playing
          />
        </div>
      )
    }
  }

  return (
    <div className={`${detailStyles.detailContainer} core-container`}>
      <div
        className={`${detailStyles.pieceDetailContentContainer} content-container`}
      >
        <div className={detailStyles.header}>
          {renderAudioIfExists()}
        </div>
        <div className={detailStyles.pieceDetailContent}>
          {renderTranslationIfExists()}
          {renderImagesIfExists()}
        </div>
      </div>
    </div>
  )
}
