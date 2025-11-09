This project is broken down into two directories, backend and frontend respectively. The backend directory contains the logic for the Go based API while the frontend contains the NextJS React based UI. 

This project allows users to see a trending movies list fetched from TMDB API and then favorite movies from that fetched list. Favorites are stored locally via local storage. The trending movie list and movie details are both cached to the browser and TMDB responses are also cached for a short time in the Go backend.

For set up instructions and additional information regarding both the backend and frontend, see the README files located in each respective directory (`/frontend` & `/backend`)