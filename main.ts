import "reflect-metadata";
import { App } from "./app";
import { ExceptionFilter } from "./errors/exception.filter";
import { LoggerService } from "./logger/logger.service";
import { UserController } from "./users/users.controller";
import { ILoggerService } from "./logger/logger.interface";
import { IUserController } from "./users/users.controller.interface";
import { TYPES } from "./types";
import { Container } from "inversify";

	const appContainer = new Container(); 
	appContainer.bind<ILoggerService>(TYPES.ILoggerService).to(LoggerService); 
	appContainer.bind<ExceptionFilter>(TYPES.ExceptionFilter).to(ExceptionFilter); 
	appContainer.bind<IUserController>(TYPES.IUserController).to(UserController); 
	appContainer.bind<App>(TYPES.Application).to(App);
	
	const app = appContainer.get<App>(TYPES.Application);
	app.init();

	export{app, appContainer};

