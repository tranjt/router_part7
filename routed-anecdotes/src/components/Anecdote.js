import React from 'react'

const Anecdote = ({ anecdote }) => {
  const padding = {
    paddingBottom: 5
  }
  return (
    <div >
      <h2>{anecdote.content} {anecdote.author} </h2>
      <div style={padding}>has {anecdote.votes} votes</div>
      <div style={padding}>for more info see {anecdote.info} </div>
    </div>
  )
}

export default Anecdote