import UserModel from '../models/Users';

class UserService {
  public getUser = async (email: string) => {
    const user = await UserModel.findOne({ where: { email } });
    return user;
  };
}

export default UserService;
