import { useEffect, useState } from "react";
import axios from "axios";
import { loadCSS, loadJS } from "../utils/loadAssets";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

function MenuSettings() {
  const [menus, setMenus] = useState([]);
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    // Load CSS and JS only once
    loadCSS(
      "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
    );
    loadCSS(
      "https://cdn.jsdelivr.net/npm/startbootstrap-sb-admin-2@4.1.4/css/sb-admin-2.min.css"
    );

    loadJS("https://code.jquery.com/jquery-3.6.0.min.js");
    loadJS(
      "https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/js/bootstrap.bundle.min.js"
    );
    loadJS(
      "https://cdnjs.cloudflare.com/ajax/libs/jquery-easing/1.4.1/jquery.easing.min.js"
    );
    loadJS(
      "https://cdn.jsdelivr.net/npm/startbootstrap-sb-admin-2@4.1.4/js/sb-admin-2.min.js"
    );
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/menu", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`, // ✅ Corrected token key
        },
      })
      .then((res) => setMenus(res.data))
      .catch((err) => console.error("Error loading menus", err));
  }, []);

  const handleChange = (index, field, value) => {
    const updatedMenus = [...menus];
    updatedMenus[index][field] = value;
    setMenus(updatedMenus);
  };

  const handleSave = () => {
    axios
      .post("http://localhost:5000/api/menu", menus, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      })
      .then(() => {
        setSuccessMsg("Menu updated successfully ✅");

        // Auto-clear after 3 seconds
        setTimeout(() => setSuccessMsg(""), 3000);
      })
      .catch(() => alert("Error updating menus"));
  };

  return (
    <div id="page-top">
      <div id="wrapper">
        <Sidebar />

        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <Topbar />

            <div className="container-fluid">
              {successMsg && (
                <div
                  className="alert alert-success alert-dismissible fade show"
                  role="alert"
                >
                  {successMsg}
                  <button
                    type="button"
                    className="close"
                    onClick={() => setSuccessMsg("")}
                  >
                    <span>&times;</span>
                  </button>
                </div>
              )}
              <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">Menu Settings</h1>
              </div>

              <table className="table table-bordered">
                <thead className="thead-light">
                  <tr>
                    <th>Menu Name</th>
                    <th>Menu URL</th>
                    <th>Menu Order</th>
                  </tr>
                </thead>
                <tbody>
                  {menus.map((menu, index) => (
                    <tr key={index}>
                      <td>
                        <input
                          type="text"
                          className="form-control"
                          value={menu.label}
                          onChange={(e) =>
                            handleChange(index, "label", e.target.value)
                          }
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          className="form-control"
                          value={menu.url}
                          onChange={(e) =>
                            handleChange(index, "url", e.target.value)
                          }
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          className="form-control"
                          value={menu.order}
                          onChange={(e) =>
                            handleChange(index, "order", e.target.value)
                          }
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <button className="btn btn-primary" onClick={handleSave}>
                Save
              </button>
            </div>
          </div>

          <footer className="sticky-footer bg-white">
            <div className="container my-auto">
              <div className="copyright text-center my-auto">
                <span>Copyright © Meet Kanak Admin 2025</span>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default MenuSettings;
