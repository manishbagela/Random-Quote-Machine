import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
import mdColors from './colors';


function App() {


  const quotesURL = "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"

  const [quote, setQuote] = useState("Life isn’t about getting and having, it’s about giving and being.")
  const [author, setAuthor] = useState("Kevin Kruse")
  const [quotesArr, setQuotesArr] = useState(null)
  const [color, setColor] = useState('pink')
  const fetchQuote = async (url) => {
    const response = await fetch(url)
    const parsedJSON = await response.json()
    setQuotesArr(parsedJSON.quotes)
  }

  useEffect(() => {
    fetchQuote(quotesURL)
  }, [quotesURL])



  const generateRandomNumber = () => {
    
    return Math.floor(Math.random() * quotesArr.length)
  }


  const changeQuoteAndAuthor = () => {
    const randomIndex = generateRandomNumber()
    setColor(mdColors[randomIndex])
    setQuote(quotesArr[randomIndex].quote)
    setAuthor(quotesArr[randomIndex].author)
  }


  return (
    <div className="App" style = {{backgroundColor: color}}>
      <div className="App-header" id="quote-box" style = {{color: color}} >
      
        <p id="text">"{quote}" </p>
        <p id="author">-- {author}</p>
        <div className="buttons">
          <button id = "tweetButton" style = {{backgroundColor: color}}><a href="twitter.com/intent/tweet" id="tweet-quote">Tweet</a></button>
          <button id="new-quote" style = {{backgroundColor: color}} onClick={() => changeQuoteAndAuthor()}>New Quote</button>
        </div>
      </div>
    </div>
  );
}

export default App;
