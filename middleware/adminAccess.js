export default function ({ store, redirect }) {
    // If the user is not authenticated
    if (store.state.auths.authUser.accountType === 2) {
      return redirect('/')
    }
  }