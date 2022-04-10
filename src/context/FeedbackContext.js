import {createContext, useState, useEffect} from 'react'
import {v4 as uuidv4} from 'uuid'

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
    const fetchFeedback = async () => {
      setIsLoading(true)
      try {
        const res = await fetch(`http://localhost:5000/feedback?_sort=id&_order=desc`)
        const data = await res.json()
        setFeedback(data)
        setIsLoading(false)
        console.log(data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchFeedback()
  }, [])

  // Fetch Feedback OLD VERSION
  // const fetchFeedback = async () => {
  //   // fetch feedback from local storage, order by id descending
  //   const response = await fetch(`http://localhost:5001/feedback?_sort=id&_order=desc`)
  //   if (response.status === 200) {
  //     const data = await response.json()
  //     setFeedback(data)
  //     setIsLoading(false)
  //   } else {
  //     console.log('Error fetching feedback. Check if the server is running')
  //   }
  //   // this function then gets run in useEffect
  // }

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