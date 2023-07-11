import { UserLoginDTO } from "./dto/user-login.dto";
import { UserRegisterDTO } from "./dto/user-register.dto";
import { User } from "./user.entity";
import { IUserService } from "./users.service.interface";

export class UserService implements IUserService {
 createUser: (dto: UserRegisterDTO) : User | null {
	 return null;
 };

 validateUser: (dto: UserLoginDTO) : boolean {
	 return true;
 };
}