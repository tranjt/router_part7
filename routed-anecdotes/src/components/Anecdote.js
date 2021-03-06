import React from 'react'

const Anecdote = ({ anecdote }) => {
  const padding = {
    paddingBottom: 5
  }

  if (anecdote)
    return (
      <div >
        <h2>{anecdote.content} {anecdote.author} </h2>
        <div style={padding}>has {anecdote.votes} votes</div>
        <div style={padding}>for more info see {anecdote.info} </div>
      </div>
    )
  return (
    <div style={padding}>
      <h2>Ops no anecdote found!</h2>
    </div>
  )
}

export default Anecdote