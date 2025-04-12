import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { loadCSS, loadJS } from "../utils/loadAssets";

function ContactSectionSettings() {
  const [sectionTitle, setSectionTitle] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
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
      .get("http://localhost:5000/api/contact-section")
      .then((res) => {
        setSectionTitle(res.data.sectionTitle || "");
      })
      .catch((err) =>
        console.error("Failed to load contact section title", err)
      );
  }, []);

  const handleSave = () => {
    axios
      .post(
        "http://localhost:5000/api/contact-section",
        { sectionTitle },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        }
      )
      .then(() => {
        setSuccessMsg("Contact section title updated ✅");
        setTimeout(() => setSuccessMsg(""), 3000);
      })
      .catch(() => alert("Failed to update section title"));
  };

  return (
    <div id="page-top">
      <div id="wrapper">
        <Sidebar />
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <Topbar />
            <div className="container-fluid">
              <h4 className="mb-4">Contact Section Settings</h4>

              {successMsg && (
                <div className="alert alert-success alert-dismissible fade show">
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

              <div className="form-group">
                <label>Section Title</label>
                <input
                  type="text"
                  className="form-control"
                  value={sectionTitle}
                  onChange={(e) => setSectionTitle(e.target.value)}
                />
              </div>

              <button className="btn btn-primary mt-3" onClick={handleSave}>
                Save Title
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactSectionSettings;
