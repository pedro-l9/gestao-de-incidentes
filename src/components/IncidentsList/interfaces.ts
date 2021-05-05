import firebase from 'firebase';

export interface User {
  name: string;
  avatarURL: string;
  uid: string;
}

export interface Incident {
  id?: string;
  date: firebase.firestore.Timestamp;
  priority: string;
  status: string;
  area: string;
  level: string;
  subject: string;
  description: string;
  user: User;
}
