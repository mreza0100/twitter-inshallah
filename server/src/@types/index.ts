import { Request, Response } from "express";
import { Redis } from "ioredis";

export type SessionT = Express.Session & { userId?: number };

export interface CustomReqT extends Request {
	session: SessionT;
}

export type GraphCTXT<MaybeUserID = number> = {
	req: CustomReqT;
	res: Response;
	userId: MaybeUserID;
	session: SessionT;
	redis: Redis;
};
export type AnyFuncT = (...args: Array<any>) => any;
