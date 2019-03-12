import React, {Component} from 'react';
import {BreadcrumbsItem} from 'react-breadcrumbs-dynamic';
class EditorNumber extends Component {
    constructor(props) {
        super(props);
        this.state = {
            number: this.props.numberEl ? this.props.numberEl.number : ''
        }
    }
    componentWillReceiveProps = (nextProps) => {
        // this.setState({
        //     id: this.nextProps.schedule.id
        // });
    }
    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
    }
    handleResetState = () => {
        // this.setState({
        //     id: ''
        // });
        this.props.handleHide();
    }
    render() {
        return(
            <div className="editor_nubmer">
                <BreadcrumbsItem to='/numbers/edit'>Редактирование</BreadcrumbsItem>
                <form method="POST">
                    <h5>▶ {this.props.title}</h5>
                    <div className="form-group row_inputs">
                        <label htmlFor="number" className="col-form-label">Значение</label>
                        <input type="text" className="form-control" id="number" name="number" value={this.state.number} onChange={this.handleInputChange} />
                    </div>                    
                    <div className="form-group row">
                        <div className="col-sm-2 col-xs-2"><button type="button" className="btn btn-primary" onClick={()=>this.props.handleSave()} >Сохранить</button></div>
                        <div className="col-sm-2 col-xs-2"><button type="button" className="btn btn-primary" onClick={()=>this.handleResetState()} >Отмена</button></div>
                    </div>
                </form>
                
            </div>
        )
    }
}

export default EditorNumber;