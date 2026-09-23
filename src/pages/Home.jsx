import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Helmet } from "react-helmet";
import "../assets/css/style.css";
import "../assets/css/inpta-home.css";
import Header from "../components/Header";
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

const impactStats = [
  { value: "0+", label: "Professionals Educated", tone: "blue" },
  { value: "0+", label: "Professionals Certified", tone: "green" },
  { value: "0+", label: "Career Opportunities", tone: "orange" },
  { value: "0+", label: "Cities", tone: "blue" },
  { value: "0+", label: "Training Network", tone: "green" },
];

const careerProfiles = [
  {
    name: "Aarav Sharma",
    role: "Certified Personal Trainer",
    city: "Mumbai",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
    quote:
      "Placeholder quote describing how structured education shaped a coaching career. Replace with a verified graduate statement.",
    previous: "[Previous income placeholder]",
    current: "[Current income placeholder]",
  },
  {
    name: "Neha Iyer",
    role: "Strength & Conditioning Coach",
    city: "Bengaluru",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    quote:
      "Placeholder quote about moving from informal training into a recognised professional role. Replace with a verified graduate statement.",
    previous: "[Previous income placeholder]",
    current: "[Current income placeholder]",
  },
  {
    name: "Rohan Mehta",
    role: "Fitness Educator & Assessor",
    city: "Delhi",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=80",
    quote:
      "Placeholder quote about progressing from trainer to educator within a professional network. Replace with a verified graduate statement.",
    previous: "[Previous income placeholder]",
    current: "[Current income placeholder]",
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
    }, 1000);
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

  return (
    <div>
      <ModalVideo
        channel="youtube"
        isOpen={isVideoOpen}
        videoId={videoUrlPopUp}
        onClose={closeVideoModal}
      />
      <link
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.0/css/all.min.css"
        rel="stylesheet"
      />
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.1/font/bootstrap-icons.css"
        rel="stylesheet"
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
          rel="shortcut icon"
          type="image/x-icon"
          href="images/favicon.ico"
        />
        <link href="css/styles.css" rel="stylesheet" />
      </Helmet>
      <>
        {loading && (
          <div className="loader-background">
            <div className="spinner-box">
              <div className="three-quarter-spinner"></div>
            </div>
          </div>
        )}
        <Header />

        <div className="inpta-home">
          {/* Hero */}
          <div className="inpta-hero margintop">
            <div className="inpta-container inpta-hero__grid">
              <div>
                <span className="inpta-eyebrow inpta-eyebrow--blue">
                  <FontAwesomeIcon icon={faStar} />
                  Education. Accreditation. Research. Certification. Careers.
                </span>
                <h1>
                  <span className="inpta-hero__brand">INPTA</span>
                  <span className="inpta-hero__headline">
                    Setting the Standard for Professional Fitness Education.
                  </span>
                </h1>
                <p>
                  INPTA is a professional fitness education and
                  accreditation ecosystem built around structured
                  curriculum, applied research, professional certification
                  and career pathways. We exist to make fitness education
                  structured, assessable and career-relevant.
                </p>
                <div className="inpta-hero__actions">
                  <a
                    href="https://fggroup.in/inpta/home-inpta"
                    className="inpta-btn inpta-btn--solid"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Explore INPTA <FontAwesomeIcon icon={faArrowRight} />
                  </a>
                  <Link to="/registration" className="inpta-btn inpta-btn--outline">
                    Explore Programs
                  </Link>
                </div>
                <div className="inpta-hero__trust">
                  <span>
                    <FontAwesomeIcon icon={faShieldHalved} />
                    Standards-led accreditation
                  </span>
                  <span>
                    <FontAwesomeIcon icon={faCertificate} />
                    Assessment-based certification
                  </span>
                </div>
              </div>

              <div className="inpta-hero__visual">
                <div className="inpta-hero__frame">
                  <span className="inpta-asset-hint">
                    Replace with real INPTA asset
                  </span>
                  <img
                    src={HERO_IMG}
                    alt="Fitness educator guiding a small group of trainees in a bright professional training studio (stock placeholder image)"
                  />
                </div>
                <div className="inpta-hero__floatcard">
                  <div className="inpta-hero__floatcard-head">
                    <span className="inpta-hero__floatcard-icon">
                      <FontAwesomeIcon icon={faShieldHalved} />
                    </span>
                    <div>
                      <h5>Structured. Assessed. Verified.</h5>
                      <p>
                        Every INPTA certification is issued only after
                        theory and practical assessment.
                      </p>
                    </div>
                  </div>
                  <div className="inpta-hero__floatcard-bar">
                    <span style={{ background: "var(--blue)" }}></span>
                    <span style={{ background: "var(--orange)" }}></span>
                    <span style={{ background: "var(--green)" }}></span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Offerings strip */}
          <div className="inpta-offerings-strip">
            <div className="inpta-container">
              <ul className="inpta-offerings-strip__list">
                {offerings.map((item) => (
                  <li className="inpta-offerings-strip__item" key={item.label}>
                    <span className="inpta-offerings-strip__icon">
                      <FontAwesomeIcon icon={item.icon} />
                    </span>
                    <span>{item.label}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Built to scale professional standards */}
          <div className="inpta-section">
            <div className="inpta-container">
              <div className="inpta-section__head">
                <span className="inpta-eyebrow inpta-eyebrow--green">
                  Impact at a glance
                </span>
                <h2>Built to scale professional standards.</h2>
                <p>
                  A growing network of educators, assessors and certified
                  professionals — measured, verified and published
                  transparently.
                </p>
              </div>
              <div className="inpta-stat-grid">
                {impactStats.map((stat) => (
                  <div
                    className={`inpta-stat-card inpta-tone-${stat.tone}`}
                    key={stat.label}
                  >
                    <div className="inpta-stat-card__value">{stat.value}</div>
                    <div className="inpta-stat-card__label">{stat.label}</div>
                    <span className="inpta-stat-card__badge">Demo value</span>
                  </div>
                ))}
              </div>
              <p className="inpta-note text-center mt-4 mb-0">
                Illustrative figures — replace with verified INPTA data before
                launch.
              </p>
            </div>
          </div>

          {/* Our Education. Their Careers. */}
          <div className="inpta-section inpta-section--alt">
            <div className="inpta-container">
              <div className="inpta-section__head inpta-section__head--left">
                <span className="inpta-eyebrow inpta-eyebrow--green">
                  Career impact
                </span>
                <h2>Our Education. Their Careers.</h2>
                <p>
                  INPTA aims to connect structured education with practical
                  career development — so learning translates into recognised
                  roles, better practice and long-term professional growth.
                </p>
                <a href="#network" className="inpta-section__link">
                  See career pathways <FontAwesomeIcon icon={faArrowRight} />
                </a>
              </div>
              <div className="inpta-testimonial-grid">
                {careerProfiles.map((profile) => (
                  <div className="inpta-testimonial-card" key={profile.name}>
                    <span className="inpta-testimonial-card__ribbon">
                      Demo profile — replace with verified graduate story
                    </span>
                    <blockquote>&ldquo;{profile.quote}&rdquo;</blockquote>
                    <dl className="inpta-testimonial-card__income">
                      <div>
                        <dt>Previous</dt>
                        <dd>{profile.previous}</dd>
                      </div>
                      <div>
                        <dt>Current</dt>
                        <dd className="is-current">{profile.current}</dd>
                      </div>
                    </dl>
                    <div className="inpta-testimonial-card__person">
                      <img src={profile.image} alt={profile.name} />
                      <div>
                        <h5>{profile.name}</h5>
                        <p>
                          {profile.role} · {profile.city}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <p className="inpta-note text-center mt-4 mb-0">
                Profiles, photos, incomes and quotes are editable examples
                only. They do not represent real INPTA graduates, placements
                or earnings.
              </p>
            </div>
          </div>

          {/* Ecosystem */}
          <div id="ecosystem" className="inpta-section">
            <div className="inpta-container">
              <div className="inpta-section__head">
                <span className="inpta-eyebrow inpta-eyebrow--blue">
                  The INPTA ecosystem
                </span>
                <h2>
                  More Than Education. An Entire Professional Ecosystem.
                </h2>
                <p>
                  Seven connected pillars that take a learner from first
                  lesson to recognised, career-ready professional.
                </p>
              </div>
              <div className="inpta-pillar-grid">
                {ecosystemPillars.map((pillar, index) => (
                  <div className="inpta-pillar-card" key={pillar.title}>
                    <div className="inpta-pillar-card__icon">
                      <FontAwesomeIcon icon={pillar.icon} />
                    </div>
                    <div className="inpta-pillar-card__num">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <h3>{pillar.title}</h3>
                    <p>{pillar.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Why INPTA exists */}
          <div className="inpta-section inpta-section--alt">
            <div className="inpta-container">
              <div className="inpta-section__head inpta-section__head--left">
                <div className="inpta-big-kicker">
                  <span className="inpta-big-kicker__num">4</span>
                  <span className="inpta-eyebrow inpta-eyebrow--orange mb-0">
                    Core commitments
                  </span>
                </div>
                <h2 className="mb-2">Why INPTA exists</h2>
                <p className="inpta-section__subhead mb-2">
                  Because the fitness profession deserves a real standard.
                </p>
                <p>
                  Too much fitness education is informal, inconsistent and
                  unassessed. INPTA was created to change that — through
                  better education, clearer standards, rigorous assessment
                  and, ultimately, better professionals.
                </p>
              </div>
              <ol className="inpta-commitment-list">
                {coreCommitments.map((item) => (
                  <li className="inpta-commitment-row" key={item.title}>
                    <span className="inpta-commitment-row__icon">
                      <FontAwesomeIcon icon={item.icon} />
                    </span>
                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* Research & Development */}
          <div className="inpta-section">
            <div className="inpta-container">
              <div className="inpta-section__head">
                <span className="inpta-eyebrow inpta-eyebrow--blue">
                  Research &amp; academic development
                </span>
                <h2>Evidence first. Curriculum second. Practice always.</h2>
                <p>
                  INPTA's academic work informs everything we teach and
                  assess. Research areas are reviewed and updated as the
                  field evolves.
                </p>
              </div>
              <div className="inpta-research-grid">
                {researchAreas.map((area) => (
                  <div className="inpta-research-card" key={area.title}>
                    <div className="inpta-research-card__head">
                      <span className="inpta-research-card__icon">
                        <FontAwesomeIcon icon={area.icon} />
                      </span>
                      <span className="inpta-research-card__area">
                        {area.area}
                      </span>
                    </div>
                    <h3>{area.title}</h3>
                    <div className="inpta-research-card__tags">
                      {area.tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Listed Academies */}
          <div className="inpta-section inpta-section--alt">
            <div className="inpta-container">
              <div className="inpta-section__head">
                <span className="inpta-eyebrow inpta-eyebrow--blue">
                  Listed Academies
                </span>
                <h2>Currently listed academies</h2>
              </div>
              <div className="row g-4 justify-content-center">
                {educationData && educationData.length > 0 && (
                  <>
                    {educationData.map((education) => {
                      const description = education?.description;
                      const truncatedDescription =
                        description?.length > 110
                          ? description?.substring(0, 110) + "..."
                          : description;
                      return (
                        <div
                          className="col-lg-4 col-md-6 wow fadeInUp"
                          data-wow-delay="0.1s"
                        >
                          <div className="Goodup-grid-wrap course-item">
                            <Link
                              to={`/view-listing?listing_id=${education._id}`}
                              className="text-dark Goodup-grid-upper"
                            >
                              <div className="Goodup-grid-thumb overflow-hidden">
                                <img
                                  className="img-fluid"
                                  src={`https://files.fggroup.in/${education?.images?.[0]}`}
                                  alt={education.title}
                                />
                              </div>

                              <div className="Goodup-rating overlay">
                                <div className="Goodup-pr-average high">
                                  {(education.review_stats.average_rating &&
                                    education.review_stats.average_rating.toFixed(
                                      1
                                    )) ||
                                    "0"}
                                </div>
                                <div className="Goodup-aldeio">
                                  <div className="Goodup-rates">
                                    {[...Array(5)].map((_, index) => (
                                      <i
                                        className="fas fa-star"
                                        key={index}
                                        style={{
                                          color:
                                            index <
                                            education.review_stats
                                              .average_rating
                                              ? "#F09000"
                                              : "#ccc",
                                        }}
                                      />
                                    ))}
                                  </div>
                                  <div className="Goodup-all-review">
                                    <span>
                                      {education.review_stats.total_ratings}{" "}
                                      Rating
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </Link>
                            <div className="Goodup-grid-fl-wrap text-start py-3 px-0 pb-0">
                              <h5 className="mb-2 ps-2">{education.title}</h5>
                              <div className="ps-2 pb-1">
                                <small className="text-center pt-2">
                                  {truncatedDescription}
                                </small>
                              </div>
                              <div className="Goodup-grid-footer py-2 pb-2 ps-2 mt-2">
                                <div className="Goodup-ft-first">
                                  <div className="Goodup-location">
                                    <i className="fas fa-map-marker-alt me-2 theme-cl text-primary" />
                                    {education.locations[0].city +
                                      ", " +
                                      education.locations[0].state}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}

                    <div className="col-12 d-flex justify-content-center mt-3">
                      <Link to="/view-all-listing" class="view-list-btn me-2">
                        <i class="fas fa-eye me-2"></i>View More
                      </Link>
                    </div>
                  </>
                )}
                {educationData?.length === 0 && !loadingOne && (
                  <div className="col-12 d-flex flex-column align-items-center">
                    <img
                      src="/images/listing-not-found.webp"
                      alt="listing"
                      className="list-img"
                    />
                    <h4>No Listing Data Found</h4>
                    <Link to="/add-listing" class="add-list-btn mt-2">
                      <i class="fas fa-plus me-2"></i>Add Listing
                    </Link>
                  </div>
                )}
                {loadingOne && (
                  <div className="w-100 d-flex justify-content-center">
                    <div class="spinner-box spinner-width">
                      <div class="three-quarter-spinner three-quarter-spinner-width"></div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Institutional Credentials */}
          <div id="credentials" className="inpta-section">
            <div className="inpta-container">
              <div className="inpta-section__head">
                <span className="inpta-eyebrow inpta-eyebrow--blue">
                  Institutional Credentials
                </span>
                <h2>
                  Recognition, Registration &amp; Institutional Credentials
                </h2>
                <p>
                  Credentials shown here should be published with their
                  exact legal scope and supporting documentation.
                </p>
              </div>
              <div className="row justify-content-center">
                <div className="col-lg-9">
                  <div className="inpta-vault-head">
                    <div>
                      <h4>INPTA Credentials Vault</h4>
                      <p>
                        Neutral placeholders — publish only with exact legal
                        scope and documents
                      </p>
                    </div>
                    <span className="inpta-vault-badge">
                      Awaiting verified data
                    </span>
                  </div>
                  <div className="inpta-credential-grid mb-4">
                    {credentialFields.map((field) => (
                      <div className="inpta-credential-cell" key={field.label}>
                        <span className="inpta-credential-cell__icon">
                          <FontAwesomeIcon icon={faFileCircleCheck} />
                        </span>
                        <div className="inpta-credential-cell__body">
                          <div className="inpta-credential-cell__label">
                            {field.label}
                          </div>
                          <div className="inpta-credential-cell__value">
                            {field.value}
                          </div>
                        </div>
                        <span
                          className={`inpta-credential-badge ${
                            field.status === "Required"
                              ? "inpta-credential-badge--required"
                              : "inpta-credential-badge--optional"
                          }`}
                        >
                          {field.status}
                        </span>
                      </div>
                    ))}
                  </div>
                  <p className="inpta-note mb-2">
                    <strong>Compliance note:</strong> PAN registration alone
                    does not establish government recognition or
                    accreditation.
                  </p>
                  <div className="inpta-vault-actions">
                    <a href="#credentials" className="inpta-btn inpta-btn--solid">
                      View Credentials
                    </a>
                    <a href="#credentials" className="inpta-btn inpta-btn--outline">
                      Verify Documents
                    </a>
                  </div>
                  <p className="inpta-note mb-0 mt-3">
                    No government recognition, affiliation or accreditation
                    is claimed on this page. Replace placeholders only with
                    documented, verifiable credentials.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Foundation */}
          <div className="inpta-section inpta-section--alt">
            <div className="inpta-container">
              <div className="row g-5 align-items-center">
                <div className="col-lg-6">
                  <div className="inpta-asset-frame">
                    <img
                      className="img-fluid"
                      style={{ borderRadius: "1.5rem" }}
                      src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1400&q=80"
                      alt="Group of professionals collaborating around a table during a workshop"
                    />
                    <span className="inpta-asset-hint">
                      Replace with real INPTA asset
                    </span>
                  </div>
                </div>
                <div className="col-lg-6">
                  <span className="inpta-eyebrow inpta-eyebrow--green">
                    Foundation
                  </span>
                  <h2
                    className="mt-3 mb-3"
                    style={{ fontWeight: 700, fontSize: "2.1rem" }}
                  >
                    A Foundation Dedicated to Professional Education.
                  </h2>
                  <p className="mb-4">
                    INPTA operates as a professional education foundation.
                    Its mission is to raise the quality of fitness practice
                    through knowledge, research, skill development,
                    assessment-based certification and career-oriented
                    education.
                  </p>
                  <ul className="inpta-bullet-list mb-4">
                    {foundationAreas.map((area) => (
                      <li key={area}>
                        <i className="fa fa-arrow-right"></i>
                        {area}
                      </li>
                    ))}
                  </ul>
                  <p className="inpta-note mb-0">
                    Exact legal form and registered status to be stated once
                    confirmed.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Transparency */}
          <div id="accreditation" className="inpta-section">
            <div className="inpta-container">
              <div className="inpta-section__head">
                <span className="inpta-eyebrow inpta-eyebrow--blue">
                  Transparency
                </span>
                <h2>Our Credentials. Your Confidence.</h2>
                <p>
                  Every claim INPTA makes should be traceable to a document.
                  These pages are where those documents will live.
                </p>
              </div>
              <div className="inpta-step-grid">
                {transparencyAreas.map((area) => (
                  <div className="inpta-step-card" key={area.title}>
                    <span className="inpta-step-card__icon">
                      <FontAwesomeIcon icon={area.icon} />
                    </span>
                    <h4>{area.title}</h4>
                    <p>{area.text}</p>
                    <a href="#accreditation">
                      {area.cta} <FontAwesomeIcon icon={faArrowRight} />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Network CTA */}
          <div id="network" className="inpta-section inpta-section--alt">
            <div className="inpta-container">
              <div className="inpta-section__head">
                <span className="inpta-eyebrow inpta-eyebrow--orange">
                  Join the network
                </span>
                <h2>Be Part of the Future of Fitness Education</h2>
                <p>
                  Whether you are starting a career, teaching the next
                  generation, or running a training centre — there is a
                  pathway into INPTA.
                </p>
              </div>
              <div className="inpta-pathway-grid">
                {networkPathways.map((pathway) => (
                  <div
                    className={`inpta-pathway-card inpta-tone-${pathway.tone}`}
                    key={pathway.title}
                  >
                    <span className="inpta-pathway-card__icon">
                      <FontAwesomeIcon icon={pathway.icon} />
                    </span>
                    <h3>{pathway.title}</h3>
                    <p>{pathway.text}</p>
                    <Link to={pathway.to} className="inpta-pathway-card__link">
                      {pathway.cta} <FontAwesomeIcon icon={faArrowRight} />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <ContactPage />
        <Footer />
      </>
    </div>
  );
};

export default Home;
