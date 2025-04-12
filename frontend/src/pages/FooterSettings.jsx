import { useEffect, useState } from "react";
import axios from "axios";
import { loadCSS, loadJS } from "../utils/loadAssets";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

function FooterSettings() {
  const [footer, setFooter] = useState({
    address: "",
    phone: "",
    email: "",
    facebook: "",
    twitter: "",
    youtube: "",
    instagram: "",
    copyright: "",
  });
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    // Load styles/scripts
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
      .get("http://localhost:5000/api/footer")
      .then((res) => setFooter(res.data || {}))
      .catch((err) => console.error("Error loading footer settings", err));
  }, []);

  const handleChange = (field, value) => {
    setFooter({ ...footer, [field]: value });
  };

  const handleSave = () => {
    axios
      .post("http://localhost:5000/api/footer", footer, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      })
      .then(() => {
        setSuccessMsg("Footer updated successfully ✅");
        setTimeout(() => setSuccessMsg(""), 3000);
      })
      .catch(() => alert("Error updating footer"));
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
              <h1 className="h3 mb-4 text-gray-800">Footer Settings</h1>

              {[
                "address",
                "phone",
                "email",
                "facebook",
                "twitter",
                "youtube",
                "instagram",
                "copyright",
              ].map((field) => (
                <div className="form-group" key={field}>
                  <label className="text-capitalize">
                    {field.replace("_", " ")}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={footer[field] || ""}
                    onChange={(e) => handleChange(field, e.target.value)}
                  />
                </div>
              ))}

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

export default FooterSettings;
