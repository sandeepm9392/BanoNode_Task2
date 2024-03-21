
# Task3

Implementing JWT autherization for posts



## here we have mostly used
localhost:8000/api/posts - for posting a post
localhost:8000/api/posts/:id - for update-put ,delete-Delete
localhost:8000/api/posts/like/:id for like-put method
localhost:8000/api/posts/comment/:id for comment-put method

up on deletion of the post all likes and commnets will be long gone with it

# How it works

Here in this case we have implemented jwt autherization

upon each signin it creates a access_token and sotore it in cookies locally

it helps us to differentiate btn owner and user

only owner of the post can perform CRUD

user can only comment and delete


## Deployment

To run this project run

```bash
  npm run dev
```
before starting add your MongoDB string and jwt secret key of your own

install all the modules

```bash
  npm install
```

