import { useEffect } from "react";
import Logo from "../assets/images/logo-darkor-removebg.png";

const Toast = ({ toggle, setToggle, data }) => {
  useEffect(() => {
    if (toggle === true) {
      setTimeout(() => {
        setToggle(false);
      }, 5000);
    }
  }, [toggle]);
  return (
    <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: "1000" }}>
      <div
        id="liveToast"
        className={`toast ${toggle ? "show" : "hide"}`}
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div className="toast-header">
          <img width={30} src={Logo} className="rounded me-2" alt="logo" />
          <strong className="me-auto">Rizq | Xabar</strong>
          <small>Now</small>
          <button
            type="button"
            className="btn-close"
            onClick={() => setToggle(false)}
            aria-label="Close"
          ></button>
        </div>
        <div
          className={`toast-body ${
            data.includes("success") ? "bg-success" : "bg-danger"
          }  text-white`}
        >
          {data}
        </div>
      </div>
    </div>
  );
};

export default Toast;
