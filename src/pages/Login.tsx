import firebase from 'firebase/app';

const Login: React.FC = () => {
  const signInWithGoogle = () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(googleProvider);
  };

  return <button onClick={signInWithGoogle}>Login</button>;
};

export default Login;
