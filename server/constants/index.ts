export const logLevels = {
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    verbose: 4,
    severity: 5,
    silly: 6,
  },
  colors: {
    error: "red",
    warn: "yellow",
    info: "green",
    http: "green",
    verbose: "blue",
    severity: "purple",
    silly: "purple",
  },
};

export const HTTP_RESPONSE_CODE = {
  NOT_FOUND: 404,
  CREATED: 201,
  CONFLICT: 409,
  TOO_MANY_REQUEST: 429,
  BAD_REQUEST: 400,
  OK: 200,
  UNAUTHORIZED: 401,
  SERVER_ERROR: 500,
  FORBIDDEN: 403,
};

export const enum HttpStatusCode {
  NOT_FOUND = 404,
  CREATED = 201,
  CONFLICT = 409,
  TOO_MANY_REQUEST = 429,
  BAD_REQUEST = 400,
  SUCCESS = 200,
  UNAUTHORIZED = 401,
  SERVER_ERROR = 500,
  FORBIDDEN = 403,
}

export const APP_MESSAGE = {
  // general
  serverError: "An unexpected error occured. Please try again later.",
  success: "Success",
  missingRequiredFields: "Missing required fields.",

  // token
  tokenExpired: "Token expired. Please request a new one.",
  noRefreshToken: "No refresh token provided.",
  invalidRefrehToken: "Invalid refresh token.",
  newTokenCreated: "New access token successfully created.",
  invalidToken: "Token provided is invalid.",
  tokenValidated: "Token is valid.",
  accessTokenExpired: "Token expired. Please sign in again.",

  //email
  resetEmailSent: "A link has been sent to your email address.",
  resetEmailAlreadySent:
    "Link has already been sent to your email address. Please check your email.",

  // auth
  duplicatedUser: "User with these credentials already exists.",
  userSignedUp: "User successfully signed up.",
  invalidCredentials: "Invalid email or password.",
  userSignedIn: "User successfully signed in.",
  userUnauthorized: "Unauthorized. Please sign in to access this resource.",
  userSignedOut: "User successfully signed out.",
  passwordResetted: "Reset password successful.",

  // user
  userNotFound: "User not found.",

  // room
  roomCreated: "Room successfully created.",

  //friend
  friendRequestSent: "Friend request successfully sent.",
  friendAccepted: "Friend request updated successfully.",
};
