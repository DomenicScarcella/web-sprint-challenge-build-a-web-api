// Write your "projects" router here!
const express = require('express');

const Project = require('./projects-model.js');
const { validateProject, validateProjectId } = require('../middleware/mw.js');

const router = express.Router();

router.get('/', (req, res, next) => {
    Project.get()
        .then(project => {
            res.status(200).json(project);
        })
        .catch(next);
});

router.get('/:id', validateProjectId, (req, res) => {
    res.status(200).json(req.project);
});

router.post('/', validateProject, (req, res, next) => {
    Project.insert(req.body)
        .then(newProject => {
            res.status(201).json(newProject);
        })
        .catch(next);
});

router.put('/:id', validateProjectId, validateProject, (req, res, next) => {
    Project.update(req.params.id, req.body)
        .then(project => {
            res.status(200).json(project);
        })
        .catch(next);
});

router.delete('/:id', validateProjectId, async (req, res, next) => {
    try {
        await Project.remove(req.params.id)
        res.json(req.body)
    } catch {
        next();
    }
});

router.get('/:id/actions', validateProjectId, (req, res, next) => {
    Project.getProjectActions(req.params.id)
        .then(allActions => {
            res.status(200).json(allActions);
        })
        .catch(next);
});

router.use((err, req, res, next) => {
    res.status(err.status || 500).json({message: err.message, stack: err.stack});
});

module.exports = router;