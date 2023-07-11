import "reflect-metadata";
import express, {Express} from 'express';
import {Server} from 'http';
import { inject, injectable } from 'inversify';
import { ExceptionFilter } from './errors/exception.filter.js';
import { LoggerService } from './logger/logger.service.js';
import { UserController } from './users/users.controller.js';
import { TYPES } from "./types.js";
import { json } from "body-parser";

@injectable()
export class App {
	app: Express;
	server: Server;
	port: number;
	logger: LoggerService;
	userController: UserController;
	exceptionFilter : ExceptionFilter;

	constructor(@inject(TYPES.ILoggerService) logger: LoggerService,@inject(TYPES.IUserController) userController: UserController, @inject(TYPES.ExceptionFilter) exceptionFilter : ExceptionFilter) {
		this.app = express();
		this.port = 8000;
		this.logger = new LoggerService();
		this.userController = userController;
		this.exceptionFilter = this.exceptionFilter;
	}

	useMiddleware() : void { //Нужен для обработки body в request (JSON формат)
		this.app.use(json());
	}

	useRouts() : void {
		this.app.use('/users', this.userController.router);
	}

	// useExceptionFilters() {
	// 	this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
	// }


	public async init() {
		this.useMiddleware();
		this.useRouts();
		// this.useExceptionFilters();
		this.server = this.app.listen(this.port);
		this.logger.log(`Сервер запущен на http://localhost:${this.port}`);
	}
}