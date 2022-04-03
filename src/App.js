import {v4 as uuidv4} from 'uuid'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import {useState} from 'react'
import Header from './components/Header'
import FeedbackList from './components/FeedbackList'
import FeedbackData from './data/FeedbackData'
import FeedbackStats from './components/FeedbackStats'
import FeedbackForm from './components/FeedbackForm'
import AboutIconLink from './components/AboutIconLink'
import AboutPage from './pages/AboutPage'

export default function App({callback}) {
  const [feedback, setFeedback] = useState(FeedbackData)

  const addFeedback = (newFeedback) => {
    newFeedback.id = uuidv4()
    // adds the new feedbackitem at the top of the array
    setFeedback([newFeedback, ...feedback])
    console.log(`Added item with id:${newFeedback.id}`)
  }

  const deleteFeedbackItem = (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      setFeedback(feedback.filter(item => item.id !== id))
      console.log(`Deleted item with id:${id}`)
    }
  }

  return (

    <Router>
      <div ref={callback}>
        <Header/>
        <div className='container'>
          <Routes>
            <Route exact path='/' element={
              <>
                <FeedbackForm handleAdd={addFeedback}/>
                <FeedbackStats feedback={feedback}/>
                <FeedbackList feedback={feedback} handleDelete={deleteFeedbackItem}/>
              </>
            }>
            </Route>
            <Route path='/about' element={<AboutPage/>}/>
          </Routes>
          <AboutIconLink/>
        </div>
      </div>
    </Router>

  )
}

// export default App
