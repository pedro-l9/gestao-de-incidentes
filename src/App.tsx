import firebase from 'firebase/app';

import { useAuthState } from 'react-firebase-hooks/auth';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';

const firebaseConfig = {
  apiKey: 'AIzaSyAHs9Vt-ByLoZxak-t1IP8cp7kcS2M4VPo',
  authDomain: 'gestao-de-incidentes.firebaseapp.com',
  projectId: 'gestao-de-incidentes',
  storageBucket: 'gestao-de-incidentes.appspot.com',
  messagingSenderId: '346065517920',
  appId: '1:346065517920:web:e9c873fda20c05bfb4f205',
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

function App() {
  const [user, userIsLoading] = useAuthState(auth);

  return userIsLoading ? (
    <div
      className="p-d-flex p-jc-center p-ai-center"
      style={{ height: '100vh', width: '100vw', boxSizing: 'border-box' }}
    >
      <i
        className="pi pi-spin pi-spinner"
        style={{ fontSize: '2em', color: 'white' }}
      ></i>
    </div>
  ) : (
    <Router>
      <Switch>
        <Route exact path="/">
          <div>
            <section>{user ? <Home /> : <Login />}</section>
          </div>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
