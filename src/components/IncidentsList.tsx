import { useState, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { ChangeParams, MultiSelect } from 'primereact/multiselect';

import './IncidentsList.css';
import { Avatar } from 'primereact/avatar';

interface User {
  name: string;
  avatarURL: string;
}

interface Incident {
  code: number;
  date: Date;
  description: string;
  user: User;
  priority: string;
  level: string;
  status: string;
}

const incidents: Incident[] = [
  {
    code: 1,
    date: new Date(),
    description: 'asdasdasd',
    user: {
      name: 'Pedro Henrique Lacerda',
      avatarURL:
        'https://lh3.googleusercontent.com/a-/AOh14GhlMpkbJQGfbgI5yxNjCoI0IBGiXBjIjyUaJ8UCcFg=s96-c',
    },
    priority: 'Baixa',
    level: 'Nível 1',
    status: 'Finalizado',
  },
  {
    code: 1,
    date: new Date(),
    description: 'asdasdasd',
    user: {
      name: 'Pedro Henrique Lacerda',
      avatarURL:
        'https://lh3.googleusercontent.com/a-/AOh14GhlMpkbJQGfbgI5yxNjCoI0IBGiXBjIjyUaJ8UCcFg=s96-c',
    },
    priority: 'Baixa',
    level: 'Nível 1',
    status: 'Finalizado',
  },
  {
    code: 1,
    date: new Date(),
    description: 'asdasdasd',
    user: {
      name: 'Paulo Henrique Lacerda',
      avatarURL:
        'https://lh3.googleusercontent.com/a-/AOh14GhlMpkbJQGfbgI5yxNjCoI0IBGiXBjIjyUaJ8UCcFg=s96-c',
    },
    priority: 'Baixa',
    level: 'Nível 1',
    status: 'Finalizado',
  },
];

function IncidentsList() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [globalFilter, setGlobalFilter] = useState<string>('');
  const dataTable = useRef<DataTable>(null);

  const statuses = ['Finalizado', 'Atendimento'];

  const filterDate = (value: any, filter: any) => {
    if (
      filter === undefined ||
      filter === null ||
      (typeof filter === 'string' && filter.trim() === '')
    ) {
      return true;
    }

    if (value === undefined || value === null) {
      return false;
    }

    return value === formatDate(filter);
  };

  const formatDate = (date: any) => {
    let month = date.getMonth() + 1;
    let day = date.getDate();

    if (month < 10) {
      month = '0' + month;
    }

    if (day < 10) {
      day = '0' + day;
    }

    return date.getFullYear() + '-' + month + '-' + day;
  };

  const onUserChange = ({ value }: ChangeParams) => {
    dataTable?.current?.filter(value, 'representative.name', 'in');
    setSelectedUser(value);
  };

  const onDateChange = ({ value }: ChangeParams) => {
    dataTable?.current?.filter(value, 'date', 'custom');
    setSelectedDate(value);
  };

  const onStatusChange = ({ value }: ChangeParams) => {
    dataTable?.current?.filter(value, 'status', 'equals');
    setSelectedStatus(value);
  };

  const codeBodyTemplate = (incident: Incident) => {
    return (
      <div className="p-d-flex p-jc-center p-ai-center">
        <span className="p-column-title">Código</span>
        {incident.code}
      </div>
    );
  };

  const dateBodyTemplate = (incident: Incident) => {
    return (
      <div className="p-d-flex p-jc-center p-ai-center">
        <span className="p-column-title">Data</span>
        <span>{new Intl.DateTimeFormat('pt-BR').format(incident.date)}</span>
      </div>
    );
  };

  const descriptionBodyTemplate = (incident: Incident) => {
    return (
      <>
        <span className="p-column-title">Descrição</span>
        {incident.description}
      </>
    );
  };

  const userBodyTemplate = ({ user }: Incident) => {
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

  const priorityBodyTemplate = (incident: Incident) => {
    return (
      <div className="p-d-flex p-jc-center p-ai-center">
        <span className="p-column-title">Prioridade</span>
        {incident.priority}
      </div>
    );
  };

  const levelBodyTemplate = (incident: Incident) => {
    return (
      <div className="p-d-flex p-jc-center p-ai-center">
        <span className="p-column-title">Nível</span>
        {incident.level}
      </div>
    );
  };

  const statusBodyTemplate = (incident: Incident) => {
    return (
      <div className="p-d-flex p-jc-center p-ai-center">
        <span className="p-column-title">Status</span>
        <span className={`customer-badge status-${incident.status}`}>
          {incident.status}
        </span>
      </div>
    );
  };

  const userItemTemplate = (user: User) => {
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

  const statusItemTemplate = (option: string) => {
    return <span className={`customer-badge status-${option}`}>{option}</span>;
  };

  const header = (
    <div className="table-header">
      Incidentes
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          type="search"
          onInput={(e) => setGlobalFilter((e.target as HTMLInputElement).value)}
          placeholder="Pesquisar"
        />
      </span>
    </div>
  );

  const userFilter = (
    <MultiSelect
      value={selectedUser}
      options={[...new Set(incidents.map(({ user }) => user))]}
      itemTemplate={userItemTemplate}
      onChange={onUserChange}
      optionLabel="name"
      optionValue="name"
      placeholder="Todos"
      className="p-column-filter"
    />
  );
  const dateFilter = (
    <Calendar
      value={selectedDate}
      onChange={onDateChange}
      dateFormat="dd/mm/yy"
      className="p-column-filter"
      placeholder="Data"
    />
  );
  const statusFilter = (
    <Dropdown
      value={selectedStatus}
      options={statuses}
      onChange={onStatusChange}
      itemTemplate={statusItemTemplate}
      placeholder="Status"
      className="p-column-filter"
      showClear
    />
  );

  return (
    <div>
      <div className="card">
        <DataTable
          ref={dataTable}
          value={incidents}
          paginator
          rows={10}
          header={header}
          className="p-datatable-sm  p-datatable-gridlines "
          globalFilter={globalFilter}
          emptyMessage="Nenhum incidente encontrado."
        >
          <Column
            field="code"
            header="Código"
            body={codeBodyTemplate}
            filter
            filterPlaceholder="Código"
          />
          <Column
            field="date"
            header="Data"
            body={dateBodyTemplate}
            filter
            filterElement={dateFilter}
            filterFunction={filterDate}
          />
          <Column
            field="description"
            header="Descrição"
            body={descriptionBodyTemplate}
            filter
            filterPlaceholder="Descrição"
          />
          <Column
            field="user.name"
            header="Usuário"
            body={userBodyTemplate}
            filter
            filterElement={userFilter}
          />
          <Column
            field="priority"
            header="Prioridade"
            body={priorityBodyTemplate}
            filter
            filterPlaceholder="Prioridade"
          />
          <Column
            field="level"
            header="Nível"
            body={levelBodyTemplate}
            filter
            filterPlaceholder="Nível"
          />
          <Column
            field="status"
            header="Status"
            body={statusBodyTemplate}
            filter
            filterElement={statusFilter}
          />
        </DataTable>
      </div>
    </div>
  );
}

export default IncidentsList;
