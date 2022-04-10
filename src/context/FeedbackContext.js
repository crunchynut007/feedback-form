import {createContext, useState, useEffect} from 'react'

const FeedbackContext = createContext()

export const FeedbackProvider = ({children}) => {
  const [isLoading, setIsLoading] = useState(true)
  const [feedback, setFeedback] = useState([])
  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false,
  })

  // runs only first time page loads
  useEffect(() => {
    fetchFeedback()
  }, [])

  const fetchFeedback = async () => {
    setIsLoading(true)
    try {
      const res = await fetch(`/feedback?_sort=id&_order=desc`)
      const data = await res.json()
      setFeedback(data)
      setIsLoading(false)
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  // add new item to feedback
  const addFeedbackItem = async (newFeedback) => {
    const response = await fetch('/feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newFeedback),
    })
    const data = await response.json()
    // adds the new feedback item at the top of the array
    setFeedback([data, ...feedback])
    console.log(`Added item with id:${data.id}`)
  }

  // delete item from feedback
  const deleteFeedbackItem = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      await fetch(`/feedback/${id}`, {
        method: 'DELETE',
      })

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
    isLoading,
    deleteFeedbackItem,
    addFeedbackItem,
    editFeedbackItem,
    updateFeedbackItem,
  }}>
    {children}
  </FeedbackContext.Provider>
}

export default FeedbackContext