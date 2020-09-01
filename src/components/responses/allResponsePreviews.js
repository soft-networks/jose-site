import React from "react"
import firebase from "gatsby-plugin-firebase"
import ResponsePreview from "./responsePreview"

export default class AllResponsePreviews extends React.Component {
  constructor({ props }) {
    super(props)
    this.DBREF_STRING = "/joseSite/responses/"

    this.waitTime = 25 * 1000
    this.intervalID = ""

    this.state = {
      firebaseDataList: [],
      responseList: [],
      tabVisible: true,
    }

    this.hidden = ""
    this.visbilityChange = ""
  }

  componentDidMount() {
    this.readResponsesFromDB()
    this.setupRandomResponseDisplay()

    // Set the name of the hidden property and the change event for visibility
    if (typeof document !== "undefined") {
      if (typeof document.hidden !== "undefined") {
        // Opera 12.10 and Firefox 18 and later support
        this.hidden = "hidden"
        this.visibilityChange = "visibilitychange"
      } else if (typeof document.msHidden !== "undefined") {
        this.hidden = "msHidden"
        this.visibilityChange = "msvisibilitychange"
      } else if (typeof document.webkitHidden !== "undefined") {
        this.hidden = "webkitHidden"
        this.visibilityChange = "webkitvisibilitychange"
      }
    }
    document.addEventListener(
      this.visibilityChange,
      this.handleVisibilityChange,
      false
    )
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
        let dbObjects = snapshot.val()
        let dbValues = []
        Object.keys(dbObjects).forEach(dbKey => {
          let dbObject = dbObjects[dbKey]
          if (dbObject !== undefined) {
            dbValues.push(dbObject)
          }
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
            //Simple fix for now, just dont push until we've read from server
            if (this.state.firebaseDataList.length > 0) {
              currentResponseList.push(response)
              this.setState({ responseList: currentResponseList })
            }
          }
        }
      })
  }

  handleVisibilityChange = () => {
    if (typeof document !== "undefined") {
      if (document[this.hidden]) {
        console.log("Leaving, so stopping interval")
        clearInterval(this.intervalID)
        this.intervalID = ""
      } else {
        console.log("Coming back, so creating interval")
        if (this.intervalID == "") {
          this.setupRandomResponseDisplay()
        } else {
          console.log(
            "Actually didnt set up interval id... because there already was one"
          )
        }
      }
    }
  }

  getAndRemoveRandomFirebaseRespose = () => {
    if (this.state.firebaseDataList.length > 0) {
      let modifiedFirebaseArray = this.state.firebaseDataList
      let randomIndex = Math.floor(Math.random() * modifiedFirebaseArray.length)
      let randomResponse = modifiedFirebaseArray.splice(randomIndex, 1)
      randomResponse = randomResponse[0]
      let modifiedResponseList = this.state.responseList
      modifiedResponseList.push(randomResponse)
      console.log("Adding a new response because time has passed")
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
      ({ author, response, randomLeftPos }, index) => (
        <ResponsePreview
          author={author}
          response={response}
          randomLeftPos={randomLeftPos}
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
