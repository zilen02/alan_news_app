import React, { useState, useEffect } from "react";
import alanBtn from "@alan-ai/alan-sdk-web";
import wordsToNumbers from "words-to-numbers";

import NewsCards from "./components/NewsCards/NewsCards";
import data from "./data";
import classNames from "classnames";
import useStyles from "./styles";
import logo from "./alan_logo.png";

const alankey =
  "e86066d84b88938a4999c0d0d05bf3e52e956eca572e1d8b807a3e2338fdd0dc/stage";

const App = () => {
  const classes = useStyles();
  const [newArticles, setNewArticles] = useState([]);
  const [activeArticle, setActiveArticle] = useState(-1);
  //   useEffect(() => {
  //       setNewArticles(data);
  //   },[])
  useEffect(() => {
    alanBtn({
      key: alankey,
      onCommand: ({ command, articles ,number }) => {
        if (command === "newHeadlines") {
          setNewArticles(articles);
          setActiveArticle(-1);
        } else if (command === "highlight") {
          setActiveArticle((prev) => prev + 1);
        } else if(command === "open") {
            console.log(number);
            const newNumber = number.length > 2 ? wordsToNumbers(number,{fuzzy:true}) : number;
            const article = articles[newNumber-1];
            if(newNumber > 20) {
                alanBtn().playText('Please try that again.');
            }
            else {
                window.open(article.url, "_blank");
                alanBtn().playText("Openning...");
            }
            
        }
      },
    });
  }, []);
  return (
    <>
      <div>
        <div className={classes.logoContainer}>
          <img
            src={logo}
            className={classes.alanLogo}
            alt="logo"
            style={{ backgroundColor: "black" }}
          />
        </div>
        <NewsCards articles={newArticles} activeArticle={activeArticle} />
      </div>
    </>
  );
};

export default App;

//news api
//1st id
//dfb4e68a537643838a8c21d175359cc2

//2nd id
//e53014783a1a4310af3d3e05182bb149