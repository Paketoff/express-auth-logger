import "reflect-metadata";
import { Response, Router } from "express";
import { inject, injectable } from "inversify";
import { LoggerService } from "../logger/logger.service";
import { IControllerRoute } from "./route.interface";
import { TYPES } from "../types";
export { Router } from 'express';

@injectable()
export abstract class BaseController {
	private readonly _router: Router; // _ для обозначения что будем для этой хни делать get+set
	constructor(@inject(TYPES.ILoggerService) private logger: LoggerService) { //для логгирования работы инстанса класса
		this._router = Router();	//инициализация
	}

	get router() {
		return this._router;
	}

	public created(res: Response) {
		return res.sendStatus(201); 
	}

	public send<T>(res: Response,code:number, message: T) {
		res.type('application/json');
		return res.status(code).json(message);
	}

	public ok<T>(res: Response, message: T) {
		return	this.send<T>(res, 200, message);
	}

	protected bindRoutes(routes: IControllerRoute[]) {
		for(const route of routes) {
			this.logger.log(`[${route.method}] ${route.path}`); //показываем, какой метод роутера забинден на какой путь
			const handler = route.func.bind(this); //сохраняем контекст передаваемой функции
			this.router[route.method](route.path, handler); 
		}
		
	}
}