import { Button } from 'primereact/button';

interface Props {
  hideDialog: React.MouseEventHandler<HTMLButtonElement>;
  submitForm: React.MouseEventHandler<HTMLButtonElement>;
}

function Footer({ hideDialog, submitForm }: Props) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingTop: '1.5rem',
      }}
    >
      <Button
        label="Cancelar"
        icon="pi pi-times"
        onClick={hideDialog}
        className="p-button-danger p-button-text"
        type="button"
      />
      <Button
        className="p-button-success p-button-raised"
        label="Criar"
        icon="pi pi-check"
        type="button"
        onClick={submitForm}
      />
    </div>
  );
}

export default Footer;
