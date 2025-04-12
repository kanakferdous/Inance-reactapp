import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { loadCSS, loadJS } from "../utils/loadAssets";

function PageSettings() {
  const [pages, setPages] = useState([]);
  const [selectedPage, setSelectedPage] = useState(null);
  const [isNewPage, setIsNewPage] = useState(false);
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

  const fetchPages = () => {
    axios
      .get("http://localhost:5000/api/pages", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      })
      .then((res) => setPages(res.data))
      .catch((err) => console.error("Failed to load pages", err));
  };

  useEffect(() => {
    fetchPages();
  }, []);

  const handleSelectPage = (slug) => {
    const page = pages.find((p) => p.slug === slug);
    setSelectedPage({ ...page });
    setIsNewPage(false);
  };

  const handleNewPage = () => {
    setSelectedPage({
      title: "",
      slug: "",
      content: "",
    });
    setIsNewPage(true);
  };

  const handleChange = (field, value) => {
    setSelectedPage((prev) => {
      const updated = { ...prev, [field]: value };
      if (field === "title" && isNewPage) {
        updated.slug = value.toLowerCase().replace(/\s+/g, "-");
      }
      return updated;
    });
  };

  const handleSave = () => {
    axios
      .post("http://localhost:5000/api/pages", selectedPage, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      })
      .then((res) => {
        const updatedPage = res.data.page;
        setSuccessMsg(isNewPage ? "New page created ✅" : "Page updated ✅");
        setTimeout(() => setSuccessMsg(""), 3000);
        setIsNewPage(false);
        setSelectedPage(updatedPage);
        fetchPages(); // Refresh page list
      })
      .catch(() => alert("Error saving page"));
  };

  const handleDelete = (slug) => {
    if (!window.confirm("Are you sure you want to delete this page?")) return;

    axios
      .delete(`http://localhost:5000/api/pages/${slug}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      })
      .then(() => {
        setPages((prev) => prev.filter((p) => p.slug !== slug));
        setSelectedPage(null);
        setIsNewPage(false);
        setSuccessMsg("Page deleted successfully ✅");
        setTimeout(() => setSuccessMsg(""), 3000);
      })
      .catch(() => alert("Failed to delete page"));
  };

  return (
    <div id="page-top">
      <div id="wrapper">
        <Sidebar />
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <Topbar />
            <div className="container-fluid">
              <h1 className="h3 mb-4 text-gray-800">Pages</h1>

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

              <div className="row">
                {/* Page List */}
                <div className="col-md-4">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h5>All Pages</h5>
                    <button
                      className="btn btn-sm btn-success"
                      onClick={handleNewPage}
                    >
                      + New Page
                    </button>
                  </div>
                  {pages.map((page) => (
                    <div
                      key={page._id}
                      className="d-flex justify-content-between align-items-center border p-2 mb-2"
                    >
                      <span className="text-dark font-weight-bold">
                        {page.title}
                      </span>
                      <div>
                        <a
                          href={`/${page.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-sm btn-secondary mr-2"
                        >
                          Preview
                        </a>
                        <button
                          className="btn btn-sm btn-info mr-2"
                          onClick={() => handleSelectPage(page.slug)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleDelete(page.slug)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Page Form */}
                <div className="col-md-8">
                  {selectedPage && (
                    <>
                      <div className="form-group">
                        <label>Title</label>
                        <input
                          type="text"
                          className="form-control"
                          value={selectedPage.title}
                          onChange={(e) =>
                            handleChange("title", e.target.value)
                          }
                        />
                      </div>

                      <div className="form-group">
                        <label>Slug</label>
                        <input
                          type="text"
                          className="form-control"
                          value={selectedPage.slug}
                          readOnly
                        />
                      </div>

                      <div className="form-group">
                        <label>Content</label>
                        <textarea
                          className="form-control"
                          rows="5"
                          value={selectedPage.content}
                          onChange={(e) =>
                            handleChange("content", e.target.value)
                          }
                        ></textarea>
                      </div>

                      <button className="btn btn-primary" onClick={handleSave}>
                        {isNewPage ? "Create Page" : "Save Changes"}
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PageSettings;
