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

Request Body:

```json
{
  "username": "string",
  "email": "string",
  "password": "string"
}
```

Response Object:

```json
{
  "_id": "ObjectID",
  "picture": "string",
  "following": "array",
  "followers": "array",
  "username": "string",
  "email": "string",
  "password": "hash",
  "__v": "number"
}
```

OPTIONAL: Profile picture can be sent using multipart/form-data content-type and sending a FormData in the body

### POST `/auth/signin`

Request Headers:

```js
{
  "Content-Type": "application/json"
}
```

Request Body:

```json
{
  "username": "string",
  "password": "string"
}
```

Response Object:

```json
{
  "access_token": "string",
  "refresh_token": "string"
}
```

### POST `/auth/signout/`

Request Headers:

```js
{
  "Authorization": "Bearer <access_token>"
}
```

Response Object: 

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

Request Body:

```json
{
  "refresh_token": "<refresh-token>"
}
```

Response Object:

```json
{
  "access_token": "string"
}
```

### GET `/me`

Request Headers:

```js
{
  "Authorization": "Bearer <access_token>"
}
```

Response Object:

```json
{
  "_id": "ObjectID",
  "picture": "string",
  "following": "array",
  "followers": "array",
  "username": "string",
  "email": "string",
  "password": "hash",
  "__v": "number"
}
```

### GET `/image/:filename`

Response: image file