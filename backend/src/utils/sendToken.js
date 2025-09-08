const sendToken = async (res, user, message, statusCode = 200) => {
  const token = user.getJWTToken();

  const options = {
    expires: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // 10 days
    httpOnly: true,
    sameSite: "strict", // fixed typo
    secure: process.env.NODE_ENV === "production", // only true in production
  };

  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({
      success: true,
      message,
      user,
      token, 
    });
};

module.exports = sendToken;
