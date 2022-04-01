import Header from './components/Header'
import FeedbackItem from './components/FeedbackItem'

function App() {
  return (
    <fragment>
      <Header/>
      <div className='container'>
        <FeedbackItem/>
      </div>
    </fragment>
  )
}

export default App
