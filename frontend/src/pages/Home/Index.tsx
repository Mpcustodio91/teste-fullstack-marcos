import { useEffect, useState } from "react";
import MovieCard from "../../components/MovieCard";
import Pagination from "../../components/Pagination";
import { FetchButton } from "./Styles";

import "../MoviesGrid.css";

const moviesURL = import.meta.env.VITE_API;

interface Movie {
  id: number;
  title: string;
  vote_average: number;
  banner: string;
}

const Home = () => {
  const [topMovies, setTopMovies] = useState<Movie[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const getTopRatedMovies = async (url: string, page: number) => {
    const res = await fetch(`${url}?page=${page}`);
    const data = await res.json();

    setTopMovies(data.movies);
    setTotalPages(data.totalPages);
  };

  useEffect(() => {
    const topRatedUrl = `${moviesURL}/movies`;
    getTopRatedMovies(topRatedUrl, currentPage);
  }, [currentPage]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleFetchMovies = async () => {
    const fetchUrl = `${moviesURL}/movies/fetch`;
    const listUrl = `${moviesURL}/movies`;
    const res = await fetch(fetchUrl);

    getTopRatedMovies(listUrl, 1);
  };

  return (
    <div className="container">
      <h2 className="title">Melhores filmes:</h2>
      <div className="movies-container">
        {topMovies.length > 0 &&
          topMovies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
      </div>
      <FetchButton onClick={handleFetchMovies}>Atualizar catálogo</FetchButton>
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default Home;