import React, { Component } from "react";
import _ from "lodash";

const POOL = "pool",
  SINGLE = "single",
  LOAD_FILE = "load_file";
class EditorNumber extends Component {
  constructor(props) {
    super(props);
    this.state = {
      group: Object.keys(this.props.group).length !== 0 ? this.props.group : "",
      mode: null, // pool, single, load_file
      from_pool: 0,
      till_pool: 0,
      digits: 0,
      number: "",
      country_code: "+7",
      pool_tems: [],
      line_edit_index: 0,
      pool_name: "", // название набора
      check_line: [],
      status: 0, // 0 - add, 1 - edit
    };
    this.fileInput = React.createRef();
  }
  componentWillReceiveProps = (nextProps) => {
    console.log("nextProps ", nextProps);
    this.setState(
      {
        group: Object.keys(nextProps.group).length !== 0 ? nextProps.group : "",
        pool_name:
          Object.keys(nextProps.group).length !== 0 ? nextProps.group.name : "",
        pool_tems:
          Object.keys(nextProps.group).length !== 0 ? nextProps.group.data : [],
        status: Object.keys(nextProps.group).length !== 0 ? 1 : 0,
      },
      this.uncheckInputs()
    );
  };
  handleInputChange = (event, parse_int = false) => {
    const target = event.target;
    let value = parse_int
      ? parseInt(target.value.replace(/\D/, ""))
      : target.value;
    value = value ? value : parse_int ? 0 : "";
    const name = target.name;

    this.setState({
      [name]: value,
    });
  };
  handleResetState = () => {
    setTimeout(() => {
      this.setState({
        mode: null, // pool, single, load_file - null - hide right part
        from_pool: 0,
        till_pool: 0,
        digits: 0,
        number: "",
        country_code: "+7",
        pool_tems: [],
        pool_name: "",
        check_line: [],
        status: 0,
      });
    }, 500);
  };
  handleChangeMode = (mode) => {
    this.setState({
      mode,
      from_pool: 0,
      till_pool: 0,
      digits: 0,
      number: "",
      country_code: "+7",
      status: 0,
    });
  };
  generateJsonData = (mode) => {
    let pool_tems;
    //let count_nmb = _.cloneDeep(this.state.count_numbers);

    switch (mode) {
      case POOL:
        pool_tems = {
          type: POOL,
          from: this.state.from_pool,
          till: this.state.till_pool,
          digits: this.state.digits,
          country_code: this.state.country_code,
        };
        break;
      case SINGLE:
        pool_tems = {
          type: SINGLE,
          number: this.state.number,
          country_code: this.state.country_code,
        };
        console.log(this.state.country_code);
        break;
      default:
        const file = this.fileInput.current.files[0];
        console.log(file);
        if (file) {
          const reader = new FileReader();
          reader.readAsText(file, "UTF-8");
          reader.onload = (evt) => {
            const body = evt.target.result;
            const textToArray = body.split("\n");
            let pool_t = [];
            textToArray.forEach((item) => {
              if (item !== "") {
                pool_tems = {
                  type: SINGLE,
                  number: item,
                  country_code: item[0] + "" + item[1],
                };
                pool_t.push(pool_tems);
              }
            });
            console.log(pool_t);
            this.setState(
              (prevState) => {
                return { pool_tems: [...prevState.pool_tems, ...pool_t] };
              },
              () => {
                alert("Импорт номеров прошёл успешно");
              }
            );
          };
          reader.onerror = function (evt) {
            alert("Ошибка чтения файла");
          };
        }
        return;
    }
    if (mode !== "load_file") {
      if (this.state.status === 1) {
        let pt = _.cloneDeep(this.state.pool_tems);
        pt[this.state.line_edit_index] = pool_tems;
        this.setState({ pool_tems: pt });
      } else {
        this.setState((prevState) => {
          return { pool_tems: [...prevState.pool_tems, pool_tems] };
        });
      }
    }
    this.resetEditLine();
  };
  handleRemovePoolLine = (pool_line_ID) => {
    console.log("Удаляем из pool_tems строку ", pool_line_ID + 1);
    const checkLine = this.state.check_line
      ? _.cloneDeep(this.state.check_line)
      : [];
    let newPoolTems = _.cloneDeep(this.state.pool_tems);
    if (checkLine.length > 0) {
      newPoolTems = newPoolTems.filter(function (value, index) {
        return checkLine.indexOf(index) === -1;
      });
    } else {
      newPoolTems.splice(pool_line_ID, 1);
    }
    console.log("newPoolTems", newPoolTems);
    this.setState(
      {
        check_line: [],
        pool_tems: newPoolTems,
      },
      this.uncheckInputs()
    );
  };
  uncheckInputs = () => {
    let checkInputs = document.querySelectorAll('input[type="checkbox"]');
    for (const iterator of checkInputs) {
      iterator.checked = false;
    }
  };
  handleCopyPoolLine = (pool_line_ID) => {
    console.log("Копируем pool_line ", pool_line_ID + 1);
    const checkLine = this.state.check_line
      ? _.cloneDeep(this.state.check_line)
      : [];
    let curPoolTems = _.cloneDeep(this.state.pool_tems);
    if (checkLine.length > 0) {
      for (let index = 0; index < checkLine.length; index++) {
        const newIndex = parseInt(checkLine[index]);
        curPoolTems.push(curPoolTems.slice(newIndex, newIndex + 1)[0]);
      }
    } else {
      curPoolTems.push(curPoolTems.slice(pool_line_ID, pool_line_ID + 1)[0]);
    }

    this.setState(
      {
        check_line: [],
        pool_tems: curPoolTems,
      },
      this.uncheckInputs()
    );
  };
  handleEditPoolLine = (pool_line) => {
    console.log(pool_line);
    this.setState({
      mode: pool_line.type, // pool, single, load_file
      from_pool: pool_line.from ? pool_line.from : 0,
      till_pool: pool_line.till ? pool_line.till : 0,
      digits: pool_line.digits ? pool_line.digits : 0,
      number: pool_line.number ? pool_line.number : "",
      country_code: pool_line.country_code ? pool_line.country_code : "+7",
      line_edit_index: pool_line.i ? pool_line.i : 0,
      status: 1,
    });
  };
  resetEditLine = () => {
    this.setState({
      mode: null,
      from_pool: 0,
      till_pool: 0,
      digits: 0,
      number: "",
      country_code: "+7",
      status: 0,
    });
  };
  checkLine = (event) => {
    const target = event.target;
    const numberLine = parseInt(target.dataset.line);
    let newCheckLine = this.state.check_line
      ? _.cloneDeep(this.state.check_line)
      : [];
    if (target.checked) {
      newCheckLine.push(numberLine);
    } else {
      const index = newCheckLine.indexOf(numberLine);
      if (index >= 0) {
        newCheckLine.splice(index, 1);
      }
    }
    this.setState(
      {
        check_line: newCheckLine,
      },
      () => {
        console.log(this.state.check_line);
      }
    );
  };
  render() {
    return (
      <div className="editor_nubmer">
        {/* <BreadcrumbsItem to='/numbers/edit'>Редактирование</BreadcrumbsItem> */}

        <div className="modal fade" id="editor-number">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-hidden="true"
                  onClick={() => this.handleResetState()}
                >
                  &times;
                </button>
                <h4 className="modal-title">▶ Добавление номеров</h4>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className={this.state.mode ? "col-md-6" : "col-md-12"}>
                    <div className="top-left-block">
                      <div className="form-group">
                        <label htmlFor="pool_name">Название набора:</label>
                        <input
                          type="text"
                          className="form-control"
                          id="pool_name"
                          name="pool_name"
                          placeholder="Название набора"
                          value={this.state.pool_name}
                          onChange={(event) => this.handleInputChange(event)}
                        />
                      </div>
                      {this.state.pool_tems.map(
                        (
                          { type, from, till, digits, country_code, number },
                          i
                        ) => (
                          <div
                            className="form-group flex-row pool-line"
                            key={i}
                          >
                            <input
                              type="checkbox"
                              name={"check_line_" + i}
                              data-line={i}
                              onChange={(e) => this.checkLine(e)}
                              key={i}
                            />
                            {type === POOL ? (
                              <div className="display_grid grid-area_c2">
                                <div className="from_text">с</div>
                                <div className="from_value">{from}</div>
                                <div className="till_text">по</div>
                                <div className="till_value">{till}</div>
                                <div className="digits_text">цифр</div>
                                <div className="digits_value">{digits}</div>
                                <div className="c-code_text">код</div>
                                <div className="c-code_value">
                                  {country_code}
                                </div>
                              </div>
                            ) : (
                              <div className="number_text">{number}</div>
                            )}
                            <div className="pool-line-btns">
                              <button
                                type="button"
                                className="btn btn-default"
                                onClick={() =>
                                  this.handleEditPoolLine({
                                    i,
                                    type,
                                    from,
                                    till,
                                    digits,
                                    country_code,
                                    number,
                                  })
                                }
                              >
                                <span
                                  className="glyphicon glyphicon-edit"
                                  aria-hidden="true"
                                ></span>
                              </button>
                              <button
                                type="button"
                                className="btn btn-default"
                                onClick={() => this.handleCopyPoolLine(i)}
                              >
                                <span
                                  className="glyphicon glyphicon-copy"
                                  aria-hidden="true"
                                ></span>
                              </button>
                              <button
                                type="button"
                                className="btn btn-default"
                                onClick={() => this.handleRemovePoolLine(i)}
                              >
                                <span
                                  className="glyphicon glyphicon-remove"
                                  aria-hidden="true"
                                ></span>
                              </button>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                    <div className="bottom-left-block btns">
                      <div>
                        <span
                          className="btn add_pool"
                          onClick={() => this.handleChangeMode(POOL)}
                        >
                          Добавить последовательность
                        </span>
                      </div>
                      <div>
                        <span
                          className="btn add_one_number"
                          onClick={() => this.handleChangeMode(SINGLE)}
                        >
                          Добавить номер
                        </span>
                      </div>
                      <div>
                        <span
                          className="btn load_file"
                          onClick={() => this.handleChangeMode(LOAD_FILE)}
                        >
                          Список из *.csv
                        </span>
                      </div>
                    </div>
                  </div>
                  {this.state.mode && (
                    <div className="col-md-6">
                      <div
                        className="edit-pool"
                        style={{ display: this.state.mode === POOL && "block" }}
                      >
                        <h4>Добавление последовательности</h4>
                        <div className="form-group">
                          <label htmlFor="from_pool">
                            Начальный номер последовательности:
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="from_pool"
                            name="from_pool"
                            placeholder="92100"
                            value={this.state.from_pool}
                            onChange={(event) =>
                              this.handleInputChange(event, true)
                            }
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="till_pool">
                            Конечный номер последовательности:
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="till_pool"
                            name="till_pool"
                            placeholder="92101"
                            value={this.state.till_pool}
                            onChange={(event) =>
                              this.handleInputChange(event, true)
                            }
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="digits">Глубина номера, цифр:</label>
                          <input
                            type="text"
                            className="form-control"
                            id="digits"
                            name="digits"
                            placeholder="92100"
                            value={this.state.digits}
                            onChange={(event) =>
                              this.handleInputChange(event, true)
                            }
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="country_code">Код страны:</label>
                          <input
                            type="text"
                            className="form-control"
                            id="country_code"
                            name="country_code"
                            placeholder="92100"
                            value={this.state.country_code}
                            onChange={(event) => this.handleInputChange(event)}
                          />
                        </div>
                        <div className="form-group edit-btns-wrap">
                          <button
                            type="button"
                            className="btn btn-sm btn-default"
                            onClick={() => this.resetEditLine()}
                          >
                            Отмена
                          </button>
                          <button
                            type="button"
                            className="btn btn-sm btn-success"
                            onClick={() => {
                              if (
                                parseInt(this.state.from_pool) >=
                                parseInt(this.state.till_pool)
                              ) {
                                alert(
                                  '"Начальный номер последовательности" должен быть меньше "Конечного номера последовательности" !'
                                );
                                return;
                              }
                              this.generateJsonData(this.state.mode);
                            }}
                          >
                            {this.state.status === 1 ? "Сохранить" : "Добавить"}
                          </button>
                        </div>
                      </div>
                      <div
                        className="edit-number"
                        style={{
                          display: this.state.mode === SINGLE && "block",
                        }}
                      >
                        <h4>Добавление номера</h4>
                        <div className="form-group">
                          <label htmlFor="number">Номер:</label>
                          <input
                            type="text"
                            className="form-control"
                            id="number"
                            name="number"
                            placeholder="+79210900540"
                            value={this.state.number}
                            onChange={(event) => this.handleInputChange(event)}
                          />
                        </div>
                        <div className="form-group edit-btns-wrap">
                          <button
                            type="button"
                            className="btn btn-sm btn-default"
                            onClick={() => this.resetEditLine()}
                          >
                            Отмена
                          </button>
                          <button
                            type="button"
                            className="btn btn-sm btn-success"
                            onClick={() =>
                              this.generateJsonData(this.state.mode)
                            }
                          >
                            {this.state.status === 1 ? "Сохранить" : "Добавить"}
                          </button>
                        </div>
                      </div>
                      <div
                        className="edit-load_file"
                        style={{
                          display: this.state.mode === LOAD_FILE && "block",
                        }}
                      >
                        <h4>Добавление номеров из CSV</h4>
                        <div className="form-group">
                          <label htmlFor="load_file">Выберите файл:</label>
                          <input
                            type="file"
                            className="form-control"
                            id="load_file"
                            name="load_file"
                            ref={this.fileInput}
                          />
                        </div>
                        <div className="form-group edit-btns-wrap">
                          <button
                            type="button"
                            className="btn btn-sm btn-default"
                            onClick={() => this.resetEditLine()}
                          >
                            Отмена
                          </button>
                          <button
                            type="button"
                            className="btn btn-sm btn-success"
                            onClick={() =>
                              this.generateJsonData(this.state.mode)
                            }
                          >
                            Импортировать
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-primary"
                  data-dismiss="modal"
                  onClick={() => {
                    this.props.handleSave({
                      id: this.state.group ? this.state.group.id : 0,
                      name: this.state.pool_name,
                      data: this.state.pool_tems,
                    });
                  }}
                >
                  Сохранить
                </button>
                <button
                  type="button"
                  className="btn btn-default"
                  data-dismiss="modal"
                  onClick={() => this.handleResetState()}
                >
                  Отмена
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EditorNumber;
