import React from 'react'
import { useHistory } from 'react-router-dom'
import { useField } from '../hooks'


const CreateNew = (props) => {
  const content = useField('text')
  const author = useField('text')
  const info = useField('text')
  const history = useHistory()

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
    props.setNotification(`a new anecdote ${content.value} have been created!`)
    setTimeout(() => {
      props.setNotification('')
    }, 10000)
    history.push('/')
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input  {...content} />
        </div>
        <div>
          author
          <input  {...author} />
        </div>
        <div>
          url for more info
          <input  {...info} />
        </div>
        <button>create</button>
      </form>
    </div>
  )

}

export default CreateNew