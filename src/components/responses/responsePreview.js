import React, { useEffect, useState } from "react"
import ResponseStyles from "../../styles/response.module.css"

export default function ResponsePreview({ author, response, randomLeftPos }) {
  const [bottomPos, setBottomPos] = useState(0)
  const [leftPos, setLeftPos] = useState(0)
  const [animPlaying, setAnimPlaying] = useState(true)
  const animLength = 100

  useEffect(() => {
    if (bottomPos < 110 && animPlaying) {
      const interval_ID = setInterval(() => {
        console.log(bottomPos)
        setBottomPos(bottomPos => bottomPos + 1)
      }, animLength)
      return () => {
        clearInterval(interval_ID)
      }
    }
  }, [bottomPos, animPlaying])

  return (
    <div
      className={`${ResponseStyles.responsePreview} ${
        !animPlaying ? ResponseStyles.expandedResponsePreview : ""
      }`}
      style={{
        bottom: bottomPos + "vh",
      }}
      onMouseOver={() => {
        setAnimPlaying(false)
      }}
      onFocus={() => {
        setAnimPlaying(false)
      }}
      onMouseOut={() => {
        setAnimPlaying(true)
      }}
      onBlur={() => {
        setAnimPlaying(true)
      }}
    >
      <div className={ResponseStyles.author}>{author}</div>
      <div className={ResponseStyles.response}>
        {animPlaying ? response.substring(0, 10) + "..." : response}
      </div>
    </div>
  )
}
