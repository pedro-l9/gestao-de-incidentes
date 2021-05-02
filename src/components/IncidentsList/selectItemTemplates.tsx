import { Avatar } from 'primereact/avatar';
import { User } from './interfaces';

export const userItemTemplate = (user: User) => {
  return (
    <div className="p-multiselect-representative-option">
      <Avatar
        image={user.avatarURL}
        style={{ verticalAlign: 'middle', marginRight: '5px' }}
        shape="circle"
      />
      <span className="image-text">{user.name}</span>
    </div>
  );
};

export const statusItemTemplate = (option: string) => {
  return <span className={`customer-badge status-${option}`}>{option}</span>;
};
