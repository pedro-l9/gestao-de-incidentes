import { Avatar } from 'primereact/avatar';

import { Incident } from './model';

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

export const codeBodyTemplate = ({ id }: Incident) => (
  <div className={'code-body-value'}>
    <span className="p-column-title">Código</span>
    {id?.substring(0, 7)}
  </div>
);

export const ownerBodyTemplate = ({ owner }: Incident) => {
  return (
    <>
      <span className="p-column-title">Usuário</span>
      <Avatar
        image={owner.avatarURL}
        style={{ verticalAlign: 'middle', marginRight: '5px' }}
        shape="circle"
      />
      <span>{owner.name}</span>
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
