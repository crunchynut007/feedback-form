import propTypes from 'prop-types'

function Card({children, reverse}) {
  // conditional Class
  // return <div className={`card ${reverse && 'reverse'}`}>
  //   {children}
  // </div>

  // conditional styling
  return (
    <div className='card' style={{
      backgroundColor: reverse ? 'rgba(0,0,0,0.4)' : '#fff',
      color: reverse ? '#fff' : '#000'
    }}>{children}</div>
  )
}

Card.defaultProps = {
  reverse: false,
}

Card.propTypes = {
  children: propTypes.node.isRequired,
  reverse: propTypes.bool,
}

export default Card