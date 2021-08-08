import React, { useState, useEffect } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList({}) {
  const [questions, setQuestions] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  const [updated, setUpdated] = useState(false);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((response) => response.json())
      .then((data) => {
        setQuestions(data);
        setIsLoaded(true);
      })
      .catch();
  }, [updated]);
  function onDeleteItem(id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    });
    setUpdated(!updated);
  }
  function onSelectItem(e, id) {
    const correctIndex = e.target.value;
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correctIndex }),
    })
      .then((r) => r.json())
      .then((data) =>
        questions.map((question) => {
          if (question.id === id) return data;
          else return question;
        })
      );
    setUpdated(!updated);
  }
  console.log(questions);

  if (!isLoaded) return <h1>Loading</h1>;

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questions.map((question) => {
          return (
            <QuestionItem
              onSelectItem={onSelectItem}
              onDeleteItem={onDeleteItem}
              key={question.id}
              question={question}
            />
          );
        })}
      </ul>
    </section>
  );
}

export default QuestionList;
