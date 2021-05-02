export interface User {
  name: string;
  avatarURL: string;
  uid: string;
}

export interface Incident {
  code: number;
  date: Date;
  description: string;
  user: User;
  priority: string;
  level: string;
  status: string;
}
