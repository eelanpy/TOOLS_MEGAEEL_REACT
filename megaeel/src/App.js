import React from 'react'

import { Routes, Route, Link } from 'react-router-dom'
import Hangman from './Hangman'
import Number from './Number'
import './App.css'
import parse from 'html-react-parser'

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import { NavLink } from 'react-router-dom'

import NavDropdown from 'react-bootstrap/NavDropdown'
import 'bootstrap/dist/css/bootstrap.min.css'

const links = [
  ['Hangman', <Hangman />],
  ['Number', <Number />]
]

const App = () => (
  <>
    <Navbar collapseOnSelect expand='lg' bg='primary' data-bs-theme='dark'>
      <Container>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='me-auto'>
            {links.map((w, i) => (
              <NavLink key={i} id='RouterNavLink' to={`/${w[0]}`}>
                {w[0]}
              </NavLink>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <Routes>
      {links.map((w, i) => (
        <Route key={i} path={`/${w[0]}`} element={eval(w[1])} />
      ))}
    </Routes>
  </>
)

export default App