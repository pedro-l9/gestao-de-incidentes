import firebase from 'firebase/app';
import 'firebase/auth';

import { Card } from 'primereact/card';
import { useAuthState } from 'react-firebase-hooks/auth';
import { IncidentsList, Navbar } from '../../components';

import './Home.css';

function Home() {
  const [user] = useAuthState(firebase.auth());

  return (
    <div
      style={{ height: '100vh', width: '100vw' }}
      className="p-d-flex p-jc-center p-ai-center"
    >
      <Card header={Navbar(user)}>
        <IncidentsList />
      </Card>
    </div>
  );
}

export default Home;
