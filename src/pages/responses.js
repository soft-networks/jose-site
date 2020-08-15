import React from "react"
import firebase from "gatsby-plugin-firebase"
import ResponseStyles from "../styles/response.module.css"
import AddResponse from "../components/pieces/addResponse"

export default class Responses extends React.Component {
  constructor(props) {
    super(props)
    this.DBREF_STRING = "/joseSite/responses/"

    this.state = {
      firebaseDataList: [],
    }
  }
  componentDidMount() {
    firebase
      .database()
      .ref(this.DBREF_STRING)
      .once("value")
      .then(snapshot => {
        let dbObjects = snapshot.val()
        let dbValues = []
        Object.keys(dbObjects).forEach(dbKey => {
          let dbObject = dbObjects[dbKey]
          if (dbObject != undefined) {
            dbValues.push(dbObject)
          }
        })
        this.setState({ firebaseDataList: dbValues })
      })
  }
  renderResponses = () => {
    return this.state.firebaseDataList.map((response, index) => (
      <div className={`${ResponseStyles.responseDetail} half`} key={index}>
        <div className={ResponseStyles.author}> {response.author}</div>
        <div className={ResponseStyles.response}> {response.response}</div>
      </div>
    ))
  }
  render() {
    return (
      <div className="all-container">
        <div
          className={` ${ResponseStyles.responseDetailContainer} core-container`}
        >
          <div className="content-container flex header-container">
            <div className="half">
              We encourage visitors who visit this website, to respond to Jose's
              work. All responses are publically visible to website visitors.
              They will also be sent, via mail or read via phone to Jose. We
              expect to send the next set of responses to Jose on August 18th,
              2020.
            </div>
          </div>
          <div className="content-container flex">{this.renderResponses()}</div>
        </div>
      </div>
    )
  }
}
