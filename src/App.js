import React, { Component } from 'react';
import './App.css';
import Movie from './Movie';

class App extends Component {

  state = {
    // greeting : "Hello!",
    // movies : [
    //   {
    //     title:"Matrix",
    //     poster:"https://upload.wikimedia.org/wikipedia/en/thumb/c/c1/The_Matrix_Poster.jpg/220px-The_Matrix_Poster.jpg"
    //   },
    //   {
    //     title:"Full Metal Jacket",
    //     poster:"https://images-na.ssl-images-amazon.com/images/I/81U3cu+0RAL._RI_.jpg"
    //   },
    //   {
    //     title:"Oldboy",
    //     poster:"https://a.ltrbxd.com/resized/sm/upload/c9/3j/2v/r4/oldboy-1200-1200-675-675-crop-000000.jpg?k=a1b8014ebc"
    //   },
    //   {
    //     title:"Bohemian Rhapsody",
    //     poster:"http://image.yes24.com/momo/TopCate2042/MidCate010/204190216.jpg"
    //   },
    //   {
    //     title : "A Star is Born",
    //     poster : "https://upload.wikimedia.org/wikipedia/en/thumb/3/39/A_Star_is_Born.png/220px-A_Star_is_Born.png"
    //   }
    // ]
  }

  componentDidMount() {
    this._getMovies();
  }

  _getMovies = async () => {
    const movies = await this._callApi()
    console.log(movies);
    
    this.setState({
      movies
    })
  }

  _callApi = () => {
    return fetch('https://yts.am/api/v2/list_movies.json?sort_by=download_count')
    .then(response => response.json())
    .then(json => json.data.movies)
    .catch(err => console.log(err)
    )
  }
  
  _renderMovies = () => {
    // 제목, 설명, 장르, 평점, 포스터
    const movies = this.state.movies.map((movie, index) => { 
      return <Movie 
      title={index+1 + '. ' + movie.title_long} 
      poster={movie.medium_cover_image} 
      key={movie.id} 
      genres={movie.genres} 
      rating={movie.rating} 
      synopsis={movie.synopsis} />
    });
    return movies;
  }

  render() {
    const {movies} = this.state;
    return (
      <div className={movies ? "App" : "App--loading"}>
        {movies ? this._renderMovies() : "Loading"}
      </div>
    );
  }
}

export default App;
