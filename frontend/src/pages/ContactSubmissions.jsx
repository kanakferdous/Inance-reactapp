import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { loadCSS, loadJS } from "../utils/loadAssets";

function ContactSubmissions() {
  const [submissions, setSubmissions] = useState([]);
  const [error, setError] = useState("");

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
      .get("http://localhost:5000/api/contacts", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      })
      .then((res) => setSubmissions(res.data))
      .catch((err) => {
        console.error("Failed to load submissions", err);
        setError("Failed to load submissions.");
      });
  }, []);

  return (
    <div id="page-top">
      <div id="wrapper">
        <Sidebar />
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <Topbar />
            <div className="container-fluid">
              <h4 className="mb-4">Contact Form Submissions</h4>

              {error && <div className="alert alert-danger">{error}</div>}

              <div className="table-responsive">
                <table className="table table-bordered table-hover">
                  <thead className="thead-light">
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Message</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {submissions.length > 0 ? (
                      submissions.map((entry) => (
                        <tr key={entry._id}>
                          <td>{entry.name}</td>
                          <td>{entry.email}</td>
                          <td>{entry.phone}</td>
                          <td>{entry.message}</td>
                          <td>{new Date(entry.createdAt).toLocaleString()}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="text-center">
                          No submissions found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactSubmissions;
