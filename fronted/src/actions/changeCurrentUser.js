export default function changeCurrentUser(currentUser) {
  return { type: 'CHANGE_CURRENTUSER', payload: currentUser}
}