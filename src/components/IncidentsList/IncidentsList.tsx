import { useState, useRef, useLayoutEffect } from 'react';
import firebase from 'firebase/app';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { ChangeParams, MultiSelect } from 'primereact/multiselect';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import './IncidentsList.css';
import { Incident } from './interfaces';
import {
  userBodyTemplate,
  statusBodyTemplate,
  defaultBody,
  codeBodyTemplate,
} from './bodyTemplates';
import { userItemTemplate, statusItemTemplate } from './selectItemTemplates';
import Header from './Header';
import { LEVELS, PRIORITIES, STATUSES } from '../../constants';

const INTERFACE_HEIGHT_WITHOUT_ROWS = 360;
const ROW_HEIGHT = 50;

interface Props {
  createNewIncident: Function;
  editIncident: Function;
  viewIncident: Function;
}

function IncidentsList({ createNewIncident }: Props) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [selectedPriority, setSelectedPriority] = useState<string | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [globalFilter, setGlobalFilter] = useState<string | null>(null);
  const dataTable = useRef<DataTable>(null);
  const incidentsRef = firebase
    .firestore()
    .collection('incidents')
    .orderBy('date', 'desc');
  const [incidents, loading] = useCollectionData<Incident>(incidentsRef, {
    idField: 'id',
  });

  const USERS = Object.values(
    incidents?.reduce(
      (uniqueUsers, { user }) => ({ ...uniqueUsers, [user.uid]: user }),
      {}
    ) || {}
  );

  function onDateChange({ value }: ChangeParams) {
    dataTable?.current?.filter(value, 'date', 'custom');
    setSelectedDate(value);
  }

  function onUserChange({ value }: ChangeParams) {
    dataTable?.current?.filter(value, 'user.uid', 'equals');
    setSelectedUser(value);
  }

  function onPriorityChange({ value }: ChangeParams) {
    dataTable?.current?.filter(value, 'priority', 'equals');
    setSelectedPriority(value);
  }

  function onLevelChange({ value }: ChangeParams) {
    dataTable?.current?.filter(value, 'level', 'equals');
    setSelectedLevel(value);
  }

  function onStatusChange({ value }: ChangeParams) {
    dataTable?.current?.filter(value, 'status', 'in');
    setSelectedStatus(value);
  }

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
      options={USERS}
      itemTemplate={userItemTemplate}
      onChange={onUserChange}
      optionLabel="name"
      optionValue="uid"
      placeholder="Todos"
      className="p-column-filter"
      showClear
    />
  );

  const priorityFilterField = (
    <Dropdown
      value={selectedPriority}
      options={PRIORITIES}
      onChange={onPriorityChange}
      placeholder="Prioridade"
      className="p-column-filter"
      showClear
    />
  );

  const levelFilterField = (
    <Dropdown
      value={selectedLevel}
      options={LEVELS}
      onChange={onLevelChange}
      placeholder="Nível"
      className="p-column-filter"
      showClear
    />
  );

  const statusFilterField = (
    <MultiSelect
      value={selectedStatus}
      options={STATUSES}
      itemTemplate={statusItemTemplate}
      onChange={onStatusChange}
      placeholder="Status"
      className="p-column-filter"
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
          loading={loading}
          ref={dataTable}
          value={incidents}
          paginator
          rows={Math.floor(
            (windowHeight - INTERFACE_HEIGHT_WITHOUT_ROWS) / ROW_HEIGHT
          )}
          header={Header(setGlobalFilter, createNewIncident)}
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
            body={defaultBody('Data', ({ date }) =>
              new Intl.DateTimeFormat('pt-BR').format(date.toDate())
            )}
            filter
            filterElement={dateFilterField}
            filterFunction={(value?: Date, filter?: Date) =>
              value?.toLocaleDateString() === filter?.toLocaleDateString()
            }
            sortable
          />
          <Column
            field="description"
            header="Descrição"
            body={defaultBody('Descrição', ({ description }) => description)}
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
            body={defaultBody('Prioridade', ({ priority }) => priority)}
            filter
            filterElement={priorityFilterField}
          />
          <Column
            field="level"
            header="Nível"
            body={defaultBody('Nível', ({ level }) => level)}
            filter
            filterElement={levelFilterField}
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
