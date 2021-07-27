# Backend

[Heroku Link](https://social-media-aiveekei.herokuapp.com/)

## Endpoints

### POST `/auth/signup`

Request Headers:

```js
{
  "Content-Type": "application/json"
}
```

Sample Request Body:

```json
{
	"username": "sample",
	"email": "sample@gmail.com",
	"password": "testpass"
}
```

Sample Response Object:

```json
{
  "picture": "defaultavatar.jpg",
  "following": [],
  "followers": [],
  "_id": "60ffe9bd6c5ff20410002265",
  "username": "sample",
  "email": "sample@gmail.com",
  "password": "$2b$10$FkivB5b1QPnIpGHC5DC0xuqGpWvjU8tuR3EegkG/flB6qClPXpDbq",
  "__v": 0
}
```

OPTIONAL: Profile picture can be sent using multipart/form-data content-type and sending a FormData in the body



### POST `/auth/signin`

Sample Request Headers:

```js
{
  "Content-Type": "application/json"
}
```

Sample Request Body:

```json
{
	"username": "sample",
	"password": "testpass"
}
```

Sample Response Object:

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNhbXBsZSIsImlhdCI6MTYyNzM4NDM2NCwiZXhwIjoxNjI3Mzg3OTY0fQ.EUXabqXlRVS96E-Fw98wTjjOnVhWgtXNz3J6ecuWN4I",
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNhbXBsZSIsImlhdCI6MTYyNzM4NDM2NCwiZXhwIjoxNjI3OTg5MTY0fQ.ATHV-07X2fB8cdmuXZpXCzI6xkGPKAjBwdIHdv596MI"
}
```



### POST `/auth/signout/`

Sample Request Headers:

```js
{
  "Content-Type": "application/json",
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNhbXBsZSIsImlhdCI6MTYyNzM4NDM2NCwiZXhwIjoxNjI3Mzg3OTY0fQ.EUXabqXlRVS96E-Fw98wTjjOnVhWgtXNz3J6ecuWN4I"
}
```

Sample Request Body:

```json
{
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNhbXBsZSIsImlhdCI6MTYyNzM4NDM2NCwiZXhwIjoxNjI3OTg5MTY0fQ.ATHV-07X2fB8cdmuXZpXCzI6xkGPKAjBwdIHdv596MI"
}
```

Sample Response Object:

```json
{
  "message": "Signed-out successfully"
}
```



### POST `/auth/token`

Request Headers:

```js
{
  "Content-Type": "application/json"
}
```

Sample Request Body:

```json
{
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNhbXBsZSIsImlhdCI6MTYyNzM4NDM2NCwiZXhwIjoxNjI3OTg5MTY0fQ.ATHV-07X2fB8cdmuXZpXCzI6xkGPKAjBwdIHdv596MI"
}
```

Sample Response Object:

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNhbXBsZSIsImlhdCI6MTYyNzM4NDU2NSwiZXhwIjoxNjI3Mzg4MTY1fQ.4Jg1eZlWlNbzuvDow6gqkfoAa0CAq3z0ZBZ410n24Go"
}
```



### GET `/me`

Request Headers:

```js
{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNhbXBsZSIsImlhdCI6MTYyNzM4NDU2NSwiZXhwIjoxNjI3Mzg4MTY1fQ.4Jg1eZlWlNbzuvDow6gqkfoAa0CAq3z0ZBZ410n24Go"
}
```

Sample Response Object:

```json
{
  "picture": "defaultavatar.jpg",
  "following": [],
  "followers": [],
  "_id": "60ffe9bd6c5ff20410002265",
  "username": "sample",
  "email": "sample@gmail.com",
  "__v": 0
}
```



### GET `/image/:filename`

Response: image file



### GET `/users`

Request Headers:

```js
{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNhbXBsZSIsImlhdCI6MTYyNzM4NDU2NSwiZXhwIjoxNjI3Mzg4MTY1fQ.4Jg1eZlWlNbzuvDow6gqkfoAa0CAq3z0ZBZ410n24Go"
}
```

Sample Response Array:

```json
[
  {
    "username": "sample2",
    "picture": "sample2.jpg",
    "followersTotal": 5
  },
  {
    "username": "sample3",
    "picture": "sample3.jpg",
    "followersTotal": 1
  }
]
```



### GET `/users/:username`

Request Headers:

```js
{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNhbXBsZSIsImlhdCI6MTYyNzM4NDU2NSwiZXhwIjoxNjI3Mzg4MTY1fQ.4Jg1eZlWlNbzuvDow6gqkfoAa0CAq3z0ZBZ410n24Go"
}
```

Sample Response Object:

