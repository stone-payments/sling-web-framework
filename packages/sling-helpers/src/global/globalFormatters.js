import 'moment/locale/pt-br';
import moment from 'moment/moment';

moment.locale('pt-BR');

export const defaultSdkCallDateFormat = 'YYYY-MM-DD';

const modelDate = date => moment(date).utc().format('DD/MM/YYYY');
const modelTime = date => `${moment(date).utc().format('HH:mm')}`;

const locale = 'pt-BR';

export const formatCurrency = string =>
  Number(string).toLocaleString('pt-BR', {
    style: 'currency', currency: 'BRL',
  });

export const formatCurrencyWithoutSymbol = value =>
  value.toLocaleString(locale,
    { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export const formatDate = item => modelDate(item);
export const formatTime = item => modelTime(item);

export const formatDateRange = (startDate, finalDate) =>
  `${formatDate(startDate)} – ${formatDate(finalDate)}`;
