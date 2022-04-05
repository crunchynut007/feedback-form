import {createContext, useState} from 'react'
import {v4 as uuidv4} from 'uuid'
import FeedbackData from '../data/FeedbackData'

const FeedbackContext = createContext()

export const FeedbackProvider = ({children}) => {
  const [feedback, setFeedback] = useState(FeedbackData)
  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false,
  })

  // add new item to feedback
  const addFeedbackItem = (newFeedback) => {
    newFeedback.id = uuidv4()
    // adds the new feedback item at the top of the array
    setFeedback([newFeedback, ...feedback])
    console.log(`Added item with id:${newFeedback.id}`)
  }

  // delete item from feedback
  const deleteFeedbackItem = (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      setFeedback(feedback.filter(item => item.id !== id))
      console.log(`Deleted item with id:${id}`)
    }
  }

  // set item to be updated
  const editFeedbackItem = (item) => {
    setFeedbackEdit({
      item,
      edit: true
    })
  }

  // update feedback item
  const updateFeedbackItem = (id, updatedItem) => {
    setFeedback(feedback.map(item => (item.id === id ? updatedItem : item)))
    setFeedbackEdit({
      item: {},
      edit: false
    })
    console.log(`Updated item with id:${id}`)
  }

  return <FeedbackContext.Provider value={{
    feedback,
    feedbackEdit,
    deleteFeedbackItem,
    addFeedbackItem,
    editFeedbackItem,
    updateFeedbackItem,
  }}>
    {children}
  </FeedbackContext.Provider>
}

export default FeedbackContext