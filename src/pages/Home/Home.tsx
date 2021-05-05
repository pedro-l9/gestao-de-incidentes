import { useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import { Card } from 'primereact/card';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Toast } from 'primereact/toast';

import { IncidentDialog, IncidentsList, Navbar } from '../../components';
import './Home.css';

interface Props {
  toastRef: React.RefObject<Toast>;
}

function Home({ toastRef }: Props) {
  const [user] = useAuthState(firebase.auth());
  const [isDialogOpen, setDialogOpen] = useState(false);

  return (
    <div
      style={{ height: '100vh', width: '100vw' }}
      className="p-d-flex p-jc-center p-ai-center"
    >
      <Card header={Navbar(user)}>
        <IncidentDialog
          isDialogOpen={isDialogOpen}
          setDialogOpen={setDialogOpen}
          toastRef={toastRef}
        />
        <IncidentsList
          createNewIncident={() => setDialogOpen(true)}
          viewIncident={() => setDialogOpen(true)}
          editIncident={() => setDialogOpen(true)}
        />
      </Card>
    </div>
  );
}

export default Home;
