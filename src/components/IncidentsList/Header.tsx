import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

function Header(setGlobalFilter: Function, createNewIncident: Function) {
  return (
    <div className="table-header">
      <div>Incidentes </div>
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          type="search"
          onInput={(e) => setGlobalFilter((e.target as HTMLInputElement).value)}
          placeholder="Pesquisar"
        />
      </span>
      <Button
        label="Novo Incidente"
        icon="pi pi-plus"
        className="p-button-success p-button-sm p-button-raised"
        onClick={() => createNewIncident()}
      />
    </div>
  );
}

export default Header;
