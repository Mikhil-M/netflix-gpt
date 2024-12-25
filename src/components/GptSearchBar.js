import React, { useRef } from 'react'
import lang from '../utils/languageConstants'
import { useDispatch, useSelector } from 'react-redux'
import openai from '../utils/openai'
import { API_OPTIONS } from '../utils/constants'
import { addGptMovieResults } from '../utils/gptSlice'

const GptSearchBar = () => {
    const dispatch = useDispatch();
    const langkey = useSelector(store => store.config?.lang)
    const searchText = useRef(null);

    const searchMovieTMBD = async (movie) => {
        const data = await fetch('https://api.themoviedb.org/3/search/movie?query=' + movie + '&include_adult=false&language=en-US&page=1', API_OPTIONS);
        const json = await data.json();
        return json?.results || [];
    }

    const handleGptSearchClick = async () => {
        const gptQuery = "Act as a movie Recommandation system and suggest some movies for the query " +
            searchText.current.value +
            ". Only give me names of 5 movies, comma separated";
        const gptResults = await openai.chat.completions.create({
            messages: [{ role: 'user', content: gptQuery }],
            model: 'gpt-4o-mini',
        });

        if (!gptResults?.choices?.[0]?.message?.content) return;
        const gptMovies = gptResults.choices[0].message.content.split(",").map((movie) => movie.trim());
        const promiseArray = gptMovies.map(movie => searchMovieTMBD(movie));
        const tmdbResults = await Promise.all(promiseArray);
        dispatch(addGptMovieResults({ movieResults: tmdbResults, movieNames: gptMovies }));
    }

    return (
        <div className='pt-[10%] flex justify-center'>
            <form className='bg-black w-1/2 grid grid-cols-12' onSubmit={(event) => event.preventDefault()}>
                <input ref={searchText} type="text" className='p-6 m-4 rounded-md col-span-9'
                    placeholder={lang[langkey].gptSearchPlaceholder} />
                <button className='py-2 px-4 m-4 ml-0 bg-red-700 text-white rounded-md col-span-3'
                    onClick={handleGptSearchClick}>{lang[langkey].search}</button>
            </form>
        </div>
    )
}

export default GptSearchBar