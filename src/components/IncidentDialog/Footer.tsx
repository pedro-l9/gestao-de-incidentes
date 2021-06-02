import { Button } from 'primereact/button';
import { FormState } from '../IncidentsList/model';

interface Props {
  userCanEdit: boolean;
  formState: FormState;
  hideDialog: React.MouseEventHandler<HTMLButtonElement>;
  submitForm: React.MouseEventHandler<HTMLButtonElement>;
  editIncident: React.MouseEventHandler<HTMLButtonElement>;
}

function Footer({
  userCanEdit,
  formState,
  hideDialog,
  submitForm,
  editIncident,
}: Props) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingTop: '1.5rem',
      }}
    >
      {formState === 'isEditing' || formState === 'isCreating' ? (
        <>
          <Button
            label="Cancelar"
            icon="pi pi-times"
            onClick={hideDialog}
            className="p-button-danger p-button-text"
            type="button"
          />
          <Button
            className="p-button-success p-button-raised"
            label="Salvar"
            icon="pi pi-check"
            type="button"
            onClick={submitForm}
          />
        </>
      ) : (
        <>
          {userCanEdit && (
            <Button
              className="p-button-success p-button-raised"
              label="Editar"
              icon="pi pi-check"
              type="button"
              onClick={editIncident}
            />
          )}

          <Button
            label="Fechar"
            icon="pi pi-times"
            onClick={hideDialog}
            className="p-button-danger p-button-text"
            type="button"
          />
        </>
      )}
    </div>
  );
}

export default Footer;
