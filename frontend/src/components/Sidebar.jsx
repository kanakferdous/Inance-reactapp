import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <ul
      className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
      id="accordionSidebar"
    >
      {/* Brand */}
      <Link
        className="sidebar-brand d-flex align-items-center justify-content-center"
        to="/dashboard"
      >
        <div className="sidebar-brand-icon rotate-n-15">
          <i className="fas fa-tools"></i>
        </div>
        <div className="sidebar-brand-text mx-3">Admin Panel</div>
      </Link>

      <hr className="sidebar-divider my-0" />

      {/* Dashboard Link */}
      <li className="nav-item active">
        <Link className="nav-link" to="/dashboard">
          <i className="fas fa-fw fa-tachometer-alt"></i>
          <span>Dashboard</span>
        </Link>
      </li>

      <hr className="sidebar-divider" />

      {/* Site Settings Section */}
      <hr className="sidebar-divider" />
      <div className="sidebar-heading">Site Settings</div>

      <li className="nav-item">
        <Link className="nav-link" to="/dashboard/site-settings/menu">
          <i className="fas fa-bars"></i>
          <span>Menu Settings</span>
        </Link>
      </li>

      <li className="nav-item">
        <Link className="nav-link" to="/dashboard/site-settings/topbar">
          <i className="fas fa-phone"></i>
          <span>Topbar Info</span>
        </Link>
      </li>

      <li className="nav-item">
        <Link className="nav-link" to="/dashboard/site-settings/footer">
          <i className="fas fa-shoe-prints"></i>
          <span>Footer Settings</span>
        </Link>
      </li>

      <hr className="sidebar-divider" />

      {/* Homepage Settings */}
      <div className="sidebar-heading">Homepage Settings</div>

      <li className="nav-item">
        <Link className="nav-link" to="/dashboard/homepage-settings/hero">
          <i className="fas fa-bolt"></i>
          <span>Hero Section</span>
        </Link>
      </li>

      {/* Future sections can go here */}
      <li className="nav-item">
        <Link className="nav-link" to="/dashboard/homepage-settings/feature">
          <i className="fas fa-user-circle"></i>
          <span>Feature Section</span>
        </Link>
      </li>

      <li className="nav-item">
        <Link className="nav-link" to="/dashboard/homepage-settings/about-us">
          <i className="fas fa-user-circle"></i>
          <span>About Us</span>
        </Link>
      </li>

      <li className="nav-item">
        <Link
          className="nav-link"
          to="/dashboard/homepage-settings/professional"
        >
          <i className="fas fa-user-circle"></i>
          <span>Professional</span>
        </Link>
      </li>

      <li className="nav-item">
        <Link className="nav-link" to="/dashboard/homepage-settings/service">
          <i className="fas fa-user-circle"></i>
          <span>Service</span>
        </Link>
      </li>

      <li className="nav-item">
        <Link
          className="nav-link"
          to="/dashboard/homepage-settings/testimonial"
        >
          <i className="fas fa-user-circle"></i>
          <span>Testimonial</span>
        </Link>
      </li>

      <li className="nav-item">
        <Link className="nav-link" to="/dashboard/homepage-settings/contact">
          <i className="fas fa-user-circle"></i>
          <span>Contact</span>
        </Link>
      </li>

      <hr className="sidebar-divider" />
      <div className="sidebar-heading">Form Submissions</div>

      <li className="nav-item">
        <Link className="nav-link" to="/dashboard/form-data">
          <i className="fas fa-file-alt"></i>
          <span>Form Submissions</span>
        </Link>
      </li>

      <hr className="sidebar-divider" />
      <div className="sidebar-heading">Pages</div>

      <li className="nav-item">
        <Link className="nav-link" to="/dashboard/page-settings">
          <i className="fas fa-file-alt"></i>
          <span>All Pages</span>
        </Link>
      </li>
    </ul>
  );
}

export default Sidebar;
