import styled from 'styled-components';

export const MoviePage = styled.div`
  color: #fff;
  display: grid;
  flex-direction: column;
  max-width: 600px;
  margin: 2rem auto;

  svg {
    font-size: 1.5rem;
    color: #be32ff;
  }

  .movie-card {
    text-align: center;

    img,
    h2,
    p {
      margin-bottom: 1rem;
    }

    h2 {
      font-size: 1rem;
    }

    p {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.4rem;
    }
  }

  .tagline {
    text-align: center;
    font-size: 1.3rem;
    margin-bottom: 2rem;
  }

  .info {
    margin-bottom: 1.5rem;
  }

  .info h3 {
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .description p {
    line-height: 1.4rem;
  }
  @media only screen and (max-width: 768px) {
  .MoviePage {
    max-width: 90%;
  }

  .movie-card {
    font-size: 0.8rem;

    h2 {
      font-size: 1.0rem;
    }
  }

  .tagline {
    font-size: 1rem;
  }

  .info h3 {
    font-size: 1rem;
  }

  .description p {
    font-size: 0.8rem;
  }
}

`;
