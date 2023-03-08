const controller = require('../controllers/notes.controller')

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            'Access-Control-Allow-Headers',
            'Authorization, Origin, Content-Type, Accept'
        );
        next();
    })

    app.get('/api/user/notes', controller.getUserNotes)

    app.post('/api/user/notes', controller.postUserNote)

    app.put('/api/user/notes/:id', controller.updateUserNote)

    app.delete('/api/user/notes/:id', controller.deleteUserNote)
}