import React from 'react';
import moment from 'moment'
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import MovieDataService from '../services/movies';
import { Container, Row, Col, Image, Card, Button } from 'react-bootstrap';

const Movie = (props) => {
    const { id } = useParams();
    const [movie, setMovie] = useState({
        _id: null,
        title: '',
        rated: '',
        reviews: [],
        poster: '',
        plot: '',
    });

    useEffect(() => {
        const getMovie = async () => {
            try {
                const response = await MovieDataService.get(id);
                setMovie(response.data);

            } catch (e) {
                console.log(e);
            }
        };

        getMovie();
    }, [id]);

    const deleteReview = (reviewId, index) => {
        MovieDataService.deleteReview(reviewId, props.user.id)
            .then(response => {
                setMovie((currState) => {
                    currState.reviews.splice(index, 1)
                    return ({
                        ...currState
                    })
                })
            })
            .then(response => {
                setMovie((prevState) => {
                    prevState.reviews.splice(index, 1)
                    return ({
                        ...prevState
                    })
                })
            })
            .catch(e => {
                console.log(e)
            })
    }

    return (
        <div>
            {/* console.log({movie.title +" PLOT : "+ movie.plot +"  ID: "+ movie._id+"  Rated: "+ movie.rated}) */}
            <Container>
                <Row>
                    <Col>
                        <Image src={movie.poster + '/100px250'} fluid />
                    </Col>
                    <Col>
                        <Card>
                            <Card.Header as="h5">{movie.title}</Card.Header>
                            <Card.Body>
                                <Card.Text>{movie.plot}</Card.Text>
                                {props.user && (
                                    //  changing id to movie_id
                                    <Link to={`/movies/${movie._id}/review`} className="btn btn-primary">
                                        Add Review
                                    </Link>
                                )}
                            </Card.Body>
                        </Card>
                        <br />
                        <h2>Reviews</h2>

                        {movie.reviews.map((review, index) => (
                            <div key={index} className="my-3">
                                <div className="d-flex">
                                    <div className="me-3">
                                        <img
                                            src="https://via.placeholder.com/64"
                                            alt="user"
                                            className="rounded-circle"
                                        />
                                    </div>
                                    <div>
                                        <h5>{review.name + " reviewed on "} {moment(review.date).format("Do MMMM YYYY")}</h5>
                                        <p>{review.review}</p>
                                        {props.user && props.user.id === review.user_id && (
                                            <div className="d-flex">
                                                <div className="me-2">
                                                    <Link
                                                        to={{
                                                            pathname: `/movies/${movie._id}/review`,
                                                            state: { currentReview: review },
                                                        }}
                                                    >
                                                        Edit
                                                    </Link>
                                                </div>
                                                <div>
                                                    <Button variant="link" onClick={() => deleteReview(review._id, index)}>Delete</Button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}


                    </Col>
                </Row>
            </Container>
            <div className="container">
                <h3>{movie.title}</h3>
                <p>Rated: {movie.rated}</p>
                {/*<h4>Reviews:</h4>
                <ul>
                    {movie.reviews.map((review) => (
                        <li key={review.id}>{review.text}</li>
                    ))}
                </ul>
              
                <Link to={'/movies/' + movie._id + '/review'} className="btn btn-primary">
                    Add Review  
                </Link> */}
            </div>
        </div>
    );
};

export default Movie;
