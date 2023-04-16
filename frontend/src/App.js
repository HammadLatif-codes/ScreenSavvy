import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import { useParams } from "react-router-dom";


import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

import AddReview from "./Components/add-review"
import MoviesList from "./Components/movies-list"
import Movie from "./Components/movie"
import Login from "./Components/login"

function App() {
  const { id } = useParams();
  const [user, setUser] = React.useState(null)
  async function login(user = null) {// default user to null
    setUser(user)
  }
  async function logout() {
    setUser(null)
  }
  return (
    <div className="App">


      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">Movie Reviews</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link>
              <Link to={"/movies"}>Movies</Link>
            </Nav.Link>
            <Nav.Link>
              {user ? (
                <a onClick={logout}>Logout User</a>
              ) : (
                <Link to={"/login"}>Login</Link>
              )}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>

        </Navbar>
        <Routes>
  <Route path="/" element={<MoviesList />} />
  <Route path="/movies/*" element={<MoviesList />} />
  <Route path="/movies/:id/review" element={<AddReview user={user} movieID={ id }/>} />
  <Route path="/movies/:id" element={<Movie user={user} />} />
  <Route path="/login" element={<Login login={login} />} />
</Routes>



    </div>
  )

}
export default App;