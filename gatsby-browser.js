import "./src/styles/global.css"
import "./src/styles/piecePreview.css"
import "firebase/database"

export const shouldUpdateScroll = ({ routerProps: { location } }) => {
  let scrollElement = document.querySelector(".all-container")
  if (scrollElement) {
    scrollElement.scrollTo(0, 0)
    return false
  }
}
