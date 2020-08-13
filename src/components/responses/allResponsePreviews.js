import React from "react"
import firebase from "gatsby-plugin-firebase"
import ResponsePreview from "./responsePreview"

export default class AllResponsePreviews extends React.Component {
  constructor({ props }) {
    super(props)
    this.DBREF_STRING = "/joseSite/responses/"

    this.waitTime = 1000
    this.intervalID = ""

    this.state = {
      firebaseDataList: [],
      responseList: [],
    }
  }

  componentDidMount() {
    this.readResponsesFromDB()
    this.setupRandomResponseDisplay()
  }

  componentWillUnmount() {
    if (this.intervalID !== "") {
      clearInterval(this.intervalID)
    }
  }
  readResponsesFromDB = () => {
    firebase
      .database()
      .ref(this.DBREF_STRING)
      .once("value")
      .then(snapshot => {
        let dbValues = snapshot.val()
        dbValues = dbValues.filter(function (el) {
          return el !== undefined
        })
        this.setState({ firebaseDataList: dbValues, responseList: [] })
      })

    firebase
      .database()
      .ref(this.DBREF_STRING)
      .on("child_added", data => {
        if (data !== undefined) {
          let response = data.val()
          if (response) {
            let currentResponseList = this.state.responseList
            currentResponseList.push(response)
            this.setState({ responseList: currentResponseList })
          }
        }
      })
  }

  getAndRemoveRandomFirebaseRespose = () => {
    if (this.state.firebaseDataList.length > 0) {
      let modifiedFirebaseArray = this.state.firebaseDataList
      let randomIndex = Math.floor(Math.random() * modifiedFirebaseArray.length)
      let randomResponse = modifiedFirebaseArray.splice(randomIndex, 1)
      let modifiedResponseList = this.state.responseList
      modifiedResponseList.push(randomResponse[0])
      this.setState({
        responseList: modifiedResponseList,
        firebaseDataList: modifiedFirebaseArray,
      })
    }
  }

  setupRandomResponseDisplay = () => {
    this.intervalID = setInterval(
      () => this.getAndRemoveRandomFirebaseRespose(),
      this.waitTime
    )
  }

  //This then works because it just is returning new things and only the new ones are rendered :)
  renderAllPreviews = () => {
    let responseListDOM = this.state.responseList.map(
      ({ author, response }, index) => (
        <ResponsePreview
          author={author}
          response={response}
          key={index}
        ></ResponsePreview>
      )
    )
    return responseListDOM
  }

  render() {
    return this.renderAllPreviews() || "None"
  }
}
