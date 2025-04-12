import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { loadCSS, loadJS } from "../utils/loadAssets";

function TestimonialSettings() {
  const [sectionTitle, setSectionTitle] = useState("");
  const [testimonials, setTestimonials] = useState([]);

  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [successMsg, setSuccessMsg] = useState("");
  const [deleteId, setDeleteId] = useState(null); // For modal

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
    axios.get("http://localhost:5000/api/testimonials").then((res) => {
      setSectionTitle(res.data.sectionTitle || "");
      setTestimonials(res.data.items || []);
    });
  }, []);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file && ["image/png", "image/jpeg"].includes(file.type)) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    } else {
      alert("Only JPG and PNG files are allowed.");
    }
  };

  const handleSectionUpdate = () => {
    axios
      .post(
        "http://localhost:5000/api/testimonials",
        { sectionTitle },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        }
      )
      .then(() => {
        setSuccessMsg("Section title updated ✅");
        setTimeout(() => setSuccessMsg(""), 3000);
      });
  };

  const handleSave = () => {
    if (!name.trim()) return alert("Please enter client name");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("comment", comment);
    formData.append("rating", rating);
    if (imageFile) formData.append("image", imageFile);

    const request = selectedItem
      ? axios.put(
          `http://localhost:5000/api/testimonials/item/${selectedItem._id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
            },
          }
        )
      : axios.post("http://localhost:5000/api/testimonials/item", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        });

    request.then((res) => {
      setTestimonials(res.data.section.items || []);
      setName("");
      setComment("");
      setRating(5);
      setImageFile(null);
      setPreview("");
      setSelectedItem(null);
      setSuccessMsg("Testimonial saved ✅");
      setTimeout(() => setSuccessMsg(""), 3000);
    });
  };

  const confirmDelete = () => {
    axios
      .delete(`http://localhost:5000/api/testimonials/item/${deleteId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      })
      .then((res) => {
        setTestimonials(res.data.section.items);
        setSuccessMsg("Deleted successfully ✅");
        setTimeout(() => setSuccessMsg(""), 3000);
        setDeleteId(null);
      });
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
                <h4>Testimonial Settings</h4>
                <button
                  className="btn btn-secondary"
                  onClick={() => {
                    setName("");
                    setComment("");
                    setRating(5);
                    setImageFile(null);
                    setPreview("");
                    setSelectedItem(null);
                  }}
                >
                  + Add New Testimonial
                </button>
              </div>

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
              <button
                className="btn btn-success mb-4"
                onClick={handleSectionUpdate}
              >
                Update Section Title
              </button>

              <hr />
              <h5>
                {selectedItem ? "Edit Testimonial" : "Add New Testimonial"}
              </h5>

              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Comment</label>
                <textarea
                  className="form-control"
                  rows="3"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                ></textarea>
              </div>

              <div className="form-group">
                <label>Rating (0.1 - 5)</label>
                <input
                  type="number"
                  step="0.1"
                  min="0.1"
                  max="5"
                  className="form-control"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Upload Image (JPG or PNG)</label>
                <input
                  type="file"
                  accept="image/png, image/jpeg"
                  className="form-control"
                  onChange={handleUpload}
                />
                {preview && (
                  <img
                    src={preview}
                    alt="Preview"
                    className="mt-3"
                    style={{ maxWidth: "200px", border: "1px solid #ddd" }}
                  />
                )}
              </div>

              <button className="btn btn-primary mb-4" onClick={handleSave}>
                {selectedItem ? "Update Testimonial" : "Add Testimonial"}
              </button>

              <hr />
              <h5 className="mt-4">All Testimonials</h5>
              <div className="row">
                {testimonials.map((item) => (
                  <div className="col-md-4 mb-4" key={item._id}>
                    <div className="card h-100">
                      <div className="card-body">
                        <img
                          src={`http://localhost:5000${item.image}`}
                          alt={item.name}
                          className="mb-2"
                          style={{
                            width: "80px",
                            height: "80px",
                            objectFit: "cover",
                            borderRadius: "50%",
                          }}
                        />
                        <h5>{item.name}</h5>
                        <p>{item.comment}</p>
                        <p>⭐ {item.rating}</p>
                        <div className="d-flex justify-content-between">
                          <button
                            className="btn btn-sm btn-primary"
                            onClick={() => {
                              setSelectedItem(item);
                              setName(item.name);
                              setComment(item.comment);
                              setRating(item.rating);
                              setPreview(`http://localhost:5000${item.image}`);
                              setImageFile(null);
                            }}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-sm btn-danger"
                            data-toggle="modal"
                            data-target="#deleteModal"
                            onClick={() => setDeleteId(item._id)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* DELETE MODAL */}
              <div
                className="modal fade"
                id="deleteModal"
                tabIndex="-1"
                role="dialog"
              >
                <div className="modal-dialog" role="document">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title">Confirm Delete</h5>
                      <button
                        type="button"
                        className="close"
                        data-dismiss="modal"
                      >
                        <span>&times;</span>
                      </button>
                    </div>
                    <div className="modal-body">
                      Are you sure you want to delete this testimonial?
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-dismiss="modal"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger"
                        data-dismiss="modal"
                        onClick={confirmDelete}
                      >
                        Yes, Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* END MODAL */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TestimonialSettings;
