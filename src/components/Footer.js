import React from "react";
import footer_image from "./../Images/footer_bg.png";
import "./../css/footer.css";
import { ArrowUpIcon } from "@chakra-ui/icons";
const Footer = ({moveTop}) => {
  return (
    <footer>
      <div>
        <img src={footer_image} alt="" />
      </div>
      <footer className="footer section">
        <div className="footer__container container grid">
          <div className="footer__content grid">
            <div className="footer__data">
              <h3 className="footer__title">Trash Analysis</h3>
              <p className="footer__description">
                Contribute to the
                <br />
                cause, we offer you the <br />
                experience.
              </p>
              <div>
                <a
                  href="https://www.facebook.com/"
                  target="_blank"
                  className="footer__social"
                >
                  <i className="ri-facebook-box-fill"></i>
                </a>
                <a
                  href="https://twitter.com/"
                  target="_blank"
                  className="footer__social"
                >
                  <i className="ri-twitter-fill"></i>
                </a>
                <a
                  href="https://www.instagram.com/"
                  target="_blank"
                  className="footer__social"
                >
                  <i className="ri-instagram-fill"></i>
                </a>
                <a
                  href="https://www.youtube.com/"
                  target="_blank"
                  className="footer__social"
                >
                  <i className="ri-youtube-fill"></i>
                </a>
              </div>
            </div>

            <div className="footer__data">
              <h3 className="footer__subtitle">About</h3>
              <ul>
                <li className="footer__item">
                  <a href="" className="footer__link">
                    About Us
                  </a>
                </li>
                <li className="footer__item">
                  <a href="" className="footer__link">
                    Features
                  </a>
                </li>
                <li className="footer__item">
                  <a href="" className="footer__link">
                    New & Blog
                  </a>
                </li>
              </ul>
            </div>

            <div className="footer__data">
              <h3 className="footer__subtitle">Company</h3>
              <ul>
                <li className="footer__item">
                  <a href="" className="footer__link">
                    Team
                  </a>
                </li>
                <li className="footer__item">
                  <a href="" className="footer__link">
                    Become a Sponsor
                  </a>
                </li>
                <li className="footer__item">
                  <a href="" className="footer__link">
                    Become a member
                  </a>
                </li>
              </ul>
            </div>

            <div className="footer__data">
              <h3 className="footer__subtitle">Support</h3>
              <ul>
                <li className="footer__item">
                  <a href="" className="footer__link">
                    FAQs
                  </a>
                </li>
                <li className="footer__item">
                  <a href="" className="footer__link">
                    Support Center
                  </a>
                </li>
                <li className="footer__item">
                  <a href="" className="footer__link">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* <div className="footer__rights">
            <p className="footer__copy">
              &#169; Team Warriors. All rigths reserved.
            </p>
          </div> */}
        </div>
        <ArrowUpIcon
          backgroundColor={"rgb(65, 201, 190)"}
          width={"40px"}
          height={"40px"}
          borderRadius={"50%"}
          position={"fixed"}
          right={"5%"}
          bottom={"10%"}
          cursor={"pointer"}
          onClick={()=>{moveTop()}}
        />
      </footer>
    </footer>
  );
};

export default Footer;
