import React from "react"
import { Link } from "gatsby"

export default function LinkedElement({ children, linkTo, elementClass }) {
  return (
    <Link className={elementClass} to={linkTo}>
      {children}
    </Link>
  )
}
