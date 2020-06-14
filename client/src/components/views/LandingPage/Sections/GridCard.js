import React from 'react'
import { Card, Avatar, Col, Typography, Row } from 'antd';
import { API_IMAGE_URL } from '../../../Config'

const { Meta } = Card;
function GridCards(props) {

    let { actor, key, image, movieId, movieName, characterName } = props
    const POSTER_SIZE = "w154";

    if (actor) {
        return (
            <Col key={key} lg={6} md={8} xs={24}>
                <div style={{ position: 'relative' }}>
                    <img style={{ width: '100%', height: '320px' }} alt={characterName} src={`${API_IMAGE_URL}${POSTER_SIZE}${image}`} />
                </div>
            </Col>
        )
    } else {
        return (
            <Col key={key} lg={6} md={8} xs={24}>
                <a href={`/movie/${movieId}`} >
                    <Card
                        hoverable
                        style={{ width: '90%', margin: 'auto' }}
                        cover={<img style={{ width: '100%', height: '320px' }} alt={movieName} src={image} />}
                    >
                        <Meta style={{ textAlign: 'center' }} title={movieName} />
                    </Card>
                </a>
                {/* <div style={{ position: 'relative' }}>
                    <a href={`/movie/${movieId}`} >
                        <img style={{ width: '100%', height: '320px' }} alt={movieName} src={image} />
                    </a>
                </div> */}
            </Col>
        )
    }

}

export default GridCards
