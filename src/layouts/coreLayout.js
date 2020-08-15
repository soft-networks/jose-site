import React from "react"
import ResponseBanner from "../components/responses/responseBanner"

export default function CoreLayout({ children, location }) {
  return (
    <div className="all-container">
      <ResponseBanner pageURL={location}></ResponseBanner>
      {children}
    </div>
  )
}
