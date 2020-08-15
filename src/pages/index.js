import React from "react"
import CoreLayout from "../layouts/coreLayout"
import AllPiecePreview from "../components/pieces/allPiecePreview"

export default function Home() {
  return (
    <div id="home-container" className="core-container">
      <div className="content-container flex header-container">
        <div className="half">
          Jose Miguel Yolan Najarro is a rapper and poet. This is a space for
          you to explore his writings, music and works. We also invite you to
          respond to Jose, and engage in dialogue with him and the community
          around this website
        </div>
        <div className="half">
          Jose is currently detained at Adelanto detention center in California.
          All work shown here was received via mail or phone before August 12th.
          The next set of community responses will be sent to Jose on August
          18th.
        </div>
      </div>
      <AllPiecePreview></AllPiecePreview>
    </div>
  )
}
