import { useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import { Card } from 'primereact/card';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Toast } from 'primereact/toast';

import { IncidentDialog, IncidentsList, Navbar } from '../../components';
import './Home.css';
import { Incident } from '../../components/IncidentsList/interfaces';

interface Props {
  toastRef: React.RefObject<Toast>;
}

function Home({ toastRef }: Props) {
  const [user] = useAuthState(firebase.auth());
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [selectedIncident, setSelectedIncident] = useState<
    Incident | undefined
  >();
  const [canEditIncident, setCanEditIncident] = useState(true);

  function onDialogClose() {
    setSelectedIncident(undefined);
    setDialogOpen(false);
  }

  function createNewIncident() {
    setCanEditIncident(true);
    setDialogOpen(true);
  }

  function viewIncident(incident: Incident) {
    setSelectedIncident(incident);
    setCanEditIncident(false);
    setDialogOpen(true);
  }

  return (
    <div
      style={{ height: '100vh', width: '100vw' }}
      className="p-d-flex p-jc-center p-ai-center"
    >
      <Card header={Navbar(user)}>
        <IncidentDialog
          onDialogClose={onDialogClose}
          selectedIncident={selectedIncident}
          canEdit={canEditIncident}
          isDialogOpen={isDialogOpen}
          toastRef={toastRef}
        />
        <IncidentsList
          selectedIncident={selectedIncident}
          createNewIncident={createNewIncident}
          viewIncident={viewIncident}
        />
      </Card>
    </div>
  );
}

export default Home;
