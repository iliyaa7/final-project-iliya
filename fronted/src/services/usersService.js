import { users } from '../utils/consts'


class UserService {
  constructor({ userArray }) {
    this._userArray = userArray;
  }


  signin(submitedUserPhone) {
    const user = this._userArray.find((user) => {
      return user.phone === submitedUserPhone
    });
    if (!user) throw new Error('no user with this pone number')
    return user;
  }

}
const UserPhoneService = new UserService({
  userArray: users
});

export default UserPhoneService


