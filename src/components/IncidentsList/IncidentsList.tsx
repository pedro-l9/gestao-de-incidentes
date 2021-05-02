import { useState, useRef, useLayoutEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { ChangeParams } from 'primereact/multiselect';

import './IncidentsList.css';
import { Incident } from './interfaces';
import {
  codeBodyTemplate,
  dateBodyTemplate,
  descriptionBodyTemplate,
  userBodyTemplate,
  priorityBodyTemplate,
  levelBodyTemplate,
  statusBodyTemplate,
} from './bodyTemplates';
import { userItemTemplate, statusItemTemplate } from './selectItemTemplates';
import { loadLocales } from './locales';
import Header from './Header';

const statuses = ['Finalizado', 'Atendimento'];

const INTERFACE_HEIGHT_WITHOUT_ROWS = 360;
const ROW_HEIGHT = 50;

function IncidentsList() {
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [globalFilter, setGlobalFilter] = useState<string | null>(null);
  const dataTable = useRef<DataTable>(null);

  const incidents: Incident[] = [
    {
      code: 1,
      date: new Date(),
      description: 'asdasdasd',
      user: {
        uid: 'HTpfdR9oNsNXoxlBqtnZwEmghis2',
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
        uid: 'HTpfdR9oNsNXoxlBqtnZwEmghis2',
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
        uid: 'HTpfdR9oNsNXoxlBqtnZwEmghis2',
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
        uid: 'HTpfdR9oNsNXoxlBqtnZwEmghis2',
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
        uid: 'HTpfdR9oNsNXoxlBqtnZwEmghis2',
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
        uid: 'HTpfdR9oNsNXoxlBqtnZwEmghis2',
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
        uid: 'HTpfdR9oNsNXoxlBqtnZwEmghis2',
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
        uid: 'HTpfdR9oNsNXoxlBqtnZwEmghis2',
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
        uid: 'HTpfdR9oNsNXoxlBqtnZwEmghis2',
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
        uid: 'HTpfdR9oNsNXoxlBqtnZwEmghis2',
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
        uid: 'HTpfdR9oNsNXoxlBqtnZwEmghis2',
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
        uid: 'HTpfdR9oNsNXoxlBqtnZwEmghis2',
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
        uid: 'HTpfdR9oNsNXoxlBqtnZwEmghis2',
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
        uid: 'HTpfdR9oNsNXoxlBqtnZwEmghis2',
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
        uid: 'HTpfdR9oNsNXoxlBqtnZwEmghis2',
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
        uid: 'HTpfdR9oNsNXoxlBqtnZwEmghis2',
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
        uid: 'HTpfdR9oNsNXoxlBqtnZwEmghis2',
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
        uid: 'HTpfdR9oNsNXoxlBqtnZwEmghis2',
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
        uid: 'HTpfdR9oNsNXoxlBqtnZwEmghis2',
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
        uid: 'HTpfdR9oNsNXoxlBqtnZwEmghis2',
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
        uid: 'HTpfdR9oNsNXoxlBqtnZwEmghis2',
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
        uid: 'HTpfdR9oNsNXoxlBqtnZwEmghis2',
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
        uid: '123',
        name: 'Paulo Henrique Lacerda',
        avatarURL:
          'https://lh3.googleusercontent.com/a-/AOh14GhlMpkbJQGfbgI5yxNjCoI0IBGiXBjIjyUaJ8UCcFg=s96-c',
      },
      priority: 'Baixa',
      level: 'Nível 1',
      status: 'Finalizado',
    },
  ];

  const users = Object.values(
    incidents.reduce(
      (uniqueUsers, { user }) => ({ ...uniqueUsers, [user.uid]: user }),
      {}
    )
  );

  function onUserChange({ value }: ChangeParams) {
    dataTable?.current?.filter(value, 'user.uid', 'equals');
    setSelectedUser(value);
  }

  function onDateChange({ value }: ChangeParams) {
    dataTable?.current?.filter(value, 'date', 'custom');
    setSelectedDate(value);
  }

  function onStatusChange({ value }: ChangeParams) {
    dataTable?.current?.filter(value, 'status', 'equals');
    setSelectedStatus(value);
  }

  loadLocales();

  const dateFilterField = (
    <Calendar
      value={selectedDate}
      onChange={onDateChange}
      dateFormat="dd/mm/yy"
      className="p-column-filter"
      placeholder="Data"
      locale="pt-BR"
      showButtonBar
    />
  );

  const userFilterField = (
    <Dropdown
      value={selectedUser}
      options={users}
      itemTemplate={userItemTemplate}
      onChange={onUserChange}
      optionLabel="name"
      optionValue="uid"
      placeholder="Todos"
      className="p-column-filter"
      showClear
    />
  );

  const statusFilterField = (
    <Dropdown
      value={selectedStatus}
      options={statuses}
      itemTemplate={statusItemTemplate}
      onChange={onStatusChange}
      placeholder="Status"
      className="p-column-filter"
      showClear
    />
  );

  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  useLayoutEffect(() => {
    function updateHeight() {
      setWindowHeight(window.innerHeight);
    }

    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  });

  return (
    <div>
      <div className="card">
        <DataTable
          ref={dataTable}
          value={incidents}
          paginator
          rows={Math.floor(
            (windowHeight - INTERFACE_HEIGHT_WITHOUT_ROWS) / ROW_HEIGHT
          )}
          header={Header(setGlobalFilter)}
          className="p-datatable-sm  p-datatable-gridlines"
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
            filterElement={dateFilterField}
            filterFunction={(value?: Date, filter?: Date) =>
              value?.toLocaleDateString() === filter?.toLocaleDateString()
            }
          />
          <Column
            field="description"
            header="Descrição"
            body={descriptionBodyTemplate}
            filter
            filterPlaceholder="Descrição"
          />
          <Column
            field="user.uid"
            header="Usuário"
            body={userBodyTemplate}
            filter
            filterElement={userFilterField}
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
            filterElement={statusFilterField}
          />
        </DataTable>
      </div>
    </div>
  );
}

export default IncidentsList;
