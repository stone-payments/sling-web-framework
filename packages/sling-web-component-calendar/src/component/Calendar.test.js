import sinon from 'sinon';
import moment from 'moment/moment';
import { registerComponent } from 'sling-helpers';
import { Calendar } from './Calendar.js';

moment.locale('pt-BR');
registerComponent('sling-calendar', Calendar);

let $calendar;

describe('Calendar', () => {
  beforeEach((done) => {
    $calendar = document.createElement('sling-calendar');
    document.body.appendChild($calendar);
    setTimeout(done);
  });

  afterEach((done) => {
    document.body.removeChild($calendar);
    $calendar = undefined;
    setTimeout(done);
  });

  describe('Init', () => {
    it('Should init constructor with initial properties.', () => {
      expect($calendar.srcdata).to.deep.equal([]);
    });

    it('Should invoke goToMonth method when click on paginator buttom.', () => {
      $calendar.goToMonth = sinon.spy();

      $calendar.paginator.paginate('previous');
      expect($calendar.goToMonth.calledWith('previous'));
    });
  });

  describe('#writeCalendarRepresentation', () => {
    it('Should invoke month representation constructors.', () => {
      $calendar.writePastMonth = sinon.spy();
      $calendar.writeCurrentMonth = sinon.spy();
      $calendar.writeNextMonth = sinon.spy();

      $calendar.writeCalendarRepresentation();
      expect($calendar.writePastMonth.calledOnce);
      expect($calendar.writeCurrentMonth.calledOnce);
      expect($calendar.writeNextMonth.calledOnce);
    });
  });

  describe('write month view', () => {
    beforeEach(() => {
      $calendar.writeDay = sinon.spy();
      $calendar.currentMonthFirstDay = moment('2018-05-01');
    });

    it('Should write only two days from the previou month.', () => {
      $calendar.writePastMonth();
      expect($calendar.writeDay.calledTwice);
    });

    it('Should write only two days from the next month.', () => {
      $calendar.writeNextMonth();
      expect($calendar.writeDay.calledTwice);
    });

    it('Should not write any more days of next month if ' +
      'current month´s last week ends on saturday.', () => {
      $calendar.currentMonthFirstDay = moment('2018-03-01');
      $calendar.writeNextMonth();
      expect($calendar.writeDay.notCalled);
    });

    it('Should write a month day with selected class.', () => {
      const day = moment('2018-03-01');
      $calendar.selecteddate = '2018-03-01';
      $calendar.currentMonthFirstDay = day;
      expect($calendar.getDayClasses(day)).to
        .deep.equal('calendar__day_selected ');
    });
  });

  describe('month change pagination', () => {
    beforeEach(() => {
      $calendar.currentMonthFirstDay = moment('2018-03-01');
      $calendar.writeCalendarRepresentation = sinon.spy();
      $calendar.configuration = {
        onMonthChange: sinon.spy(),
      };
    });

    it('Should go to previous month.', () => {
      $calendar.goToMonth('previous');
      expect($calendar.currentMonthFirstDay).to.deep
        .equal(moment('2018-03-01').subtract(1, 'month'));
      expect($calendar.writeCalendarRepresentation.calledOnce);
    });

    it('Should go to next month.', () => {
      $calendar.goToMonth('next');
      expect($calendar.currentMonthFirstDay).to.deep
        .equal(moment('2018-03-01').add(1, 'month'));
      expect($calendar.writeCalendarRepresentation.calledOnce);
    });

    it('Should stay on the same month.', () => {
      const date = moment('2018-03-01');
      $calendar.currentMonthFirstDay = date;
      $calendar.goToMonth();
      expect($calendar.currentMonthFirstDay).to.deep
        .equal(date);
      expect($calendar.writeCalendarRepresentation.notCalled);
    });
  });

  describe('#onDateSelect', () => {
    beforeEach(() => {
      $calendar.currentMonthFirstDay = moment('2018-03-01');
      $calendar.calendarinstance = {
        weeks: [[{
          class: 'calendar__day_selected',
        }]],
      };
      $calendar.configuration = {
        onDaySelection: sinon.spy(),
      };
    });

    it('Should set the component selected date removing the previously ' +
      'selected one.', () => {
      const day = {
        class: '',
        date: moment('2018-03-01').format('YYYY-MM-DD'),
      };
      $calendar.onDateSelect(day);
      expect($calendar.calendarinstance.weeks).to.deep
        .equal([[{ class: '' }]]);
      expect($calendar.selecteddate).to.equal('2018-03-01');
      expect($calendar.configuration.onDaySelection.calledOnce);
    });
  });

  describe('#writeDayInformations', () => {
    it('Should write the calendar instance weeks data (one day only :) ).',
      () => {
        $calendar.configuration = {
          field: 'amount',
        };
        $calendar.calendarinstance.weeks = [[
          { date: '2018-03-01' },
        ]];
        $calendar.srcdata = {
          '2018-03-01': {
            amount: 10000,
          },
        };
        $calendar.writeDayInformations();
        expect($calendar.calendarinstance.weeks).to.deep
          .equal([[{
            date: '2018-03-01',
            data: {
              amount: 10000,
            },
          }]]);
      });
  });

  describe('#formatCalendarField', () => {
    it('Should return basic formatter because there is no data', () => {
      expect($calendar.formatCalendarField()).to.equal('');
    });

    it('Should return the business component formatter', () => {
      $calendar.configuration = {
        field: sinon.spy(),
      };
      $calendar.formatCalendarField('mock');
      expect($calendar.configuration.field.calledWith('mock'));
    });

    it('Should return the basic formatter html', () => {
      $calendar.configuration = {
        field: 'amount',
      };
      const html = sinon.spy();
      const mockData = { amount: 'mock' };
      $calendar.formatCalendarField(mockData);
      expect(html.calledOnce);
    });
  });
});
