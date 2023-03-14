import { Link } from "react-router-dom";

const imagesURL = import.meta.env.VITE_IMG;

interface Movie {
  id: number;
  banner: string;
  title: string;  
  showLink?: boolean;
}

const MovieCard = ({ movie, showLink = true }: { movie: Movie; showLink?: boolean }) => {
  return (
    <div className="movie-card">
      <img src={imagesURL + movie.banner} alt={movie.title} />
      <h2>{movie.title}</h2>     
      {showLink && <Link to={`/movie/${movie.id}`}>Detalhes</Link>}
    </div>
  );
};

export default MovieCard;
