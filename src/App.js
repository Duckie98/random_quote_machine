import React, { Component } from "react";

import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apiResult: null,
      author: "",
      text: "",
      isLoaded: false,
      bgColor: "#f99192"
    };
  }
  handleClick = () => {
    this.generateColor();
    this.generateQuote();
  };
  componentDidMount() {
    fetch(
      "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json",
      {
        headers: {
          Accept: "application/json"
        }
      }
    )
      .then(response => response.json())
      .then(responseData => {
        this.setState({
          apiResult: responseData.quotes,
          isLoaded: true,
          author: responseData.quotes[0].author,
          text: responseData.quotes[0].quote,
          quotesArrayLength: responseData.quotes.length
        });
      })
      .catch(err => {
        this.setState({
          error: err
        });
      });
  }

  generateQuote = () => {
    // get a random number from 1 to quotes length
    const randomNumber = Math.floor(
      Math.random() * this.state.quotesArrayLength + 1
    );
    this.setState({
      author: this.state.apiResult[randomNumber].author,
      text: this.state.apiResult[randomNumber].quote
    });
  };

  generateColor = () => {
    var colorArray = [
      "#FF6633",
      "#FFB399",
      "#FF33FF",
      "#FFFF99",
      "#00B3E6",
      "#E6B333",
      "#3366E6",
      "#999966",
      "#99FF99",
      "#B34D4D",
      "#80B300",
      "#809900",
      "#E6B3B3",
      "#6680B3",
      "#66991A",
      "#FF99E6",
      "#CCFF1A",
      "#FF1A66",
      "#E6331A",
      "#33FFCC",
      "#66994D",
      "#B366CC",
      "#4D8000",
      "#B33300",
      "#CC80CC",
      "#66664D",
      "#991AFF",
      "#E666FF",
      "#4DB3FF",
      "#1AB399",
      "#E666B3",
      "#33991A",
      "#CC9999",
      "#B3B31A",
      "#00E680",
      "#4D8066",
      "#809980",
      "#E6FF80",
      "#1AFF33",
      "#999933",
      "#FF3380",
      "#CCCC00",
      "#66E64D",
      "#4D80CC",
      "#9900B3",
      "#E64D66",
      "#4DB380",
      "#FF4D4D",
      "#99E6E6",
      "#6666FF"
    ];
    // Get a random color from array
    let randomNumber = Math.floor(Math.random() * colorArray.length + 1);
    this.setState({
      bgColor: colorArray[randomNumber]
    });
  };

  shareOnTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?text=${this.state.text}`);
  };
  render() {
    return (
      <div id="main">
        <style>
          {`
            :root {
              --backgroundColor: ${this.state.bgColor};
              
            }
            
          `}
        </style>
        <h3 id="title">Random Quote Machine</h3>
        <div id="quote-box">
          <div id="content">
            <p id="text">" {this.state.text} "</p>
            <p id="author">- {this.state.author}</p>
          </div>

          <div id="button">
            <a
              className="button"
              id="tweet-quote"
              href={"https://twitter.com/intent/tweet?text=" + this.state.text}
            >
              Tweet{" "}
            </a>

            <button
              className="button"
              id="new-quote"
              onClick={this.handleClick}
            >
              New Quote
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
