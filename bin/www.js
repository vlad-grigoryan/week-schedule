const app = require('../app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, error => {
    error
        ? console.error(error)
        : console.info(`==> 🌎 Listening on port ${PORT}. Visit http://localhost:${PORT}/ in your browser.`)
});
