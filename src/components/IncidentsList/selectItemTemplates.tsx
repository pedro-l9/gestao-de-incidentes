import { Avatar } from 'primereact/avatar';
import { Technician } from './model';

export const ownerItemTemplate = (owner: Technician) => {
  return (
    <div className="p-multiselect-representative-option">
      <Avatar
        image={owner.avatarURL}
        style={{ verticalAlign: 'middle', marginRight: '5px' }}
        shape="circle"
      />
      <span className="image-text">{owner.name}</span>
    </div>
  );
};

export const statusItemTemplate = (option: string) => {
  return (
    <span
      className={`status-badge status-${option
        .toLowerCase()
        .replace(' ', '-')}`}
    >
      {option}
    </span>
  );
};
