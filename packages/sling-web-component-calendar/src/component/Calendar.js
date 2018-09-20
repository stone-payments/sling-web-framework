import moment from 'moment/moment';
import { html, SlingElement } from 'sling-framework';
import { isFunction, defaultSdkCallDateFormat } from 'sling-helpers';
import 'sling-web-component-paginator';

moment.locale('pt-BR');
const today = moment();
const selectedDayClass = 'calendar__day_selected';
const todayClass = 'calendar__day_today';
const dayOutClass = 'calendar__day_out';
const weekendDayClass = 'calendar__day_weekend';
const dateFormat = defaultSdkCallDateFormat;

export class Calendar extends SlingElement {
  constructor() {
    super();
    this.currentMonthFirstDay = moment().date(1);
    this.srcdata = [];
    // paginator config
    this.paginator = {
      paginate: (type) => {
        this.goToMonth(type);
      },
    };
    // the calendar representation need to be built independently of api
    // because the month is showed even without data
    this.writeCalendarRepresentation();
  }

  static get properties() {
    return {
      current: Object,
      srcdata: Array,
      calendarinstance: Object,
      configuration: Object,
      selecteddate: {
        type: String,
        reflectToAttribute: true,
      },
    };
  }

  // write calendar instance
  writeCalendarRepresentation() {
    // reset the calendar instance object for manipulation
    this.calendarinstance = {
      month: null,
      weeks: [],
    };

    this.writePastMonth();
    this.writeCurrentMonth();
    this.writeNextMonth();
  }

  // write past month values
  writePastMonth() {
    const clone = this.currentMonthFirstDay.clone();
    const dayOfWeek = clone.weekday();

    // move for the correct day of the previous month
    clone.subtract(dayOfWeek + 1, 'days');

    // iterate on the remaining days of last month and plot then
    for (let i = dayOfWeek; i > 0; i -= 1) {
      this.writeDay(clone.add(1, 'days'));
    }
  }

  // write current month
  writeCurrentMonth() {
    const currentDay = this.currentMonthFirstDay.clone();
    this.calendarinstance.month = currentDay.format('MMMM YYYY');

    while (currentDay.month() === this.currentMonthFirstDay.month()) {
      this.writeDay(currentDay);
      currentDay.add(1, 'days');
    }
  }

  // write next month
  writeNextMonth() {
    const lastDayOfCurrentMonth = this.currentMonthFirstDay.clone()
      .add(1, 'months').subtract(1, 'days');
    const dayOfWeek = lastDayOfCurrentMonth.weekday();

    if (dayOfWeek === 6) {
      return;
    }

    for (let i = dayOfWeek; i < 6; i += 1) {
      this.writeDay(lastDayOfCurrentMonth.add(1, 'days'));
    }
  }

  // write day
  writeDay(day) {
    // write new week row if current day is sunday
    if (day.day() === 0) {
      this.calendarinstance.weeks.push([]);
    }

    // get current week to further push day informations
    const currentWeek = this.calendarinstance.weeks.slice(-1).pop();
    currentWeek.push({
      class: this.getDayClasses(day),
      value: day.format('DD'),
      date: day.format(),
    });
  }

  getDayClasses(day) {
    let classes = '';
    // check if it´s previous month day
    if (day.month() !== this.currentMonthFirstDay.month()) {
      classes += `${dayOutClass} `;
    // check if it´s today
    } else if (today.format() === day.format()) {
      classes += `${todayClass} `;
    } else if (this.selecteddate === day.format(dateFormat)) {
      classes += `${selectedDayClass} `;
    }
    // check if it´s weekend day
    if (day.day() === 0 || day.day() === 6) {
      classes += `${weekendDayClass} `;
    }
    return classes;
  }

  setApiCallPresentationDaysRange() {
    const viewPeriod = {
      start: this.currentMonthFirstDay.clone().subtract(7, 'days'),
      end: this.currentMonthFirstDay.clone().add(1, 'months').add(7, 'days'),
    };

    // format dates for compliance with api call request date format
    viewPeriod.start = viewPeriod.start.format(dateFormat);
    viewPeriod.end = viewPeriod.end.format(dateFormat);

    return viewPeriod;
  }

  goToMonth(type) {
    // opted for switch because in the future will be more cases (month selection, date)
    switch (type) {
      // previous month
      case 'previous': {
        this.currentMonthFirstDay.subtract(1, 'month');
        break;
      }
      // next month
      case 'next': {
        this.currentMonthFirstDay.add(1, 'month');
        break;
      }
      default: {
        return;
      }
    }

    // if business element has day selection handler
    if (this.configuration && this.configuration.onMonthChange) {
      this.configuration.onMonthChange(this.setApiCallPresentationDaysRange());
    }

    this.writeCalendarRepresentation();
  }

  onDateSelect(day) {
    // remove class from previous selected element in the representation
    this.calendarinstance.weeks.forEach((week) => {
      const previousSelectedDay = week.find(obj =>
        obj.class.includes(selectedDayClass));
      if (previousSelectedDay) {
        previousSelectedDay.class = previousSelectedDay.class
          .split(selectedDayClass).join('');
      }
    });
    day.class += ` ${selectedDayClass}`;

    // change property to attribute to trigger lit re-render
    this.selecteddate = moment(day.date).format(dateFormat);

    // if business element has day selection handler
    if (this.configuration.onDaySelection) {
      this.configuration.onDaySelection(this.selecteddate);
    }
  }

  // after receive data from api iterate through calendarInstance representation to include the received data information
  writeDayInformations() {
    const dataSource = this.srcdata;
    this.calendarinstance.weeks.forEach((week) => {
      week.forEach((day) => {
        const dayFormatted = moment(day.date).format(dateFormat);
        day.data = dataSource[dayFormatted];
      });
    });
  }

  formatCalendarField(data) {
    if (!data) {
      return '';
    }
    const { field = '' } = this.configuration || {};

    // function passed as column cell formatter
    if (isFunction(this.configuration.field)) {
      return this.configuration.field(data);
    }

    // or else return the below html structure
    return html`
      <span class="calendar__info">${data[field] || ''}</span>
    `;
  }

  render() {
    if (Object.entries(this.srcdata).length) {
      this.writeDayInformations();
    }

    return html`
      <style>
        @import url('sling-web-component-calendar/src/index.css');
      </style>
      <h2 class="calendar__month">
        ${this.calendarinstance.month}
        <div class="calendar__month-change">
          <sling-paginator configuration="${this.paginator}">
          </sling-paginator>
        </div>
      </h2>
      <div class="calendar">
        <ul class="calendar__week">
          <li class="calendar__week-day calendar__col_weekend">Dom</li>
          <li class="calendar__week-day">Seg</li>
          <li class="calendar__week-day">Ter</li>
          <li class="calendar__week-day">Qua</li>
          <li class="calendar__week-day">Qui</li>
          <li class="calendar__week-day">Sex</li>
          <li class="calendar__week-day calendar__col_weekend">Sáb</li>
        </ul>
        ${this.calendarinstance.weeks.map(week => html`
          <ul class="calendar__week">
            ${week.map(day => html`
              <li className="calendar__day ${day.class}"
                onclick="${() => this.onDateSelect(day)}">
                <div class="relative-wrapper">
                  <span class="calendar__day-value">${day.value}</span>
                  <div class="calendar__day-wrapper">
                    ${this.formatCalendarField(day.data)}
                  </div>
                </div>
              </li>
            `)}
          </ul>
        `)}
      </div>
    `;
  }
}
