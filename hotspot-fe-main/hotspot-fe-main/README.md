# To install the npm packages for the repo:
```npm install --force```
# To run the project:
```npm run dev```
# To open the website:
```localhost:5173```

# Hotspot

Hotspot is a comprehensive event management application, built using a stack that includes MongoDB, Flask, Python, React, and Bootstrap. 

## Architecture

The architecture of this application is separated into three main components: 

1. Model (`model.py`) in `hotspot-be`
2. Controller (`app.py`) in `hotspot-be`
3. View (`hotspot-fe`)

## Database

We use a non-relational MongoDB database with two collections: `Users` and `Events`.

## Backend

The backend is written in Python, utilizing Flask as the web framework. There are nine API routes for various operations.

## Frontend

The frontend is built using React and foundational Bootstrap. We have not used React Bootstrap but instead opted for components from Bootstrap directly. The frontend consists of five main pages.

## Authentication

We have integrated JWT token authentication for secure user sessions. The token from JWT is used as a cookie to maintain the user's session. This feature is essential for our project as it provides user authentication for login, and it allows users to delete their own events.

We have also integrated Google authentication. You can check this feature on the login page.

## Readme Updates

The backend and frontend README is up-to-date.

## Bonuses

In addition to the main features, we have also integrated some bonus features like Google authentication and JWT session management for enhanced user experience and security.

## Future Improvements

We are project-specific, which means we are continuously looking to improve and expand on the existing functionalities. All future updates will be documented and communicated in the README files for both frontend and backend. 

Please feel free to test our application and provide us with your valuable feedback.