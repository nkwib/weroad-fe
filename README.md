

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

# How to use
After running the backend server, start the frontend server with `npm run dev` and navigate to `localhost:5173` in your browser. You'll have a paginated list of travels, and you can click on each one to see more details and the tour associated with it.

# Notes
- error handling is not implemented
- the frontend is not much responsive
- I'm sure the store could be improved, but it's my first time using Vue and Vuex
- buttons for admin and editor are only seen by the them and I've implemented some protection on the routes.
- I've implemented the simplest pagination possible.
- There are a couple of bugs with the retrieval of the tours that could be fixed by working on the store but since this is a test I didn't want to spend too much time on it. I'd rather learning the basics of Vue and Vuex and then improve my skills without rushing.
- The default admin user is `admin`. The password is: `password`.
- In order to create a user you have to decide a password that is not possible to change. But it was not required to implement a password change functionality though it would have been easy to do.