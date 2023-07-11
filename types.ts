//файл который нужен для сбора ключей для DI с помощью библиотеки reflect-metadata

export const TYPES = {
	Application: Symbol.for('Application'),
	ILoggerService: Symbol.for('ILoggerService'),
	IUserController: Symbol.for('IUserController'),
	IUserService: Symbol.for('IUserService'),
	ExceptionFilter: Symbol.for('ExceptionFilter')
}