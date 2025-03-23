const jwt = require("jsonwebtoken");
const cookie = require("cookie");

const adminAuthToken = async (req, res, next) => {
  try {
    
    const token = req.body.userToken;
    
    

    if (!token) {
      return res.status(200).json({
        message: "Admin Not Logged In",
        error: true,
        success: false,
      });
    }

    // Verify token
    jwt.verify(token, process.env.ADMIN_TOKEN_SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(200).json({
          message: "Invalid or Expired Token",
          error: true,
          success: false,
        });
      }

      req.id = decoded._id; // Attach admin ID to request object
      next(); 
    });
  } catch (err) {
    res.status(200).json({
      message: err.message || "Internal server error",
      error: true,
      success: false,
    });
  }
};

module.exports= adminAuthToken; 
