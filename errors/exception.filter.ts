import "reflect-metadata";
import { NextFunction, Request, Response } from "express";
import { inject, injectable } from "inversify";
import { LoggerService } from "../logger/logger.service";
import { ILoggerService } from "../logger/logger.interface";
import { IExceptionFilter } from "./exception.filter.interface";
import { HTTPError } from "./http-error.class";
import { TYPES } from "../types";


@injectable()
export class ExceptionFilter implements IExceptionFilter {
	constructor(@inject(TYPES.ILoggerService) private logger: ILoggerService) {}

	catch(err: Error | HTTPError, req: Request, res:Response, next: NextFunction) {
		if(err instanceof HTTPError) {
			this.logger.error(`[${err.context}] Ошибка ${err.statusCode} : ${err.message}`);
			res.status(err.statusCode).send({ err: err.message});
		}
		else {
			this.logger.error(`${err.message}}`);
			res.status(500).send({ err: err.message});
		}
		
	}
}