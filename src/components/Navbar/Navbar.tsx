import firebase from 'firebase/app';
import { Avatar } from 'primereact/avatar';
import { Button } from 'primereact/button';

import './Navbar.css';

function Navbar(user: firebase.User | null | undefined) {
  return (
    <header>
      <h1>Gestão de Incidentes</h1>
      <div className="user-details">
        {user?.displayName && user?.photoURL ? (
          <>
            <h3>{user.displayName}</h3>
            <Avatar image={user.photoURL} shape="circle" size="large" />
          </>
        ) : (
          <Avatar icon="pi pi-user" shape="circle" size="large" />
        )}
        <Button
          icon="pi pi-sign-out"
          className="p-button-danger p-button-raised"
          onClick={() => firebase.auth().signOut()}
        />
      </div>
    </header>
  );
}

export default Navbar;
