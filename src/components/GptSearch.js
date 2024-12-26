import React from 'react'
import GptSearchBar from './GptSearchBar'
import GptMovieSuggestions from './GptMovieSuggestions'
import { BG_IMG_URL } from '../utils/constants'

const GptSearch = () => {
    return (
        <div>
            <div className='fixed -z-10'>
                <img src={BG_IMG_URL} className='h-screen w-screen object-cover'
                    alt='login-background' />
            </div>
            <GptSearchBar />
            <GptMovieSuggestions />
        </div>
    )
}

export default GptSearch