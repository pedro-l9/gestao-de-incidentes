import { useState, useRef, useLayoutEffect } from 'react';
import firebase from 'firebase/app';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { ChangeParams, MultiSelect } from 'primereact/multiselect';
import {
  useCollectionData,
  useCollectionDataOnce,
} from 'react-firebase-hooks/firestore';

import './IncidentsList.css';
import { Incident, Technician } from './model';
import {
  ownerBodyTemplate,
  statusBodyTemplate,
  defaultBody,
  codeBodyTemplate,
} from './bodyTemplates';
import { ownerItemTemplate, statusItemTemplate } from './selectItemTemplates';
import Header from './Header';
import { LEVELS, PRIORITIES, STATUSES } from '../../constants';

const INTERFACE_HEIGHT_WITHOUT_ROWS = 360;
const ROW_HEIGHT = 50;

interface Props {
  selectedIncident?: Required<Incident>;
  viewIncident: (incident: Required<Incident>) => void;
  createNewIncident: Function;
}

function IncidentsList({
  selectedIncident,
  viewIncident,
  createNewIncident,
}: Props) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedOwner, setSelectedOwner] = useState<string | null>(null);
  const [selectedPriority, setSelectedPriority] = useState<string | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [globalFilter, setGlobalFilter] = useState<string | null>(null);
  const dataTable = useRef<DataTable>(null);

  const incidentsCollection = firebase
    .firestore()
    .collection('incidents')
    .orderBy('date', 'desc');

  const techniciansCollection = firebase.firestore().collection('technicians');

  const [incidents, loading] = useCollectionData<Incident>(
    incidentsCollection,
    {
      idField: 'id',
    }
  );

  const [technicians] = useCollectionDataOnce<Technician>(
    techniciansCollection,
    {
      idField: 'uid',
    }
  );

  //#region onChange handlers

  function onDateChange({ value }: ChangeParams) {
    dataTable?.current?.filter(value, 'date', 'custom');
    setSelectedDate(value);
  }

  function onOwnerChange({ value }: ChangeParams) {
    dataTable?.current?.filter(value, 'owner.name', 'equals');
    setSelectedOwner(value);
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

  //#endregion

  //#region filterFields

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
      value={selectedOwner}
      options={technicians}
      itemTemplate={ownerItemTemplate}
      onChange={onOwnerChange}
      optionLabel="name"
      optionValue="name"
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

  //#endregion

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
          selectionMode="single"
          selection={selectedIncident}
          onSelectionChange={({ value: incident }) => {
            viewIncident(incident);
          }}
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
            filterFunction={(
              value?: firebase.firestore.Timestamp,
              filter?: Date
            ) =>
              value?.toDate().toLocaleDateString() ===
              filter?.toLocaleDateString()
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
            field="owner.name"
            header="Responsável"
            body={ownerBodyTemplate}
            filter
            filterElement={userFilterField}
          />
          <Column
            field="priority"
            header="Prioridade"
            body={defaultBody('Prioridade', ({ priority }) => priority)}
            filter
            filterElement={priorityFilterField}
            sortable
          />
          <Column
            field="level"
            header="Nível"
            body={defaultBody('Nível', ({ level }) => level)}
            filter
            filterElement={levelFilterField}
            sortable
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
