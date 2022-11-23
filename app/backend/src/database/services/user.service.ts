import UserModel from '../models/Users';

class UserService {
  private role = '';

  async getRole(email: string, password: string) {
    console.log(this.role);
    const [user] = await UserModel
      .findAll({ where: { email, password }, attributes: { exclude: ['password'] } });
    return user.role;
  }
}

export default UserService;
