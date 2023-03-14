import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BsFillFileEarmarkTextFill } from "react-icons/bs";
import MovieCard from "../../components/MovieCard";
import { MoviePage } from "./Styles";

const moviesURL = import.meta.env.VITE_API;

const Movie = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState<any>(null);

  const getMovie = async (url: string) => {
    const res = await fetch(url);
    const data = await res.json();
    setMovie(data);
  };

  const formatCurrency = (number: number) => {
    return number.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  useEffect(() => {
    const movieUrl = `${moviesURL}/movies/${id}`;
    getMovie(movieUrl);
  }, []);

  return (
    <MoviePage>
      {movie && (
        <>
          <MovieCard movie={movie} showLink={false} />          
          <div className="info description">
            <h3>
              <BsFillFileEarmarkTextFill /> Sinopse
            </h3>
            <p>{ movie.description }</p>
          </div>
        </>
      )}
    </MoviePage>
  );
};

export default Movie;
