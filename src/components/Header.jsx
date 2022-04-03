import PropTypes from 'prop-types'

function Header({text, bgColor, textColor}) {
  //examples of using inline styles with props
  const headerStyle = {
    backgroundColor: bgColor,
    color: textColor,
  }

  return (
    <header style={headerStyle}>
      <div className='container'>
        <h2>{text}</h2>
      </div>
    </header>
  )
}

//default props
Header.defaultProps = {
  text: 'Feedback Form',
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
