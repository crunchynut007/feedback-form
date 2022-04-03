import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

function Header({text, bgColor, textColor}) {
  //examples of using inline styles
  const headerStyle = {
    backgroundColor: bgColor,
    color: textColor,
  }

  return (
    <Link to='/' style={{textDecoration: 'none'}}>
      <header style={headerStyle}>
        <div className='container'>
          <h2>{text}</h2>
        </div>
      </header>
    </Link>
  )
}

//default props
Header.defaultProps = {
  text: 'Custom Header Component',
  bgColor: 'rgba(0,0,0,0.4)',
  textColor: '#ff6a95'
}

//define types for props using propTypes
Header.propTypes = {
  text: PropTypes.string,
  bgColor: PropTypes.string,
  textColor: PropTypes.string
}

export default Header
