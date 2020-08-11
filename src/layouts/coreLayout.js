import React from "react"
import ResponseBanner from "../components/responseBanner"

export default function CoreLayout({ children }) {
  return (
    <div className="all-container">
      {children}
      <ResponseBanner></ResponseBanner>
    </div>
  )
}
