import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { loadCSS, loadJS } from "../utils/loadAssets";

function FeatureSettings() {
  const [features, setFeatures] = useState([]);
  const [title, setTitle] = useState("");
  const [iconFile, setIconFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [selectedFeature, setSelectedFeature] = useState(null);

  useEffect(() => {
    // Load external assets
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
      .get("http://localhost:5000/api/feature")
      .then((res) => setFeatures(res.data))
      .catch((err) => console.error("Failed to load features", err));
  }, []);

  useEffect(() => {
    if (selectedFeature?.icon) {
      fetch(`http://localhost:5000${selectedFeature.icon}`)
        .then((res) => res.text())
        .then((svg) => setPreview(svg))
        .catch(() => setPreview(""));
    }
  }, [selectedFeature]);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    setIconFile(file);
    if (file && file.type === "image/svg+xml") {
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result);
      reader.readAsText(file);
    } else {
      setPreview("");
    }
  };

  const handleSave = () => {
    if (!title.trim()) {
      alert("Please enter a title");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    if (iconFile) {
      formData.append("icon", iconFile);
    }

    const request = selectedFeature
      ? axios.put(
          `http://localhost:5000/api/feature/${selectedFeature._id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
            },
          }
        )
      : axios.post("http://localhost:5000/api/feature", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        });

    request
      .then((res) => {
        const updated = res.data.feature;

        if (selectedFeature) {
          setFeatures((prev) =>
            prev.map((f) => (f._id === updated._id ? updated : f))
          );
          setSuccessMsg("Feature updated successfully ✅");
        } else {
          setFeatures((prev) => [...prev, updated]);
          setSuccessMsg("Feature added successfully ✅");
        }

        // Reset form
        setTitle("");
        setIconFile(null);
        setPreview("");
        setSelectedFeature(null);

        setTimeout(() => setSuccessMsg(""), 3000);
      })
      .catch(() => alert("Error saving feature"));
  };

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this feature?")) return;

    axios
      .delete(`http://localhost:5000/api/feature/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      })
      .then(() => {
        setFeatures((prev) => prev.filter((f) => f._id !== id));
      })
      .catch(() => alert("Failed to delete feature"));
  };


  return (
    <div id="page-top">
      <div id="wrapper">
        <Sidebar />
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <Topbar />
            <div className="container-fluid">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4>Feature Section Settings</h4>
                <button
                  className="btn btn-secondary"
                  onClick={() => {
                    setSelectedFeature(null);
                    setTitle("");
                    setIconFile(null);
                    setPreview("");
                  }}
                >
                  + Create New Feature
                </button>
              </div>

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

              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  className="form-control"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Upload SVG Icon</label>
                <input
                  type="file"
                  accept=".svg"
                  className="form-control"
                  onChange={handleUpload}
                />
                {preview && (
                  <div
                    className="border mt-2 p-2"
                    dangerouslySetInnerHTML={{ __html: preview }}
                  />
                )}
              </div>

              <button className="btn btn-primary" onClick={handleSave}>
                {selectedFeature ? "Update Feature" : "Add Feature"}
              </button>

              <hr />
              <h4 className="mt-4">Current Features</h4>
              <div className="d-flex flex-wrap">
                {features.map((feature) => (
                  <div
                    key={feature._id}
                    className="border p-3 m-2 text-center"
                    style={{ width: "150px" }}
                  >
                    {feature.icon && (
                      <object
                        type="image/svg+xml"
                        data={`http://localhost:5000${feature.icon}`}
                        style={{ height: "50px", marginBottom: "10px" }}
                      />
                    )}
                    <strong>{feature.title}</strong>
                    <div className="mt-2 d-flex justify-content-center gap-2">
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => {
                          setSelectedFeature(feature);
                          setTitle(feature.title);
                          setIconFile(null);
                          if (feature.icon) {
                            fetch(`http://localhost:5000${feature.icon}`)
                              .then((res) => res.text())
                              .then((svg) => {
                                setPreview(svg);
                              });
                          } else {
                            setPreview("");
                          }
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(feature._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeatureSettings;
