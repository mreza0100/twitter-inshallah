export const trueOK = /*just for memory saving :)*/ true;
export const falseOK = /*just for memory saving :)*/ false;

export const __IS_DEV__ = process.env.NODE_ENV === "dev";
export const PORT = process.env.PORT || 10000;
export const SECRET_KEY = "@*!###@dkaaAWDwfkai2wDWA@@@adad?2WN@@KFNHJAKWAA";
export const delayTime = 0;
export const COOKIE_NAME = "qid";
export const FORGET_PASSWORD_PREFIX = "forget-password:";
export const FRONT_END_URL = __IS_DEV__ ? "http://localhost:8000" : "";
export const DELETE_DB = __IS_DEV__ && false;
