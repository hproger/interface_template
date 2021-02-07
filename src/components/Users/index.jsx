import React, { useState, useEffect, useCallback } from "react";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import routes from "../../routes";
import axios from "axios";
import ListUsers from "./ListUsers";
import EditorUser from "./EditorUser";
import { PAGES_ROUTE } from "../../constants";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [status, setStatus] = useState(0);
  const [editingUser, setEditingUser] = useState(null);

  /**
   * GET /users/list
   * POST /users/add
   * POST /users/edit
   * POST /users/delete
   */
  const getListUser = useCallback(() => {
    axios
      .get(routes.users.list)
      .then(({ data }) => setUsers(data))
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const handleHide = () => setStatus(0);

  const handleEdit = (user) => {
    setStatus(1);
    setEditingUser(user);
  };

  const handleRemove = (curID, curIndex) => {
    axios
      .post(routes.users.delete, { id: curID })
      .then(({ data }) => {
        if (data.result === 1) {
          let tmpUsers = users;
          tmpUsers.splice(curIndex, 1);
          setUsers(tmpUsers);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleSave = (user) => {
    if (status === 1) {
      axios
        .post(routes.users.edit, {
          id: user.id,
          name: user.name,
          login: user.login,
          pass: user.pass,
        })
        .then(({ data }) => {
          getListUser();
          handleHide();
        })
        .catch(function (error) {
          console.log(error);
        });
    } else if (status === 2) {
      axios
        .post(routes.users.add, {
          name: user.name,
          login: user.login,
          pass: user.pass,
        })
        .then(({ data }) => {
          let tmpUsers = users;
          tmpUsers.push({
            id: parseInt(data.id),
            name: user.name,
            login: user.login,
            pass: user.pass,
          });
          setUsers(tmpUsers);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    getListUser();
  }, [getListUser]);

  return (
    <div className="page_users">
      <BreadcrumbsItem to={PAGES_ROUTE.USERS}>Пользователи</BreadcrumbsItem>
      <div className="row">
        <div className="col-md-12">
          <span className="add_btn" onClick={() => setStatus(2)}>
            <span
              className="glyphicon glyphicon-plus"
              aria-hidden="true"
            ></span>
            &nbsp;Добавить пользователя
          </span>
        </div>
      </div>
      <div className="row">
        <div
          className={status === 0 ? "col-md-12 col-sm-12" : "col-md-6 col-sm-6"}
        >
          <ListUsers
            users={users}
            handleEdit={handleEdit}
            handleRemove={handleRemove}
          />
        </div>
        {status > 0 && (
          <div className="col-md-6 col-sm-6">
            <EditorUser
              title={
                status === 1
                  ? "Редактирование пользователя"
                  : "Новый пользователь"
              }
              user={status === 1 ? editingUser : null}
              handleSave={handleSave}
              handleHide={handleHide}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Users;
