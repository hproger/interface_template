import React, { useState, useEffect } from "react";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import routes from "../../routes";
import axios from "axios";

const System = () => {
  const [listErrors, setListErrors] = useState([]);

  const preloader = (init = true) => {
    let preloader = document.getElementById("preloader");
    if (init) {
      preloader.style.zIndex = 999;
      preloader.style.opacity = 1;
    } else {
      preloader.style.opacity = 0;
      preloader.style.zIndex = -999;
    }
  };
  const getListErrors = () => {
    axios
      .get(routes.errors.list)
      .then(({ data }) => {
        setListErrors(data.reverse());
        preloader(false);
      })
      .catch(function () {
        preloader(false);
      });
  };

  useEffect(() => {
    preloader();
    getListErrors();
  }, []);

  const handleRemove = (id) => {
    preloader();
    axios
      .get(routes.errors.delete + "?id=" + id)
      .then(() => {
        getListErrors();
      })
      .catch(function (error) {
        console.error(error);
      });
  };
  const handleChangeStatus = (id) => {
    preloader();
    axios
      .post(routes.errors.edit, { id: id, status: "closed" })
      .then(() => {
        getListErrors();
      })
      .catch(function (error) {
        console.error(error);
      });
  };
  const removeErrors = () => {
    axios
      .get(routes.errors.deleteall)
      .then(() => {
        getListErrors();
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  return (
    <div className="page_main">
      <BreadcrumbsItem to="/system">Состояние системы</BreadcrumbsItem>
      <div className="row">
        <div className="col-md-10">Сообщения об ошибках</div>
        <div className="col-md-2 text-right">
          <button
            type="button"
            className="btn btn-danger"
            onClick={removeErrors}
          >
            Удалить все ошибки
          </button>
        </div>
      </div>
      <div className="row" style={{ backgroundColor: "white" }}>
        <div className="col-md-12">
          <div className="table-responsive">
            <table className="table">
              <thead>
              <tr>
                <th>№</th>
                <th>Дата</th>
                <th>Текст</th>
                <th />
              </tr>
              </thead>
              <tbody>
              {listErrors.map((item, i) => (
                <tr
                  key={item.id}
                  style={{
                    backgroundColor:
                      item.status === "new" ? "pink" : "transparent",
                  }}
                >
                  <td className="err-col err-col_1">{i + 1}</td>
                  <td className="err-col err-col_2">{item.time}</td>
                  <td className="err-col err-col_3">{item.error_text}</td>
                  <td className="err-col err-col_4">
                    {item.status === "new" && (
                      <button
                        className="btn btn-sm btn-warning"
                        onClick={() => handleChangeStatus(item.id)}
                      >
                        просмотрено
                      </button>
                    )}

                    <button
                      className="btn btn-sm btn-default"
                      onClick={() => handleRemove(item.id)}
                    >
                      <span
                        className="glyphicon glyphicon-remove"
                        aria-hidden="true"
                      />
                    </button>
                  </td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default System;
