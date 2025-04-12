import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { loadCSS, loadJS } from "../utils/loadAssets";

function ServiceSettings() {
  const [sectionTitle, setSectionTitle] = useState("");
  const [buttonText, setButtonText] = useState("");
  const [buttonUrl, setButtonUrl] = useState("");
  const [items, setItems] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
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
      .get("http://localhost:5000/api/service-section")
      .then((res) => {
        setSectionTitle(res.data.sectionTitle || "");
        setButtonText(res.data.buttonText || "");
        setButtonUrl(res.data.buttonUrl || "");
        setItems(res.data.items || []);
      })
      .catch((err) => console.error("Failed to fetch section", err));
  }, []);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "image/png") {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    } else {
      alert("Only PNG files are allowed");
    }
  };

  const handleSectionUpdate = () => {
    axios
      .post(
        "http://localhost:5000/api/service-section",
        {
          sectionTitle,
          buttonText,
          buttonUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        }
      )
      .then(() => {
        setSuccessMsg("Section updated ✅");
        setTimeout(() => setSuccessMsg(""), 3000);
      })
      .catch(() => alert("Failed to update section info"));
  };

  const handleItemSave = () => {
    if (!title.trim()) return alert("Please enter title");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    if (imageFile) formData.append("image", imageFile);

    const request = selectedItem
      ? axios.put(
          `http://localhost:5000/api/service-section/item/${selectedItem._id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
            },
          }
        )
      : axios.post("http://localhost:5000/api/service-section/item", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        });

    request
      .then(() => {
        return axios.get("http://localhost:5000/api/service-section");
      })
      .then((res) => {
        setItems(res.data.items || []);
        resetItemForm();
        setSuccessMsg("Item saved ✅");
        setTimeout(() => setSuccessMsg(""), 3000);
      })
      .catch(() => alert("Failed to save item"));
  };

  const handleDelete = (id) => {
    if (!window.confirm("Delete this item?")) return;

    axios
      .delete(`http://localhost:5000/api/service-section/item/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      })
      .then(() => {
        return axios.get("http://localhost:5000/api/service-section");
      })
      .then((res) => {
        setItems(res.data.items || []);
      })
      .catch(() => alert("Delete failed"));
  };

  const resetItemForm = () => {
    setTitle("");
    setDescription("");
    setImageFile(null);
    setPreview("");
    setSelectedItem(null);
  };

  return (
    <div id="page-top">
      <div id="wrapper">
        <Sidebar />
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <Topbar />
            <div className="container-fluid">
              <h4>Service Section Settings</h4>

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

              <button
                className="btn btn-success mb-4"
                onClick={handleSectionUpdate}
              >
                Save Section Info
              </button>

              <hr />

              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5>{selectedItem ? "Edit Item" : "Add New Item"}</h5>
                <button className="btn btn-secondary" onClick={resetItemForm}>
                  Clear
                </button>
              </div>

              <div className="form-group">
                <label>Item Title</label>
                <input
                  type="text"
                  className="form-control"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Item Description</label>
                <textarea
                  className="form-control"
                  rows="3"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>

              <div className="form-group">
                <label>PNG Image</label>
                <input
                  type="file"
                  className="form-control"
                  accept="image/png"
                  onChange={handleUpload}
                />
                {preview && (
                  <img
                    src={preview}
                    alt="Preview"
                    className="mt-3"
                    style={{ maxWidth: "200px", border: "1px solid #ccc" }}
                  />
                )}
              </div>

              <button className="btn btn-primary" onClick={handleItemSave}>
                {selectedItem ? "Update Item" : "Add Item"}
              </button>

              <hr />
              <h5 className="mt-4">Service Items</h5>
              <div className="row">
                {items.map((item) => (
                  <div key={item._id} className="col-md-4 mb-4">
                    <div className="card h-100">
                      <div className="card-body">
                        <img
                          src={`http://localhost:5000${item.image}`}
                          alt={item.title}
                          className="mb-2"
                          style={{
                            width: "100px",
                            height: "100px",
                            objectFit: "cover",
                          }}
                        />
                        <h5>{item.title}</h5>
                        <p>{item.description}</p>
                        <div className="d-flex justify-content-between">
                          <button
                            className="btn btn-sm btn-primary"
                            onClick={() => {
                              setSelectedItem(item);
                              setTitle(item.title);
                              setDescription(item.description);
                              setPreview(`http://localhost:5000${item.image}`);
                              setImageFile(null);
                            }}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => handleDelete(item._id)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
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

export default ServiceSettings;
