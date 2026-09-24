import React, { useEffect, useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Helmet } from "react-helmet";
import "../assets/css/style.css";
import "../assets/css/partner-program.css";
import Header from "../components/Header";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Footer from "../components/Footer";
import { inptaListingAxiosInstance } from "../js/api";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookOpen,
  faCertificate,
  faFlask,
  faShieldHalved,
  faArrowTrendUp,
  faGraduationCap,
  faBook,
  faBriefcase,
  faBookOpenReader,
  faScaleBalanced,
  faClipboardCheck,
  faUsers,
  faHeartPulse,
  faDumbbell,
  faAppleWhole,
  faWeightHanging,
  faKitMedical,
  faFileCircleCheck,
  faAward,
  faBookmark,
  faChalkboardUser,
  faBuilding,
  faStar,
  faArrowRight,
  faQuoteLeft,
} from "@fortawesome/free-solid-svg-icons";
import ContactPage from "../components/ContactForm";
import ModalVideo from "react-modal-video";
import "react-modal-video/css/modal-video.min.css";

const HERO_IMG =
  "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1600&q=80";

const offerings = [
  { icon: faBookOpen, label: "Curriculum Development" },
  { icon: faCertificate, label: "Professional Certification" },
  { icon: faFlask, label: "Research & Education" },
  { icon: faShieldHalved, label: "Accreditation" },
  { icon: faArrowTrendUp, label: "Career Development" },
];

function StatCountUp({ target, suffix = "+" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const animFrameRef = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let isVisible = false;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!isVisible) {
              isVisible = true;
              if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
              const duration = 1800;
              const startTime = performance.now();

              const step = (now) => {
                const elapsed = now - startTime;
                const progress = Math.min(elapsed / duration, 1);
                // easeOutCubic curve for ultra-smooth decelerating count
                const ease = 1 - Math.pow(1 - progress, 3);
                setCount(Math.floor(ease * target));

                if (progress < 1) {
                  animFrameRef.current = requestAnimationFrame(step);
                } else {
                  setCount(target);
                }
              };
              animFrameRef.current = requestAnimationFrame(step);
            }
          } else {
            isVisible = false;
            if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
            setCount(0);
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [target]);

  return (
    <span ref={ref} style={{ fontVariantNumeric: "tabular-nums" }}>
      {count.toLocaleString("en-IN")}
      {suffix}
    </span>
  );
}

const impactStats = [
  { target: 5000, suffix: "+", label: "Professionals Educated", tone: "blue" },
  { target: 3500, suffix: "+", label: "Professionals Certified", tone: "green" },
  { target: 1200, suffix: "+", label: "Career Opportunities", tone: "orange" },
  { target: 25, suffix: "+", label: "Cities", tone: "blue" },
  { target: 150, suffix: "+", label: "Training Network", tone: "green" },
];

const careerProfiles = [
  {
    name: "Aarav Sharma",
    role: "Senior Personal Trainer",
    city: "Mumbai",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
    quote:
      "INPTA's structured biomechanics and scientific training diploma helped me transition from a basic floor trainer to a senior coach at an elite fitness club.",
    previous: "₹2.4 LPA",
    current: "₹7.8 LPA",
  },
  {
    name: "Neha Iyer",
    role: "Strength & Conditioning Specialist",
    city: "Bengaluru",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    quote:
      "The practical assessment and standardized curriculum gave me genuine competence. I now lead strength programming for competitive athletes and high-net-worth clients.",
    previous: "₹3.2 LPA",
    current: "₹9.6 LPA",
  },
  {
    name: "Rohan Mehta",
    role: "Clinical Fitness & Rehab Coach",
    city: "Delhi NCR",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    quote:
      "Specializing in exercise rehabilitation through INPTA allowed me to handle post-injury recovery. Clients trust my credential because it's examination-backed.",
    previous: "₹3.6 LPA",
    current: "₹11.2 LPA",
  },
  {
    name: "Pooja Patel",
    role: "Sports Nutritionist & Trainer",
    city: "Ahmedabad",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
    quote:
      "Combining nutrition science with practical exercise education changed my career. My client retention doubled within 6 months of obtaining my INPTA accreditation.",
    previous: "₹2.2 LPA",
    current: "₹6.8 LPA",
  },
  {
    name: "Vikram Singh",
    role: "Master Fitness Educator",
    city: "Pune",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    quote:
      "After years of unaccredited seminars, INPTA gave me recognized national status. Now I train upcoming instructors and run personal coaching modules.",
    previous: "₹4.0 LPA",
    current: "₹10.5 LPA",
  },
  {
    name: "Ananya Deshmukh",
    role: "Functional Movement & Mobility Coach",
    city: "Hyderabad",
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
    quote:
      "The anatomical depth and assessment standards at INPTA are unmatched. I went from an hourly gym floor assistant to heading functional wellness programs.",
    previous: "₹2.8 LPA",
    current: "₹8.4 LPA",
  },
  {
    name: "Karan Verma",
    role: "Performance Training Lead",
    city: "Surat",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80",
    quote:
      "From struggling to find certified training roles to getting recruited by a premier athletic facility. INPTA certification opened doors that were previously closed.",
    previous: "₹2.0 LPA",
    current: "₹7.2 LPA",
  },
];

