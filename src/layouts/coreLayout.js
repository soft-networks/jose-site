import React from "react"
import NavBanner from "../components/navBanner"
import AddResponseBanner from "../components/addResponseBanner"

const {
  Provider: LocaleProvider,
  Consumer: LocaleConsumer,
} = React.createContext()

export default function CoreLayout({ children, path, pageContext }) {
  let { locale, originalPath } = pageContext

  //If things break, basically check for !pageContext and do things accordingly
  console.log("Locale in the coreLayout is...: " + locale)
  console.log("Path is: " + path)

  function getBackgroundStyle() {
    if (path.includes("response")) {
      return "yellow-gradient"
    } else if (path.includes("about")) {
      return "red-gradient"
    } else {
      return "blue-gradient"
    }
  }
  return (
    <LocaleProvider value={locale}>
      <div className={`all-container ${getBackgroundStyle()}`}>
        <AddResponseBanner locale={locale} />
        <div className="primary-container">
          <NavBanner locale={locale} path={path} originalPath={originalPath} />
          {children}
        </div>
      </div>
    </LocaleProvider>
  )
}

export { LocaleConsumer }