```json
{
  "picture": "defaultavatar.jpg",
  "following": [],
  "followers": [],
  "_id": "60ffe9bd6c5ff20410002265",
  "username": "sample",
  "email": "sample@gmail.com",
  "__v": 0
}
```



### POST `/users/:username/follow`

Request Headers:

```js
{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNhbXBsZSIsImlhdCI6MTYyNzM4NDU2NSwiZXhwIjoxNjI3Mzg4MTY1fQ.4Jg1eZlWlNbzuvDow6gqkfoAa0CAq3z0ZBZ410n24Go"
}
```

Sample Response Object:

```json
{
  "message": "Followed successfully"
  }
```



### POST `/users/:username/unfollow`

Request Headers:

```js
{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNhbXBsZSIsImlhdCI6MTYyNzM4NDU2NSwiZXhwIjoxNjI3Mzg4MTY1fQ.4Jg1eZlWlNbzuvDow6gqkfoAa0CAq3z0ZBZ410n24Go"
}
```

Sample Response Object:

```json
{
  "message": "Unfollowed successfully"
  }
```



### GET `/users/:username/posts`

Request Headers:

```js
{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNhbXBsZSIsImlhdCI6MTYyNzM4NDU2NSwiZXhwIjoxNjI3Mzg4MTY1fQ.4Jg1eZlWlNbzuvDow6gqkfoAa0CAq3z0ZBZ410n24Go"
}
```

Sample Response Array:

```json
[
  {
    "likes": [],
    "_id": "60ffdaaf6c5ff204100021cc",
    "content": "sample post",
    "author": {
      "username": "sample",
      "picture": "defaultavatar.jpg"
    },
    "createdAt": "2021-07-27T10:06:39.216Z",
    "updatedAt": "2021-07-27T10:27:13.067Z",
    "__v": 1
  },
]
```

Empty array if user doesn't have posts



### GET `/posts`

Request Headers:

```js
{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNhbXBsZSIsImlhdCI6MTYyNzM4NDU2NSwiZXhwIjoxNjI3Mzg4MTY1fQ.4Jg1eZlWlNbzuvDow6gqkfoAa0CAq3z0ZBZ410n24Go"
}
```

Sample Response Array:

```json
[
  {
    "likes": [],
    "_id": "60ffdaaf6c5ff204100021cc",
    "content": "sample post",
    "author": {
      "username": "sample",
      "picture": "defaultavatar.jpg"
    },
    "createdAt": "2021-07-27T10:06:39.216Z",
    "updatedAt": "2021-07-27T10:27:13.067Z",
    "__v": 1
  }
]
```

Empty array if requesting user doesn't have any posts and not following other users



### POST `/posts`

Request Headers:

```js
{
  "Content-Type": "application/json"
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNhbXBsZSIsImlhdCI6MTYyNzM4NDU2NSwiZXhwIjoxNjI3Mzg4MTY1fQ.4Jg1eZlWlNbzuvDow6gqkfoAa0CAq3z0ZBZ410n24Go"
}
```

Sample Request Body Object:

```json
{
  "content": "new post"
  }
```

Sample Response Object:

```json
{
  "likes": [],
  "_id": "60ffed946c5ff2041000227f",
  "content": "new post",
  "author": "60ffe9bd6c5ff20410002265",
  "createdAt": "2021-07-27T11:27:16.306Z",
  "updatedAt": "2021-07-27T11:27:16.306Z",
  "__v": 0
}
```



### DELETE `/posts/:id`

Request Headers:

```js
{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNhbXBsZSIsImlhdCI6MTYyNzM4NDU2NSwiZXhwIjoxNjI3Mzg4MTY1fQ.4Jg1eZlWlNbzuvDow6gqkfoAa0CAq3z0ZBZ410n24Go"
}
```

```json
{
  "message": "Deleted successfully"
  }
```



### POST `/posts/:id/like`

Request Headers:

```js
{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNhbXBsZSIsImlhdCI6MTYyNzM4NDU2NSwiZXhwIjoxNjI3Mzg4MTY1fQ.4Jg1eZlWlNbzuvDow6gqkfoAa0CAq3z0ZBZ410n24Go"
}
```

```json
{
  "message": "Liked successfully"
  }
```



### POST `/posts/:id/unlike`

Request Headers:

```js
{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNhbXBsZSIsImlhdCI6MTYyNzM4NDU2NSwiZXhwIjoxNjI3Mzg4MTY1fQ.4Jg1eZlWlNbzuvDow6gqkfoAa0CAq3z0ZBZ410n24Go"
}
```

```json
{
  "message": "Unliked successfully"
  }
```