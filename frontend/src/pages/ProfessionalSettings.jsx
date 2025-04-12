import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { loadCSS, loadJS } from "../utils/loadAssets";

function ProfessionalSettings() {
  const [heading, setHeading] = useState("");
  const [content, setContent] = useState("");
  const [buttonText, setButtonText] = useState("");
  const [buttonUrl, setButtonUrl] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState("");
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
      .get("http://localhost:5000/api/professional")
      .then((res) => {
        const data = res.data;
        setHeading(data.heading || "");
        setContent(data.content || "");
        setButtonText(data.buttonText || "");
        setButtonUrl(data.buttonUrl || "");
        if (data.image) {
          setPreview(`http://localhost:5000${data.image}`);
        }
      })
      .catch(() => alert("Failed to load Professional section"));
  }, []);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSave = () => {
    const formData = new FormData();
    formData.append("heading", heading);
    formData.append("content", content);
    formData.append("buttonText", buttonText);
    formData.append("buttonUrl", buttonUrl);
    if (imageFile) {
      formData.append("image", imageFile);
    }

    axios
      .post("http://localhost:5000/api/professional", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      })
      .then(() => {
        setSuccessMsg("Professional section updated ✅");
        setTimeout(() => setSuccessMsg(""), 3000);
      })
      .catch(() => alert("Error updating professional section"));
  };

  return (
    <div id="page-top">
      <div id="wrapper">
        <Sidebar />
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <Topbar />
            <div className="container-fluid">
              <h4>Professional Section Settings</h4>

              {successMsg && (
                <div className="alert alert-success alert-dismissible fade show">
                  {successMsg}
                  <button className="close" onClick={() => setSuccessMsg("")}>
                    <span>&times;</span>
                  </button>
                </div>
              )}

              <div className="form-group">
                <label>Heading</label>
                <input
                  type="text"
                  className="form-control"
                  value={heading}
                  onChange={(e) => setHeading(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Content</label>
                <textarea
                  className="form-control"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows="4"
                />
              </div>

              <div className="form-group">
                <label>Button Text</label>
                <input
                  type="text"
                  className="form-control"
                  value={buttonText}
                  onChange={(e) => setButtonText(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Button URL</label>
                <input
                  type="text"
                  className="form-control"
                  value={buttonUrl}
                  onChange={(e) => setButtonUrl(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Upload Image</label>
                <input
                  type="file"
                  className="form-control"
                  accept="image/*"
                  onChange={handleUpload}
                />
                {preview && (
                  <img
                    src={preview}
                    alt="Preview"
                    className="mt-3"
                    style={{ maxWidth: "300px", border: "1px solid #ddd" }}
                  />
                )}
              </div>

              <button className="btn btn-primary mt-3" onClick={handleSave}>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfessionalSettings;
