import Banner from "../components/home1/Banner";
import CoverArea from "../components/home1/CoverArea";
import Header from "../components/header/Header";
import About from "../components/home1/About";
import GraphtWithImg from "../components/home1/GraphtWithImg";
import FeatureCard from "../components/home1/FeatureCard";
import HorizontalScrolling from "../components/home1/HorizontalScrolling";
import PeopleSection from "../components/home1/PeopleSection";
import Testimonial from "../components/home1/Testimonial";
import Blog from "../components/home1/Blog";
import OurPartner from "../components/home1/OurPartner";
import IndustrialSection from "../components/home1/IndustrialSection";
import ContactSection from "../components/home1/ContactSection";
import Footer from "../components/footer/Footer";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="topbar-area">
        <ul className="topbar-left">
          <li>
            <Link legacyBehavior href="/career"><a>Careers</a></Link>
          </li>
          <li>
            <Link legacyBehavior href="/contact"><a>Join Us</a></Link>
          </li>
          <li>
            <Link legacyBehavior href="/blog-standard"><a>Insight & Events</a></Link>
          </li>
        </ul>
        <ul className="topbar-right">
          <li>Sun-Tue (9:00 am-7.00 pm)</li>
          <li>
            <a href="mailto:infoaploxn@gmail.com">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="10"
                viewBox="0 0 14 10"
              >
                <g>
                  <path d="M12.8333 0H1.16668C0.523223 0 0 0.498307 0 1.11112V8.88891C0 9.50169 0.523223 10 1.16668 10H12.8334C13.4768 10 14 9.50169 14 8.88888V1.11112C14 0.498307 13.4768 0 12.8333 0ZM1.16668 0.555547H12.8334C12.8763 0.555547 12.9142 0.570469 12.9545 0.578906C11.9445 1.4593 8.59532 4.37732 7.42328 5.38302C7.33157 5.46169 7.18375 5.55555 7.00003 5.55555C6.8163 5.55555 6.66848 5.46169 6.57647 5.38276C5.40455 4.37721 2.05518 1.45904 1.0453 0.578958C1.08571 0.570521 1.12366 0.555547 1.16668 0.555547ZM0.583324 8.88888V1.11112C0.583324 1.05669 0.600551 1.00732 0.615973 0.957578C1.38904 1.63143 3.72594 3.66747 5.24122 4.97979C3.73086 6.21539 1.39336 8.32602 0.614141 9.03367C0.600387 8.98643 0.583324 8.94023 0.583324 8.88888ZM12.8333 9.44445H1.16668C1.12008 9.44445 1.07866 9.42898 1.03515 9.41909C1.84034 8.68805 4.19273 6.56529 5.67654 5.35635C5.8461 5.50294 6.0159 5.64928 6.18595 5.79536C6.42636 6.00208 6.70775 6.11112 7 6.11112C7.29225 6.11112 7.57364 6.00206 7.81375 5.79562C7.98389 5.64945 8.1538 5.50303 8.32347 5.35635C9.80736 6.56516 12.1594 8.68776 12.9648 9.41909C12.9213 9.42898 12.88 9.44445 12.8333 9.44445ZM13.4167 8.88888C13.4167 8.94021 13.3996 8.98643 13.3859 9.03367C12.6064 8.32565 10.2691 6.21526 8.7588 4.97982C10.2741 3.6675 12.6107 1.63164 13.384 0.957526C13.3994 1.00727 13.4167 1.05667 13.4167 1.11109V8.88888Z" />
                </g>
              </svg>
              infoaploxn@gmail.com
            </a>
          </li>
          <li>
            <a href="tel:+9165678653">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 14 14"
              >
                <g>
                  <path d="M12.8766 9.18937C12.0195 9.18937 11.1779 9.05531 10.3804 8.79176C9.98274 8.65617 9.53004 8.76139 9.27064 9.02571L7.69648 10.214C5.87091 9.23954 4.74639 8.11538 3.7852 6.30352L4.93856 4.77038C5.23821 4.47113 5.34569 4.03399 5.21692 3.62384C4.95223 2.82212 4.81777 1.98092 4.81777 1.12342C4.81781 0.503962 4.31385 0 3.69442 0H1.12335C0.503962 0 0 0.503962 0 1.12335C0 8.22363 5.77637 14 12.8766 14C13.496 14 14 13.496 14 12.8766V10.3127C14 9.69333 13.496 9.18937 12.8766 9.18937ZM13.2222 12.8766C13.2222 13.0673 13.0673 13.2222 12.8766 13.2222C6.20512 13.2222 0.7778 7.79484 0.7778 1.12339C0.7778 0.932747 0.932748 0.7778 1.12339 0.7778H3.69446C3.8851 0.7778 4.04005 0.932747 4.04005 1.12339C4.04005 2.06408 4.18778 2.98731 4.47678 3.86195C4.51703 3.99108 4.48436 4.12474 4.35373 4.26073L3.01692 6.03118C2.97302 6.08933 2.94633 6.15864 2.93988 6.23121C2.93344 6.30379 2.9475 6.37672 2.98046 6.4417C4.07155 8.58628 5.39735 9.91208 7.5571 11.0187C7.6885 11.0875 7.84953 11.0731 7.96879 10.983L9.77992 9.61094C9.8252 9.56579 9.88218 9.53419 9.94445 9.5197C10.0067 9.50521 10.0718 9.5084 10.1324 9.52891C11.013 9.81981 11.9363 9.96717 12.8766 9.96717C13.0673 9.96717 13.2222 10.1221 13.2222 10.3128V12.8766Z" />
                </g>
              </svg>{" "}
              +91 656 786 53
            </a>
          </li>
        </ul>
      </div>
      <Header />
      <Banner/>
      <CoverArea/>
      <About/>
      <GraphtWithImg/>
      <FeatureCard/>
      <HorizontalScrolling/>
      <PeopleSection/>
      <Testimonial/>
      <Blog/>
      <OurPartner/>
      <IndustrialSection/>
      <ContactSection/>
      <Footer/>
    </>
  );
}
