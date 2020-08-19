import React from "react"
import { Link } from "gatsby"
import { LocaleConsumer } from "../layouts/coreLayout"

export default function LinkedElement({ children, to, ...props }) {
  return (
    <LocaleConsumer>
      {locale => {
        let relativePath = locale === "en" ? to : `/${locale}${to}`
        return (
          <Link {...props} to={relativePath}>
            {children}
          </Link>
        )
      }}
    </LocaleConsumer>
  )
}