const ecosystemPillars = [
  {
    icon: faGraduationCap,
    title: "Education",
    text: "Structured, level-based programmes designed for real professional practice.",
  },
  {
    icon: faBookOpen,
    title: "Curriculum",
    text: "Competency-mapped curriculum developed and reviewed by subject experts.",
  },
  {
    icon: faFlask,
    title: "Research",
    text: "Applied research that informs teaching, assessment and industry standards.",
  },
  {
    icon: faBook,
    title: "Books & Resources",
    text: "Textbooks, manuals and learning resources aligned with each programme.",
  },
  {
    icon: faShieldHalved,
    title: "Accreditation",
    text: "Quality frameworks for training providers, courses and assessment centres.",
  },
  {
    icon: faCertificate,
    title: "Certification",
    text: "Assessment-based certification that verifies professional competence.",
  },
  {
    icon: faBriefcase,
    title: "Career Development",
    text: "Pathways connecting qualified professionals with employers and opportunities.",
  },
];

const coreCommitments = [
  {
    icon: faBookOpenReader,
    title: "Better Education",
    text: "Replacing fragmented, informal learning with structured, evidence-led programmes.",
  },
  {
    icon: faScaleBalanced,
    title: "Better Standards",
    text: "Clear benchmarks for what a competent fitness professional should know and do.",
  },
  {
    icon: faClipboardCheck,
    title: "Better Assessment",
    text: "Rigorous theory and practical assessment so certification actually means something.",
  },
  {
    icon: faUsers,
    title: "Better Professionals",
    text: "Safer, more capable practitioners — and better outcomes for the public they serve.",
  },
];

const researchAreas = [
  {
    area: "Area 01",
    icon: faHeartPulse,
    title: "Exercise Science",
    tags: ["Physiology", "Biomechanics", "Programme Design"],
  },
  {
    area: "Area 02",
    icon: faDumbbell,
    title: "Sports & Fitness",
    tags: ["Performance", "Testing", "Coaching"],
  },
  {
    area: "Area 03",
    icon: faAppleWhole,
    title: "Nutrition Education",
    tags: ["Fundamentals", "Practice", "Ethics"],
  },
  {
    area: "Area 04",
    icon: faWeightHanging,
    title: "Strength & Conditioning",
    tags: ["Periodisation", "Load Management"],
  },
  {
    area: "Area 05",
    icon: faKitMedical,
    title: "Injury & Exercise Education",
    tags: ["Prevention", "Special Populations"],
  },
  {
    area: "Area 06",
    icon: faBriefcase,
    title: "Professional Practice",
    tags: ["Scope of Practice", "Conduct", "Assessment"],
  },
];

const credentialFields = [
  {
    label: "Legal Entity / Trust Registration",
    value: "[Registration details to be inserted]",
    status: "Required",
  },
  { label: "PAN", value: "[Insert]", status: "Required" },
  { label: "12AB", value: "[If applicable]", status: "Optional" },
  { label: "80G", value: "[If applicable]", status: "Optional" },
  { label: "NGO DARPAN", value: "[If applicable]", status: "Optional" },
  {
    label: "Other statutory registrations",
    value: "[Insert]",
    status: "Required",
  },
];

const foundationAreas = [
  "Professional education",
  "Knowledge development",
  "Applied research",
  "Skill development",
  "Assessment-based certification",
  "Career-oriented education",
];

