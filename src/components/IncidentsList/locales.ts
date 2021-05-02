import { addLocale } from 'primereact/api';

const locales: { [index: string]: object } = {
  'pt-BR': {
    firstDayOfWeek: 1,
    dayNames: [
      'domingo',
      'segunda',
      'terça',
      'quarta',
      'quinta',
      'sexta',
      'sábado',
    ],
    dayNamesShort: ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb'],
    dayNamesMin: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
    monthNames: [
      'janeiro',
      'feveireiro',
      'março',
      'abril',
      'maio',
      'junho',
      'julho',
      'agosto',
      'setempro',
      'outubro',
      'novembro',
      'dezembro',
    ],
    monthNamesShort: [
      'jan',
      'fev',
      'mar',
      'abr',
      'mai',
      'jun',
      'jul',
      'ago',
      'set',
      'out',
      'nov',
      'dez',
    ],
    today: 'Hoje',
    clear: 'Limpar',
  },
};

export function loadLocales() {
  for (const localeName in locales) {
    addLocale(localeName, locales[localeName]);
  }
}
