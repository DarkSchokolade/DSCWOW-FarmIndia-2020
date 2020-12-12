import React from 'react'
import {Helmet} from 'react-helmet'

const Meta = ({title,description,keywords}) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name='description' content ={description}></meta>
            <meta name='keywords' content = {keywords}/>
        </Helmet>
    )
}

Meta.defaultProps ={
    title: 'Welcome to Shopping',
    description:'We Sell the best Products',
    keywords:'Best of the best'
}
export default Meta
