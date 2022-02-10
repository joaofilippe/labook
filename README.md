# Labook
The Labook API provides a REST API to implements a social-media application.

Technologies, languages and frameworks:

- TypeScript;
- NodeJS;
- ExpressJS;
- Knex;
- MySQL;



### Install

To install this API run the script:

`
npm install
`

### Run Migrations:

- To create the tables used in this project, run the scripts:

    ```
    npm run migrations:users create
    npm run migrations:posts create
    ```

- To drop those tables, run the scripts:

    ```
    npm run migrations:users drop
    npm run migrations:posts drop
    ```


- To check if those tables exists, run the scripts:

    ```
    npm run migrations:users check
    npm run migrations:posts check
    ```


### Run the API

To run this API you must have run the script:

`
npm run start
`

### Run the Tests

To get acess to the tests run the script:

`
npm run test
`

## REST API
### Url:
#### 1- Root URL:

 - http://localhost:3006/

#### 2 - Users URL:

 - http://localhost:3006/users/

 - `Signup`: http://localhost:3006/users/signup

    - Method: `POST`;

    - Body (JSON):

        ```
        {
            "name": "name";
            "email": "email";
            "password" : "password"
         } 
         ```

    - No Headers;

    - Return:
        ```
        {
            message: 'Sucess',
            token: jwtToken
        }
        ```

- `Login`: http://localhost:3006/users/login

    - Method: `POST`;

    - Body (JSON):

        ```
        {
            "name": "name";
            "email": "email";
            "password" : "password"
         } 
         ```

    - No Headers;

    - Return:
        ```
        {
            "message": "Sucess",
            "token": jwtToken
        }
        ```

#### 3 - Posts URL:
 - http://localhost:3006/posts/

 - `Create Post`: http://localhost:3006/posts/create

    - Method: `POST`;

    - Body (JSON):

        ```
        {
            "photo": "photo_url";
            "description": "text";
            "type" : "event/normal"
         } 
         ```

    - Headers:

        ```
        {
            Authorization: 
                {
                    "token": jwtToken
                }
            } 
        ```

- `Get By Id`: http://localhost:3006/posts/login/:id

    - Method: `GET`;

    - Params(`id`): post id  
    
    - Headers:

        ```
        {
            Authorization: 
                {
                    "token": jwtToken
                }
            } 
        ```
