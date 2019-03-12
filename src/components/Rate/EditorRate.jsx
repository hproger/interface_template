import React, {Component} from 'react';
const WEEK_DAY = ['ПН','ВТ','СР','ЧТ','ПТ','СБ','ВС'];

class EditorRate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // temporary variables begin
            average_call_time: [
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            ],
            calls_per_hour: [
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            ],
            // temporary variables end
            rate: 0,
            min_in_month: 0, // минут в месяц
            call_max: 0,
            call_min: 0,
            uniform_load_day: 0, // нагрузка равномерная в день / мин
            uniform_load_hour: 0, // в час / мин
            incom_call: 0, // среднее время исходящего звонка сек
            
            interfaceType: (this.props.rateUser && this.props.rateUser.data.interfaceType) ? this.props.rateUser.data.interfaceType : 'simple', // активный интерфейс 0 - простой, 1 - расширенный

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
        }
    }
    
    componentWillReceiveProps = (nextProps) => {
        console.log('nextProps',nextProps.rateUser)
        const cmint = nextProps.rateUser ? this.calcMinMaxLoad('call_min_time',  nextProps.rateUser.data.Call_min_time) : 0;
        const cmaxt = nextProps.rateUser ? this.calcMinMaxLoad('call_max_time', nextProps.rateUser.data.Call_max_time) : 0;
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
            min_in_month: nextProps.rateUser ? this.calcMinMaxLoad('call_load', nextProps.rateUser.data.Call_load) : 0,
            average_num: nextProps.rateUser ? this.calcAverNmb(nextProps.rateUser.data.Call_min_time, nextProps.rateUser.data.Call_max_time,cmint,cmaxt) : 0
        });
        
    }
    handleInputChange = (event) => {
        const target = event.target;
        const name = target.name;
        const value = (name === 'load_gain') ? target.value.replace(/\D/, '') : target.value;
        
        // this.value.replace (/\D/, '') вводим только цифры
        this.setState({
          [name]: value
        });
    }
    handleInputMinMonth = (event) => {
        const target = event.target;
        const value = target.value ? parseFloat(target.value.replace(/\D/, '')) : 0;
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
          uniform_load_day: LD,
          uniform_load_hour: LH,
          call_load: callLD
        });
    }
    handleInputCallMax = (event) => {
        const target = event.target;
        const value = target.value ? parseFloat(target.value.replace(/\D/, '')) : 0;
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
        });
        
    }
    handleInputCallMin = (event) => {
        const target = event.target;
        const value = target.value ? parseFloat(target.value.replace(/\D/, '')) : 0;
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
        });
    }
    handleResetState = () => {
        this.setState({
            rate: 0,
            name: ''
        });
        this.props.handleHide();
    }
    checkActive = (event, direction) => {
        if (direction === 'row') {
            console.log('Горизонтально');
            if (event.target.checked) {
                console.log('Включили');
            }
            else {
                console.log('Выключили');
            }
        }
        else {
            console.log('Вертикально');
            if (event.target.checked) {
                console.log('Включили');
            }
            else {
                console.log('Выключили');
            }
        }

    }
    handlerSelectInterface = (event) => {
        const target = event.target;
        const value = target.value;
        this.setState({
            interfaceType: value
        });
    }

    saveRate = () => {
        const id = this.props.rateUser ? this.props.rateUser.id : 0;
        const name = this.state.titleRate;
        const data = {
            interfaceType: this.state.interfaceType,
            LoadGain: this.state.load_gain,
            Call_load: this.state.call_load,
            Call_min_time: this.state.call_min_time,
            Call_max_time: this.state.call_max_time
        };
        console.log('data',data);
        this.props.handleSave({id, name, data});
    }
    changeInputsCallTime = (event,arrName) =>  {
        const target = event.target;
        const value = parseInt(target.value ? target.value.replace(/\D/, '') : 0);
        const row = target.dataset.row;
        const cell = target.dataset.cell;
        let call_arr = this.state[arrName];
        call_arr[row][cell] = value;
        const aver = this.calcMinMaxLoad(arrName, call_arr);
        const averNmb = this.calcAverNmb(this.state.call_min_time, this.state.call_max_time, this.state.call_min,this.state.call_max);
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
        this.setState({
            [arrName] : call_arr,
            [callType]: aver,
            average_num: averNmb
        });
    }
    calcMinMaxLoad = (arrName, call_arr) => {
        let sum = 0;
        for (let i = 0; i < call_arr.length; i++) {
            let sumLine = 0;
            for (let j = 0; j < call_arr[i].length; j++) {
                const element = call_arr[i][j];
                sumLine += element;
            }
            //sum += (arrName === 'call_load') ? sumLine : sumLine/60;
            sum += sumLine;
        }
        
        return Math.round((arrName === 'call_load') ? (sum/7)*30 : sum/168);
    }
    calcAverNmb = (cmint,cmaxt, ...temporary) => {
        let averNmb = 0, tempArr = [];
        for (let i = 0; i < cmaxt.length; i++) {
            let tempLineArr = [];
            for (let j = 0; j < cmaxt[i].length; j++) {
                tempLineArr.push(Math.round( ( ( cmaxt[i][j] - cmint[i][j] ) / 2 ) + cmint[i][j] ));
                averNmb += Math.round( ( ( cmaxt[i][j] - cmint[i][j] ) / 2 ) + cmint[i][j] );
            }
            tempArr.push(tempLineArr);
        }
        const ic = temporary ? Math.round( ( ( temporary[1] - temporary[0] ) / 2 ) + temporary[0] ) : 0;
        this.setState({
            average_call_time: tempArr,
            incom_call: ic
        }, this.calcTempArraysCPH(tempArr, cmaxt));
        averNmb = Math.round( ( (averNmb / 60 ) / 7 ) * 30 ); // преобразуем из секунд в минуты и получаем "Среднее: мин за месяц"
        return Math.round(averNmb);
    }
    calcTempArraysCPH = (act, cmaxt) => {
        let tempArr = [], minNumb = 0, maxNumb = 0;
        for (let i = 0; i < cmaxt.length; i++) {
            let tempLineArr = [];
            for (let j = 0; j < cmaxt[i].length; j++) {
                const tempVar = parseFloat(( ( cmaxt[i][j] * 60 ) / act[i][j] ).toFixed(2));
                
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
        this.setState({
            calls_per_hour: tempArr,
            calls_per_hour_min: minNumb,
            calls_per_hour_max: maxNumb
        }, this.calcTempArraysSC(tempArr,act))
    }
    calcTempArraysSC = (cph,act) => {
        let minNumb = 0, maxNumb = 0;
        for (let i = 0; i < act.length; i++) {
            for (let j = 0; j < act[i].length; j++) {
                const tempVar = parseFloat(( act[i][j] / ( 3600 / cph[i][j] ) ).toFixed(2));
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
                                                <label htmlFor="call_max" className="col-form-label">Звонок макс.</label>
                                                <input type="text" className="form-control" id="call_max" name="call_max" placeholder="300" value={this.state.call_max} onChange={this.handleInputCallMax} /> сек.
                                            </div>
                                            <div className="item-col">
                                                <label htmlFor="call_min" className="col-form-label">Звонок мин.</label>
                                                <input type="text" className="form-control" id="call_min" name="call_min" placeholder="25" value={this.state.call_min} onChange={this.handleInputCallMin} /> сек.
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
                                            <h5>Минимальное время</h5>
                                            <div className="table-responsive grid-rate">
                                                <table className="table table-hover">
                                                    <tbody>
                                                        {this.state.call_min_time.map((val_load, index)=>(
                                                            <tr key={index}>
                                                                <td>
                                                                    <span className="grid-label vertical">{WEEK_DAY[index]}</span>
                                                                    <input type="checkbox" onChange={event => this.checkActive(event, 'row')} />
                                                                </td>
                                                                {val_load.map((val, ind)=>(
                                                                    <td key={'col'+ind}>
                                                                        <input type="text" data-cell={ind} data-row={index} name={'min-time_r'+index+'c'+ind} id={'input-min-time_r'+index+'c'+ind} className="form-control" value={val} onChange={(e)=>this.changeInputsCallTime(e,'call_min_time')} />
                                                                    </td>
                                                                ))}
                                                            </tr>
                                                        ))}
                                                        
                                                        <tr>
                                                            <td></td>
                                                            <td><input type="checkbox" /><br/><span className="grid-label horizontal">00</span></td>
                                                            <td><input type="checkbox" /><br/><span className="grid-label horizontal">01</span></td>
                                                            <td><input type="checkbox" /><br/><span className="grid-label horizontal">02</span></td>
                                                            <td><input type="checkbox" /><br/><span className="grid-label horizontal">03</span></td>
                                                            <td><input type="checkbox" /><br/><span className="grid-label horizontal">04</span></td>
                                                            <td><input type="checkbox" /><br/><span className="grid-label horizontal">05</span></td>
                                                            <td><input type="checkbox" /><br/><span className="grid-label horizontal">06</span></td>
                                                            <td><input type="checkbox" /><br/><span className="grid-label horizontal">07</span></td>
                                                            <td><input type="checkbox" /><br/><span className="grid-label horizontal">08</span></td>
                                                            <td><input type="checkbox" /><br/><span className="grid-label horizontal">09</span></td>
                                                            <td><input type="checkbox" /><br/><span className="grid-label horizontal">10</span></td>
                                                            <td><input type="checkbox" /><br/><span className="grid-label horizontal">11</span></td>
                                                            <td><input type="checkbox" /><br/><span className="grid-label horizontal">12</span></td>
                                                            <td><input type="checkbox" /><br/><span className="grid-label horizontal">13</span></td>
                                                            <td><input type="checkbox" /><br/><span className="grid-label horizontal">14</span></td>
                                                            <td><input type="checkbox" /><br/><span className="grid-label horizontal">15</span></td>
                                                            <td><input type="checkbox" /><br/><span className="grid-label horizontal">16</span></td>
                                                            <td><input type="checkbox" /><br/><span className="grid-label horizontal">17</span></td>
                                                            <td><input type="checkbox" /><br/><span className="grid-label horizontal">18</span></td>
                                                            <td><input type="checkbox" /><br/><span className="grid-label horizontal">19</span></td>
                                                            <td><input type="checkbox" /><br/><span className="grid-label horizontal">20</span></td>
                                                            <td><input type="checkbox" /><br/><span className="grid-label horizontal">21</span></td>
                                                            <td><input type="checkbox" /><br/><span className="grid-label horizontal">22</span></td>
                                                            <td><input type="checkbox" /><br/><span className="grid-label horizontal">23</span></td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div className="table-responsive grid-rate">
                                                <h5>Максимальное время</h5>
                                                <table className="table table-hover">
                                                    <tbody>
                                                        {this.state.call_max_time.map((val_load, index)=>(
                                                            <tr key={index}>
                                                                <td>
                                                                    <span className="grid-label vertical">{WEEK_DAY[index]}</span>
                                                                    <input type="checkbox" onChange={event => this.checkActive(event, 'row')} />
                                                                </td>
                                                                {val_load.map((val, ind)=>(
                                                                    <td key={'col'+ind}>
                                                                        <input type="text" data-cell={ind} data-row={index} name={'max-time_r'+index+'c'+ind} id={'input-max-time_r'+index+'c'+ind} className="form-control" value={val} onChange={(e)=>this.changeInputsCallTime(e,'call_max_time')} />
                                                                    </td>
                                                                ))}
                                                            </tr>
                                                        ))}
                                                        
                                                        <tr>
                                                            <td></td>
                                                            <td><input type="checkbox" /><br/><span className="grid-label horizontal">00</span></td>
                                                            <td><input type="checkbox" /><br/><span className="grid-label horizontal">01</span></td>
                                                            <td><input type="checkbox" /><br/><span className="grid-label horizontal">02</span></td>
                                                            <td><input type="checkbox" /><br/><span className="grid-label horizontal">03</span></td>
                                                            <td><input type="checkbox" /><br/><span className="grid-label horizontal">04</span></td>
                                                            <td><input type="checkbox" /><br/><span className="grid-label horizontal">05</span></td>
                                                            <td><input type="checkbox" /><br/><span className="grid-label horizontal">06</span></td>
                                                            <td><input type="checkbox" /><br/><span className="grid-label horizontal">07</span></td>
                                                            <td><input type="checkbox" /><br/><span className="grid-label horizontal">08</span></td>
                                                            <td><input type="checkbox" /><br/><span className="grid-label horizontal">09</span></td>
                                                            <td><input type="checkbox" /><br/><span className="grid-label horizontal">10</span></td>
                                                            <td><input type="checkbox" /><br/><span className="grid-label horizontal">11</span></td>
                                                            <td><input type="checkbox" /><br/><span className="grid-label horizontal">12</span></td>
                                                            <td><input type="checkbox" /><br/><span className="grid-label horizontal">13</span></td>
                                                            <td><input type="checkbox" /><br/><span className="grid-label horizontal">14</span></td>
                                                            <td><input type="checkbox" /><br/><span className="grid-label horizontal">15</span></td>
                                                            <td><input type="checkbox" /><br/><span className="grid-label horizontal">16</span></td>
                                                            <td><input type="checkbox" /><br/><span className="grid-label horizontal">17</span></td>
                                                            <td><input type="checkbox" /><br/><span className="grid-label horizontal">18</span></td>
                                                            <td><input type="checkbox" /><br/><span className="grid-label horizontal">19</span></td>
                                                            <td><input type="checkbox" /><br/><span className="grid-label horizontal">20</span></td>
                                                            <td><input type="checkbox" /><br/><span className="grid-label horizontal">21</span></td>
                                                            <td><input type="checkbox" /><br/><span className="grid-label horizontal">22</span></td>
                                                            <td><input type="checkbox" /><br/><span className="grid-label horizontal">23</span></td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                          </div>
                                    </div>
                                    
                                    <div className="panel panel-default">
                                          <div className="panel-heading">
                                                <h3 className="panel-title">Нагрузка</h3>
                                          </div>
                                          <div className="panel-body">
                                            <div className="table-responsive grid-rate">
                                                    <table className="table table-hover">
                                                        <tbody>
                                                            {this.state.call_load.map((val_load, index)=>(
                                                                <tr key={index}>
                                                                    <td>
                                                                        <span className="grid-label vertical">{WEEK_DAY[index]}</span>
                                                                        <input type="checkbox" onChange={event => this.checkActive(event, 'row')} />
                                                                    </td>
                                                                    {val_load.map((val, ind)=>(
                                                                        <td key={'col'+ind}>
                                                                            
                                                                            <input type="text" data-cell={ind} data-row={index} name={'call-load_r'+index+'c'+ind} id={'input-call-load_r'+index+'c'+ind} className="form-control" value={val} onChange={(e)=>this.changeInputsCallTime(e,'call_load')} />
                                                                            
                                                                        </td>
                                                                    ))}
                                                                </tr>
                                                            ))}
                                                            
                                                            <tr>
                                                                <td></td>
                                                                <td><input type="checkbox" /><br/><span className="grid-label horizontal">00</span></td>
                                                                <td><input type="checkbox" /><br/><span className="grid-label horizontal">01</span></td>
                                                                <td><input type="checkbox" /><br/><span className="grid-label horizontal">02</span></td>
                                                                <td><input type="checkbox" /><br/><span className="grid-label horizontal">03</span></td>
                                                                <td><input type="checkbox" /><br/><span className="grid-label horizontal">04</span></td>
                                                                <td><input type="checkbox" /><br/><span className="grid-label horizontal">05</span></td>
                                                                <td><input type="checkbox" /><br/><span className="grid-label horizontal">06</span></td>
                                                                <td><input type="checkbox" /><br/><span className="grid-label horizontal">07</span></td>
                                                                <td><input type="checkbox" /><br/><span className="grid-label horizontal">08</span></td>
                                                                <td><input type="checkbox" /><br/><span className="grid-label horizontal">09</span></td>
                                                                <td><input type="checkbox" /><br/><span className="grid-label horizontal">10</span></td>
                                                                <td><input type="checkbox" /><br/><span className="grid-label horizontal">11</span></td>
                                                                <td><input type="checkbox" /><br/><span className="grid-label horizontal">12</span></td>
                                                                <td><input type="checkbox" /><br/><span className="grid-label horizontal">13</span></td>
                                                                <td><input type="checkbox" /><br/><span className="grid-label horizontal">14</span></td>
                                                                <td><input type="checkbox" /><br/><span className="grid-label horizontal">15</span></td>
                                                                <td><input type="checkbox" /><br/><span className="grid-label horizontal">16</span></td>
                                                                <td><input type="checkbox" /><br/><span className="grid-label horizontal">17</span></td>
                                                                <td><input type="checkbox" /><br/><span className="grid-label horizontal">18</span></td>
                                                                <td><input type="checkbox" /><br/><span className="grid-label horizontal">19</span></td>
                                                                <td><input type="checkbox" /><br/><span className="grid-label horizontal">20</span></td>
                                                                <td><input type="checkbox" /><br/><span className="grid-label horizontal">21</span></td>
                                                                <td><input type="checkbox" /><br/><span className="grid-label horizontal">22</span></td>
                                                                <td><input type="checkbox" /><br/><span className="grid-label horizontal">23</span></td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                                <div className="row_inputs">
                                                    <div className="item-col">
                                                        <label htmlFor="load_gain" className="col-form-label">Коэффициент усиления</label>
                                                        <input type="text" className="form-control" id="load_gain" name="load_gain" placeholder="1" value={this.state.load_gain} onChange={this.handleInputChange} />
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
                            <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={()=>this.saveRate()} >Сохранить</button>
                            <button type="button" className="btn btn-default" data-dismiss="modal" onClick={()=>this.handleResetState()}>Отмена</button>
                        </div>
                    </div>
                </div>
            </div>
            
        )
    }
}

export default EditorRate;