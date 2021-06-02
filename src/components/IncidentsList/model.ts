import firebase from 'firebase';

export interface User {
  uid: string;
  name: string;
  avatarURL: string;
}

export interface Technician {
  uid: string;
  name: string;
  avatarURL: string;
  area: string;
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
  owner: Technician;
}

export type FormState = 'isEditing' | 'isCreating' | 'isVisualizing';
