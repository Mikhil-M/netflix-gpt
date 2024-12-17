import React from 'react'
import lang from '../utils/languageConstants'
import { useSelector } from 'react-redux'

const GptSearchBar = () => {
    const langkey = useSelector(store => store.config?.lang)
    return (
        <div className='pt-[10%] flex justify-center'>
            <form className='bg-black w-1/2 grid grid-cols-12' onSubmit={(event) => event.preventDefault()}>
                <input type="text" className='p-6 m-4 rounded-md col-span-9' placeholder={lang[langkey].gptSearchPlaceholder} />
                <button className='py-2 px-4 m-4 ml-0 bg-red-700 text-white rounded-md col-span-3'>{lang[langkey].search}</button>
            </form>
        </div>
    )
}

export default GptSearchBar