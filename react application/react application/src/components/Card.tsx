import _ from 'lodash';
import React, { useState } from 'react';

import * as Models from './../models';
import './Card.scss';

interface Props {
  quizQuestions?: Models.QuizResponse;
}

const Card = (props: Props) => {
  const quizQuestions = _.get(props, 'quizQuestions.results', []);
  
  const initialState = {
    currentIndex: 0,
    score: 0,
    showFinished: false,
    answered: false,
    selectedOption: '',
    revealAnswer: '',
  };
  const [state, setState] = useState(initialState);
  const {
    currentIndex,
    score,
    revealAnswer,
    selectedOption,
  } = state;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, correctAnswer: Models.Quiz): void => {
    e.persist();
    e.preventDefault();
    const isCorrect: boolean = e.target.id.includes(correctAnswer.toString()) ? true : false;
    const renderAnswer: string = isCorrect ? 'Correct!' : 'Sorry, wrong answer!';

    setState({
      ...state,
      selectedOption: e.target.id.toString(),
      answered: isCorrect ? true : false,
      revealAnswer: renderAnswer
    });

    if (currentIndex + 1 > quizQuestions.length) {
      setState({ ...state, showFinished: true });
    } else {
      setTimeout(() => {
        setState({ ...state, score: isCorrect ? score + 1 : score + 0, currentIndex: currentIndex + 1, revealAnswer: '' });
      }, 2000);
    }
  };

  const renderAnswer = (): React.ReactFragment => {
    return (
      <>{revealAnswer}</>
    );
  };

  return (
    quizQuestions && quizQuestions.length > 0 && (currentIndex < quizQuestions.length) ?
      <div>
        <h2>{quizQuestions[currentIndex].category}</h2>
        <main className='Card'>
          <h1>{_.unescape(quizQuestions[currentIndex].question)}</h1>
          <div>Difficulty: {quizQuestions[currentIndex].difficulty}</div>
        </main>

        <section>
          <div className='Answer'>{renderAnswer()}</div>

          <form className='form'>
            <div className='inputGroup' role='radiogroup'>
              <label id='label' htmlFor='radioTrue' className='container'><input id='radioTrue' name='radio' type='radio' checked={selectedOption === 'True'} onChange={(e) => handleChange(e, quizQuestions[currentIndex].correct_answer)} />
              True<span className='checkmark'></span></label>
            </div>
            <div className='inputGroup' role='radiogroup'>
              <label id='label' htmlFor='radioFalse' className='container'><input id='radioFalse' name='radio' type='radio' checked={selectedOption === 'False'} onChange={(e) => handleChange(e, quizQuestions[currentIndex].correct_answer)} />
              False<span className='checkmark'></span></label>
            </div>
          </form>
        </section>

        <footer className='Badge'>
          Question {currentIndex + 1}/{quizQuestions.length}
        </footer>
      </div>
      :
      <div>
        <main className='Card'>
          <h3>
            You scored {score} / {quizQuestions.length}
          </h3>

          <button className='Button' type='reset' onClick={() => setState(initialState)}>
            Start Over
          </button>
        </main >
      </div>
  );
};

export default Card;
