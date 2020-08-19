import React from "react"
import NavBanner from "../components/navBanner"
import { Link } from "gatsby"

const {
  Provider: LocaleProvider,
  Consumer: LocaleConsumer,
} = React.createContext()

export default function CoreLayout({ children, path, pageContext }) {
  //TODO when you're feeling bold - remove this block of code
  let locale, originalPath
  if (!pageContext) {
    locale = "en"
    originalPath = "/"
  } else {
    locale = pageContext["locale"]
    originalPath = pageContext["originalPath"]
  }

  console.log("Locale in the coreLayout is...: " + locale)
  console.log("Path is: " + path)

  function getLangSwitcher() {
    if (locale === "es") {
      return (
        <Link to={originalPath} className="langSwitcher">
          EN
        </Link>
      )
    } else {
      return (
        <Link to={`/es${path}`} className="langSwitcher">
          ES
        </Link>
      )
    }
  }

  const langSwitcher = getLangSwitcher()

  return (
    <LocaleProvider value={locale}>
      <div className="all-container">
        {langSwitcher}
        <NavBanner></NavBanner>
        {children}
      </div>
    </LocaleProvider>
  )
}

export { LocaleConsumer }
