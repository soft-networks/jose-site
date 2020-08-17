import React from "react"
import NavBanner from "../components/navBanner"

export default function CoreLayout({ children, location }) {
  return (
    <div className="all-container">
      <NavBanner pageURL={location}></NavBanner>
      {children}
    </div>
  )
}
