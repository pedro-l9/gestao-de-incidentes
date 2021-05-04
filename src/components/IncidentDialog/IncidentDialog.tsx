import firebase from 'firebase/app';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import {
  FilesParam,
  FileUpload,
  ItemTemplateOptions,
} from 'primereact/fileupload';
import {
  Controller,
  FieldValues,
  useForm,
  useFormState,
} from 'react-hook-form';
import { useAuthState } from 'react-firebase-hooks/auth';

import { LEVELS, PRIORITIES, STATUSES, AREAS } from '../../constants';
import { Calendar } from 'primereact/calendar';
import { useRef } from 'react';

import './IncidentDialog.css';
interface Props {
  isDialogOpen: boolean;
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function customItemTemplate(file: File, props: ItemTemplateOptions) {
  return (
    <div className="p-fluid p-grid">
      <div className="p-col-6 file-name">{file.name}</div>
      <div className="p-col-4">{props.formatSize}</div>
      <div className="p-col-2">
        <Button
          icon="pi pi-times"
          className="p-button-danger p-button-raised"
          type="button"
          onClick={(e) => props.onRemove(e)}
        />
      </div>
    </div>
  );
}

function IncidentDialog({ isDialogOpen, setDialogOpen }: Props) {
  const { control, handleSubmit, register, reset, clearErrors } = useForm();
  const { errors } = useFormState({ control });
  const [user] = useAuthState(firebase.auth());
  const uploadComponent = useRef<FileUpload>(null);

  function hideDialog() {
    setDialogOpen(false);
    reset();
    clearErrors();
  }

  function onUpload(a: FilesParam) {
    console.log(JSON.stringify(a));
  }

  function onSubmit(fieldValues: FieldValues) {
    alert(JSON.stringify(fieldValues));
  }

  return (
    <Dialog
      header="Novo Incidente"
      visible={isDialogOpen}
      style={{ width: '600px' }}
      onHide={hideDialog}
      draggable={false}
      resizable={false}
      closable={false}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="p-fluid p-formgrid p-grid">
          {/* Data */}
          <div className="p-field p-col-3">
            <label className={errors.date ? 'p-error' : ''} htmlFor="date">
              Data
            </label>
            <Controller
              name="date"
              control={control}
              defaultValue={new Date()}
              rules={{ required: true }}
              render={({ field }) => (
                <Calendar
                  value={field.value}
                  onChange={(e) => field.onChange(e.value)}
                  dateFormat="dd/mm/yy"
                  locale="pt-BR"
                  className={errors.date ? 'p-invalid' : ''}
                  showButtonBar
                />
              )}
            />
          </div>

          {/* Prioridade */}
          <div className="p-field p-col-3">
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
                  inputRef={field.ref}
                  value={field.value}
                  options={PRIORITIES}
                  onChange={(e) => field.onChange(e.value)}
                  className={errors.priority ? 'p-invalid' : ''}
                  showClear
                />
              )}
            />
          </div>

          {/* Status */}
          <div className="p-field p-col-6">
            <label className={errors.status ? 'p-error' : ''} htmlFor="status">
              Status
            </label>
            <Controller
              name="status"
              control={control}
              defaultValue={null}
              rules={{ required: true }}
              render={({ field }) => (
                <Dropdown
                  id="status"
                  showOnFocus={true}
                  inputRef={field.ref}
                  value={field.value}
                  options={STATUSES}
                  onChange={(e) => field.onChange(e.value)}
                  className={errors.status ? 'p-invalid' : ''}
                  showClear
                />
              )}
            />
          </div>

          {/* Área */}
          <div className="p-field p-col-5">
            <label className={errors.area ? 'p-error' : ''} htmlFor="area">
              Área
            </label>
            <Controller
              name="area"
              control={control}
              defaultValue={null}
              rules={{ required: true }}
              render={({ field }) => (
                <Dropdown
                  id="area"
                  value={field.value}
                  options={AREAS}
                  onChange={(e) => field.onChange(e.value)}
                  className={errors.area ? 'p-invalid' : ''}
                  showClear
                />
              )}
            />
          </div>

          {/* Nível */}
          <div className="p-field p-col-3">
            <label className={errors.level ? 'p-error' : ''} htmlFor="level">
              Nível
            </label>
            <Controller
              name="level"
              control={control}
              defaultValue={null}
              rules={{ required: true }}
              render={({ field }) => (
                <Dropdown
                  id="level"
                  value={field.value}
                  options={LEVELS}
                  onChange={(e) => field.onChange(e.value)}
                  className={errors.level ? 'p-invalid' : ''}
                  showClear
                />
              )}
            />
          </div>

          {/* Usuário */}
          <div className="p-field p-col-4">
            <label htmlFor="user">Usuário</label>
            <InputText
              value={user?.displayName || ''}
              id="user"
              type="text"
              disabled
            />
          </div>

          {/* Assunto */}
          <div className="p-field p-col-12">
            <label
              className={errors.subject ? 'p-error' : ''}
              htmlFor="subject"
            >
              Assunto
            </label>
            <InputText
              {...register('subject', { required: true, maxLength: 70 })}
              className={errors.subject ? 'p-invalid' : ''}
              type="text"
              maxLength={70}
            />
          </div>

          {/* Descrição */}
          <div className="p-field p-col-12">
            <label
              className={errors.description ? 'p-error' : ''}
              htmlFor="description"
            >
              Descrição
            </label>
            <InputTextarea
              {...register('description', { required: true, maxLength: 700 })}
              className={errors.description ? 'p-invalid' : ''}
              autoResize
              maxLength={700}
            />
          </div>

          {/* Arquivos */}
          <div className="p-col-12">
            <FileUpload
              ref={uploadComponent}
              chooseLabel="Selecionar"
              invalidFileSizeMessageSummary=""
              invalidFileSizeMessageDetail="O limite de tamanho de arquivo é 1MB"
              name="files[]"
              maxFileSize={1000000}
              emptyTemplate={
                <p className="p-m-0" style={{ textAlign: 'center' }}>
                  Arraste arquivos aqui.
                </p>
              }
              uploadHandler={onUpload}
              itemTemplate={customItemTemplate}
              multiple
              customUpload
              auto
            />
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
            onClick={hideDialog}
            className="p-button-danger p-button-text"
            type="button"
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
