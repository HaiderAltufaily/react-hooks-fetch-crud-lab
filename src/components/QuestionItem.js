import React from "react";

function QuestionItem({ question, onDeleteItem, onSelectItem }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select
          onChange={(e) => onSelectItem(e, id)}
          defaultValue={correctIndex}
        >
          {options}
        </select>
      </label>
      <button onClick={() => onDeleteItem(id)}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
