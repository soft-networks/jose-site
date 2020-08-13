import React, { useEffect, useState } from "react"
import ResponseStyles from "../../styles/response.module.css"

export default function ResponsePreview({ author, response }) {
  const [bottomPos, setBottomPos] = useState(0)
  const [animPlaying, setAnimPlaying] = useState(true)
  const animLength = 100

  useEffect(() => {
    if (bottomPos < 100 && animPlaying) {
      const interval_ID = setInterval(() => {
        setBottomPos(bottomPos => bottomPos + 1)
      }, animLength)
      return () => {
        clearInterval(interval_ID)
      }
    }
  })

  return (
    <div
      className={ResponseStyles.responsePreview}
      style={{ bottom: bottomPos + "vh" }}
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
      {author} : {animPlaying ? response.substring(0, 10) + "..." : response}
    </div>
  )
}
