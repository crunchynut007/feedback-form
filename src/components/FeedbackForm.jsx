import {useState, useContext, useEffect} from 'react'
import Card from './shared/Card'
import Button from './shared/Button'
import RatingSelect from './RatingSelect'
import FeedbackContext from '../context/FeedbackContext'


function FeedbackForm() {
  const [text, setText] = useState('')
  const [btnDisabled, setBtnDisabled] = useState(true)
  const [message, setMessage] = useState('')
  const [rating, setRating] = useState(10)

  const {addFeedbackItem, feedbackEdit, updateFeedbackItem} = useContext(FeedbackContext)

  // sets item in edit state - pre-populates
  useEffect(() => {
    if (feedbackEdit.edit) {
      setBtnDisabled(false)
      setText(feedbackEdit.item.text)
      setRating(feedbackEdit.item.rating)
    }
  }, [feedbackEdit])

  const handleTextChange = (e) => {
    if (text === '') {
      setBtnDisabled(true)
      setMessage(null)
    } else if (text !== '' && text.trim().length < 10) {
      setBtnDisabled(true)
      setMessage('Text must be at least 10 characters')
    } else {
      setBtnDisabled(false)
      setMessage(null)
    }
    setText(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (text.trim().length >= 10) {
      let newFeedback = {
        text,
        rating
      }

      if (feedbackEdit.edit) {
        newFeedback.id = feedbackEdit.item.id
        updateFeedbackItem(newFeedback.id, newFeedback)
      } else {
        addFeedbackItem(newFeedback)
      }

      setText('')
    }
  }

  return (
    <Card>
      <form onSubmit={handleSubmit} action=''>
        <h2>How would you rate your service with us?</h2>

        <RatingSelect select={setRating} selected={rating}/>

        <div className='input-group'>
          <input
            onChange={handleTextChange}
            type='text'
            placeholder='Write a review'
            value={text}
          />
          <Button type='submit' isDisabled={btnDisabled}>Send</Button>
        </div>
        {message && <div className='message'>{message}</div>}
      </form>
    </Card>
  )
}

export default FeedbackForm