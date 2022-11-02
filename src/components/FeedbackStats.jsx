import React from 'react';
import PropTypes from 'prop-types';

function FeedbackStats({ feedback }) {

  let averageRating = (feedback.reduce((previousValue, currentValue) => {
    return (previousValue + currentValue.rating)
  }, 0)) / feedback.length;

  // reg. vyraz nahradza 0 za desatinou ciarkou aby tam nebola: 8.0 -> 8
  averageRating = averageRating.toFixed(1).replace(/[.,]0$/, "");

  const ratingColor = (averageRating) => {
    if (averageRating <= 4) {
      return ("red");
    } else if (averageRating > 4 && averageRating < 8) {
      return ("orange");
    } else if (averageRating >= 8) {
      return ("green");
    } else {
      return ("white");
    }
  }

  return (
    <div className='feedback-stats'>
      <h4>{feedback.length} Rewiews</h4>
      <h4 className={ratingColor(averageRating)}>Average rating: {isNaN(averageRating) ? 0 : averageRating}</h4>
    </div>
  )
}

FeedbackStats.propTypes = {
  feedback: PropTypes.array.isRequired
}

export default FeedbackStats;
