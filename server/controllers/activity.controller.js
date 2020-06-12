const { Activity } = require('../models/activity.model');

module.exports.index = (request, response) => {
    response.json({
        message: "Hello World"
    });
}

module.exports.getAll = (request, response) => {
    Activity.find({}).sort("-date").exec()
        .then(activities => {
            response.json(activities)
        })
        .catch(err => response.json(err));
}

module.exports.getOne = (req, res) => {
    Activity.findOne({"_id": req.params._id})
        .then(activity => res.json(activity))
        .catch(err => res.json(err))
}

module.exports.create = (request, response) => {
    const { type, date, amount, units } = request.body;
    Activity.create({
        type,
        date,
        amount,
        units
    })
        .then(activity => response.json(activity))
        .catch(err => response.json(err));
}

module.exports.update = (req, res) => {
    Activity.findByIdAndUpdate({_id: req.params.id}, req.body, {runValidators: true})
        .then(updateActivity => res.json(updateActivity))
        .catch(err => res.json(err));
}

module.exports.delete = (req, res) => {
    Activity.findByIdAndDelete({_id: req.params.id})
        .then(deleteConfirm => res.json(deleteConfirm))
        .catch(err => res.json(err));
}