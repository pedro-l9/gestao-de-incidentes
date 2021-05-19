import firebase from 'firebase/app';
import 'firebase/firestore';

import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
// import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
// import {
//   FilesParam,
//   FileUpload,
//   ItemTemplateOptions,
// } from 'primereact/fileupload';
import {
  Controller,
  FieldValues,
  useForm,
  useFormState,
} from 'react-hook-form';
import { useAuthState } from 'react-firebase-hooks/auth';

import { LEVELS, PRIORITIES, STATUSES, AREAS } from '../../constants';
import { Calendar } from 'primereact/calendar';
// import { useRef } from 'react';

import './IncidentDialog.css';
import Footer from './Footer';
import { Incident } from '../IncidentsList/interfaces';
interface Props {
  selectedIncident?: Incident;
  onDialogClose: Function;
  canEdit: boolean;
  isDialogOpen: boolean;
  toastRef: React.RefObject<Toast>;
}

// function customItemTemplate(file: File, props: ItemTemplateOptions) {
//   return (
//     <div className="p-fluid p-grid">
//       <div className="p-col-6 file-name">{file.name}</div>
//       <div className="p-col-4">{props.formatSize}</div>
//       <div className="p-col-2">
//         <Button
//           icon="pi pi-times"
//           className="p-button-danger p-button-raised"
//           type="button"
//           onClick={(e) => props.onRemove(e)}
//         />
//       </div>
//     </div>
//   );
// }

function IncidentDialog({
  selectedIncident,
  onDialogClose,
  canEdit,
  isDialogOpen,
  toastRef,
}: Props) {
  const { control, register, reset, clearErrors, getValues } = useForm();
  const { errors } = useFormState({ control });
  const [user] = useAuthState(firebase.auth());
  // const uploadComponent = useRef<FileUpload>(null);
  const incidentsCollection = firebase.firestore().collection('incidents');

  function hideDialog() {
    onDialogClose();
    clearErrors();
    reset();
  }

  async function submitForm() {
    incidentsCollection.add(formToIncident(getValues()));
    toastRef?.current?.show({
      severity: 'success',
      summary: 'Sucesso!',
      detail: 'Incidente registrado',
      life: 1500,
    });
    hideDialog();
  }

  function formToIncident({
    date,
    priority,
    status,
    area,
    level,
    subject,
    description,
  }: FieldValues) {
    const incident: Incident = {
      date: firebase.firestore.Timestamp.fromDate(date),
      priority,
      status,
      area,
      level,
      user: {
        name: user?.displayName || 'Not found',
        avatarURL: user?.photoURL || '',
        uid: user?.uid || '0',
      },
      subject,
      description,
    };

    return incident;
  }

  // function onUpload(a: FilesParam) {
  //   console.log(JSON.stringify(a));
  // }

  return (
    <Dialog
      header="Incidente"
      visible={isDialogOpen}
      style={{ width: '600px' }}
      onHide={hideDialog}
      draggable={false}
      resizable={false}
      closable={false}
      footer={() => (
        <Footer
          isEditing={canEdit}
          hideDialog={hideDialog}
          submitForm={submitForm}
        />
      )}
    >
      <form>
        <div className="p-fluid p-formgrid p-grid">
          {/* Data */}
          <div className="p-field p-col-3">
            <label className={errors.date ? 'p-error' : ''} htmlFor="date">
              Data
            </label>
            <Controller
              name="date"
              control={control}
              defaultValue={selectedIncident?.date.toDate() ?? new Date()}
              rules={{ required: true }}
              render={({ field }) => (
                <Calendar
                  value={field.value}
                  onChange={(e) => field.onChange(e.value)}
                  dateFormat="dd/mm/yy"
                  locale="pt-BR"
                  className={errors.date ? 'p-invalid' : ''}
                  disabled={!canEdit}
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
              defaultValue={selectedIncident?.priority}
              rules={{ required: true }}
              render={({ field }) => (
                <Dropdown
                  id="priority"
                  inputRef={field.ref}
                  value={field.value}
                  options={PRIORITIES}
                  onChange={(e) => field.onChange(e.value)}
                  className={errors.priority ? 'p-invalid' : ''}
                  disabled={!canEdit}
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
              defaultValue={selectedIncident?.status}
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
                  disabled={!canEdit}
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
              defaultValue={selectedIncident?.area}
              rules={{ required: true }}
              render={({ field }) => (
                <Dropdown
                  id="area"
                  value={field.value}
                  options={AREAS}
                  onChange={(e) => field.onChange(e.value)}
                  className={errors.area ? 'p-invalid' : ''}
                  disabled={!canEdit}
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
              defaultValue={selectedIncident?.level}
              rules={{ required: true }}
              render={({ field }) => (
                <Dropdown
                  id="level"
                  value={field.value}
                  options={LEVELS}
                  onChange={(e) => field.onChange(e.value)}
                  className={errors.level ? 'p-invalid' : ''}
                  disabled={!canEdit}
                  showClear
                />
              )}
            />
          </div>

          {/* Usuário */}
          <div className="p-field p-col-4">
            <label htmlFor="user">Usuário</label>
            <InputText
              value={selectedIncident?.user.name ?? user?.displayName ?? ''}
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
              defaultValue={selectedIncident?.subject}
              disabled={!canEdit}
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
              rows={14}
              autoResize
              maxLength={700}
              defaultValue={selectedIncident?.description}
              disabled={!canEdit}
            />
          </div>

          {/* Arquivos */}
          {/* <div className="p-col-12">
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
          </div> */}
        </div>
      </form>
    </Dialog>
  );
}

export default IncidentDialog;
