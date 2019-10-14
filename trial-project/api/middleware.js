// (Asynchronous) If a callback is supplied, the callback is called with the err or the JWT.
// (Synchronous) Returns the JsonWebToken as string

const jwt = require('jsonwebtoken');

const JWT_SECRET = "jwt_secret_password";

// Step:1 check paramter value for x-access-token
// Step:2 check the token by decoing the same
// Step:3 Verify the secret key with the token we get from the post parameters
// Step:4 Throw the error if required
// Step:5 If token is valid then stor for the other requests
// Step:6 Also, returns the error if no token found while calling the API

module.exports = (req, res, next) => 
{
    var token = req.body['x-access-token'] || req.query['x-access-token'] || req.headers['x-access-token'];
    if (token) 
    {
        jwt.verify(token, JWT_SECRET, function(err, decoded) 
        {
            if (err) 
            {
                return res.status(403).send({ 
                    success: false, 
                    message: 'Failed to authenticate token.' 
                });
            } 
            else 
            {
                req.decoded = decoded;
                next();
            }
        });
    } 
    else 
    {
        return res.status(401).send({
            success: false,
            message: 'No token provided.'
        });
    }
};