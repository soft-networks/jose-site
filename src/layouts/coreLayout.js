import React from "react"
import NavBanner from "../components/navBanner"

const {
  Provider: LocaleProvider,
  Consumer: LocaleConsumer,
} = React.createContext()

export default function CoreLayout({ children, location, locale }) {
  return (
    <LocaleProvider value={locale}>
      <div className="all-container">
        <NavBanner pageURL={location}></NavBanner>
        {children}
      </div>
    </LocaleProvider>
  )
}

export { LocaleConsumer }
