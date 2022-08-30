import jwt, { decode } from "jsonwebtoken";

const auth = async (req, res, next) => {
  const token = req.headers.authorization?.split("Bearer ")[1];
  const isCustomAuth = token?.length < 500;
  try {
    let decodedData;

    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

      req.userId = decodedData?.id;
    } else {
      decodedData = jwt.decode(token);

      req.userId = decodedData?.sub;
    }

    next();
  } catch (error) {
    console.log(error);
  }
};

export const signRefreshToken = (req) => {
  try {
    const getToken = req.cookies.refreshToken;
    if (getToken) {
      const { id } = jwt.verify(getToken, process.env.REFRESH_TOKEN_SECRET);
      const accesssToken = jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "90d",
      });
      return { accesssToken };
    }
  } catch (err) {
    console.log(err);
  }
};

export default auth;
