# miniNetflix
## Project - miniNetflix

## Overview 
- In this miniNetflix project any authenticated and subscribed user can able to see movies list and can access perticular movie details by clicking on it.
- And also if we  click on a specific movie we will get Recommended movie on the basis of that movie.


# Backend


### Key points

- This project consist 8 Apis .
- I used MySql as a Database.
- I have implemented content based movie recommendation system ( content is  movies's overview)







## User APIs 
- POST /user
- POST /login
- POST /checkEmail (this api is to check the email id enterd by the user is authenticated or not if it is authenticated then user will be on SignIn Page other user will be on SignUp page)

## subscription API
- PUT /subscription ( if user is not subscribed user then user will not be able to watch movies section and it will redirect to the subscrition plan page and use can able choose their plan according to interest and after that we will update the endOdSubs key inside user Profile data that key consist time epoch time)

## movies APIs
- GET /movies (this api is to fetch  movies with categorisation  )
- GET  /movieById/:id ( fetch specific movie so that we can watch it or can see the movie overview)
- POST  /getRecommendedMovies (this api is to fetch recommended movies and recommended movies list that will get from ML model on the basis of similarities of movies's overview and similarities i found by cosine distance )
- POST  /searcg ( this api is for fetching the data on the basis of searching string and match with Title of movies with Regex)


# Movie Recommendation System

- this is content based movie recommendation system
- first i have preprocessed the movies overview data by using nltk library of python ( removing punctuation,st0p words etc)
- then i vectorized that preprocessed movies overview data by using sklearn library of python
- then counted distance between vectors with cosine distance not with euclidean distance
- then on the basis of distance we can make similarities between them.






# FrontEnd

- For FrontEnd i used React.js

## Components that i have used to buld frontend for miniNetflix
- Start ( If user is not Logged In then he/she will get start page where on that user can login or signUp)
- SignIn
- SignUp 
- Subscrition ( if user is subscribed user then user will be on Subscription component)
- Movies ( After completing Authentication  and subscription user able to see movies section)
- WatchMovie ( after clicking on a specific movie user will be on this Component with recommendation movies list)







