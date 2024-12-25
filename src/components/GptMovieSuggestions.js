import React from 'react'
import { useSelector } from 'react-redux'
import MovieList from './MovieList'

const GptMovieSuggestions = () => {
    const gpt = useSelector(store => store.gpt)

    if (!gpt?.movieNames?.length) return;

    return (
        <div className='m-4 bg-black opacity-80'>
            {gpt?.movieNames?.map((movieName, index) => <MovieList key={movieName} title={movieName} movies={gpt?.movieResults[index]} />)}
        </div>
    )
}

export default GptMovieSuggestions