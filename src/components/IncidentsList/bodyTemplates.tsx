import { Avatar } from 'primereact/avatar';

import { Incident } from './interfaces';

type TransforFunction = (value: Incident) => string;

export const defaultBody = (
  title: string,
  transforFunction: TransforFunction
) => (incident: Incident) => (
  <div
    className={`${title
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()}-body-value`}
  >
    <span className="p-column-title">{title}</span>
    {transforFunction(incident)}
  </div>
);

export const userBodyTemplate = ({ user }: Incident) => {
  return (
    <>
      <span className="p-column-title">Usuário</span>
      <Avatar
        image={user.avatarURL}
        style={{ verticalAlign: 'middle', marginRight: '5px' }}
        shape="circle"
      />
      <span className="image-text">{user.name}</span>
    </>
  );
};

export const statusBodyTemplate = (incident: Incident) => {
  return (
    <div style={{ textAlign: 'center' }}>
      <span className="p-column-title">Status</span>
      <span
        className={`status-badge status-${incident.status
          .toLowerCase()
          .replace(' ', '-')}`}
      >
        {incident.status}
      </span>
    </div>
  );
};
