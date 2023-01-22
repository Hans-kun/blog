# API

![MIT License][license-shield]

# Simple Blog API

## About

A simple express blog api which allows users register an account login, create, update and delete a blog posts and also allows users make comments and and delete their comments

## Install dependencies

To get started clone the repo and run the following command below to install the necessary dependencies

```bash
$ npm i
```

## Setup database

Once the installation is done setting up the database is next up. Create a mongodb database, copy the connection string and place it in a dotenv file.

### Start API Service

```bash
$ npm run start
```

### Endpoint

- register: [`http://localhost/register`]
- login: [`http://localhost/login`]
- create Post: [`http://localhost/api/posts`]
- get Post: [`http://localhost/api/posts`]
- update Post: [`http://localhost/api/posts/:id`]
- delete Post: [`http://localhost/api/posts/:id`]
- create Comment: [`http://localhost/:id/comment`]
- delete Comment: [`http://localhost/:postId/comment/:commentId`]
