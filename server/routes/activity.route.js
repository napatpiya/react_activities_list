const ActivityController = require('../controllers/activity.controller');
const UserController = require('../controllers/user.controller');

module.exports = function(app){
    app.post('/api/register', UserController.register);
    app.post('/api/login', UserController.login);
    
    app.get('/api', ActivityController.index);
    app.post('/api/activities', ActivityController.create);
    app.get('/api/activities', ActivityController.getAll);
    app.get('/api/activities/:_id', ActivityController.getOne);
    app.put('/api/activities/:id', ActivityController.update);
    app.delete('/api/activities/:id', ActivityController.delete);
}