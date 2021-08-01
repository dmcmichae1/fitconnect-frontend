import axios from 'axios';
import React from 'react';
import { useState } from "react";
import { withRouter } from 'react-router';

const NewArticle = ({ history }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const createArticle = (e) => {
    e.preventDefault();

    if (title !== '' && body !== '') {
      const req = {
        title: title,
        body: body
      };

      const token = localStorage.getItem('myJWT');

      if (!token) {
        //redirect
        history.push('/login');
      }

      const options = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }

      axios.post('http://localhost:3000/articles', req, options).then(result => {
        history.push('/articles')
      }, err => {
        localStorage.removeItem('myJWT');
        history.push('/login');
      });
    }
  };

  return (<div>
    <form onSubmit={createArticle}>
      <h1>Create a Article</h1>
      <label>Title</label>
      <input type="text" name="title" onChange={e => setTitle(e.target.value)} />
      <label>Description</label>
      <input type="text" name="body" onChange={e => setBody(e.target.value)} />
      <button>Create!</button>
    </form>
  </div>);
};


export default withRouter(NewArticle);