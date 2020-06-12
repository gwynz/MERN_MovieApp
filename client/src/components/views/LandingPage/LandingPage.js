import React, { useEffect, useState } from 'react'
import { Typography, Row, Button } from 'antd';
import { FaCode } from "react-icons/fa";
import { API_URL, API_KEY, API_IMAGE_URL, IMAGE_SIZE, POSTER_SIZE } from '../../Config'
import MainImage from './Sections/MainImage';
import GridCards from './Sections/GridCard';
const { Title } = Typography;

function LandingPage(props) {
    const category = props.match.params.category
    const [Movies, setMovies] = useState([])
    const [CurrentPage, setCurrentPage] = useState(0)
    useEffect(() => {
        console.log(category)
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`
        fetchMovies(endpoint)

    }, [])

    const fetchMovies = (path) => {
        fetch(path)
            .then(res => res.json())
            .then(
                (res) => {
                    setMovies([...Movies, ...res.results])
                    setCurrentPage(res.page)
                }
            )

    }

    const loadMoreItems = () => {
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${CurrentPage + 1}`
        fetchMovies(endpoint)
    }
    return (
        <>
            <div style={{ width: '100%', margin: '0' }}>
                {Movies[0] &&
                    <MainImage
                        image={`${API_IMAGE_URL}${IMAGE_SIZE}${Movies[0].backdrop_path}`}
                        title={Movies[0].original_title}
                        text={Movies[0].overview}
                    />

                }

                <div style={{ width: '85%', margin: '1rem auto' }}>

                    <Title level={2} > Movies by latest </Title>
                    <hr />
                    <Row gutter={[16, 16]}>
                        {Movies && Movies.map((movie, index) => (
                            <React.Fragment key={index}>
                                <GridCards
                                    image={movie.poster_path ?
                                        `${API_IMAGE_URL}${POSTER_SIZE}${movie.poster_path}`
                                        : null}
                                    movieId={movie.id}
                                    movieName={movie.original_title}
                                />
                            </React.Fragment>
                        ))}
                    </Row>

                    {/* {Loading &&
                        <div>Loading...</div>} */}

                    <br />
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Button className="loadMore" onClick={loadMoreItems}>Load More</Button>
                    </div>
                </div>

            </div>
        </>
    )
}

export default LandingPage
