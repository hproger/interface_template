import React from "react";

const ListUsers = ({ users, handleRemove, handleEdit }) => {
  return (
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
            {users.map(({ id, name, login }, i) => (
              <tr key={id}>
                <td>{i + 1}</td>
                <td>{name}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-default"
                    onClick={() => handleEdit({ id, name, login })}
                  >
                    <span
                      className="glyphicon glyphicon-edit"
                      aria-hidden="true"
                    ></span>
                  </button>

                  <button
                    type="button"
                    className="btn btn-default"
                    onClick={() => handleRemove(id, i)}
                  >
                    <span
                      className="glyphicon glyphicon-remove"
                      aria-hidden="true"
                    ></span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListUsers;
