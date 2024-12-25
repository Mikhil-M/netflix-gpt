import { useDispatch, useSelector } from "react-redux";
import { addTrailerVideo } from "../utils/moviesSlice";
import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";

const useMovieTrailer = (movieId) => {
    const dispatch = useDispatch();
    const trilerVideo = useSelector(store => store.movies?.trilerVideo);
    const getTrailerVideo = async () => {
        const data = await fetch('https://api.themoviedb.org/3/movie/' + movieId + '/videos?language=en-US', API_OPTIONS);
        const json = await data.json();

        const filterData = json.results.filter(data => data.type === "Trailer");
        const trailer = filterData?.length ? filterData[0] : json.results[0];
        dispatch(addTrailerVideo(trailer));
    }

    useEffect(() => {
        !trilerVideo && getTrailerVideo();
    }, [])
}

export default useMovieTrailer;