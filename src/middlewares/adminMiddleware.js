function adminMiddleware(req, res, next) {
    if(req.session.userLogged){
        if(req.session.userLogged.isAdmin == false){
            return res.redirect('/')
        }
    }
    next();
}

module.exports = adminMiddleware;