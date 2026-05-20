import "./Footer.module.scss";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <div className="container footer-content">
        <p>
          &copy; {currentYear} | Designed and built by{" "}
          <span className="highlight">Faizullah Hussain</span> — React Developer
        </p>
      </div>
    </footer>
  );
};

export default Footer;
