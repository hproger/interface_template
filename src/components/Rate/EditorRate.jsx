import React, {Component} from 'react';
const WEEK_DAY = ['ПН','ВТ','СР','ЧТ','ПТ','СБ','ВС'];

class EditorRate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dismiss: false,
            // temporary variables begin
            average_call_time: [ // Среднее время звонка, сек
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            ],
            calls_per_hour: [ // Звонков в час
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            ],
            // temporary variables end
            sumCallsPerHour: 0, // "Среднее: шт в день" - расчёт из таблицы "Звонков в час"
            rate: 0,
            min_in_month: 1, // минут в месяц
            call_max: 1,
            call_min: 1,
            uniform_load_day: 0, // нагрузка равномерная в день / мин
            uniform_load_hour: 0, // в час / мин
            incom_call: 0, // среднее время исходящего звонка сек
            
            interfaceType: (this.props.rateUser && this.props.rateUser.data.interfaceType) ? this.props.rateUser.data.interfaceType : 'simple', // активный интерфейс 

            titleRate: this.props.rateUser ? this.props.rateUser.name : '',
            //rateData: this.props.rateUser ? this.props.rateUser.data : {},
            load_gain: this.props.rateUser ? this.props.rateUser.data.LoadGain : 1,

            average_num: 0,
            calls_per_hour_min: 0,
            calls_per_hour_max: 0,
            simultaneous_calls_min: 0,
            simultaneous_calls_max: 0,
            call_load: [
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            ],
            call_min_time: [
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            ],
            call_max_time: [
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            ],
            common_max_time: 0,
            common_min_time: 0,
            common_call_load: 0,
        }
    }
    /** ФУНКЦИЯ ПОЛУЧЕНИЯ НОВЫХ ДАННЫХ ПРИ ВЫБОРЕ ДЛЯ РЕДАКТИРОВАНИЯ КОЭФФИЦИЕНТА ИЗ СПИСКА */
    componentWillReceiveProps = (nextProps) => {
        console.log('nextProps',nextProps.rateUser)
        const cmint = nextProps.rateUser ? this.calcMinMaxLoad('call_min_time',  nextProps.rateUser.data.Call_min_time) : 1;
        const cmaxt = nextProps.rateUser ? this.calcMinMaxLoad('call_max_time', nextProps.rateUser.data.Call_max_time) : 1;
        if (nextProps.rateUser) {
            console.log('nextProps.rateUser.data.Call_load',nextProps.rateUser.data)
        }
        this.setState({
            interfaceType: (nextProps.rateUser && nextProps.rateUser.data.interfaceType) ? nextProps.rateUser.data.interfaceType : 'simple',
            titleRate: nextProps.rateUser ? nextProps.rateUser.name : '',
            load_gain: nextProps.rateUser ? nextProps.rateUser.data.LoadGain : 1,
            call_load: nextProps.rateUser ? nextProps.rateUser.data.Call_load : [
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            ],
            call_min_time: nextProps.rateUser ? nextProps.rateUser.data.Call_min_time : [
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            ],
            call_max_time: nextProps.rateUser ? nextProps.rateUser.data.Call_max_time : [
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            ],
            call_min: cmint,
            call_max: cmaxt,
            min_in_month: nextProps.rateUser ? this.calcMinMaxLoad('call_load', nextProps.rateUser.data.Call_load, nextProps.rateUser.data.LoadGain) : 1,
            average_num: nextProps.rateUser ? this.calcAverNmb(nextProps.rateUser.data.Call_min_time, nextProps.rateUser.data.Call_max_time, cmint, cmaxt, nextProps.rateUser.data.Call_load, nextProps.rateUser.data.LoadGain) : 0
        },()=>{
            console.log('this.state.average_num',this.state.average_num)
            this.calcTempArraysCPH(this.state.average_call_time,this.state.call_load);
        });
        let checkInputs = document.querySelectorAll('input[type="checkbox"]');
               
        for (const iterator of checkInputs) {
            iterator.checked = false
        }
    }
    /** ФУНКЦИЯ ОБРАБОТКИ ВВОДА  */
    handleInputChange = (event) => {
        const target = event.target;
        const name = target.name;
        const value = (name === 'load_gain') ? target.value.replace(/\D/, '') : target.value;
        
        // this.value.replace (/\D/, '') вводим только цифры
        this.setState({
          [name]: value
        });
    }
    /** ФУНКЦИЯ ОБРАБОТКИ ВВОДА В ПОЛЕ `МИН В МЕСЯЦ` ПРОСТОЙ ИНТЕРФЕЙС */
    handleInputMinMonth = (event) => {
        const target = event.target;
        let value = target.value ? target.value.replace(/\D/, '') : '';
        value = value ? parseFloat(value) : '';
        const LD = Math.round(value/30);
        const LH = Math.round(LD/24);
        var callLD = [
            [LH, LH, LH, LH, LH, LH, LH, LH, LH, LH, LH, LH, LH, LH, LH, LH, LH, LH, LH, LH, LH, LH, LH, LH],
            [LH, LH, LH, LH, LH, LH, LH, LH, LH, LH, LH, LH, LH, LH, LH, LH, LH, LH, LH, LH, LH, LH, LH, LH],
            [LH, LH, LH, LH, LH, LH, LH, LH, LH, LH, LH, LH, LH, LH, LH, LH, LH, LH, LH, LH, LH, LH, LH, LH],
            [LH, LH, LH, LH, LH, LH, LH, LH, LH, LH, LH, LH, LH, LH, LH, LH, LH, LH, LH, LH, LH, LH, LH, LH],
            [LH, LH, LH, LH, LH, LH, LH, LH, LH, LH, LH, LH, LH, LH, LH, LH, LH, LH, LH, LH, LH, LH, LH, LH],
            [LH, LH, LH, LH, LH, LH, LH, LH, LH, LH, LH, LH, LH, LH, LH, LH, LH, LH, LH, LH, LH, LH, LH, LH],
            [LH, LH, LH, LH, LH, LH, LH, LH, LH, LH, LH, LH, LH, LH, LH, LH, LH, LH, LH, LH, LH, LH, LH, LH]
        ];
        this.setState({
          min_in_month: value,
          average_num: value,
          uniform_load_day: LD,
          uniform_load_hour: LH,
          call_load: callLD
        }, this.calcAverNmb(this.state.call_min_time, this.state.call_max_time, this.state.call_min,this.state.call_max,this.state.call_load,true));
    }
    /** ФУНКЦИЯ ОБРАБОТКИ ВВОДА В ПОЛЕ `ЗВОНОК MAX` ПРОСТОЙ ИНТЕРФЕЙС */
    handleInputCallMax = (event) => {
        const target = event.target;
        let value = target.value ? target.value.replace(/\D/, '') : '';
        value = value ? parseFloat(value) : '';
        // if (this.state.call_min >= value) {
        //     alert('Звонок макс. должен быть больше Звонок мин. !');
        //     return;
        // }
        const ic = ((value - this.state.call_min)/2)+this.state.call_min;
        var callMT = [
            [value, value, value, value, value, value, value, value, value, value, value, value, value, value, value, value, value, value, value, value, value, value, value, value],
            [value, value, value, value, value, value, value, value, value, value, value, value, value, value, value, value, value, value, value, value, value, value, value, value],
            [value, value, value, value, value, value, value, value, value, value, value, value, value, value, value, value, value, value, value, value, value, value, value, value],
            [value, value, value, value, value, value, value, value, value, value, value, value, value, value, value, value, value, value, value, value, value, value, value, value],
            [value, value, value, value, value, value, value, value, value, value, value, value, value, value, value, value, value, value, value, value, value, value, value, value],
            [value, value, value, value, value, value, value, value, value, value, value, value, value, value, value, value, value, value, value, value, value, value, value, value],
            [value, value, value, value, value, value, value, value, value, value, value, value, value, value, value, value, value, value, value, value, value, value, value, value]
        ];
        
        this.setState({
          call_max: value,
          incom_call: ic,
          call_max_time: callMT
        },this.calcAverNmb(this.state.call_min_time, this.state.call_max_time, this.state.call_min,this.state.call_max,this.state.call_load,true));
        
    }
    /** ФУНКЦИЯ ОБРАБОТКИ ВВОДА В ПОЛЕ `ЗВОНОК MIN` ПРОСТОЙ ИНТЕРФЕЙС */
    handleInputCallMin = (event) => {
        const target = event.target;
        let value = target.value ? target.value.replace(/\D/, '') : '';
        value = value ? parseFloat(value) : '';
        // if (this.state.call_max <= value) {
        //     alert('Звонок мин. должен быть меньше Звонок макс. !');
        //     return;
        // }
        const ic = ((this.state.call_max - value)/2)+value;
        var callMT = [
            [value, value, value, value, value, value, value, value, value, value, value, value, value, value, value, value, value, value, value, value, value, value, value, value],
            [value, value, value, value, value, value, value, value, value, value, value, value, value, value, value, value, value, value, value, value, value, value, value, value],
            [value, value, value, value, value, value, value, value, value, value, value, value, value, value, value, value, value, value, value, value, value, value, value, value],
            [value, value, value, value, value, value, value, value, value, value, value, value, value, value, value, value, value, value, value, value, value, value, value, value],
            [value, value, value, value, value, value, value, value, value, value, value, value, value, value, value, value, value, value, value, value, value, value, value, value],
            [value, value, value, value, value, value, value, value, value, value, value, value, value, value, value, value, value, value, value, value, value, value, value, value],
            [value, value, value, value, value, value, value, value, value, value, value, value, value, value, value, value, value, value, value, value, value, value, value, value]
        ];
        
        this.setState({
          call_min: value,
          incom_call: ic,
          call_min_time: callMT
        },this.calcAverNmb(this.state.call_min_time, this.state.call_max_time, this.state.call_min,this.state.call_max,this.state.call_load,true));
    }
    /** ФУНКЦИЯ СБРОСА ДАННЫХ */
    handleResetState = () => {
        this.setState({
            min_in_month: 0, // минут в месяц
            call_max: 0,
            call_min: 0,
            uniform_load_day: 0, // нагрузка равномерная в день / мин
            uniform_load_hour: 0, // в час / мин
            incom_call: 0, // среднее время исходящего звонка сек
            
            interfaceType: 'simple', // активный интерфейс

            titleRate: '',
            //rateData: this.props.rateUser ? this.props.rateUser.data : {},
            load_gain: 1,

            average_num: 0,
            calls_per_hour_min: 0,
            calls_per_hour_max: 0,
            simultaneous_calls_min: 0,
            simultaneous_calls_max: 0,
            call_load: [
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            ],
            call_min_time: [
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            ],
            call_max_time: [
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            ],
            common_max_time: 0,
            common_min_time: 0,
            common_call_load: 0,
        });
        this.props.handleHide();
    }
    /** ФУНКЦИЯ ОБРАБОТКИ УСТАНОВКИ ЕДИНОГО ЗНАЧЕНИЯ ДЛЯ СТРОКИ/СТОЛБЦА В РАСШИРЕННОМ ИНТЕРФЕЙСЕ */
    checkActive = (event, num, arrState , direction = 'vert') => {
        let newArrayState = this.state[arrState];
        if (direction === 'row') {
            if (event.target.checked) {
                const i = parseInt(event.target.dataset.key);
            
                for (let j = 0; j < 24; j++) {
                    newArrayState[i][j] = parseInt(num);
                }
            }
            
        }
        else {
            if (event.target.checked) {
                const j = parseInt(event.target.dataset.key);
                
                for (let i = 0; i < 7; i++) {
                    newArrayState[i][j] = parseInt(num);
                }
            }
        }
        const aver = this.calcMinMaxLoad(arrState, newArrayState);
        let averNmb;
        let callType = '';
        if (arrState === 'call_min_time') {
            callType = 'call_min';
            averNmb = this.calcAverNmb(newArrayState, this.state.call_max_time, aver,this.state.call_max,this.state.call_load);
        }
        else if (arrState === 'call_max_time'){
            callType = 'call_max';
            averNmb = this.calcAverNmb(this.state.call_min_time, newArrayState, this.state.call_min,aver,this.state.call_load);
        }
        else if (arrState === 'call_load'){
            callType = 'min_in_month';
            averNmb = this.calcAverNmb(this.state.call_min_time, this.state.call_max_time, this.state.call_min,this.state.call_max,newArrayState);
        }
        console.log('checkActive')
        this.setState({
            [arrState] : newArrayState,
            [callType]: aver,
            average_num: averNmb
        })
    }
    /** ФУНКЦИЯ ОБРАБОТКИ ПЕРЕКЛЮЧЕНИЯ ИНТЕРФЕЙСА */
    handlerSelectInterface = (event) => {
        const target = event.target;
        const value = target.value;
        this.setState({
            interfaceType: value
        });
    }
    checkRequiredFields = () => {
        // ПРОВЕРКА МИНИМАЛЬНОГО И МАКСИМАЛЬНОГО ЗНАЧЕНИЯ ПОЛЕЙ "Длительность звонка" В ПРОСТОМ ИНТЕРФЕЙСЕ
        if (this.state.call_max < this.state.call_min) { alert('Значение "Длительность min" должно быть меньше значения "Длительность max" !'); return false; }
        
        // ПРОВЕРКА МАССИВОВ МИНИМАЛЬНОГО И МАКСИМАЛЬНОГО ЗНАЧЕНИЯ КАЖДОЙ ЯЧЕЙКИ "Длительность звонка"
        for (let i = 0; i < this.state.call_max_time.length; i++) {
            const row = this.state.call_max_time[i];
            for (let j = 0; j < row.length; j++) {
                const max_cell = this.state.call_max_time[i][j];
                const min_cell = this.state.call_min_time[i][j];
                if (max_cell<min_cell) {
                    alert(`Значение "Максимальное время" в строке ${i+1} и колонке ${j+1}, меньше значения "Минимальное время"!`);
                    return false;
                }
            }
        }

        // ПРОВЕРКА НА ПУСТОТУ ПОЛЯ "Минут в месяц" В ПРОСТОМ ИНТЕРФЕЙСЕ
        if (this.state.min_in_month === '') { alert('Заполните поле "Минут в месяц" !'); return false; }

        return true;
    }
    /** ФУНКЦИЯ СОХРАНЕНИЯ ДАННЫХ ПО КОЭФФИЦИЕНТУ */
    saveRate = () => {
        const checkreqfiedls = this.checkRequiredFields();
        
        if (!checkreqfiedls) {
            return;
        }
        this.setState({
            dismiss: true
        });

        const id = this.props.rateUser ? this.props.rateUser.id : 0;
        const name = this.state.titleRate;
        const average_day = Math.round(this.state.sumCallsPerHour);
		console.log("TCL: EditorRate -> saveRate -> average_day", average_day)
        const data = {
            interfaceType: this.state.interfaceType,
            LoadGain: this.state.load_gain,
            Call_load: this.state.call_load,
            Call_min_time: this.state.call_min_time,
            Call_max_time: this.state.call_max_time,
            average_day,
        };
        this.props.handleSave({id, name, data});
    }
    /** ФУНКИЦЯ ОБРАБОТКИ ВВОДА В ПОЛЯ ТАБЛИЦ РАСШИРЕННОГО ИНТЕРФЕЙСА */
    changeInputsCallTime = (event,arrName) =>  {
        const target = event.target;
        const value = parseInt(target.value ? target.value.replace(/\D/, '') : 0);
        const row = target.dataset.row;
        const cell = target.dataset.cell;
        let call_arr = this.state[arrName];
        call_arr[row][cell] = value;
        const aver = this.calcMinMaxLoad(arrName, call_arr);
        const averNmb = this.calcAverNmb(this.state.call_min_time, this.state.call_max_time, this.state.call_min,this.state.call_max,this.state.call_load);
        let callType = '';
        if (arrName === 'call_min_time') {
            callType = 'call_min';
        }
        else if (arrName === 'call_max_time'){
            callType = 'call_max';
        }
        else if (arrName === 'call_load'){
            callType = 'min_in_month';
        }
        console.log('функция changeInputsCallTime')
        this.setState({
            [arrName] : call_arr,
            [callType]: aver,
            average_num: averNmb
        }, this.calcTempArraysCPH(this.state.average_call_time, this.state.call_load));
    }
    /** ФУНКЦИЯ РАСЧЁТА MIN/MAX ВРЕМЕНИ ЗВОНКА И ОБЩЕГО КОЛИЧЕСТВА МИНУТ В МЕСЯЦ ( ПЕРЕСЧЁТ ИЗ РАСШИРЕННОГО ИНТЕРФЕЙСА В ПРОСТОЙ ) */
    calcMinMaxLoad = (arrName, call_arr, ...tmp) => {
        let sum = 0;
        for (let i = 0; i < call_arr.length; i++) {
            let sumLine = 0;
            for (let j = 0; j < call_arr[i].length; j++) {
                const element = call_arr[i][j];
                sumLine += element;
            }
            sum += sumLine;
        }
        
        if ((arrName === 'call_load')){
            const LD = Math.round((sum/7));
            const LH = Math.round((sum/7)/24);
            this.setState({
                uniform_load_day: LD,
                uniform_load_hour: LH,
            });
        }
        let lg = tmp.length > 0 ? tmp[0] : this.state.load_gain;
        let vr_sum = Math.round((arrName === 'call_load') ? (((sum/7)*30) * lg) : sum/168);
        
        return vr_sum;
    }
    /** ФУНКЦИЯ РАСЧЁТА `Среднее время звонка, сек`  */
    calcAverNmb = (cmint,cmaxt, ...temporary) => {
        let averNmb = 0, tempArr = [];
        const callLD = temporary[2];
        for (let i = 0; i < cmaxt.length; i++) {
            let tempLineArr = [];
            for (let j = 0; j < cmaxt[i].length; j++) {
                tempLineArr.push(Math.round( ( ( cmaxt[i][j] - cmint[i][j] ) / 2 ) + cmint[i][j] ));
                //averNmb += Math.round( ( ( cmaxt[i][j] - cmint[i][j] ) / 2 ) + cmint[i][j] );
                averNmb += callLD[i][j];
            }
            tempArr.push(tempLineArr);
        }
        const ic = temporary ? Math.round( ( ( temporary[1] - temporary[0] ) / 2 ) + temporary[0] ) : 0;
        console.log('функция calcAverNmb')
        this.setState({
            average_call_time: tempArr, // ТАБЛИЦА "СРЕДНЕЕ ВРЕМЯ ЗВОНКА"
            incom_call: ic
        }, this.calcTempArraysCPH(tempArr, temporary[2]));
        
        //averNmb = Math.round( ( (averNmb / 60 ) / 7 ) * 30 ); // преобразуем из секунд в минуты и получаем "Среднее: мин за месяц"
        if (temporary[3] && (typeof temporary[3] === 'number')) {
            averNmb = Math.round( (temporary[3]) ? ((( averNmb / 7 ) * 30) * temporary[3]) : ( averNmb / 7 ) * 30 );
            return Math.round(averNmb);
        }
        
    }
    
    /** ФУНКЦИЯ ДЛЯ РАСЧЁТА ТАБЛИЦЫ `ЗВОНКОВ В ЧАС` И ВЫЧИСЛЕНИЯ MIN/MAX ЗНАЧЕНИЙ */
    calcTempArraysCPH = (act, call_load) => {
        // console.log('среднее время звонка, сек.',act)
        // console.log('call_load',call_load) // Нагрузка, минут в час 
        console.log('this.state.average_call_time',act)
        console.log('нагрузка',call_load)
        
        let lg = this.state.load_gain ? this.state.load_gain : 1;
        let tempArr = [], minNumb = 0, maxNumb = 0;
        let sumCallsPerHour = 0;
        console.log('сработало')
        for (let i = 0; i < call_load.length; i++) {
            let tempLineArr = [];
            for (let j = 0; j < call_load[i].length; j++) {
                const tempVar = act[i][j] > 0 ? parseFloat(( ( (call_load[i][j]*lg) * 60 ) / act[i][j] ).toFixed(2)) : 0;
                sumCallsPerHour += tempVar;
                if (minNumb === 0 || minNumb > tempVar) {
                    minNumb = tempVar;
                }
                if (maxNumb < tempVar) {
                    maxNumb = tempVar;
                }
                tempLineArr.push(tempVar);
            }
            tempArr.push(tempLineArr);
        }
        sumCallsPerHour = Math.round(sumCallsPerHour/7);
        console.log('Среднее: шт в день',sumCallsPerHour)
        this.setState({
            calls_per_hour: tempArr,
            calls_per_hour_min: minNumb,
            calls_per_hour_max: maxNumb,
            sumCallsPerHour
        }, this.calcTempArraysSC(tempArr,act))
    }
    /** ФУНКЦИЯ ДЛЯ РАСЧЁТА MIN/MAX ОДНОВРЕМЕННЫХ ЗВОНКОВ  */
    calcTempArraysSC = (cph,act) => {
        let minNumb = 0, maxNumb = 0;
        for (let i = 0; i < act.length; i++) {
            for (let j = 0; j < act[i].length; j++) {
                const tempVar = cph[i][j] > 0 ? parseFloat(( act[i][j] / ( 3600 / cph[i][j] ) ).toFixed(2)) : 0;
                if (minNumb === 0 || minNumb > tempVar) {
                    minNumb = tempVar;
                }
                if (maxNumb < tempVar) {
                    maxNumb = tempVar;
                }
            }
        }
        this.setState({
            simultaneous_calls_min: minNumb,
            simultaneous_calls_max: maxNumb
        })
    }
    /* ФУНКЦИЯ ДЛЯ УСТАНОВКИ ОДНОГО ЗНАЧЕНИЯ ВСЕМ ЯЧЕЙКАМ В РАСШИРЕННОМ ИНТЕРФЕЙСЕ */
    checkAllCells = (arrState) => {
        let newArrayState = this.state[arrState];
        let num = 0;
        if (arrState === 'call_min_time') {
            num = this.state.common_min_time
        }
        else if (arrState === 'call_max_time') {
            num = this.state.common_max_time
        }
        else if (arrState === 'call_load') {
            num = this.state.common_call_load
        }
        for (let i = 0; i < newArrayState.length; i++) {
            const element = newArrayState[i];
            for (let j = 0; j < element.length; j++) {
                newArrayState[i][j] = num;
            }
        }
        const aver = this.calcMinMaxLoad(arrState, newArrayState);
        let averNmb;
        let callType = '';
        if (arrState === 'call_min_time') {
            callType = 'call_min';
            averNmb = this.calcAverNmb(newArrayState, this.state.call_max_time, aver,this.state.call_max,this.state.call_load);
        }
        else if (arrState === 'call_max_time'){
            callType = 'call_max';
            averNmb = this.calcAverNmb(this.state.call_min_time, newArrayState, this.state.call_min,aver,this.state.call_load);
        }
        else if (arrState === 'call_load'){
            callType = 'min_in_month';
            averNmb = this.calcAverNmb(this.state.call_min_time, this.state.call_max_time, this.state.call_min,this.state.call_max, newArrayState);
        }
        this.setState({
            [arrState] : newArrayState,
            [callType]: aver,
            average_num: averNmb
        });
    }
    /* ФУНКЦИЯ ИЗМЕНЕНИЯ ЗНАЧЕНИЯ В ПОЛЕ КОЭФФИЦИЕНТ */
    changeKo = (gain) => {
        this.setState({
            load_gain: gain ? gain : 0
        },()=>{
            const aver = this.calcMinMaxLoad('call_load', this.state.call_load);
            this.calcTempArraysCPH(this.state.average_call_time,this.state.call_load);
            
            this.setState({
                min_in_month: aver,
                average_num : aver
            });
        });
    }
    render() {
        return(
            <div className="modal fade" id="editor-rate">
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                            <h4 className="modal-title">▶ {this.props.title}</h4>
                        </div>
                        <div className="modal-body">
                        <div className="editor_rateUser">
                            <form method="POST">
                                <div className="form-group row_inputs jcsb">
                                    <div className="item-col">
                                        <label htmlFor="titleRate" className="col-form-label">Имя</label>
                                        <input type="text" className="form-control" id="titleRate" name="titleRate" placeholder="Нагрузка равномерная" value={this.state.titleRate} onChange={this.handleInputChange} />
                                    </div>
                                    <div className="item-col">
                                        
                                        <select name="_selectInterface" id="input_selectInterface" className="form-control" onChange={this.handlerSelectInterface} value={this.state.interfaceType}>
                                            <option value="simple">Простой интерфейс</option>
                                            <option value="extended">Расширенный интерфейс</option>
                                        </select>
                                        
                                    </div>
                                </div>
                                
                                    <div className="simple-interface form-group" style={{ display: this.state.interfaceType === 'extended' && 'none' }}>
                                        <div className="row_inputs">
                                            <div className="item-col">
                                                <label htmlFor="min_in_month" className="col-form-label">Минут в месяц</label>
                                                <input type="text" className="form-control" id="min_in_month" name="min_in_month" placeholder="300" value={this.state.min_in_month} onChange={this.handleInputMinMonth} /> мин.                                     
                                            </div>
                                            
                                        </div>
                                        <div className="row_inputs">
                                            <div className="item-col">
                                                <label htmlFor="call_min" className="col-form-label">Длительность min</label>
                                                <input type="text" className="form-control" id="call_min" name="call_min" placeholder="25" value={this.state.call_min} onChange={this.handleInputCallMin} /> сек.
                                            </div>
                                            <div className="item-col">
                                                <label htmlFor="call_max" className="col-form-label">Длительность max</label>
                                                <input type="text" className="form-control" id="call_max" name="call_max" placeholder="300" value={this.state.call_max} onChange={this.handleInputCallMax} /> сек.
                                            </div>
                                        </div>
                                        <div className="output_data">
                                            <div className="title">Расчёт</div>
                                            <div className="table_odata">
                                                <div className="uniform_load">
                                                    <div className="title_uload">Нагрузка равномерная</div>
                                                    <div className="day_uload">В день {this.state.uniform_load_day} мин.</div>
                                                    <div className="hour_uload">В час {this.state.uniform_load_hour} мин.</div>
                                                </div>
                                                <div className="incoming_call">
                                                    <div className="title_icall">Исходящий звонок</div>
                                                    <div className="average_icall">
                                                        <span>Среднее время {this.state.incom_call} сек.</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                
                                    <div className="extended-inter" style={{ display: this.state.interfaceType === 'simple' && 'none' }}> 
                                    
                                    <div className="panel panel-default">
                                          <div className="panel-heading">
                                                <h3 className="panel-title">Мин/макс время звонка</h3>
                                          </div>
                                          <div className="panel-body">
                                            
                                            <div className="table-responsive grid-rate">
                                                <h5>Минимальное время <input type="text" name="common_min_time" id="common_min_time" className="form-control" value={this.state.common_min_time} onChange={(e)=>this.setState({common_min_time: (e.target.value) ? parseInt(e.target.value) : 0})} /> 
                                                <button type="button" className="btn btn-default common_min_time" onClick={()=>this.checkAllCells('call_min_time')}>Задать всем</button>
                                                </h5>
                                                <table className="table table-hover">
                                                    <tbody>
                                                        {this.state.call_min_time.map((val_load, index)=>(
                                                            <tr key={index}>
                                                                <td>
                                                                    <span className="grid-label vertical">{WEEK_DAY[index]}</span>
                                                                    <input type="checkbox" data-key={index} onChange={(event) => this.checkActive(event, this.state.common_min_time, 'call_min_time', 'row')} />
                                                                </td>
                                                                {val_load.map((val, ind)=>(
                                                                    <td key={'col'+ind}>
                                                                        <input type="text" data-cell={ind} data-row={index} name={'min-time_r'+index+'c'+ind} id={'input-min-time_r'+index+'c'+ind} className="form-control" value={val} onChange={(e)=>this.changeInputsCallTime(e,'call_min_time')} />
                                                                    </td>
                                                                ))}
                                                            </tr>
                                                        ))}
                                                        
                                                        <tr className="checkInputs">
                                                            <td></td>
                                                            <td><input type="checkbox" data-key="0" onChange={(event) => this.checkActive(event, this.state.common_min_time, 'call_min_time')} /><br/><span className="grid-label horizontal">00</span></td>
                                                            <td><input type="checkbox" data-key="1" onChange={(event) => this.checkActive(event, this.state.common_min_time, 'call_min_time')} /><br/><span className="grid-label horizontal">01</span></td>
                                                            <td><input type="checkbox" data-key="2" onChange={(event) => this.checkActive(event, this.state.common_min_time, 'call_min_time')} /><br/><span className="grid-label horizontal">02</span></td>
                                                            <td><input type="checkbox" data-key="3" onChange={(event) => this.checkActive(event, this.state.common_min_time, 'call_min_time')} /><br/><span className="grid-label horizontal">03</span></td>
                                                            <td><input type="checkbox" data-key="4" onChange={(event) => this.checkActive(event, this.state.common_min_time, 'call_min_time')} /><br/><span className="grid-label horizontal">04</span></td>
                                                            <td><input type="checkbox" data-key="5" onChange={(event) => this.checkActive(event, this.state.common_min_time, 'call_min_time')} /><br/><span className="grid-label horizontal">05</span></td>
                                                            <td><input type="checkbox" data-key="6" onChange={(event) => this.checkActive(event, this.state.common_min_time, 'call_min_time')} /><br/><span className="grid-label horizontal">06</span></td>
                                                            <td><input type="checkbox" data-key="7" onChange={(event) => this.checkActive(event, this.state.common_min_time, 'call_min_time')} /><br/><span className="grid-label horizontal">07</span></td>
                                                            <td><input type="checkbox" data-key="8" onChange={(event) => this.checkActive(event, this.state.common_min_time, 'call_min_time')} /><br/><span className="grid-label horizontal">08</span></td>
                                                            <td><input type="checkbox" data-key="9" onChange={(event) => this.checkActive(event, this.state.common_min_time, 'call_min_time')} /><br/><span className="grid-label horizontal">09</span></td>
                                                            <td><input type="checkbox" data-key="10" onChange={(event) => this.checkActive(event, this.state.common_min_time, 'call_min_time')} /><br/><span className="grid-label horizontal">10</span></td>
                                                            <td><input type="checkbox" data-key="11" onChange={(event) => this.checkActive(event, this.state.common_min_time, 'call_min_time')} /><br/><span className="grid-label horizontal">11</span></td>
                                                            <td><input type="checkbox" data-key="12" onChange={(event) => this.checkActive(event, this.state.common_min_time, 'call_min_time')} /><br/><span className="grid-label horizontal">12</span></td>
                                                            <td><input type="checkbox" data-key="13" onChange={(event) => this.checkActive(event, this.state.common_min_time, 'call_min_time')} /><br/><span className="grid-label horizontal">13</span></td>
                                                            <td><input type="checkbox" data-key="14" onChange={(event) => this.checkActive(event, this.state.common_min_time, 'call_min_time')} /><br/><span className="grid-label horizontal">14</span></td>
                                                            <td><input type="checkbox" data-key="15" onChange={(event) => this.checkActive(event, this.state.common_min_time, 'call_min_time')} /><br/><span className="grid-label horizontal">15</span></td>
                                                            <td><input type="checkbox" data-key="16" onChange={(event) => this.checkActive(event, this.state.common_min_time, 'call_min_time')} /><br/><span className="grid-label horizontal">16</span></td>
                                                            <td><input type="checkbox" data-key="17" onChange={(event) => this.checkActive(event, this.state.common_min_time, 'call_min_time')} /><br/><span className="grid-label horizontal">17</span></td>
                                                            <td><input type="checkbox" data-key="18" onChange={(event) => this.checkActive(event, this.state.common_min_time, 'call_min_time')} /><br/><span className="grid-label horizontal">18</span></td>
                                                            <td><input type="checkbox" data-key="19" onChange={(event) => this.checkActive(event, this.state.common_min_time, 'call_min_time')} /><br/><span className="grid-label horizontal">19</span></td>
                                                            <td><input type="checkbox" data-key="20" onChange={(event) => this.checkActive(event, this.state.common_min_time, 'call_min_time')} /><br/><span className="grid-label horizontal">20</span></td>
                                                            <td><input type="checkbox" data-key="21" onChange={(event) => this.checkActive(event, this.state.common_min_time, 'call_min_time')} /><br/><span className="grid-label horizontal">21</span></td>
                                                            <td><input type="checkbox" data-key="22" onChange={(event) => this.checkActive(event, this.state.common_min_time, 'call_min_time')} /><br/><span className="grid-label horizontal">22</span></td>
                                                            <td><input type="checkbox" data-key="23" onChange={(event) => this.checkActive(event, this.state.common_min_time, 'call_min_time')} /><br/><span className="grid-label horizontal">23</span></td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div className="table-responsive grid-rate">
                                                <h5>Максимальное время <input type="text" name="common_max_time" id="common_max_time" className="form-control" value={this.state.common_max_time} onChange={(e)=>this.setState({common_max_time: (e.target.value) ? parseInt(e.target.value) : 0})} /> 
                                            <button type="button" className="btn btn-default common_max_time" onClick={()=>this.checkAllCells('call_max_time')}>Задать всем</button></h5>
                                                <table className="table table-hover">
                                                    <tbody>
                                                        {this.state.call_max_time.map((val_load, index)=>(
                                                            <tr key={index}>
                                                                <td>
                                                                    <span className="grid-label vertical">{WEEK_DAY[index]}</span>
                                                                    <input type="checkbox" data-key={index} onChange={(event) => this.checkActive(event, this.state.common_max_time, 'call_max_time', 'row')} />
                                                                </td>
                                                                {val_load.map((val, ind)=>(
                                                                    <td key={'col'+ind}>
                                                                        <input type="text" data-cell={ind} data-row={index} name={'max-time_r'+index+'c'+ind} id={'input-max-time_r'+index+'c'+ind} className="form-control" value={val} onChange={(e)=>this.changeInputsCallTime(e,'call_max_time')} />
                                                                    </td>
                                                                ))}
                                                            </tr>
                                                        ))}
                                                        
                                                        <tr className="checkInputs">
                                                            <td></td>
                                                            <td><input type="checkbox" data-key="0" onChange={(event) => this.checkActive(event, this.state.common_max_time, 'call_max_time')} /><br/><span className="grid-label horizontal">00</span></td>
                                                            <td><input type="checkbox" data-key="1" onChange={(event) => this.checkActive(event, this.state.common_max_time, 'call_max_time')} /><br/><span className="grid-label horizontal">01</span></td>
                                                            <td><input type="checkbox" data-key="2" onChange={(event) => this.checkActive(event, this.state.common_max_time, 'call_max_time')} /><br/><span className="grid-label horizontal">02</span></td>
                                                            <td><input type="checkbox" data-key="3" onChange={(event) => this.checkActive(event, this.state.common_max_time, 'call_max_time')} /><br/><span className="grid-label horizontal">03</span></td>
                                                            <td><input type="checkbox" data-key="4" onChange={(event) => this.checkActive(event, this.state.common_max_time, 'call_max_time')} /><br/><span className="grid-label horizontal">04</span></td>
                                                            <td><input type="checkbox" data-key="5" onChange={(event) => this.checkActive(event, this.state.common_max_time, 'call_max_time')} /><br/><span className="grid-label horizontal">05</span></td>
                                                            <td><input type="checkbox" data-key="6" onChange={(event) => this.checkActive(event, this.state.common_max_time, 'call_max_time')} /><br/><span className="grid-label horizontal">06</span></td>
                                                            <td><input type="checkbox" data-key="7" onChange={(event) => this.checkActive(event, this.state.common_max_time, 'call_max_time')} /><br/><span className="grid-label horizontal">07</span></td>
                                                            <td><input type="checkbox" data-key="8" onChange={(event) => this.checkActive(event, this.state.common_max_time, 'call_max_time')} /><br/><span className="grid-label horizontal">08</span></td>
                                                            <td><input type="checkbox" data-key="9" onChange={(event) => this.checkActive(event, this.state.common_max_time, 'call_max_time')} /><br/><span className="grid-label horizontal">09</span></td>
                                                            <td><input type="checkbox" data-key="10" onChange={(event) => this.checkActive(event, this.state.common_max_time, 'call_max_time')} /><br/><span className="grid-label horizontal">10</span></td>
                                                            <td><input type="checkbox" data-key="11" onChange={(event) => this.checkActive(event, this.state.common_max_time, 'call_max_time')} /><br/><span className="grid-label horizontal">11</span></td>
                                                            <td><input type="checkbox" data-key="12" onChange={(event) => this.checkActive(event, this.state.common_max_time, 'call_max_time')} /><br/><span className="grid-label horizontal">12</span></td>
                                                            <td><input type="checkbox" data-key="13" onChange={(event) => this.checkActive(event, this.state.common_max_time, 'call_max_time')} /><br/><span className="grid-label horizontal">13</span></td>
                                                            <td><input type="checkbox" data-key="14" onChange={(event) => this.checkActive(event, this.state.common_max_time, 'call_max_time')} /><br/><span className="grid-label horizontal">14</span></td>
                                                            <td><input type="checkbox" data-key="15" onChange={(event) => this.checkActive(event, this.state.common_max_time, 'call_max_time')} /><br/><span className="grid-label horizontal">15</span></td>
                                                            <td><input type="checkbox" data-key="16" onChange={(event) => this.checkActive(event, this.state.common_max_time, 'call_max_time')} /><br/><span className="grid-label horizontal">16</span></td>
                                                            <td><input type="checkbox" data-key="17" onChange={(event) => this.checkActive(event, this.state.common_max_time, 'call_max_time')} /><br/><span className="grid-label horizontal">17</span></td>
                                                            <td><input type="checkbox" data-key="18" onChange={(event) => this.checkActive(event, this.state.common_max_time, 'call_max_time')} /><br/><span className="grid-label horizontal">18</span></td>
                                                            <td><input type="checkbox" data-key="19" onChange={(event) => this.checkActive(event, this.state.common_max_time, 'call_max_time')} /><br/><span className="grid-label horizontal">19</span></td>
                                                            <td><input type="checkbox" data-key="20" onChange={(event) => this.checkActive(event, this.state.common_max_time, 'call_max_time')} /><br/><span className="grid-label horizontal">20</span></td>
                                                            <td><input type="checkbox" data-key="21" onChange={(event) => this.checkActive(event, this.state.common_max_time, 'call_max_time')} /><br/><span className="grid-label horizontal">21</span></td>
                                                            <td><input type="checkbox" data-key="22" onChange={(event) => this.checkActive(event, this.state.common_max_time, 'call_max_time')} /><br/><span className="grid-label horizontal">22</span></td>
                                                            <td><input type="checkbox" data-key="23" onChange={(event) => this.checkActive(event, this.state.common_max_time, 'call_max_time')} /><br/><span className="grid-label horizontal">23</span></td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                          </div>
                                    </div>
                                    
                                    <div className="panel panel-default">
                                          <div className="panel-heading">
                                                <h3 className="panel-title">Нагрузка (минут в час) <input type="text" name="common_call_load" id="common_call_load" className="form-control" value={this.state.common_call_load} onChange={(e)=>this.setState({common_call_load: (e.target.value) ? parseInt(e.target.value) : 0})} /> 
                                            <button type="button" className="btn btn-default common_call_load" onClick={()=>this.checkAllCells('call_load')}>Задать всем</button></h3>
                                          </div>
                                          <div className="panel-body">
                                            <div className="table-responsive grid-rate">
                                                    <table className="table table-hover">
                                                        <tbody>
                                                            {this.state.call_load.map((val_load, index)=>(
                                                                <tr key={index}>
                                                                    <td>
                                                                        <span className="grid-label vertical">{WEEK_DAY[index]}</span>
                                                                        <input type="checkbox" data-key={index} onChange={(event) => this.checkActive(event, this.state.common_call_load, 'call_load', 'row')} />
                                                                    </td>
                                                                    {val_load.map((val, ind)=>(
                                                                        <td key={'col'+ind}>
                                                                            
                                                                            <input type="text" data-cell={ind} data-row={index} name={'call-load_r'+index+'c'+ind} id={'input-call-load_r'+index+'c'+ind} className="form-control" value={val} onChange={(e)=>this.changeInputsCallTime(e,'call_load')} />
                                                                            
                                                                        </td>
                                                                    ))}
                                                                </tr>
                                                            ))}
                                                           
                                                            <tr className="checkInputs">
                                                                <td></td>
                                                                <td><input type="checkbox" data-key="0" onChange={(event) => this.checkActive(event, this.state.common_call_load, 'call_load')} /><br/><span className="grid-label horizontal">00</span></td>
                                                                <td><input type="checkbox" data-key="1" onChange={(event) => this.checkActive(event, this.state.common_call_load, 'call_load')} /><br/><span className="grid-label horizontal">01</span></td>
                                                                <td><input type="checkbox" data-key="2" onChange={(event) => this.checkActive(event, this.state.common_call_load, 'call_load')} /><br/><span className="grid-label horizontal">02</span></td>
                                                                <td><input type="checkbox" data-key="3" onChange={(event) => this.checkActive(event, this.state.common_call_load, 'call_load')} /><br/><span className="grid-label horizontal">03</span></td>
                                                                <td><input type="checkbox" data-key="4" onChange={(event) => this.checkActive(event, this.state.common_call_load, 'call_load')} /><br/><span className="grid-label horizontal">04</span></td>
                                                                <td><input type="checkbox" data-key="5" onChange={(event) => this.checkActive(event, this.state.common_call_load, 'call_load')} /><br/><span className="grid-label horizontal">05</span></td>
                                                                <td><input type="checkbox" data-key="6" onChange={(event) => this.checkActive(event, this.state.common_call_load, 'call_load')} /><br/><span className="grid-label horizontal">06</span></td>
                                                                <td><input type="checkbox" data-key="7" onChange={(event) => this.checkActive(event, this.state.common_call_load, 'call_load')} /><br/><span className="grid-label horizontal">07</span></td>
                                                                <td><input type="checkbox" data-key="8" onChange={(event) => this.checkActive(event, this.state.common_call_load, 'call_load')} /><br/><span className="grid-label horizontal">08</span></td>
                                                                <td><input type="checkbox" data-key="9" onChange={(event) => this.checkActive(event, this.state.common_call_load, 'call_load')} /><br/><span className="grid-label horizontal">09</span></td>
                                                                <td><input type="checkbox" data-key="10" onChange={(event) => this.checkActive(event, this.state.common_call_load, 'call_load')} /><br/><span className="grid-label horizontal">10</span></td>
                                                                <td><input type="checkbox" data-key="11" onChange={(event) => this.checkActive(event, this.state.common_call_load, 'call_load')} /><br/><span className="grid-label horizontal">11</span></td>
                                                                <td><input type="checkbox" data-key="12" onChange={(event) => this.checkActive(event, this.state.common_call_load, 'call_load')} /><br/><span className="grid-label horizontal">12</span></td>
                                                                <td><input type="checkbox" data-key="13" onChange={(event) => this.checkActive(event, this.state.common_call_load, 'call_load')} /><br/><span className="grid-label horizontal">13</span></td>
                                                                <td><input type="checkbox" data-key="14" onChange={(event) => this.checkActive(event, this.state.common_call_load, 'call_load')} /><br/><span className="grid-label horizontal">14</span></td>
                                                                <td><input type="checkbox" data-key="15" onChange={(event) => this.checkActive(event, this.state.common_call_load, 'call_load')} /><br/><span className="grid-label horizontal">15</span></td>
                                                                <td><input type="checkbox" data-key="16" onChange={(event) => this.checkActive(event, this.state.common_call_load, 'call_load')} /><br/><span className="grid-label horizontal">16</span></td>
                                                                <td><input type="checkbox" data-key="17" onChange={(event) => this.checkActive(event, this.state.common_call_load, 'call_load')} /><br/><span className="grid-label horizontal">17</span></td>
                                                                <td><input type="checkbox" data-key="18" onChange={(event) => this.checkActive(event, this.state.common_call_load, 'call_load')} /><br/><span className="grid-label horizontal">18</span></td>
                                                                <td><input type="checkbox" data-key="19" onChange={(event) => this.checkActive(event, this.state.common_call_load, 'call_load')} /><br/><span className="grid-label horizontal">19</span></td>
                                                                <td><input type="checkbox" data-key="20" onChange={(event) => this.checkActive(event, this.state.common_call_load, 'call_load')} /><br/><span className="grid-label horizontal">20</span></td>
                                                                <td><input type="checkbox" data-key="21" onChange={(event) => this.checkActive(event, this.state.common_call_load, 'call_load')} /><br/><span className="grid-label horizontal">21</span></td>
                                                                <td><input type="checkbox" data-key="22" onChange={(event) => this.checkActive(event, this.state.common_call_load, 'call_load')} /><br/><span className="grid-label horizontal">22</span></td>
                                                                <td><input type="checkbox" data-key="23" onChange={(event) => this.checkActive(event, this.state.common_call_load, 'call_load')} /><br/><span className="grid-label horizontal">23</span></td>
                                                            </tr>
                                                            
                                                            
                                                        </tbody>
                                                    </table>
                                                </div>
                                                <div className="row_inputs">
                                                    <div className="item-col">
                                                        <label htmlFor="load_gain" className="col-form-label">Коэффициент усиления</label>
                                                        <input type="text" className="form-control" id="load_gain" name="load_gain" placeholder="1" value={this.state.load_gain} onChange={(event) => this.changeKo(parseInt(event.target.value))} />
                                                    </div>
                                                </div>
                                                <div className="info-text">
                                                    <div className="average-min">
                                                        <div className="average-text">Среднее, минут в месяц:</div>
                                                        <div className="average-num">{this.state.average_num}</div>
                                                    </div>
                                                    <div className="call_in_day">
                                                        <div className="call_in_day-text">Звонков в час:</div>
                                                        <div className="call_in_day-num">
                                                            <div className="min-num">MIN: {this.state.calls_per_hour_min}</div>
                                                            <div className="max-num">MAX: {this.state.calls_per_hour_max}</div>
                                                        </div>
                                                    </div>
                                                    <div className="call_same_time">
                                                        <div className="call_same_time-text">Одновременных звонков:</div>
                                                        <div className="call_same_time-num">
                                                            <div className="min-num">MIN: {this.state.simultaneous_calls_min}</div>
                                                            <div className="max-num">MAX: {this.state.simultaneous_calls_max}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                          </div>
                                    </div>
                                    
                                        
                                    </div>
                                
                                
                                
                                {/* <div className="form-group row">
                                    <div className="col-sm-6 col-xs-6"><button type="button" className="btn btn-primary" onClick={()=>this.props.handleSave({id:this.props.rateUser.id, name:this.state.name, login:this.state.rate})} >Сохранить</button></div>
                                    <div className="col-sm-6 col-xs-6"><button type="button" className="btn btn-primary"  >Отмена</button></div>
                                </div> */}
                            </form>
                            
                        </div>
                        </div>
                        <div className="modal-footer">
                            <button 
                                type="button" 
                                className="btn btn-primary" 
                                data-dismiss={(this.state.dismiss) && "modal"} 
                                onClick={()=>this.saveRate()} >Сохранить</button> {/*disabled={(this.state.call_max < this.state.call_min) && "disabled"}*/}
                            <button type="button" className="btn btn-default" data-dismiss="modal" onClick={()=>this.handleResetState()}>Отмена</button>
                        </div>
                    </div>
                </div>
            </div>
            
        )
    }
}

export default EditorRate;