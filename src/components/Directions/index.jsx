import React, { Component } from "react";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import axios from "axios";
import routes from "../../routes";
import ListDirections from "./ListDirections";
import EditorDirections from "./EditorDirections";

class Directions extends Component {
  constructor() {
    super();
    this.state = {
      directions: [],
      direction: {},
      status: 0, // 0 - null, 1 - edit, 2 - add
    };
  }
  getListDirections = () => {
    console.log("Загружаем направления...");
    axios
      .get(routes.trunks.list)
      .then(({ data }) => {
        this.setState({
          directions: data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  componentWillMount() {
    this.getListDirections();
  }
  handleRemove = (curID, curIndex) => {
    console.log("Удаляем ", curID);
    axios
      .post(routes.trunks.delete, { id: curID })
      .then(({ data }) => {
        console.log("Пришёл ответ на удаление ", data);
        if (data.result === 1) {
          let tmpDirections = this.state.directions;
          tmpDirections.splice(curIndex, 1);
          this.setState({
            directions: tmpDirections,
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  handleAdd = () => {
    this.setState({
      direction: {},
      status: 2,
    });
  };
  handleEdit = (direction) => {
    console.log(direction);
    this.setState({
      direction,
      status: 1,
    });
  };
  handleHide = () => {
    this.setState({ status: 0 });
  };
  handleSave = (direction) => {
    if (this.state.status === 1) {
      axios
        .post(routes.trunks.edit, {
          id: direction.id,
          name: direction.name,
          value: direction.value,
        })
        .then(() => {
          this.getListDirections();
          this.handleHide();
        })
        .catch(function (error) {
          console.log(error);
        });
    } else if (this.state.status === 2) {
      axios
        .post(routes.trunks.add, {
          name: direction.name,
          value: direction.value,
        })
        .then(() => {
          //let newGroupsNumbers = [...this.state.groups_numbers, {id: parseInt(data.id), name: group.name, data: group.data}];
          this.getListDirections();
          this.handleHide();
          /*this.setState({
                        direction: {}
                    })*/
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };
  render() {
    return (
      <div className="page_directions">
        <BreadcrumbsItem to="/directions">Направления</BreadcrumbsItem>
        <div className="row">
          <div className="col-md-12">
            <span className="add_btn" onClick={() => this.handleAdd()}>
              <span
                className="glyphicon glyphicon-plus"
                aria-hidden="true"
              ></span>
              &nbsp;Добавить новое направление
            </span>
          </div>
        </div>
        <div className="row">
          <div
            className={
              this.state.status === 0
                ? "col-md-12 col-sm-12"
                : "col-md-6 col-sm-6"
            }
          >
            <ListDirections
              directions={this.state.directions}
              handleEdit={this.handleEdit}
              handleRemove={this.handleRemove}
            />
          </div>
          {this.state.status > 0 && (
            <div className="col-md-6 col-sm-6">
              <EditorDirections
                title={
                  this.state.status === 1
                    ? "Редактирование направления"
                    : "Новое направление"
                }
                direction={
                  this.state.status === 1 ? this.state.direction : null
                }
                handleSave={this.handleSave}
                handleHide={this.handleHide}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Directions;
