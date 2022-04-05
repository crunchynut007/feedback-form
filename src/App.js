import {BrowserRouter as Router, Link, Route, Routes} from 'react-router-dom'
import Header from './components/Header'
import FeedbackList from './components/FeedbackList'
import FeedbackStats from './components/FeedbackStats'
import FeedbackForm from './components/FeedbackForm'
import AboutIconLink from './components/AboutIconLink'
import AboutPage from './pages/AboutPage'
import {FeedbackProvider} from './context/FeedbackContext'

export default function App({callback}) {

  return (
    <FeedbackProvider>
      <Router>
        <div ref={callback}>
          <Link to='/' style={{textDecoration: 'none'}}>
            <Header/>
          </Link>
          <div className='container'>
            <Routes>
              <Route exact path='/' element={
                <>
                  <FeedbackForm/>
                  <FeedbackStats/>
                  <FeedbackList/>
                </>
              }>
              </Route>
              <Route path='/about' element={<AboutPage/>}/>
            </Routes>
            <AboutIconLink/>
          </div>
        </div>
      </Router>
    </FeedbackProvider>
  )
}
