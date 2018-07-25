export default function ({
  store,
  redirect
}) {
  // check already authenticated via cookie (unsafe version)
  if (!store.state.auth.user) {
    // install default headers
    // TODO
    return redirect('/login');
  }
}
