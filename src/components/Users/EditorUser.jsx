import React, { useEffect, useState } from "react";

const initialStateUser = {
  name: "",
  login: "",
  pass: "",
};

const EditorUser = ({ user, title, handleHide, handleSave }) => {
  const [state, setState] = useState(initialStateUser);

  const handleInputChange = ({ target: { name, value } }) =>
    setState({
      [name]: value,
    });

  const handleResetState = () => {
    setState(initialStateUser);
    handleHide();
  };

  useEffect(() => {
    setState({
      name: user ? user.name : "",
      login: user ? user.login : "",
    });
  }, [user]);

  return (
    <div className="editor_user">
      <form method="POST">
        <h5>▶ {title}</h5>
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
              value={state.name}
              onChange={handleInputChange}
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
              value={state.login}
              onChange={handleInputChange}
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
              value={state.pass}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="form-group row">
          <div className="col-sm-6 col-xs-6">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() =>
                handleSave({
                  id: user ? user.id : 0,
                  name: state.name,
                  login: state.login,
                  pass: state.pass,
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
              onClick={handleResetState}
            >
              Отмена
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditorUser;
