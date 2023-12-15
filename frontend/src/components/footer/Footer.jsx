import React from 'react';

const Footer = () => {
  return (
    <footer className="text-white py-2 bg-dark">
      <div className="container">
        <nav className="row d-flex justify-content-between vw-100">
          <ul className="col-12 col-md-3 list-unstyled">
            <li className="font-weight-bold mb-2 text-center">VIAJES</li>
            <li className="text-center">En este sitio podrás atesorar tus momentos preferidos.</li>
          </ul>
          <ul className="col-12 col-md-3 list-unstyled m-0 p-0">
            <li className="font-weight-bold mb-2 text-center w-10">Seguir</li>
            <li className="d-flex justify-content-center">
              <i className="bi bi-facebook me-4" />
              <i className="bi bi-instagram me-4" />
              <i className="bi bi-twitter me-4" />
              <i className="bi bi-youtube me-4" />
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;