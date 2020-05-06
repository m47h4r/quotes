import React, { useState, useEffect } from "react";
import quotes from "../../data/quote";

import "./index.css";

function generateRandomNumber() {
  let numberOfQuotes = quotes.length;
  let randomNumber = Math.floor(Math.random() * numberOfQuotes);
  return randomNumber;
}

let setQuoteIncrementally = null;

function Main() {
  const [text, setText] = useState("");
  const [author, setAuthor] = useState("");
  const [belongsTo, setBelongsTo] = useState("");
  const [appImageClass, setAppImageClass] = useState("");
  // TODO: move url to config file
  const imageUrlToLoad = "https://source.unsplash.com/user/m47h4r/1920x1080";

  useEffect(() => {
    const img = new Image();
    img.src = imageUrlToLoad;
    img.onload = function () {
      setAppImageClass("app-image");
    };
  }, []);
  // to prevent re-reunning this effect on every letter add (recursion)

  useEffect(() => {
    setQuoteIncrementally = initializeSetQuoteIncrementally();
  }, []);

  function initializeSetQuoteIncrementally() {
    let recursionCounter = 0;
    return function setLetter(quoteArray, recursionCounterCheckNumber) {
      if (quoteArray.length <= 0) {
        // reset counter so other calls can be made
        recursionCounter = 0;
        return;
      }
      if (recursionCounter !== recursionCounterCheckNumber) {
        return;
      }
      if (recursionCounterCheckNumber === 0) {
        setText("");
      }
      const [currentWord, ...rest] = quoteArray;
      quoteArray = rest;
      setText((old) => [...old, currentWord]);
      const timer = setTimeout(() => {
        setLetter(quoteArray, ++recursionCounter);
      }, 20);
      return () => clearTimeout(timer);
    };
  }

  function setQuote() {
    const quote = quotes[generateRandomNumber()];
    const quoteTextArray = quote.text.split("");
    setQuoteIncrementally(quoteTextArray, 0);
    setAuthor(quote.author);
    setBelongsTo(quote.belongsTo);
  }

  return (
    <div className={"app " + appImageClass}>
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
