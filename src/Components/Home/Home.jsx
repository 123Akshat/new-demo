import React, { useEffect, useState } from 'react'
import "./Home.scss" 
import axios from "axios";
import {BiPlay} from "react-icons/bi"
import {AiOutlinePlus} from "react-icons/ai"

const apiKey = "7b27bfdd1cf1fece641b8b86f4a8b73e";
const url = "https://api.themoviedb.org/3"
const imgUrl = "https://image.tmdb.org/t/p/original"
const upcoming = "upcoming";
const nowPlaying = "now_playing";
const popular = "popular";
const topRated = "top_rated";

const Card = ({img})=>( 
    <img className='card' src={img} alt="cover" />
)

const Row = ({ tittle, arr = [] })=>(

    <div className='row'>
        <h2>{tittle}</h2>

        <div>

          {
            arr.map((item, index)=>(
              <Card key={index} img={`${imgUrl}/${item.poster_path}`} />
            ))
          }
       
       
      
        </div>
    </div>
)

const Home = () => {

  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [PopularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
 

  useEffect(()=> {

    const fetchUpcoming = async()=> {
      const { data: { results } } = await axios.get(`${url}/movie/${upcoming}?api_key=${apiKey}`);
      setUpcomingMovies(results)
    };

    const fetchNowPlaying = async()=> {
      const { data: { results } } = await axios.get(`${url}/movie/${nowPlaying}?api_key=${apiKey}`);
      setNowPlayingMovies(results)
    };

    const fetchPopular = async()=> {
      const { data: { results } } = await axios.get(`${url}/movie/${popular}?api_key=${apiKey}`);
      setPopularMovies(results)
    };

    const fetchTopRated = async()=> {
      const { data: { results } } = await axios.get(`${url}/movie/${topRated}?api_key=${apiKey}`);
      setTopRatedMovies(results)
    };


    fetchUpcoming();
    fetchNowPlaying();
    fetchPopular();
    fetchTopRated();
  }, []) 


  return (
    <section className='home'>
        <div className='banner' style={{
          backgroundImage: PopularMovies[0]? `url(${`${imgUrl}/${PopularMovies[0].poster_path}`})`:"rgb(16, 16, 16)"
        }}>
          {
            PopularMovies[0] && 
            (
              <h1>{PopularMovies[0].original_title}</h1>
            )
          }
          {
            PopularMovies[0] &&
            (
              <p>{PopularMovies[0].overview}</p>
            )
          }
          <div>
              <button> <BiPlay /> Play </button>
              <button>My List <AiOutlinePlus /> </button>
          </div>
          
        </div>


        <Row tittle={"Upcoming"} arr={upcomingMovies} />
        <Row tittle={"Now Playing"} arr={nowPlayingMovies} />
        <Row tittle={"Popular"} arr={PopularMovies} />
        <Row tittle={"Top Rated"} arr={topRatedMovies} />

        
        
    </section>
  )
}

export default Home