import firebase from 'firebase/app';
import 'firebase/auth';

import { Card } from 'primereact/card';
import { Avatar } from 'primereact/avatar';
import { useAuthState } from 'react-firebase-hooks/auth';
import IncidentsList from '../components/IncidentsList';

const navbar = (user: firebase.User | null | undefined) => (
  <div
    className="p-d-flex p-jc-end p-ai-center"
    style={{
      height: '60px',
      width: '100%',
      backgroundColor: 'rgb(7,200,200)',
      borderRadius: '9px 9px 0px 0px',
      paddingRight: '15px',
    }}
  >
    {user?.photoURL ? (
      <>
        <h2 style={{ marginRight: '10px', color: 'white' }}>
          {user.displayName}
        </h2>
        <Avatar image={user.photoURL} shape="circle" size="large" />
      </>
    ) : (
      <Avatar icon="pi pi-user" shape="circle" size="large" />
    )}
  </div>
);

const Home: React.FC = () => {
  const [user] = useAuthState(firebase.auth());

  return (
    <div
      style={{ height: '100vh', width: '100vw' }}
      className="p-d-flex p-jc-center p-ai-center"
    >
      <Card
        header={navbar(user)}
        style={{
          width: 'calc(100% - 50px)',
          height: 'calc(100% - 50px)',
          backgroundColor: 'white',
          borderRadius: '10px',
        }}
      >
        <main>
          <IncidentsList />
        </main>
      </Card>
    </div>
  );
};

export default Home;
