import React, { useState } from "react";
import MainLayout from "../components/layout/MainLayout";
import Partner from "../components/common/Partner";
import About from "../components/Home2/About";
import Testimonial from "../components/Home2/Testimonial";
import WhyChooseSection from "../components/Home2/Choose";
import VideoArea from "../components/Home2/VideoArea";
import PeopleSection from "../components/Home2/PeopleSection";
import Contact from "../components/Home2/Contact";

const AboutPage = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleText = () => {
    setIsExpanded((prevExpanded) => !prevExpanded);
  };
  return (
    <MainLayout>
      {/* <Partner gap="mb-130" /> */}
      <br />
      <br />
      <br />
      <About />
      <br />
      <br />
      <br />
      <div className="mission-section mb-130 mt-130">
        <div className="container-fluid one pl--95">
          <div className="row g-lg-4 gy-5">
            <div className="col-lg-4">
              <div className="mission-img">
                <img
                  src="assets/img/newest_team/missionandvision.png"
                  alt=""
                />
              </div>
            </div>
            <div className="col-lg-8 pl--95">
              <div className="mission-content-wrap" style={{marginTop : '2rem'}}>
                <div className="mission-content-top">
                  <div className="section-title1 w-890">
                    <h2 style={{fontSize : '25px' , fontWeight : 400}}>
                      Our Vision
                    </h2>
                  </div>
                  {/* <p>
                    Our vision is to revolutionize the financial services industry in the UAE by setting new standards of excellence, innovation, and customer satisfaction. We aspire to be the leading direct sales agency known for our unwavering commitment to quality, transparency, and personalized service.
                  </p> */}
                  <p style={{fontSize : '16px' , marginBottom : 0}}>
                    - To provide financial solutions tailored to our clients' needs and ensure that our customers are aligned with the requirements of various financial institutions.
                  </p>
                  <p style={{fontSize : '16px' , marginBottom : 0}}>
                  - To maintain the highest level of professionalism and confidentiality in our work ethos.
                  </p>
                  <p style={{fontSize : '16px' , marginBottom : 0}}>
                  - To ensure continuous investments in the Company to achieve the highest standards of performance from our staff and ensure technology and processes are tuned to provide maximum efficiency.
                  </p>
                </div>
                <div className="mission-content-bottom">
                  <h3>Our Mission</h3>
                  <p>
                    Our mission is to empower our clients with access to a comprehensive range
                    of financial products and services. We aim to be the go-to partner for
                    individuals and businesses, fostering long-term relationships built on trust,
                    integrity, and excellence.
                  </p>
                  {/* <p
                    className="moretext"
                    style={{ display: isExpanded ? "block" : "none" }}
                  >
                    To empower organizations to thrive and achieve their full
                    potential by providing strategic insights, innovative
                    solutions, and expert guidance. We partner with our clients
                    to enhance efficiency, competitiveness, and sustainability
                    in an ever-evolving business landscape.
                  </p> */}
                  {/* <a className="moreless-button">Read More</a> */}
                  {/* <a
                    className={`moreless-button bi ${isExpanded ? "bi-chevron-up" : "bi-chevron-down"
                      }`}
                    onClick={toggleText}
                  >
                    {isExpanded ? "Read Less" : "Read More"}
                  </a> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <Testimonial /> */}
      {/* <WhyChooseSection /> */}
      <VideoArea />
      {/* <PeopleSection /> */}
      {/* <Contact /> */}
    </MainLayout>
  );
};

export default AboutPage;
