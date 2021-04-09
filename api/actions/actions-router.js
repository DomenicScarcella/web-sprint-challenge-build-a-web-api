// Write your "actions" router here!
const express = require('express');

const Action = require('./actions-model.js');
const { validateAction, validateActionId } = require('../middleware/mw.js');

const router = express.Router();

router.get('/', (req, res, next) => {
    Action.get(req.query)
        .then(action => {
            res.status(200).json(action);
        })
        .catch(next);
});

router.get('/:id', validateActionId, (req, res) => {
    res.status(200).json(req.action);
});

router.post('/', validateAction, (req, res, next) => {
    Action.insert(req.body)
        .then(newAction => {
            res.status(201).json(newAction);
        })
        .catch(next);
});

router.put('/:id', validateActionId, validateAction, (req, res, next) => {
    Action.update(req.params.id, req.body)
        .then(action => {
            res.status(200).json(action);
        })
        .catch(next);
});

router.delete('/:id', validateActionId, async (req, res, next) => {
    try {
        await Action.remove(req.params.id)
        res.json(req.body)
    } catch {
        next();
    }
});

router.use((err, req, res, next) => {
    res.status(err.status || 500).json({message: err.message, stack: err.stack});
});

module.exports = router;