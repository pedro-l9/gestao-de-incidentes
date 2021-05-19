import { Button } from 'primereact/button';

interface Props {
  isEditing: boolean;
  hideDialog: React.MouseEventHandler<HTMLButtonElement>;
  submitForm: React.MouseEventHandler<HTMLButtonElement>;
}

function Footer({ isEditing, hideDialog, submitForm }: Props) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingTop: '1.5rem',
      }}
    >
      {isEditing ? (
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
        <Button
          label="Fechar"
          icon="pi pi-times"
          onClick={hideDialog}
          className="p-button-danger p-button-text"
          type="button"
        />
      )}
    </div>
  );
}

export default Footer;