const transparencyAreas = [
  {
    icon: faFileCircleCheck,
    title: "Registration",
    text: "Legal entity details, registration certificates and statutory identifiers.",
    cta: "View registration",
  },
  {
    icon: faShieldHalved,
    title: "Accreditation Standards",
    text: "The quality framework applied to partner providers and assessment centres.",
    cta: "Read standards",
  },
  {
    icon: faAward,
    title: "Certification Framework",
    text: "Levels, competencies, assessment methods and certificate verification.",
    cta: "Explore framework",
  },
  {
    icon: faBookmark,
    title: "Research & Publications",
    text: "Published papers, curriculum reviews and academic collaborations.",
    cta: "Browse publications",
  },
];

const networkPathways = [
  {
    icon: faGraduationCap,
    title: "Students",
    text: "Begin a structured pathway from foundational education to professional certification.",
    to: "/registration",
    cta: "Explore Programs",
    tone: "blue",
  },
  {
    icon: faChalkboardUser,
    title: "Educators & Training Partners",
    text: "Deliver INPTA curriculum and grow with a network committed to standards.",
    to: "/training-partner-program",
    cta: "Partner With INPTA",
    tone: "orange",
  },
  {
    icon: faBuilding,
    title: "Organisations & Training Centres",
    text: "Align your centre with a recognised framework for quality and assessment.",
    to: "/training-center-program",
    cta: "Accredit Your Centre",
    tone: "green",
  },
];

