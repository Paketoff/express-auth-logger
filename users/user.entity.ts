import { hash } from "bcryptjs";

export class User {
	constructor(private readonly _email : string,
	private readonly _name : string) {

	}

	get email() {
		return this._email;
	}

	get name() {
		return this._name;
	}

	public async setPassword (pass: string) {

	}
}