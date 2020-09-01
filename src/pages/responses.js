import React from "react"
import firebase from "gatsby-plugin-firebase"
import ResponseStyles from "../styles/response.module.css"
import { graphql } from "gatsby"
import { LocaleConsumer } from "../layouts/coreLayout"

export default class Responses extends React.Component {
  constructor({ props, data }) {
    super(props)
    this.DBREF_STRING = "/joseSite/responses/"
    this.data = data

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
  getResponseDetailText = locale => {
    locale = locale ? locale : "en"
    let responseDetailText = this.data.allSiteTextJson.edges[0].node
    let responseDetailTextInLocale = responseDetailText[locale].responseDetail
    return responseDetailTextInLocale
  }
  renderResponses = () => {
    return this.state.firebaseDataList.map((response, index) => (
      <div className={`${ResponseStyles.responseDetail} half`} key={index}>
        <div className={ResponseStyles.author}> {response.author}</div>
        <div className={ResponseStyles.info}>
          {response.location !== undefined
            ? "in: " + response.location + " "
            : ""}
        </div>
        <div className={ResponseStyles.info}>
          {response.time !== undefined ? "on: " + response.time + " " : ""}
        </div>
        <div className={ResponseStyles.info}>
          {response.piece !== undefined && response.piece !== "-"
            ? "re: " + response.piece
            : ""}
        </div>
        <div className={ResponseStyles.response}> {response.response}</div>
      </div>
    ))
  }
  render() {
    return (
      <div
        className={` ${ResponseStyles.responseDetailContainer} core-container`}
      >
        <div className="content-container flex header-container">
          <div className="half">
            <LocaleConsumer>
              {locale => {
                let responseDetailText = this.getResponseDetailText(locale)
                return responseDetailText.map((paragraph, index) => (
                  <div key={index}> {paragraph} </div>
                ))
              }}
            </LocaleConsumer>
          </div>
        </div>
        <div
          className="content-container flex"
          style={{ paddingBottom: "96px" }}
        >
          {this.renderResponses()}
        </div>
      </div>
    )
  }
}

export const query = graphql`
  query {
    allSiteTextJson {
      edges {
        node {
          en {
            responseDetail
          }
          es {
            responseDetail
          }
        }
      }
    }
  }
`