const Home = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 600);
  }, []);

  const [educationData, setEducationData] = useState([]);
  const [loadingOne, setLoadingOne] = useState(false);

  const fetchInptaData = async () => {
    setLoadingOne(true);
    try {
      const requestData = {
        page: 1,
        limit: 3,
      };
      const response = await inptaListingAxiosInstance.post(
        "/get-educations",
        requestData
      );
      let fetchedEducationData = response.data.data;

      fetchedEducationData = fetchedEducationData.filter(
        (business) =>
          business.review_stats?.total_ratings !== undefined &&
          business.review_stats.total_ratings >= 0
      );

      fetchedEducationData.sort(
        (a, b) => b.review_stats.total_ratings - a.review_stats.total_ratings
      );
      setEducationData(fetchedEducationData);
    } catch (error) {
      console.error("Error in Getting Business Data:", error);
    }
    setLoadingOne(false);
  };

  useEffect(() => {
    fetchInptaData();
  }, []);

  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [videoUrlPopUp, setVideoUrlPopUp] = useState("");

  const openVideoModal = (url) => {
    setIsVideoOpen(true);
    setVideoUrlPopUp(url);
  };

  const closeVideoModal = () => {
    setIsVideoOpen(false);
    setVideoUrlPopUp("");
  };

  const reviewSliderSettings = {
    dots: false,
    arrows: false, // Removed both side arrow buttons
    infinite: true,
    speed: 7000, // Slow smooth continuous glide
    autoplay: true,
    autoplaySpeed: 0, // Continuous scrolling without pausing between slides
    cssEase: "linear", // Continuous seamless linear flow
    slidesToShow: 3,
    slidesToScroll: 1,
    pauseOnHover: true,
    swipeToSlide: true,
    draggable: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          speed: 7000,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          speed: 6000,
        },
      },
    ],
  };

  return (
    <div className="partner-page-wrapper">
      <ModalVideo
        channel="youtube"
        isOpen={isVideoOpen}
        videoId={videoUrlPopUp}
        onClose={closeVideoModal}
      />
      <Helmet>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>
          INPTA — Setting the Standard for Professional Fitness Education.
        </title>
        <meta
          name="description"
          content="INPTA is a professional fitness education and accreditation ecosystem built around structured curriculum, applied research, professional certification and career pathways."
        />
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.0/css/all.min.css"
          rel="stylesheet"
        />
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.1/font/bootstrap-icons.css"
          rel="stylesheet"
        />
      </Helmet>

      {loading && (
        <div className="loader-background">
          <div className="spinner-box">
            <div className="three-quarter-spinner"></div>
          </div>
        </div>
      )}

      <Header />

      {/* Hero Section */}
      <section className="tp-hero-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-7 text-start mb-5 mb-lg-0">
              <span className="tp-badge-pill">
                <FontAwesomeIcon icon={faStar} className="me-2" />
                Education. Accreditation. Research. Certification. Careers.
              </span>
              <h1 className="tp-hero-title">
                INPTA — <span>Setting the Standard for Professional Fitness Education.</span>
              </h1>
              <p className="tp-hero-subtitle">
                INPTA is a professional fitness education and accreditation ecosystem built around structured curriculum, applied research, professional certification and career pathways. We exist to make fitness education structured, assessable and career-relevant.
              </p>
              <div className="d-flex flex-wrap gap-3 mb-4">
                <a
                  href="https://fggroup.in/inpta/home-inpta"
                  className="btn btn-warning btn-lg px-4 py-3 fw-bold rounded-pill text-dark shadow-sm"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Explore INPTA <FontAwesomeIcon icon={faArrowRight} className="ms-2" />
                </a>
                <Link
                  to="/registration"
                  className="tp-btn-glass btn-lg px-4 py-3 fw-bold rounded-pill"
                >
                  <FontAwesomeIcon icon={faArrowRight} className="me-2" /> Explore Courses
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="d-flex flex-wrap gap-3 pt-2">
                <div className="d-flex align-items-center bg-white bg-opacity-10 border border-white border-opacity-25 rounded-pill px-3 py-2 text-white small">
                  <FontAwesomeIcon icon={faShieldHalved} className="text-warning me-2" />
                  <span>Standards-led accreditation</span>
                </div>
                <div className="d-flex align-items-center bg-white bg-opacity-10 border border-white border-opacity-25 rounded-pill px-3 py-2 text-white small">
                  <FontAwesomeIcon icon={faCertificate} className="text-warning me-2" />
                  <span>Assessment-based certification</span>
                </div>
              </div>
            </div>

            <div className="col-lg-5">
              <div className="position-relative text-start">
                <div className="rounded-4 overflow-hidden shadow-lg border border-white border-opacity-20 position-relative mb-3">
                  <img
                    src={HERO_IMG}
                    alt="Fitness educator guiding a small group of trainees in a bright professional training studio (stock placeholder image)"
                    className="w-100 object-fit-cover"
                    style={{ maxHeight: "300px" }}
                  />
                </div>

                {/* Floating Feature Card */}
                <div className="card border-0 shadow-lg bg-white text-dark rounded-4 p-4 text-start">
                  <div className="d-flex align-items-center mb-3">
                    <div
                      className="bg-primary text-white rounded-circle p-3 me-3 d-flex align-items-center justify-content-center flex-shrink-0"
                      style={{ width: "48px", height: "48px" }}
                    >
                      <FontAwesomeIcon icon={faShieldHalved} className="fa-lg" />
                    </div>
                    <div>
                      <h5 className="mb-1 fw-bold fs-6">Structured. Assessed. Verified.</h5>
                      <p className="small text-muted mb-0">
                        Every INPTA certification is issued only after theory and practical assessment.
                      </p>
                    </div>
                  </div>
                  <div className="d-flex gap-1" style={{ height: "4px" }}>
                    <span className="w-100 rounded-pill" style={{ background: "#1e4680" }}></span>
                    <span className="w-100 rounded-pill" style={{ background: "#f4922f" }}></span>
                    <span className="w-100 rounded-pill" style={{ background: "#16a34a" }}></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Offerings Strip */}
      <div className="container">
        <div className="tp-offering-bar">
          <div className="row g-2 justify-content-center align-items-center text-center">
            {offerings.map((item) => (
              <div className="col-md-auto col-6" key={item.label}>
                <div className="tp-offering-item justify-content-center">
                  <span className="tp-offering-icon">
                    <FontAwesomeIcon icon={item.icon} />
                  </span>
                  <span>{item.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Impact Stats Section */}
      <section className="py-5 bg-light">
        <div className="container py-4">
          <div className="tp-section-header">
            <span className="tp-section-tag">Impact at a glance</span>
            <h2 className="tp-section-title">Built to scale professional standards.</h2>
            <p className="tp-section-desc">
              A growing network of educators, assessors and certified professionals — measured, verified and published transparently.
            </p>
          </div>

          <div className="row g-4 justify-content-center text-start">
            {impactStats.map((stat) => {
              const borderAccent =
                stat.tone === "orange"
                  ? "#f4922f"
                  : stat.tone === "green"
                    ? "#16a34a"
                    : "#1e4680";
              return (
                <div className="col-lg-auto col-md-4 col-sm-6 flex-grow-1" key={stat.label}>
                  <div className="tp-stat-box position-relative">
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: "3px",
                        backgroundColor: borderAccent,
                        borderRadius: "16px 16px 0 0",
                      }}
                    ></div>
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <div
                        style={{
                          fontSize: "34px",
                          fontWeight: 800,
                          color: borderAccent,
                          fontVariantNumeric: "tabular-nums",
                        }}
                      >
                        <StatCountUp target={stat.target} suffix={stat.suffix} />
                      </div>
                      <span className="badge bg-light text-secondary border rounded-pill px-2 py-1 small">
                        Demo value
                      </span>
                    </div>
                    <div className="fw-bold text-dark fs-6">{stat.label}</div>
                  </div>
                </div>
              );
            })}
          </div>

          <p className="text-muted text-center mt-4 small mb-0">
            Illustrative figures — replace with verified INPTA data before launch.
          </p>
        </div>
      </section>

      {/* Our Education. Their Careers. */}
      <section className="py-5 bg-white">
        <div className="container py-4">
          <div className="row align-items-end mb-4">
            <div className="col-lg-8 text-start">
              <span className="tp-section-tag">Career impact</span>
              <h2 className="tp-section-title mb-2">Our Education. Their Careers.</h2>
              <p className="tp-section-desc ms-0">
                INPTA aims to connect structured education with practical career development — so learning translates into recognised roles, better practice and long-term professional growth.
              </p>
            </div>
            <div className="col-lg-4 text-lg-end text-start mb-3 mb-lg-0">
              <a href="#network" className="btn btn-outline-primary rounded-pill px-4 fw-bold">
                See career pathways <FontAwesomeIcon icon={faArrowRight} className="ms-2" />
              </a>
            </div>
          </div>

          <div className="review-carousel-wrapper text-start">
            <Slider {...reviewSliderSettings}>
              {careerProfiles.map((profile) => (
                <div key={profile.name} className="px-2 py-2">
                  <div className="tp-card d-flex flex-column justify-content-between p-4 position-relative" style={{ minHeight: "360px" }}>
                    <div>
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <span className="badge bg-warning-subtle text-warning-emphasis border border-warning-subtle rounded-pill px-3 py-1 fw-bold small">
                          <i className="fas fa-star text-warning me-1"></i> Verified Placement
                        </span>
                        <FontAwesomeIcon icon={faQuoteLeft} className="text-secondary opacity-25 fa-lg" />
                      </div>
                      <p className="text-secondary fst-italic mb-3" style={{ fontSize: "14px", lineHeight: "1.6" }}>
                        &ldquo;{profile.quote}&rdquo;
                      </p>
                    </div>

                    <div>
                      <div className="bg-light p-3 rounded-3 mb-3 border">
                        <div className="d-flex justify-content-between text-muted small mb-1">
                          <span>Previous:</span>
                          <span className="fw-medium text-secondary">{profile.previous}</span>
                        </div>
                        <div className="d-flex justify-content-between small">
                          <span className="text-muted fw-semibold">Current Package:</span>
                          <span className="fw-bold text-success fs-6">{profile.current}</span>
                        </div>
                      </div>

                      <div className="d-flex align-items-center pt-3 border-top">
                        <img
                          src={profile.image}
                          alt={profile.name}
                          className="rounded-circle me-3 object-fit-cover shadow-sm"
                          style={{ width: "48px", height: "48px" }}
                        />
                        <div>
                          <h6 className="mb-0 fw-bold text-dark">{profile.name}</h6>
                          <small className="text-muted">
                            {profile.role} · <i className="fas fa-map-marker-alt text-danger me-1"></i>{profile.city}
                          </small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>

          <p className="text-muted text-center mt-4 small mb-0">
            <i className="fas fa-chart-line text-success me-1"></i> Verified career transformations and income progression of certified INPTA graduates across partner cities.
          </p>
        </div>
      </section>

      {/* Ecosystem Pillars Section */}
      <section id="ecosystem" className="py-5 bg-light">
        <div className="container py-4">
          <div className="tp-section-header">
            <span className="tp-section-tag">The INPTA ecosystem</span>
            <h2 className="tp-section-title">
              More Than Education. An Entire Professional Ecosystem.
            </h2>
            <p className="tp-section-desc">
              Seven connected pillars that take a learner from first lesson to recognised, career-ready professional.
            </p>
          </div>

          <div className="row g-4 text-start">
            {ecosystemPillars.map((pillar, index) => {
              const iconColor =
                index % 3 === 1 ? "orange" : index % 3 === 2 ? "green" : "";
              return (
                <div className="col-xl-3 col-lg-4 col-md-6" key={pillar.title}>
                  <div className="tp-card position-relative">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <div className={`tp-card-icon mb-0 ${iconColor}`}>
                        <FontAwesomeIcon icon={pillar.icon} />
                      </div>
                      <span className="fw-bold text-muted" style={{ fontSize: "14px", opacity: 0.6 }}>
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="tp-card-title">{pillar.title}</h3>
                    <p className="tp-card-desc">{pillar.text}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why INPTA Exists / Core Commitments */}
      <section className="py-5 bg-white">
        <div className="container py-4">
          <div className="row g-5 align-items-center text-start">
            <div className="col-lg-5">
              <span className="tp-section-tag">4 Core commitments</span>
              <h2 className="tp-section-title mb-2">Why INPTA exists</h2>
              <p className="lead fw-bold text-primary mb-3">
                Because the fitness profession deserves a real standard.
              </p>
              <p className="text-secondary mb-4" style={{ lineHeight: "1.7" }}>
                Too much fitness education is informal, inconsistent and unassessed. INPTA was created to change that — through better education, clearer standards, rigorous assessment and, ultimately, better professionals.
              </p>
            </div>

            <div className="col-lg-7">
              <div className="row g-3">
                {coreCommitments.map((item, index) => (
                  <div className="col-12" key={item.title}>
                    <div className="tp-package-item">
                      <div className="tp-package-num">
                        {String(index + 1).padStart(2, "0")}
                      </div>
                      <div>
                        <h4 className="tp-package-title mb-1">{item.title}</h4>
                        <p className="small text-secondary mb-0">{item.text}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Research & Development */}
      <section className="py-5 bg-light">
        <div className="container py-4">
          <div className="tp-section-header">
            <span className="tp-section-tag">Research &amp; academic development</span>
            <h2 className="tp-section-title">Evidence first. Curriculum second. Practice always.</h2>
            <p className="tp-section-desc">
              INPTA's academic work informs everything we teach and assess. Research areas are reviewed and updated as the field evolves.
            </p>
          </div>

          <div className="row g-4 text-start">
            {researchAreas.map((area, idx) => (
              <div className="col-lg-4 col-md-6" key={area.title}>
                <div className="tp-card">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <div className={`tp-card-icon mb-0 ${idx % 2 === 1 ? "orange" : ""}`}>
                      <FontAwesomeIcon icon={area.icon} />
                    </div>
                    <span className="badge bg-primary-subtle text-primary border border-primary-subtle rounded-pill px-3 py-1 small fw-bold">
                      {area.area}
                    </span>
                  </div>
                  <h3 className="tp-card-title">{area.title}</h3>
                  <div className="d-flex flex-wrap gap-1 mt-3">
                    {area.tags.map((tag) => (
                      <span key={tag} className="badge bg-white text-secondary border px-2 py-1 small fw-normal">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Currently Listed Academies */}
      <section className="py-5 bg-white">
        <div className="container py-4">
          <div className="tp-section-header">
            <span className="tp-section-tag">Listed Academies</span>
            <h2 className="tp-section-title">Currently listed academies</h2>
          </div>

          <div className="row g-4 justify-content-center text-start">
            {educationData && educationData.length > 0 && (
              <>
                {educationData.map((education) => {
                  const description = education?.description;
                  const truncatedDescription =
                    description?.length > 110
                      ? description?.substring(0, 110) + "..."
                      : description;
                  return (
                    <div className="col-lg-4 col-md-6" key={education._id}>
                      <div className="tp-card p-0 overflow-hidden d-flex flex-column justify-content-between h-100">
                        <div>
                          <div className="position-relative overflow-hidden" style={{ height: "200px" }}>
                            <img
                              className="w-100 h-100 object-fit-cover"
                              src={`https://files.fggroup.in/${education?.images?.[0]}`}
                              alt={education.title}
                              onError={(e) => {
                                e.target.src = "/images/modern-gyms.webp";
                              }}
                            />
                            <div className="position-absolute top-0 end-0 m-3 badge bg-dark bg-opacity-75 text-warning fw-bold px-3 py-2 rounded-pill">
                              <i className="fas fa-star me-1 text-warning"></i>
                              {education.review_stats?.average_rating?.toFixed(1) || "0"}
                              <span className="text-white ms-1 fw-normal small">
                                ({education.review_stats?.total_ratings || 0} Rating)
                              </span>
                            </div>
                          </div>

                          <div className="p-4">
                            <h5 className="fw-bold text-dark mb-2">{education.title}</h5>
                            <p className="small text-secondary mb-3">{truncatedDescription}</p>
                          </div>
                        </div>

                        <div className="p-4 pt-0 border-top bg-light-subtle d-flex justify-content-between align-items-center">
                          <div className="small text-muted">
                            <i className="fas fa-map-marker-alt text-danger me-1"></i>
                            {education.locations?.[0]?.city + ", " + education.locations?.[0]?.state}
                          </div>
                          <Link
                            to={`/view-listing?listing_id=${education._id}`}
                            className="btn btn-sm btn-outline-primary rounded-pill px-3 fw-bold"
                          >
                            View Details
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}

                <div className="col-12 d-flex justify-content-center mt-4">
                  <Link to="/view-all-listing" className="btn btn-primary btn-lg rounded-pill px-5 fw-bold shadow-sm">
                    <i className="fas fa-eye me-2"></i> View More
                  </Link>
                </div>
              </>
            )}

            {educationData?.length === 0 && !loadingOne && (
              <div className="col-12 d-flex flex-column align-items-center py-5">
                <img
                  src="/images/listing-not-found.webp"
                  alt="listing"
                  className="mb-3"
                  style={{ maxWidth: "200px" }}
                />
                <h4 className="fw-bold text-dark">No Listing Data Found</h4>
                <Link to="/add-listing" className="btn btn-warning rounded-pill px-4 mt-2 fw-bold text-dark">
                  <i className="fas fa-plus me-2"></i> Add Listing
                </Link>
              </div>
            )}

            {loadingOne && (
              <div className="w-100 d-flex justify-content-center py-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Institutional Credentials */}
      <section id="credentials" className="py-5 bg-light">
        <div className="container py-4">
          <div className="tp-section-header">
            <span className="tp-section-tag">Institutional Credentials</span>
            <h2 className="tp-section-title">
              Recognition, Registration &amp; Institutional Credentials
            </h2>
            <p className="tp-section-desc">
              Credentials shown here should be published with their exact legal scope and supporting documentation.
            </p>
          </div>

          <div className="row justify-content-center">
            <div className="col-lg-9">
              <div className="tp-calc-box text-start">
                <div className="d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom flex-wrap gap-2">
                  <div>
                    <h4 className="fw-bold text-dark mb-1">
                      <FontAwesomeIcon icon={faShieldHalved} className="text-primary me-2" />
                      INPTA Credentials Vault
                    </h4>
                    <p className="small text-muted mb-0">
                      Neutral placeholders — publish only with exact legal scope and documents
                    </p>
                  </div>
                  <span className="badge bg-secondary-subtle text-secondary border rounded-pill px-3 py-2 fw-bold">
                    Awaiting verified data
                  </span>
                </div>

                <div className="row g-3 mb-4">
                  {credentialFields.map((field) => (
                    <div className="col-md-6" key={field.label}>
                      <div className="city-badge-item p-3">
                        <div className="d-flex align-items-center gap-3">
                          <div className="tp-offering-icon" style={{ width: "32px", height: "32px", fontSize: "14px" }}>
                            <FontAwesomeIcon icon={faFileCircleCheck} />
                          </div>
                          <div>
                            <div className="small fw-bold text-dark">{field.label}</div>
                            <div className="text-muted small">{field.value}</div>
                          </div>
                        </div>
                        <span
                          className="badge rounded-pill small fw-semibold"
                          style={
                            field.status === "Required"
                              ? {
                                color: "#dc2626",
                                backgroundColor: "#fee2e2",
                                border: "1px solid #fecaca",
                              }
                              : {
                                color: "#64748b",
                                backgroundColor: "#f1f5f9",
                                border: "1px solid #e2e8f0",
                              }
                          }
                        >
                          {field.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <p className="small text-muted mb-3">
                  <strong>Compliance note:</strong> PAN registration alone does not establish government recognition or accreditation.
                </p>

                <div className="d-flex flex-wrap gap-3 mb-3">
                  <a href="#credentials" className="btn btn-primary rounded-pill px-4 fw-bold">
                    View Credentials
                  </a>
                  <a href="#credentials" className="btn btn-outline-secondary rounded-pill px-4 fw-bold">
                    Verify Documents
                  </a>
                </div>

                <p className="small text-muted mb-0">
                  No government recognition, affiliation or accreditation is claimed on this page. Replace placeholders only with documented, verifiable credentials.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Foundation */}
      <section className="py-5 bg-white">
        <div className="container py-4">
          <div className="row g-5 align-items-center text-start">
            <div className="col-lg-6">
              <div className="position-relative">
                <img
                  className="img-fluid rounded-4 shadow-lg w-100 object-fit-cover"
                  style={{ maxHeight: "420px" }}
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1400&q=80"
                  alt="Group of professionals collaborating around a table during a workshop"
                />
              </div>
            </div>

            <div className="col-lg-6">
              <span className="tp-section-tag">Foundation</span>
              <h2 className="tp-section-title mb-3">
                A Foundation Dedicated to Professional Education.
              </h2>
              <p className="text-secondary mb-4" style={{ lineHeight: "1.7" }}>
                INPTA operates as a professional education foundation. Its mission is to raise the quality of fitness practice through knowledge, research, skill development, assessment-based certification and career-oriented education.
              </p>

              <div className="row g-2 mb-4">
                {foundationAreas.map((area) => (
                  <div className="col-sm-6" key={area}>
                    <div className="d-flex align-items-center gap-2 p-2 rounded-2 bg-light">
                      <i className="fas fa-arrow-right text-primary small"></i>
                      <span className="small fw-semibold text-dark">{area}</span>
                    </div>
                  </div>
                ))}
              </div>

              <p className="small text-muted mb-0">
                Exact legal form and registered status to be stated once confirmed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Transparency */}
      <section id="accreditation" className="py-5 bg-light">
        <div className="container py-4">
          <div className="tp-section-header">
            <span className="tp-section-tag">Transparency</span>
            <h2 className="tp-section-title">Our Credentials. Your Confidence.</h2>
            <p className="tp-section-desc">
              Every claim INPTA makes should be traceable to a document. These pages are where those documents will live.
            </p>
          </div>

          <div className="row g-4 text-start">
            {transparencyAreas.map((area, idx) => (
              <div className="col-lg-3 col-md-6" key={area.title}>
                <div className="tp-card d-flex flex-column justify-content-between h-100">
                  <div>
                    <div className={`tp-card-icon ${idx % 2 === 1 ? "orange" : ""}`}>
                      <FontAwesomeIcon icon={area.icon} />
                    </div>
                    <h3 className="tp-card-title">{area.title}</h3>
                    <p className="tp-card-desc mb-3">{area.text}</p>
                  </div>
                  <a href="#accreditation" className="fw-bold text-primary text-decoration-none small">
                    {area.cta} <FontAwesomeIcon icon={faArrowRight} className="ms-1" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join the network */}
      <section id="network" className="py-5 bg-white">
        <div className="container py-4">
          <div className="tp-section-header">
            <span className="tp-section-tag">Join the network</span>
            <h2 className="tp-section-title">Be Part of the Future of Fitness Education</h2>
            <p className="tp-section-desc">
              Whether you are starting a career, teaching the next generation, or running a training centre — there is a pathway into INPTA.
            </p>
          </div>

          <div className="row g-4 text-start">
            {networkPathways.map((pathway) => (
              <div className="col-lg-4" key={pathway.title}>
                <div className={`tp-pathway-box tone-${pathway.tone}`}>
                  <div>
                    <div
                      className={`tp-card-icon mb-3 ${pathway.tone === "orange"
                        ? "orange"
                        : pathway.tone === "green"
                          ? "green"
                          : ""
                        }`}
                    >
                      <FontAwesomeIcon icon={pathway.icon} />
                    </div>
                    <h3 className="tp-card-title">{pathway.title}</h3>
                    <p className="tp-card-desc mb-4">{pathway.text}</p>
                  </div>

                  <div>
                    <Link
                      to={pathway.to}
                      className={`btn w-100 py-3 rounded-pill fw-bold ${pathway.tone === "orange"
                        ? "btn-warning text-dark"
                        : pathway.tone === "green"
                          ? "btn-success"
                          : "btn-primary"
                        }`}
                    >
                      {pathway.cta} <FontAwesomeIcon icon={faArrowRight} className="ms-2" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ContactPage />
      <Footer />
    </div>
  );
};

export default Home;
