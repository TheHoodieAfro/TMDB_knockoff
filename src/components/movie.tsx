import React from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { API_key } from "../utils/constants"
import Rating from '@mui/material/Rating';

const postVote = ({ ids, rating }: any) => {

    fetch("https://api.themoviedb.org/3/movie/" + ids + "/rating?api_key=" + API_key, {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json;charset=utf-8' }),
        body: JSON.stringify({ value: rating })
    })
        .then(function (response) {
            if (response.ok) {
                return response.text()
            } else {
                throw "Error";
            }

        })
        .then(function (texto) {
            console.log(texto);
        })
        .catch(function (err) {
            console.log(err);
        });
}

const Movie = ({ id, title, poster_path, overview, vote_average, vote_count }: any) =>

    <div className="movie">
        <Card sx={{ maxWidth: 300 }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    alt={title}
                    src={"https://image.tmdb.org/t/p/w500/" + poster_path}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {overview}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary">
                    {vote_average}/10<br></br>{vote_count} votes
                </Button>
                <Rating name="customized-10" defaultValue={vote_average} max={10} size="small" onChange={(event, newValue) => postVote({ ids: id, rating: newValue })} />
            </CardActions>
        </Card>
    </div>

export default Movie