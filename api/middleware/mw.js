const Action = require('../actions/actions-model.js');
const Project = require('../projects/projects-model.js');

// const logger = (req, res, next) => {
//     const timestamp = new Date().toLocaleString();
//     const method = req.method;
//     const url = req.originalUrl;
//     console.log(`[${timestamp}] ${method} to ${url}`);
//     next();
// };

const validateAction = (req, res, next) => {
    const action = req.body;
    if (!action.project_id || !action.description || !action.notes) {
        res.status(400).json({message: 'project id, description, notes are required fields'});
    } else {
        next();
    }
};

const validateActionId = async (req, res, next) => {
    try {
        const action = await Action.get(req.params.id);
        if (!action) {
            res.status(404).json({message: 'not found'})
        } else {
            req.action = action;
            next();
        }
    } catch(err) {
        res.status(500).json(err.message);
    };
};

const validateProject = (req, res, next) => {
    const p = req.body;
    if (!p.name || !p.description) {
        res.status(400).json({message: 'name and description are required fields'});
    } else {
        next();
    }
};

const validateProjectId = async (req, res, next) => {
    try {
        const project = await Project.get(req.params.id);
        if (!project) {
            res.status(404).json({message: 'not found'})
        } else {
            req.project = project;
            next();
        }
    } catch(err) {
        res.status(500).json(err.message);
    };
};

module.exports = {
    // logger,
    validateAction,
    validateActionId,
    validateProject,
    validateProjectId
}