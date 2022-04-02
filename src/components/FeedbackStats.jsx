import PropTypes from 'prop-types'

// Displays the feedback stats at top of screen
function FeedbackStats({feedback}) {
  // Calculate the average rating
  let average = feedback.reduce((acc, cur) => {
    return acc + cur.rating
  }, 0) / feedback.length

  // average = average.toFixed(1).replace(/[.,]0$/, '')  Alternative to replace trailing numbers
  average = parseFloat(average.toFixed(1))

  return <div className='feedback-stats'>
    <h4>{feedback.length} Reviews</h4>
    <h4>Average Rating: {isNaN(average) ? 0 : average}</h4>
  </div>
}

FeedbackStats.propTypes = {
  feedback: PropTypes.array.isRequired
}

export default FeedbackStats