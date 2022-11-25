import UserModel from '../models/Users';

class UserService {
  private role = '';

  async getUser(email: string) {
    console.log(this.role);
    const user = await UserModel.findOne({ where: { email } });
    return user;
  }
}

export default UserService;
