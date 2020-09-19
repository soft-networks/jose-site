import React from "react"
import LinkedElement from "./linkedElement"

export default function Intro({ className }) {
  return (
    <div className={className}>
      <div class="title">
        Excerpt from José Miguel's{" "}
        <LinkedElement to="/intro">(introduction)</LinkedElement>:
      </div>
      <p>
        "¿Hola cómo están?
        <br />
        My name is
        <br />
        José Miguel
        <br />
        And my last name is Galán
      </p>
      <p>
        It’s a pleasure to meet you
        <br />
        Thank you for this opportunity
        <br />
        That you’re giving me
      </p>
      <p>
        To showcase my talent
        <br />
        My rhymes come to me
        <br />
        But if I don’t practice
        <br />
        they’ll be gone to me
      </p>
      <p>
        I’m from El Salvador
        <br />
        I live in California
        <br />
        I’ve spent half my life
        <br />
        Behind bars
      </p>
      <p>
        I’ll stay positive <br />
        Non stop <br />
        I love music <br />
        But I prefer rap <br />
      </p>
      <p>
        I do my own thing <br />
        I do what I have to <br />
        To come out on top"
      </p>
    </div>
  )
}
