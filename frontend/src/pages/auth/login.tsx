import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { loginAsync, selectAuth } from '../../store/slices/authSlice';
import styles from './auth.module.scss';
import Logo from '../../assets/images/title.png';
import BackgroundImage from '../../assets/images/background.jpg';

export function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { error } = useAppSelector(selectAuth);

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    const email = event.currentTarget.email.value;
    const password = event.currentTarget.password.value;
    setLoading(true);

    dispatch(loginAsync({ email, password }))
      .unwrap()
      .then(() => {
        setLoading(true);
        navigate('/');
        window.location.reload();
      })
      .catch(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <main
        className={styles.body}
        style={{
          backgroundImage: `url(${BackgroundImage})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover'
        }}
      >
        <div>
          <img src={Logo} className={styles.logoImage} />
          <div className={styles.loginBox}>
            <div className={styles.title}>Login</div>
            <div className={styles.error}>{error}</div>
            <form onSubmit={handleSubmit}>
              <input
                className={styles.loginInput}
                type="text"
                name="email"
                placeholder="Email"
                required
              ></input>
              <input
                className={styles.loginInput}
                type="password"
                name="password"
                placeholder="Password"
                required
              ></input>
              <button className={styles.loginButton}>Log in</button>
              <div className={styles.linkText}>
                Don’t have an account yet?{' '}
                <Link className={styles.link} to="/auth/register">
                  Sign up
                </Link>
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}
