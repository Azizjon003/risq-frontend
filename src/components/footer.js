const Footer = () => {
  return (
    <footer className="content-footer footer bg-footer-theme">
      <div className="container-xxl d-flex flex-wrap justify-content-between align-items-center py-2 flex-md-row flex-column">
        <div className="mb-2 mb-md-0">
          Copyright ©<script>document.write(new Date().getFullYear());</script>,
          <a
            href="http://risq.tj"
            target="_blank"
            className="footer-link fw-bolder"
            rel="noreferrer"
          >
            Rizq
          </a>
        </div>
        <div>
          <a
            href="https://themeselection.com/documentation"
            target="_blank"
            className="footer-link me-4"
            rel="noreferrer"
          >
            Documentation
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
