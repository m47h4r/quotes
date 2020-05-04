import React, { useState, useEffect } from "react";
import quotes from "../../data/quote";

import "./index.css";

function generateRandomNumber() {
  let numberOfQuotes = quotes.length;
  let randomNumber = Math.floor(Math.random() * numberOfQuotes);
  return randomNumber;
}

function Main() {
  const [text, setText] = useState("");
  const [author, setAuthor] = useState("");
  const [belongsTo, setBelongsTo] = useState("");

  useEffect(() => {});

  function setQuoteIncrementally(quoteArray) {
    if (quoteArray.length <= 0) {
      return;
    }
    const [currentWord, ...rest] = quoteArray;
    setText((old) => [...old, " " + currentWord]);
			const timer = setTimeout(() => {
				setQuoteIncrementally(rest);
			}, 50);
			return () => clearTimeout(timer);
  }

  function setQuote() {
    const quote = quotes[generateRandomNumber()];
    const quoteTextArray = quote.text.split(" ");
    console.log(quoteTextArray);
		setText('');
    setQuoteIncrementally(quoteTextArray);
    //setText(quote.text);
    setAuthor(quote.author);
    setBelongsTo(quote.belongsTo);
  }

  return (
    <div className="app">
      <div className="quote">
        <div className="quote__text">{text}</div>
        <div className="quote__author">{author}</div>
        <div className="quote__belongs-to">{belongsTo}</div>
      </div>
      <button className="quote-generator" onClick={setQuote}>
        Generate a quote!
      </button>
    </div>
  );
}

export default Main;
