import {createContext, useState} from 'react'
import {v4 as uuidv4} from 'uuid'

const FeedbackContext = createContext()

export const FeedbackProvider = ({children}) => {
  const [feedback, setFeedback] = useState([{
    id: '1',
    text: 'this item is from context',
    rating: 10
  }])

  const addFeedbackItem = (newFeedback) => {
    newFeedback.id = uuidv4()
    // adds the new feedback item at the top of the array
    setFeedback([newFeedback, ...feedback])
    console.log(`Added item with id:${newFeedback.id}`)
  }

  const deleteFeedbackItem = (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      setFeedback(feedback.filter(item => item.id !== id))
      console.log(`Deleted item with id:${id}`)
    }
  }


  return <FeedbackContext.Provider value={{
    feedback,
    deleteFeedbackItem,
    addFeedbackItem,
  }}>
    {children}
  </FeedbackContext.Provider>
}

export default FeedbackContext