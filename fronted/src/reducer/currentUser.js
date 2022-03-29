export default function currentUser(state = '', action) {
  switch (action.type) {
    case 'CHANGE_CURRENTUSER':
      return action.payload;
    default:
      return state;
  }
}