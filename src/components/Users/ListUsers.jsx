import React from "react";

const ListUsers = ({ users, handleRemove, handleEdit }) => (
  <div className="list_users">
    <div className="table-responsive">
      <table className="table table-hover">
        <thead>
          <tr>
            <th>№</th>
            <th>Имя</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, i) => (
            <tr key={user.id}>
              <td>{i + 1}</td>
              <td>{user.name}</td>
              <td>
                <button type="button" className="btn btn-default" onClick={() => handleEdit(user)} >
                  <span className="glyphicon glyphicon-edit" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  className="btn btn-default"
                  onClick={() => handleRemove(user.id)}
                >
                  <span className="glyphicon glyphicon-remove" aria-hidden="true" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default ListUsers;
