
# api rest files
in this project we have two model
    1:student model(which contains the information of the student and a n image which will store in the cloudinary)
    2:course model
    this model contain the information about a course and a profe img also stored in the cloudinary in curso folder
## Deployment

To deploy this project run

```bash
  npm run dev
```


## API Reference

#### getstudent

http://localhost:3000/api/v1/students/
  
```


#### createstudent

http://localhost:3000/api/v1/students/
```


#### updatestudent

http://localhost:3000/api/v1/students/id

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of the student  to update
#### deletestudent

http://localhost:3000/api/v1/students/id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of the student to delete
#### get curso

```http://localhost:3000/api/v1/curso/

createcurso

`http://localhost:3000/api/v1/curso/

```

#### updatecurso

http://localhost:3000/api/v1/curso/id

```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of curso to update
#### deletecurso

`http://localhost:3000/api/v1/curso/id


```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of cursoto delete  |