// import ReactDOM from 'react-dom'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'

const container = document.getElementById('root')
const root = ReactDOM.createRoot(container)

root.render(<App callback={() => console.log('Feedback Form rendered')}/>)

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById("root")
// );