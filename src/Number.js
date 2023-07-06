import React, { useEffect, useState } from 'react'
import data from './data.json'

import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'

import Container from 'react-bootstrap/Container'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import ToggleButton from 'react-bootstrap/ToggleButton'
import { createElement } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup'
import Alert from 'react-bootstrap/Alert'
import './App.css'
// import { FontAwesomeIcon } from 'fontawesome/react-fontawesome'
//import { faRotateRight } from 'fontawesome/fontawesome-svg-core/import.macro'
//import { library } from '@fortawesome/fontawesome-svg-core'
//library.add(FontAwesomeIcon, faRotateRight)

const e = React.createElement

// function generateWords (w, notLetters) {
//   w = w.toLowerCase()

//   notLetters = notLetters.toLowerCase()
//   var format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/

//   const words = data.words
//   var wordsFnd = []
//   var no_letters_pattern
//   if (notLetters.length < 1) {
//     no_letters_pattern = new RegExp('^[^]*$')
//   } else {
//     no_letters_pattern = new RegExp('^[^' + notLetters + ']*$')
//   }
//   var pattern = new RegExp(w, 'g')
//   for (let i = 0; i < words.length; i++) {
//     if (
//       words[i].match(pattern) != null &&
//       words[i].match(pattern)[0].length == words[i].length &&
//       words[i].match(no_letters_pattern) != null
//     ) {
//       const word =
//         words[i][0].toUpperCase() +
//         words[i].slice(1, words[i].length).toLowerCase()
//       wordsFnd.push(word)
//     } else {
//       // alert("Couldn't find it!")
//     }
//   }

//   return wordsFnd
// }
const guesses = {}
var tries = 0
function LetUserPick (props) {
  console.log(props.randomNum)
  const [validated, setValidated] = useState(false)
  const [correctGuess, setCorrectGuess] = useState(null)
  const [guess, setGuess] = useState('')
  const [textAlert, setTextAlert] = useState('')
  const [show, setShow] = useState(false)

  function store (e) {
    setGuess(e.target.value)
  }

  function check (guess) {
    if (parseInt(guess) == parseInt(props.randomNum)) {
      setCorrectGuess(true)
      setTextAlert('Correct! You got in ' + guesses.length + ' tries.')
    } else {
      setCorrectGuess(false)
      if (parseInt(guess) > props.randomNum) {
        setTextAlert('Too High!')
      } else {
        setTextAlert('Too Low!')
      }

      setGuess('')
    }
  }

  const myRef = React.createRef()

  useEffect(() => {
    myRef.current.focus()
    console.log(correctGuess)
    console.log(guesses)
  })
  function submit (event) {
    setGuess(event.target.value)

    event.preventDefault()

    check(guess)
    tries += 1
    if (parseInt(guess) > parseInt(props.randomNum)) {
      guesses[' ' + guess] = 'Too High!'
    } else if (parseInt(guess) < parseInt(props.randomNum)) {
      guesses[' ' + guess] = 'Too Low!'
    } else {
      guesses[' ' + guess] = `Correct: ${String(tries)} ${
        tries < 2 ? 'try' : 'tries!'
      }`
    }
  }

  return (
    <>
      <h5
        className='mb-4'
        style={{ visibility: props.isChecked ? 'visible' : 'hidden' }}
      >
        The computer has generated a random number from 1 to {props.max}
        (excluding). Try to guess it:
      </h5>
      <Row className='justify-content-md-center mb-2'>
        <Col xs lg='5'>
          <form onSubmit={submit}>
            <Form.Control
              type='text'
              className={`mb-4 ${
                correctGuess == true ? 'text-success border-success' : ''
              }`}
              placeholder='Your Guess:'
              onChange={e => store(e)}
              value={guess}
              disabled={correctGuess ? true : false}
              style={{ visibility: props.isChecked ? 'visible' : 'hidden' }}
              ref={myRef}
            />
            {/* This is alert to tell user if low or high:  */}
          </form>
        </Col>
      </Row>
      <ListGroup>
        {Object.keys(guesses).map((g, i) => (
          <>
            <Row className='justify-content-md-center mr-1' key={i.toString()}>
              <Col xs={1}>
                <Button
                  xs='true'
                  className='text-center'
                  lg='1'
                  key={i.toString()}
                  variant={
                    parseInt(g) == parseInt(props.randomNum)
                      ? 'outline-success active'
                      : 'outline-danger active'
                  }
                >
                  {g}
                </Button>
              </Col>
              <Col xs={6} md={4} lg='2' className='mb-1 align-center' mx-auto>
                <Button
                  lg='2'
                  xs='true'
                  className='text-center'
                  variant={
                    parseInt(g) == parseInt(props.randomNum)
                      ? 'outline-success active'
                      : 'outline-danger active'
                  }
                >
                  {guesses[g]}
                </Button>
              </Col>
            </Row>
            <br />
          </>
        ))}
      </ListGroup>
      <div className='text-center'>
        <Button
          size='lg'
          variant='outline-primary'
          className='mt-2'
          onClick={() => {
            window.location.reload()
          }}
          style={{ visibility: correctGuess ? 'visible' : 'hidden' }}
        >
          Play Again
        </Button>
      </div>
    </>
  )
}

function Number () {
  document.title = 'Number Guessing Game'
  const [max, setMax] = useState('')
  const [isChecked, setChecked] = useState(false)

  const nums = [
    { value: 10 },
    { value: 25 },
    { value: 50 },
    { value: 100 },
    { value: 500 },
    { value: 1000 }
  ]

  const change = e => {
    setMax(parseInt(e.target.value))
    setChecked(true)
  }

  return (
    <Container>
      <>
        <h1
          className='mt-4'
          style={({ textDecorationLine: 'underline' }, { fontWeight: 'bold' })}
        >
          Number Guessing Game:
        </h1>

        <h2 className='mt-1'>
          This game is to see how fast you can guess a number by. Pick a number
          that suits you(this number is the max the computer can generate a
          number for(excluding that number):
        </h2>
        <Row className='justify-content-md-center'>
          <Col lg='5'>
            {nums.map((num, idx) => (
              <>
                <ToggleButton
                  key={idx}
                  id={`radio-${idx}`}
                  className='m-1 mb-4'
                  type='radio'
                  variant='outline-primary'
                  name='radio'
                  value={num.value}
                  checked={max === parseInt(num.value)}
                  onChange={e => change(e)}
                  disabled={isChecked}
                >
                  {num.value}
                </ToggleButton>
              </>
            ))}
          </Col>
        </Row>

        <GenerateRandomNum max={max} isChecked={isChecked} />
      </>
    </Container>
  )
}

const GenerateRandomNum = props => {
  const num = props.max
  var randomNum = Math.floor(Math.random() * (num - 1)) + 1
  if (randomNum % 5 == 0) {
    randomNum = Math.floor(Math.random() * (num - 1)) + 1
  }

  return (
    <>
      <LetUserPick
        randomNum={randomNum}
        isChecked={props.isChecked}
        max={num}
      />
    </>
  )
}

export default Number
