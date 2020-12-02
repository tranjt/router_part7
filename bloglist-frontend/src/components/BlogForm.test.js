import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
  let component
  const createBlog = jest.fn()

  beforeEach(() => {
    component = render(
      <BlogForm createBlog={createBlog} />
    )
  })

  test('calls onSubmit with right values for new blog', () => {

    const title = component.container.querySelector('#title')
    const author = component.container.querySelector('#author')
    const url = component.container.querySelector('#url')
    const form = component.container.querySelector('form')

    fireEvent.change(title, {
      target: { value: 'testing of forms could be easier' }
    })

    fireEvent.change(author, {
      target: { value: 'newbie tester' }
    })

    fireEvent.change(url, {
      target: { value: 'www.test.fi' }
    })

    fireEvent.submit(form)

    expect(createBlog.mock.calls).toHaveLength(1)
    //console.log(JSON.stringify(createBlog.mock.calls[0][0], null, 2))
    expect(createBlog.mock.calls[0][0].title).toBe('testing of forms could be easier')
    expect(createBlog.mock.calls[0][0].author).toBe('newbie tester')
    expect(createBlog.mock.calls[0][0].url).toBe('www.test.fi')

  })
})


