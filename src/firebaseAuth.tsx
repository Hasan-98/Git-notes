import { getAuth, signInWithPopup, GithubAuthProvider } from "firebase/auth";
import './firebase';
import useAuthStore from './store/authStore';

const provider = new GithubAuthProvider();
provider.addScope("gist");

const auth = getAuth();

const LoginWithGithub = async () => {
  try {
    const result = await signInWithPopup(auth, provider);

    const credential = GithubAuthProvider.credentialFromResult(result);
    const token = credential?.accessToken;
    if (!token) throw new Error("Token missing");
    console.log('---------------')
    console.log(result)
    console.log('---------------')
    
    const user = {
      name: result.user.displayName,
      avatar_url: result.user.photoURL,
      html_url: result.user.reloadUserInfo?.providerUserInfo?.[0]?.photoUrl ?? '',
      email: result.user.email,
      user_name: result.user.reloadUserInfo?.providerUserInfo?.[0]?.screenName,
      ...result,
    };

    console.log('user', user)
    const { login } = useAuthStore.getState();
    login(token, user);

    return { token, user };
  } catch (error) {
    console.error("Login error:", error);
    return null;
  }
};

export default LoginWithGithub;
