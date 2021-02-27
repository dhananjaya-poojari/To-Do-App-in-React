import React from "react";
import { Link, Redirect } from "react-router-dom";

export default function Login() {
  const a = () => {
    console.log("a");
  };
  return (
    <div
      className="login-wrapper"
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h1>Please Log In</h1>
      <div className="container row">
        <div className="jumbotron col-sm-4 pull-center">
          <form onSubmit={a} action='/task'>
            <div className="form-group">
              <label>Username:</label>
              <input
                className="form-control"
                required
                type="text"
                name="username"
              />
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input
                className="form-control"
                required
                type="password"
                name="password"
              />
            </div>
            <div className="form-group">
              {/* <Link to="/task"> */}
                <input
                  className="btn btn-primary"
                  type="submit"
                  value="Log In"
                />
              {/* </Link> */}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
