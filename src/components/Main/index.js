import React, { useState, useEffect } from "react";

import quotes from "../../data/quote";
import config from '../../config/';

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

  useEffect(() => {
    const img = new Image();
    img.src = config.url;
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
    return function setLetter(
      quoteArray,
      recursionCounterCheckNumber,
      author,
      belongsTo
    ) {
      if (quoteArray.length <= 0) {
        // reset counter so other calls can be made
        recursionCounter = 0;
        setAuthor(author);
        setBelongsTo(belongsTo);
        return;
      }
      if (recursionCounter !== recursionCounterCheckNumber) {
        return;
      }
      if (recursionCounterCheckNumber === 0) {
        setText("");
        setAuthor("");
        setBelongsTo("");
      }
      const [currentWord, ...rest] = quoteArray;
      quoteArray = rest;
      setText((old) => [...old, currentWord]);
      const timer = setTimeout(() => {
        setLetter(quoteArray, ++recursionCounter, author, belongsTo);
      }, 20);
      return () => clearTimeout(timer);
    };
  }

  function setQuote() {
    const quote = quotes[generateRandomNumber()];
    const quoteTextArray = quote.text.split("");
    setQuoteIncrementally(quoteTextArray, 0, quote.author, quote.belongsTo);
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
