import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { API_URL, API_KEY, API_IMAGE_URL, IMAGE_SIZE, POSTER_SIZE } from '../../Config'
import MainImage from '../LandingPage/Sections/MainImage';
import MovieInfo from '../MovieDetailPage/Sections/MovieInfo';
import { Button, Row } from 'antd';
import GridCards from '../LandingPage/Sections/GridCard';
import Favorite from '../MovieDetailPage/Sections/Favorite'
import LikeDislike from '../MovieDetailPage/Sections/LikeDislike'
import Comment from '../MovieDetailPage/Sections/comment'
import axios from 'axios';
import './Sections/style.css';
MovieDetailPage.propTypes = {

};

function MovieDetailPage(props) {
    const movieId = props.match.params.movieId
    const [Movie, setMovie] = useState({})
    const [Casts, setCasts] = useState([])
    const [ActorToggle, setActorToggle] = useState(false)
    const [CommentLists, setCommentLists] = useState([])
    const movieVariable = {
        movieId: movieId
    }
    useEffect(() => {
        const endpoint = `${API_URL}movie/${movieId}?api_key=${API_KEY}&language=en-US`
        fetchMovie(endpoint)
        fetchComment()
    }, [])

    const fetchMovie = (path) => {
        fetch(path)
            .then(res => res.json())
            .then(
                (res) => {
                    res && setMovie(res)
                    // fetch crews
                    fetch(`${API_URL}movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`)
                        .then(res => res.json())
                        .then(
                            (res) => {
                                res && setCasts(res.cast)
                                console.log(res)
                            }
                        )
                }
            )

    }

    const fetchComment = () => {
        axios.post('/api/comment/getComments', movieVariable)
            .then(response => {
                console.log(response)
                if (response.data.success) {
                    console.log('response.data.comments', response.data.comments)
                    setCommentLists(response.data.comments)
                } else {
                    alert('Failed to get comments Info')
                }
            })
    }

    const toggleActorView = () => {
        setActorToggle(!ActorToggle)
    }
    const addFavorite = () => {
        setActorToggle(!ActorToggle)
    }
    const updateComment = (newComment) => {
        setCommentLists(CommentLists.concat(newComment))
    }

    return (
        <div>

            <MainImage
                image={`${API_IMAGE_URL}${IMAGE_SIZE}${Movie.backdrop_path}`}
                title={Movie.original_title}
                text={Movie.overview}
            />
            <div style={{ width: '85%', margin: '1rem auto' }}>
                <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '2rem' }}>
                    <Favorite userFrom={localStorage.getItem('userId')} movieInfo={Movie} movieId={movieId} />
                </div>


                <MovieInfo movie={Movie} />
                <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem' }}>
                    <Button onClick={toggleActorView}>Toggle Actor View </Button>
                </div>

                {
                    ActorToggle && <Row gutter={[16, 16]}>
                        {
                            Casts && Casts.map((cast, index) => (
                                <React.Fragment key={index}>
                                    {cast.profile_path && <GridCards actor image={cast.profile_path} characterName={cast.characterName} />}
                                </React.Fragment>

                            ))}

                    </Row>
                }
                <br />
                <div style={{ display: 'flex', justifyContent: 'center', color: 'white' }}>
                    <LikeDislike movie movieId={movieId} userId={localStorage.getItem('userId')} />
                </div>

                <Comment movieTitle={Movie.original_title} CommentLists={CommentLists} movieId={movieId} refreshFunction={updateComment} />
            </div>
        </div>
    );
}

export default MovieDetailPage;