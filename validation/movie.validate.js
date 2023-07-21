module.exports.movieValidate = (req, res, next) => {
    let errors = [];

    if(!req.body.title) {
        errors.push('Title is required');
    }

    if(!req.body.year) {
        errors.push('Year is required');
    }
    if(!req.body.cast) {
        errors.push('Cast is required');
    }
    if(!req.body.genres) {
        errors.push('Genres is required');
    }

    if(!req.body.href) {
        errors.push('Href is required');
    }
    
    if(!req.body.extract) {
        errors.push('Extract is required');
    }

    if(errors.length > 0) {
        return res.status(400).json({
            msg: errors
        });
    }

    next();
}