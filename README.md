# Book Store API With Node.js

[Course](https://www.youtube.com/watch?v=CIYujbGpXZ8&list=PL5gCk5NdNx586mk_JOhe30dd59IgrFG_U)

- Lesson 28

## Express Async Handler

This npm package `express-async-handler` is used instead of regular `try-catch`, which makes the syntax cleaner and more readable.

## Sample Data

> Use these JSON data to test the API. Add these data in `Postman` in `Body -> raw -> JSON`

### Create A New User

```json
{
	"firstName": "Osama",
	"lastName": "Elhendi",
	"nationality": "Palestinian",
	"image": "fallback-avatar.png"
}
```

### Create A New Book

```json
{
	"title": "Know Your Why",
	"author": "Simon Sinek",
	"description": "This book is about Know Your Why",
	"price": 33.99,
	"cover": "Soft cover"
}
```

## GET /api/books

Retrieve a list of books.

### Request

- Method: GET
- Endpoint: `/api/books`

### Response

- Status Code: 200 (OK)
- Body: JSON array containing book objects

Example response body:

```json
[
  {
    "id": 1,
    "title": "Book 1",
    "author": "Author 1"
  },
  {
    "id": 2,
    "title": "Book 2",
    "author": "Author 2"
  },
  ...
]
```
