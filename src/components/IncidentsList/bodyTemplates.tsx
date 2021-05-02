import { Avatar } from 'primereact/avatar';

import { Incident } from './interfaces';

export const codeBodyTemplate = (incident: Incident) => {
  return (
    <div className="p-d-flex p-jc-center p-ai-center">
      <span className="p-column-title">Código</span>
      {incident.code}
    </div>
  );
};

export const dateBodyTemplate = (incident: Incident) => {
  return (
    <div className="p-d-flex p-jc-center p-ai-center">
      <span className="p-column-title">Data</span>
      <span>{new Intl.DateTimeFormat('pt-BR').format(incident.date)}</span>
    </div>
  );
};

export const descriptionBodyTemplate = (incident: Incident) => {
  return (
    <>
      <span className="p-column-title">Descrição</span>
      {incident.description}
    </>
  );
};

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

export const priorityBodyTemplate = (incident: Incident) => {
  return (
    <div className="p-d-flex p-jc-center p-ai-center">
      <span className="p-column-title">Prioridade</span>
      {incident.priority}
    </div>
  );
};

export const levelBodyTemplate = (incident: Incident) => {
  return (
    <div className="p-d-flex p-jc-center p-ai-center">
      <span className="p-column-title">Nível</span>
      {incident.level}
    </div>
  );
};

export const statusBodyTemplate = (incident: Incident) => {
  return (
    <div className="p-d-flex p-jc-center p-ai-center">
      <span className="p-column-title">Status</span>
      <span className={`customer-badge status-${incident.status}`}>
        {incident.status}
      </span>
    </div>
  );
};
