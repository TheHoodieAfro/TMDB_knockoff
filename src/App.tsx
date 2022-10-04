import React, { useEffect, useState } from 'react'
import './App.css'
import Movie from './components/movie'
import Grid from '@mui/material/Unstable_Grid2';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { API_key } from "./utils/constants"
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

function App() {

  const [movies, setMovies] = useState([])
  const [genres, setGenres] = useState([])
  const [favorites, setFavorites] = useState([])
  const [token, setToken] = useState("")
  const [session, setSession] = useState("")
  const [account, setAccount] = useState("")

  useEffect(() => {
    fetch("https://api.themoviedb.org/3/movie/popular?api_key=" + API_key)
      .then(response => response.json())
      .then(data => {
        setMovies(data.results)
      })

    fetch("https://api.themoviedb.org/3/authentication/token/new?api_key=" + API_key)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setToken(data.request_token)
      })

    fetch("https://www.themoviedb.org/authenticate/" + token)

    fetch("https://api.themoviedb.org/3/authentication/session/new?api_key=" + API_key, {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json;charset=utf-8' }),
      body: JSON.stringify({ request_token: token })
    })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setSession(data.session_id)
      })

    fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=" + API_key)
      .then(response => response.json())
      .then(data => {
        setGenres(data.genres)
      })

    fetch("https://api.themoviedb.org/3/account?api_key=" + API_key)
      .then(response => response.json())
      .then(data => {
        setAccount(data.id)
      })

    fetch("https://api.themoviedb.org/3/account/" + account + "/favorite/movies?api_key=" + API_key + "&session_id=" + session)
      .then(response => response.json())
      .then(data => {
        setFavorites(data.results)
      })

  }, [])

  const getPopular = () => {
    fetch("https://api.themoviedb.org/3/movie/popular?api_key=" + API_key)
      .then(response => response.json())
      .then(data => {
        setMovies(data.results)
      })
  }

  const getMostVoted = () => {
    fetch("https://api.themoviedb.org/3/movie/top_rated?api_key=" + API_key)
      .then(response => response.json())
      .then(data => {
        setMovies(data.results)
      })
  }

  const getLatest = () => {
    fetch("https://api.themoviedb.org/3/movie/now_playing?api_key=" + API_key)
      .then(response => response.json())
      .then(data => {
        setMovies(data.results)
      })
  }

  return (

    <div className="App">

      <ButtonGroup variant="outlined" aria-label="outlined button group">
        <Button onClick={() => getPopular()}>Popular</Button>
        <Button onClick={() => getMostVoted()}>Top rated</Button>
        <Button onClick={() => getLatest()}>Latest</Button>
      </ButtonGroup>

      <Grid container spacing={3}>
        {movies.length > 0 && movies.map((movie) =>
          <Grid xs={3} key={movie['id']}>
            <Movie key={movie['id']} {...(typeof movie === 'object' ? movie : {})} />
          </Grid>
        )}
      </Grid>

    </div>

  )

}

export default App
