import React from "react"
import ResponseBanner from "../components/responses/responseBanner"

export default function CoreLayout({ children }) {
  return (
    <div className="all-container">
      <ResponseBanner></ResponseBanner>
      {children}
    </div>
  )
}
