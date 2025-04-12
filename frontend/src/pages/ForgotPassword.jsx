import { useEffect } from "react";
import { Link } from "react-router-dom";
import { loadCSS, loadJS } from "../utils/loadAssets";

function ForgotPassword() {
  useEffect(() => {
    loadCSS(
      "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
    );
    loadCSS(
      "https://fonts.googleapis.com/css?family=Nunito:200,300,400,700,800,900"
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

  return (
    <div className="bg-gradient-primary vh-100">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-6 col-lg-12 col-md-6">
            <div className="card o-hidden border-0 shadow-lg my-5">
              <div className="card-body p-0">
                <div className="p-5">
                  <div className="text-center">
                    <h1 className="h4 text-gray-900 mb-2">
                      Forgot Your Password?
                    </h1>
                    <p className="mb-4">
                      We get it, stuff happens. Just enter your email address
                      below and we'll send you a link to reset your password!
                    </p>
                  </div>
                  <form className="user">
                    <div className="form-group">
                      <input
                        type="email"
                        className="form-control form-control-user"
                        id="email"
                        placeholder="Enter Email Address..."
                      />
                    </div>
                    <button
                      type="submit"
                      className="btn btn-primary btn-user btn-block"
                    >
                      Reset Password
                    </button>
                  </form>
                  <hr />
                  <div className="text-center">
                    <Link className="small" to="/register">
                      Create an Account!
                    </Link>
                  </div>
                  <div className="text-center">
                    <Link className="small" to="/login">
                      Already have an account? Login!
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
