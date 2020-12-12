import React from 'react'
import PropTypes from 'prop-types'

const Rating = ({value,text,color}) => {
    return (
        <div className='rating'>
            {/* 1star */}
            <span>
                <i style = {{color}} className={value>=1 ? 'fas fa-star' : value>=0.5?'fas fa-star-half-alt': 'far fa-star'}>

                </i>
            </span>
            {/* 2star */}
            <span>
                <i style = {{color}} className={value>=2 ? 'fas fa-star' : value>=1.5?'fas fa-star-half-alt': 'far fa-star'}>
                    
                </i>
            </span>
            {/* 3star */}
            <span>
                <i style = {{color}} className={value>=3 ? 'fas fa-star' : value>=2.5?'fas fa-star-half-alt': 'far fa-star'}>
                    
                </i>
            </span>
            {/* 4 */}
            <span>
                <i style = {{color}} className={value>=4 ? 'fas fa-star' : value>=3.5?'fas fa-star-half-alt': 'far fa-star'}>
                    
                </i>
            </span>
            {/* 5 */}
            <span>
                <i style = {{color}} className={value>=5 ? 'fas fa-star' : value>=4.5?'fas fa-star-half-alt': 'far fa-star'}>
                    
                </i>
            </span>
            <span>{text && text}</span>


            
        </div>
    )
}

Rating.defaultProps = {
    color:'#ffa500'
}
Rating.propTypes={
    value: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    color: PropTypes.string

}

export default Rating
