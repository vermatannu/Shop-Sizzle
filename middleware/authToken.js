const jwt = require('jsonwebtoken');

async function authToken(req, res, next) {
    try {
        const token = req.cookies?.token;

        console.log("token", token);
        if (!token) {
            return res.status(401).json({
                message: "Please Login...!",
                error: true,
                success: false
            });
        }

        jwt.verify(token, process.env.TOKEN_SECRET_KEY, function(err, decoded) {
            if (err) {
                console.log("error auth", err);
                return res.status(401).json({
                    message: "Invalid token",
                    error: true,
                    success: false
                });
            }

            req.userId = decoded?._id;

            next();
        });
    } catch (err) {
        console.error("Auth token error:", err);
        res.status(500).json({
            message: "Internal server error",
            error: true,
            success: false
        });
    }
}

module.exports = authToken;
