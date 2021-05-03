import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import {
  Controller,
  ControllerFieldState,
  ControllerRenderProps,
  FieldValues,
  useForm,
  useFormState,
  UseFormStateReturn,
} from 'react-hook-form';

import { PRIORITIES } from '../../constants';
import { Button } from 'primereact/button';

interface Props {
  isDialogOpen: boolean;
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface FieldControllerProps {
  field: ControllerRenderProps;
  fieldState: ControllerFieldState;
  formState: UseFormStateReturn<FieldValues>;
}

function IncidentDialog({ isDialogOpen, setDialogOpen }: Props) {
  const { register, control, handleSubmit, reset } = useForm();
  const { errors } = useFormState({ control });

  return (
    <Dialog
      header="Novo Incidente"
      visible={isDialogOpen}
      style={{ width: '700px' }}
      onHide={() => setDialogOpen(false)}
    >
      <form onSubmit={handleSubmit(alert)}>
        <div className="p-fluid p-formgrid p-grid">
          <div className="p-field p-col-12 p-md-3">
            <label htmlFor="date">Data</label>
            <InputText id="date" type="text" />
          </div>
          <div className="p-field p-col-12 p-md-3">
            <label
              className={errors.priority ? 'p-error' : ''}
              htmlFor="priority"
            >
              Prioridade
            </label>
            <Controller
              name="priority"
              control={control}
              defaultValue={null}
              rules={{ required: true }}
              render={({ field }) => (
                <Dropdown
                  id="priority"
                  value={field.value}
                  options={PRIORITIES}
                  onChange={(e) => field.onChange(e.value)}
                  placeholder="Prioridade"
                  className={errors.priority ? 'p-invalid' : ''}
                  showClear
                />
              )}
            />
          </div>

          <div className="p-field p-col-12 p-md-3">
            <label htmlFor="status">Status</label>
            <InputText id="status" type="text" />
          </div>
          <div className="p-field p-col-12 p-md-3">
            <label htmlFor="level">Nível</label>
            <InputText id="level" type="text" />
          </div>
          <div className="p-field p-col-12 p-md-9">
            <label htmlFor="area">Área</label>
            <InputText id="area" type="text" />
          </div>
          <div className="p-field p-col-12 p-md-3">
            <label htmlFor="user">Usuário</label>
            <InputText id="user" type="text" />
          </div>
          <div className="p-field p-col-12 p-md-12">
            <label htmlFor="subject">Assunto</label>
            <InputText id="subject" type="text" />
          </div>
          <div className="p-field p-col-12">
            <label htmlFor="description">Descrição</label>
            <InputTextarea id="description" rows={4} />
          </div>
        </div>
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
            onClick={() => ''}
            className="p-button-danger p-button-text"
          />
          <Button
            className="p-button-success p-button-raised"
            label="Criar"
            icon="pi pi-check"
            type="submit"
          />
        </div>
      </form>
    </Dialog>
  );
}

export default IncidentDialog;
