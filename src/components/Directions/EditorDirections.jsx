import React, { Component } from "react";
class EditorDirections extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.direction ? this.props.direction.name : "",
      value: this.props.direction ? this.props.direction.value : "",
    };
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({
      name: nextProps.direction ? nextProps.direction.name : "",
      value: nextProps.direction ? nextProps.direction.value : "",
    });
  };
  handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  };
  handleResetState = () => {
    this.setState({
      name: "",
      value: "",
    });
    this.props.handleHide();
  };

  render() {
    return (
      <div className="editor_user">
        <form method="POST">
          <h5>▶ {this.props.title}</h5>
          <div className="form-group row">
            <label htmlFor="name" className="col-sm-3 col-form-label">
              Название
            </label>
            <div className="col-sm-9">
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                placeholder="Направление"
                value={this.state.name}
                onChange={this.handleInputChange}
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="value" className="col-sm-3 col-form-label">
              Значения
            </label>
            <div className="col-sm-9">
              <input
                type="text"
                className="form-control"
                id="value"
                name="value"
                placeholder=""
                value={this.state.value}
                onChange={this.handleInputChange}
              />
            </div>
          </div>

          <div className="form-group row">
            <div className="col-sm-6 col-xs-6">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() =>
                  this.props.handleSave({
                    id: this.props.direction ? this.props.direction.id : 0,
                    name: this.state.name,
                    value: this.state.value,
                  })
                }
              >
                Сохранить
              </button>
            </div>
            <div className="col-sm-6 col-xs-6">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => this.handleResetState()}
              >
                Отмена
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default EditorDirections;
