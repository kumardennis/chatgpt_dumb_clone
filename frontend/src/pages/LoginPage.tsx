import { auth_api } from "apis/auth.api";
import { UserModel } from "models/user.models";
import GoogleButton from "react-google-button";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
  const navigate = useNavigate();

  const handleUserLogin = async () => {
    const authWindow = window.open(
      "http://localhost:5000/auth/google",
      "_blank",
      "width=500,height=600"
    );

    const authWindowInterval = setInterval(async () => {
      try {
        if (authWindow?.closed) {
          clearInterval(authWindowInterval);

          await checkAuthState();
        }
      } catch (error) {
        console.log(error);
      }
    }, 1000);
  };

  const checkAuthState = async () => {
    const user = await auth_api.getUser();
    if (user.success) {
      setUserInSession(user);
      navigate("/chats/0");
    } else alert(user.error);
  };

  const setUserInSession = (user: UserModel) => {
    if (window && user.data) {
      sessionStorage.setItem("_user", JSON.stringify(user.data));
    }
  };

  return (
    <div className='login-btns-container'>
      <div className='brand-logo'>
        <h1 className='brand'>DumbGPT</h1>
      </div>

      <div className='login-body'>
        <h2>Get started</h2>
        <hr className='login-hr' />
        <GoogleButton onClick={handleUserLogin} />
      </div>

      <footer>
        <img
          alt='footer-logo'
          src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-7cS4w9LASQGVfZOMXjLxsol86TBCl88BABG71SgCn2qatrJY'
        />
      </footer>
    </div>
  );
};
