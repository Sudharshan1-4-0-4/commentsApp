import {Component} from 'react'

import './index.css'

import {v4} from 'uuid'

import CommentItem from '../CommentItem'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

// Write your code here
class Comments extends Component {
  state = {
    nameInput: '',
    description: '',
    commentsList: [],
  }

  onSubmitForm = event => {
    event.preventDefault()
    const {nameInput, description} = this.state

    const initialBackgroundColorClassName = `initial-container ${
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]
    }`

    const newComment = {
      id: v4(),
      name: nameInput,
      comment: description,
      date: new Date(),
      isLiked: false,
      initialClassName: initialBackgroundColorClassName,
    }

    this.setState(prevState => ({
      commentsList: [...prevState.commentsList, newComment],
      nameInput: '',
      description: '',
    }))
  }

  deleteComment = commentId => {
    const {commentsList} = this.state

    this.setState({
      commentsList: commentsList.filter(comment => comment.id !== commentId),
    })
  }

  toggleIsLiked = id => {
    this.setState(prevState => ({
      commentsList: prevState.commentsList.map(eachComment => {
        if (id === eachComment.id) {
          return {...eachComment, isLiked: !eachComment.isLiked}
        }
        return eachComment
      }),
    }))
  }

  onChangeName = event => {
    this.setState({
      nameInput: event.target.value,
    })
  }

  onChangeDescription = event => {
    this.setState({
      description: event.target.value,
    })
  }

  render() {
    const {nameInput, description, commentsList} = this.state
    return (
      <div className="main-container">
        <div className="inner-container">
          <h1>Comments</h1>
          <div className="display-container">
            <div className="content-container">
              <p>Say something about 4.0Technologies</p>
              <form className="form" onSubmit={this.onSubmitForm}>
                <input
                  type="text"
                  value={nameInput}
                  placeholder="Your Name"
                  className="input-styling"
                  onChange={this.onChangeName}
                />
                <br />
                <textarea
                  type="text"
                  placeholder="Your Comment"
                  rows="10"
                  value={description}
                  cols="24"
                  className="input-styling"
                  onChange={this.onChangeDescription}
                />
                <br />
                <button type="submit" className="submit">
                  Add Comment
                </button>
              </form>
            </div>
            <div className="image-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
                className="image"
                alt="comments"
              />
            </div>
          </div>
          <hr className="line" />
          <p className="heading">
            <span className="comments-count">{commentsList.length}</span>
            Comments
          </p>
          <ul className="display-comments">
            {commentsList.map(eachComment => (
              <CommentItem
                key={eachComment.id}
                commentDetails={eachComment}
                toggleIsLiked={this.toggleIsLiked}
                deleteComment={this.deleteComment}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}
export default Comments
