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

import { LEVELS, PRIORITIES, STATUSES } from '../../constants';
import { Calendar } from 'primereact/calendar';
import { useEffect, useRef } from 'react';

import './IncidentDialog.css';
import Footer from './Footer';
import { FormState, Incident, Technician } from '../IncidentsList/model';
import { useCollectionDataOnce } from 'react-firebase-hooks/firestore';

interface Props {
  selectedIncident?: Required<Incident>;
  onDialogClose: Function;
  formState: FormState;
  setFormState: React.Dispatch<React.SetStateAction<FormState>>;
  isDialogOpen: boolean;
  toastRef: React.RefObject<Toast>;
}

type FormData = {
  date: Date;
  priority: string;
  status: string;
  area: string;
  level: string;
  subject: string;
  description: string;
  owner: Technician;
};

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
  formState,
  setFormState,
  isDialogOpen,
  toastRef,
}: Props) {
  const {
    control,
    register,
    reset,
    clearErrors,
    watch,
    handleSubmit,
    setValue,
  } = useForm<FormData>();
  const { errors } = useFormState({ control });

  const [user] = useAuthState(firebase.auth());

  // const uploadComponent = useRef<FileUpload>(null);
  const formComponent = useRef<HTMLFormElement>(null);

  const incidentsCollection = firebase.firestore().collection('incidents');
  const techniciansCollection = firebase.firestore().collection('technicians');

  const [technicians] = useCollectionDataOnce<Technician>(
    techniciansCollection,
    {
      idField: 'uid',
    }
  );

  const TECHNICIAN_OPTIONS = technicians?.map((technician) => ({
    label: technician.name,
    value: technician,
  }));

  const AREA_OWNERS: { [key: string]: Technician } =
    technicians?.reduce(
      (areas, technician) =>
        technician.area !== undefined
          ? { ...areas, [technician.area]: technician }
          : areas,
      {}
    ) ?? {};

  const watchArea = watch('area');
  const incidentOwner = watchArea ? AREA_OWNERS[watchArea] : undefined;

  const USER_CAN_EDIT =
    formState === 'isVisualizing' && selectedIncident?.owner.uid === user?.uid;

  function hideDialog() {
    onDialogClose();
    clearErrors();
    reset();
  }

  function onSubmitClick() {
    var event = new Event('submit', {
      bubbles: true,
      cancelable: true,
    });

    formComponent.current?.dispatchEvent(event);
  }

  function onEditClick() {
    setFormState('isEditing');
  }

  async function submitForm(formData: FormData) {
    if (formState === 'isCreating') {
      createIncident(formToIncident(formData));
    } else if (formState === 'isEditing' && selectedIncident !== undefined) {
      updateIncident({
        ...selectedIncident,
        ...formToIncident(formData),
      });
    }
  }

  async function createIncident(incident: Incident) {
    incidentsCollection.add(incident);
    toastRef?.current?.show({
      severity: 'success',
      summary: 'Sucesso!',
      detail: 'Incidente registrado',
      life: 1500,
    });
    hideDialog();
  }

  async function updateIncident(incident: Required<Incident>) {
    incidentsCollection.doc(incident.id).set(incident);
    toastRef?.current?.show({
      severity: 'success',
      summary: 'Sucesso!',
      detail: 'Incidente atualizado',
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
    owner,
  }: FieldValues): Incident {
    return {
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
      owner: owner,
      subject,
      description,
    };
  }

  // function onUpload(a: FilesParam) {
  //   console.log(JSON.stringify(a));
  // }

  useEffect(() => {
    if (selectedIncident !== undefined) {
      setValue('date', selectedIncident.date.toDate(), {
        shouldValidate: true,
        shouldDirty: true,
      });
      setValue('priority', selectedIncident.priority, {
        shouldValidate: true,
        shouldDirty: true,
      });
      setValue('status', selectedIncident.status, {
        shouldValidate: true,
        shouldDirty: true,
      });
      setValue('area', selectedIncident.area, {
        shouldValidate: true,
        shouldDirty: true,
      });
      setValue('level', selectedIncident.level, {
        shouldValidate: true,
        shouldDirty: true,
      });
      setValue('owner', selectedIncident.owner, {
        shouldValidate: true,
        shouldDirty: true,
      });
      setValue('subject', selectedIncident.subject, {
        shouldValidate: true,
        shouldDirty: true,
      });
      setValue('description', selectedIncident.description, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  }, [selectedIncident, setValue]);

  useEffect(() => {
    if (formState === 'isCreating') {
      incidentOwner && setValue('owner', incidentOwner);
    }
  }, [formState, incidentOwner, setValue]);

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
          userCanEdit={USER_CAN_EDIT}
          formState={formState}
          hideDialog={hideDialog}
          submitForm={onSubmitClick}
          editIncident={onEditClick}
        />
      )}
    >
      <form onSubmit={handleSubmit(submitForm)} ref={formComponent}>
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
                  disabled={!['isCreating', 'isEditing'].includes(formState)}
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
              rules={{ required: true }}
              render={({ field }) => (
                <Dropdown
                  id="priority"
                  inputRef={field.ref}
                  value={field.value}
                  options={PRIORITIES}
                  onChange={(e) => field.onChange(e.value)}
                  className={errors.priority ? 'p-invalid' : ''}
                  disabled={!['isCreating', 'isEditing'].includes(formState)}
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
              defaultValue={selectedIncident?.status ?? 'Em Aberto'}
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
                  disabled={!['isEditing'].includes(formState)}
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
                  options={Object.keys(AREA_OWNERS)}
                  onChange={(e) => field.onChange(e.value)}
                  className={errors.area ? 'p-invalid' : ''}
                  disabled={!['isCreating', 'isEditing'].includes(formState)}
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
              rules={{ required: true }}
              render={({ field }) => (
                <Dropdown
                  id="level"
                  value={field.value}
                  options={LEVELS}
                  onChange={(e) => field.onChange(e.value)}
                  className={errors.level ? 'p-invalid' : ''}
                  disabled={!['isCreating', 'isEditing'].includes(formState)}
                />
              )}
            />
          </div>

          {/* Responsável */}
          <div className="p-field p-col-4">
            <label className={errors.owner ? 'p-error' : ''} htmlFor="owner">
              Responsável
            </label>
            <Controller
              name="owner"
              control={control}
              rules={{ required: formState === 'isEditing' }}
              render={({ field }) => (
                <Dropdown
                  id="owner"
                  value={field.value}
                  options={TECHNICIAN_OPTIONS}
                  onChange={(e) => field.onChange(e.value)}
                  className={errors.owner ? 'p-invalid' : ''}
                  disabled={!['isEditing'].includes(formState)}
                />
              )}
            />
          </div>

          {/* Assunto */}
          <div className="p-field p-col-8">
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
              disabled={!['isCreating', 'isEditing'].includes(formState)}
            />
          </div>

          {/* Usuário */}
          <div className="p-field p-col-4">
            <label htmlFor="user">Usuário</label>
            <InputText
              value={
                (formState === 'isCreating'
                  ? user?.displayName
                  : selectedIncident?.user.name) ?? 'Error'
              }
              id="user"
              type="text"
              disabled
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
              disabled={!['isCreating', 'isEditing'].includes(formState)}
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
