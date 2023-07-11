import "reflect-metadata";
import { NextFunction, Request, Response } from "express";
import { inject, injectable } from "inversify";
import { BaseController } from "../common/base.controller";
import { LoggerService } from "../logger/logger.service";
import { IUserController } from "./users.controller.interface";
import { TYPES } from "../types";
import { UserLoginDTO } from "./dto/user-login.dto";
import { UserRegisterDTO } from "./dto/user-register.dto";
import { User } from "./user.entity";

@injectable()
export class UserController extends BaseController implements IUserController{
	constructor(@inject(TYPES.ILoggerService) private loggerService : LoggerService) {
		super(loggerService);
		this.bindRoutes([
			{path: '/register', method: 'post', func: this.register},
			{path: '/login', method: 'post', func: this.login}
		])
	}

	async login(req: Request<{}, {}, UserLoginDTO>, res: Response, next: NextFunction) {
		console.log(req.body);
		this.ok(res, 'loginEd');
	}

	async register({body} : Request<{}, {}, UserRegisterDTO>, res: Response, next: NextFunction): Promise<void> {	 
		const newUser = new User(body.email, body.name);
		await newUser.setPassword(body.password);
		this.ok(res, 'register');
	}
}