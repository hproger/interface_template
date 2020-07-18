import React, { Component } from "react";
class EditorUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.user ? this.props.user.name : "",
      login: this.props.user ? this.props.user.login : "",
      pass: "",
    };
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({
      name: nextProps.user ? nextProps.user.name : "",
      login: nextProps.user ? nextProps.user.login : "",
      pass: "",
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
      login: "",
      pass: "",
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
              Имя
            </label>
            <div className="col-sm-9">
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                placeholder="Иван"
                value={this.state.name}
                onChange={this.handleInputChange}
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="login" className="col-sm-3 col-form-label">
              Логин
            </label>
            <div className="col-sm-9">
              <input
                type="text"
                className="form-control"
                id="login"
                name="login"
                placeholder="Ivan3556"
                value={this.state.login}
                onChange={this.handleInputChange}
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="pass" className="col-sm-3 col-form-label">
              Пароль
            </label>
            <div className="col-sm-9">
              <input
                type="password"
                className="form-control"
                id="pass"
                name="pass"
                placeholder="*******"
                value={this.state.pass}
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
                    id: this.props.user ? this.props.user.id : 0,
                    name: this.state.name,
                    login: this.state.login,
                    pass: this.state.pass,
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

export default EditorUser;
