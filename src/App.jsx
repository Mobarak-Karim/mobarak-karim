import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  Award,
  BookOpen,
  Briefcase,
  Camera,
  ChevronLeft,
  ChevronRight,
  Download,
  ExternalLink,
  FlaskConical,
  GraduationCap,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Microscope,
  Sparkles,
  Users,
  X,
} from "lucide-react";

const SCHOLAR_URL = "https://scholar.google.com/citations?user=pQwQspwAAAAJ&hl=en";
const LINKEDIN_URL = "https://www.linkedin.com/in/md-mobarak-karim-259ab9124/";

const portfolioImages = {
  hero: "/images/hero-octls.jpg",
  tile1: "/images/publication-jbo.jpg",
  tile2: "/images/publication-jbio.png",
  tile3: "/images/project-conference-talk.jpeg",

  project1: "/images/publication-jbo.jpg",
  project2: "/images/publication-jbio.png",
  project3: "/images/publication-spie2026.jpeg",

  gallery1: "/images/gallery-vascular.jpeg",
  gallery2: "/images/gallery-oac.png",
  gallery3: "/images/project-conference-talk.jpeg",

  galleryVideoPoster1: "/images/video-poster-octls.jpg",
  galleryVideoPoster2: "/images/video-poster-registration.jpg",

  headshot: "/images/project-headshot.jpg",
  spieGroup: "/images/spie.jpeg",
  spiePresident: "/images/spie-president.jpeg",
  bolGroup: "/images/bol-g.jpeg",
};

const featuredPublications = [
  {
    id: "project1",
    number: "01",
    image: portfolioImages.project1,
    authors:
      "Karim MM, Sun R, Khajavi B, Singh M, Ambekar YS, Schill AW, Aglyamov SR, Mayerich D, Larin KV",
    title:
      "Multimodal optical coherence tomography and two-photon light sheet fluorescence microscopy for embryo imaging",
    shortTitle: "Multimodal OCT and two photon LSFM for embryo imaging",
    journal: "Journal of Biomedical Optics",
    year: "2025",
    volume: "30(6)",
    pages: "060501",
    doiLabel: "10.1117/1.JBO.30.6.060501",
    summary:
      "A multimodal platform integrating OCT with two-photon LSFM for co-registered structural and molecular embryo imaging.",
    contribution:
      "Led multimodal system integration, imaging workflow development, co-registration strategy, and figure preparation for embryo imaging studies.",
    previewNote:
      "Representative figure preview highlighting co-registered structural OCT and fluorescence light-sheet views in embryonic imaging.",
    links: {
      pdf: "https://pmc.ncbi.nlm.nih.gov/articles/PMC12152587/",
      doi: "https://doi.org/10.1117/1.JBO.30.6.060501",
    },
    tags: ["OCT", "Two-photon LSFM", "Embryo Imaging", "Multimodal Imaging"],
  },
  {
    id: "project2",
    number: "02",
    image: portfolioImages.project2,
    authors: "Karim MM, Nair A, Singh M, Hatami M, Aglyamov SR, Larin KV",
    title:
      "Depth-Resolved Attenuation Coefficient Quantification During Murine Embryonic Brain Development",
    shortTitle: "Depth-Resolved Attenuation Coefficient Quantification During Murine Embryonic Brain Development",
    journal: "Journal of Biophotonics",
    year: "2025",
    volume: "18(10)",
    pages: "e202500212",
    doiLabel: "10.1002/jbio.202500212",
    summary:
      "Quantitative OCT analysis of murine brain development using depth-resolved attenuation coefficient mapping.",
    contribution:
      "Developed and validated depth-resolved optical attenuation analysis for embryonic brain characterization and quantitative developmental assessment.",
    previewNote:
      "Large-format publication preview focused on attenuation maps and developmental brain-region analysis.",
    links: {
      pdf: "https://onlinelibrary.wiley.com/doi/abs/10.1002/jbio.202500212",
      doi: "https://doi.org/10.1002/jbio.202500212",
    },
    tags: ["Quantitative OCT", "Attenuation Mapping", "Mouse Embryo", "Brain Development"],
  },
  {
    id: "project3",
    number: "03",
    image: portfolioImages.project3,
    authors:
      "Karim MM, Lewis LA, Madamanchi G, Singh M, Schill AW, Aglyamov SR, Mayerich D, Lekven AC, Larin KV",
    title:
      "OCT-LS: a co-registered OCT and LSFM platform for simultaneous structural and molecular imaging of embryonic development",
    shortTitle: "OCT-LS platform for structural and molecular embryonic imaging",
    journal: "Proceedings of SPIE",
    year: "2026",
    volume: "13841",
    pages: "1384104",
    doiLabel: "10.1117/12.3080842",
    summary:
      "Conference paper presenting the OCT-LS platform for simultaneous structural and molecular imaging in embryonic development.",
    contribution:
      "Presented the co-registered OCT-LS framework and its developmental imaging applications at SPIE Photonics West.",
    previewNote:
      "Publication preview with platform overview imagery and SPIE conference presentation framing.",
    links: {
      pdf: "https://www.spiedigitallibrary.org/conference-proceedings-of-spie/13841/1384104/OCT-LS--a-co-registered-OCT-and-LSFM-platform/10.1117/12.3080842.full",
      doi: "https://doi.org/10.1117/12.3080842",
    },
    tags: ["SPIE", "OCT-LS", "Embryogenesis", "Conference Proceeding"],
  },
];

const journalArticles = [
  {
    status: "Published",
    citation:
      "Md Mobarak Karim, Ruijiao Sun, Behzad Khajavi, Manmohan Singh, Yogeshwari S. Ambekar, Alexander W. Schill, Salavat R. Aglyamov, David Mayerich, and Kirill V. Larin. “Multimodal optical coherence tomography and two-photon light sheet fluorescence microscopy for embryo imaging.” Journal of Biomedical Optics 30(6), 060501 (2025).",
    doi: "10.1117/1.JBO.30.6.060501",
    link: "https://doi.org/10.1117/1.JBO.30.6.060501",
  },
  {
    status: "Published",
    citation:
      "Md Mobarak Karim, Achuth Nair, Manmohan Singh, Maryam Hatami, Salavat R. Aglyamov, and Kirill V. Larin. “Depth-Resolved Attenuation Coefficient Quantification During Murine Embryonic Brain Development.” Journal of Biophotonics 18(10), e202500212 (2025).",
    doi: "10.1002/jbio.202500212",
    link: "https://doi.org/10.1002/jbio.202500212",
  },
  {
    status: "In preparation",
    citation:
      "Md Mobarak Karim, et al. “Long-term imaging of zebrafish embryonic development with multimodal optical coherence tomography and light-sheet fluorescence microscopy.” In preparation for OPTICA.",
    doi: "",
    link: "#",
  },
  {
    status: "Submitted",
    citation:
      "Leah A. Lewis, Md Mobarak Karim, et al. “Multimodal Optical Imaging for the Assessment of the Teratogenic Effects of Embryonic Ethanol Exposure on Zebrafish Development.” Submitted to JBO.",
    doi: "",
    link: "#",
  },
  {
    status: "In preparation",
    citation:
      "James Klein, Md Mobarak Karim, et al. “A novel tissue clearing method for deep tissue embryonic imaging.” In preparation for Optics Letters.",
    doi: "",
    link: "#",
  },
  {
    status: "Published",
    citation:
      "Mumtaza Mumu, Ayan Das, Talha Bin Emran, Saikat Mitra, Fahadul Islam, Arpita Roy, Md Mobarak Karim, Rajib Das, Moon Nyeo Park, Deepak Chandran, Rohit Sharma, Mayeen Uddin Khandaker, Abubakr M. Idris, and Bonglee Kim. “Fucoxanthin: A promising phytochemical on diverse pharmacological targets.” Frontiers in Pharmacology 13, 929442 (2022).",
    doi: "10.3389/fphar.2022.929442",
    link: "https://doi.org/10.3389/fphar.2022.929442",
  },
];

const conferenceProceedings = [
  {
    year: "2026",
    citation:
      "Md Mobarak Karim, Leah A. Lewis, Geethangili Madamanchi, Manmohan Singh, Alexander W. Schill, Salavat R. Aglyamov, David Mayerich, Arne C. Lekven, and Kirill V. Larin. “OCT-LS: a co-registered OCT and LSFM platform for simultaneous structural and molecular imaging of embryonic development.” Proceedings of SPIE 13841, Multimodal Biomedical Imaging XXI (2026).",
    doi: "10.1117/12.3080842",
    link: "https://doi.org/10.1117/12.3080842",
  },
  {
    year: "2025",
    citation:
      "Md Mobarak Karim, Leah A. Lewis, Christian Zevallos-Delgado, Oscar E. Ruiz, Geethangili Madamanchi, Alexander W. Schill, Salavat R. Aglyamov, Arne C. Lekven, and Kirill V. Larin. “Combined structural and molecular zebrafish embryonic imaging on ethanol exposure effects during vasculature development.” Proceedings of SPIE 13327, Multiscale Imaging and Spectroscopy VI (2025).",
    doi: "10.1117/12.3043312",
    link: "https://doi.org/10.1117/12.3043312",
  },
  {
    year: "2024",
    citation:
      "Md Mobarak Karim, Ruijiao Sun, Oscar E. Ruiz, Leah A. Lewis, Manmohan Singh, Alexander W. Schill, Salavat R. Aglyamov, David Mayerich, and Kirill V. Larin. “Imaging zebrafish embryonic development with multimodal optical coherence tomography and light-sheet fluorescence microscopy.” Proceedings of SPIE 12834, Multimodal Biomedical Imaging XIX (2024).",
    doi: "10.1117/12.3001234",
    link: "https://doi.org/10.1117/12.3001234",
  },
  {
    year: "2023",
    citation:
      "Md Mobarak Karim, Ruijiao Sun, Behzad Khajavi, Manmohan Singh, Harshdeep S. Chawla, Yogeshwari S. Ambekar, Alexander W. Schill, David Mayerich, Mary E. Dickinson, and Kirill V. Larin. “Multimodal optical coherence tomography and two-photon selective-plane illumination microscopy for embryonic imaging.” Proceedings of SPIE 12371, Multimodal Biomedical Imaging XVIII (2023).",
    doi: "10.1117/12.2649508",
    link: "https://doi.org/10.1117/12.2649508",
  },
  {
    year: "2022",
    citation:
      "Md Mobarak Karim, Ruijiao Sun, Behzad Khajavi, Manmohan Singh, Harshdeep S. Chawla, David Mayerich, Mary E. Dickinson, and Kirill V. Larin. “Combined optical coherence tomography and light sheet fluorescence microscopy for embryonic imaging.” Proceedings of SPIE 11952, Multimodal Biomedical Imaging XVII (2022).",
    doi: "10.1117/12.2610091",
    link: "https://doi.org/10.1117/12.2610091",
  },
];

const researchAreas = [
  {
    title: "Multimodal Optical Imaging",
    text: "Development of co-registered OCT and LSFM platforms for simultaneous structural and molecular imaging of embryonic development across zebrafish and murine models.",
  },
  {
    title: "Quantitative OCT and Tissue Optics",
    text: "Depth-resolved attenuation coefficient mapping, quantitative image analysis, and computational workflows for tissue characterization during embryonic development.",
  },
  {
    title: "Optical Design and Simulation",
    text: "Zemax-based optical design and analysis for laser scanning microscopy, including scan-lens evaluation, achromatic doublet optimization, aberration analysis, and system performance tradeoff assessment.",
  },
  {
    title: "Image Analysis and Translation",
    text: "End-to-end pipelines for image processing, registration, visualization, and biologically meaningful quantification that support both methodological development and biological discovery.",
  },
];

const education = [
  {
    degree: "PhD in Biomedical Engineering",
    school: "University of Houston",
    location: "Houston, Texas, USA",
    dates: "Jan 2021 – May 2026",
    supervisor: "Dr. Kirill V. Larin",
    thesis:
      "Development of multimodal combined optical coherence tomography and light-sheet microscopy for embryonic imaging",
  },
  {
    degree: "MSc in Biomedical Science and Engineering",
    school: "Gwangju Institute of Science and Technology",
    location: "Gwangju, South Korea",
    dates: "Aug 2018 – Dec 2020",
    supervisor: "Hyuk-Sang Kwon",
    thesis: "Analysis of achromatic doublet as a scan lens for laser scanning microscopy",
  },
  {
    degree: "BSc in Electrical and Electronic Engineering",
    school: "International Islamic University Chittagong",
    location: "Chittagong, Bangladesh",
    dates: "Aug 2013 – Aug 2017",
    supervisor: "Khandakar Abdullah Al Mamun",
    thesis:
      "Feasibility analysis and a proposal for a 1.3 MW hybrid renewable power plant for Saint Martins Island, Bangladesh",
  },
];

const trainingPrograms = [
  {
    year: "2024",
    title: "Multiscale Biophotonics Training Program",
    place: "Beckman Laser Institute, University of California, Irvine",
    note: "Supported by NIH",
  },
  {
    year: "2023",
    title: "CLIMB Biophotonics Summer School",
    place: "Beckman Institute, University of Illinois Urbana-Champaign",
    note: "Supported by NIH",
  },
  {
    year: "2022",
    title: "Siegman International School on Lasers",
    place: "Poland",
    note: "Organized by OPTICA",
  },
];

const toolProjects = [
  {
    title: "OCT-LS Data Processing Pipelines",
    text: "Custom Python workflows for multimodal co-registration, MIP generation, ROI analysis, volume rendering, figure preparation, and quantitative interpretation of OCT-LS imaging datasets.",
  },
  {
    title: "Instrument Control and Environmental Support",
    text: "Arduino and LabVIEW-based control for temperature regulation, CO₂ support, and integrated hardware workflows for long-term live embryo imaging experiments.",
  },
  {
    title: "Quantitative Imaging and Optical Analysis",
    text: "Fiji, MATLAB, and Python-based analysis for attenuation mapping, vascular quantification, and multimodal data interpretation, together with Zemax based optical design and scan-lens performance analysis for laser scanning microscopy systems.",
  },
];

const quickStats = [
  { value: "7+ years", label: "Biomedical optics and imaging research" },
  { value: "OCT, OCM, OCE, OCTA, LSFM", label: "Multimodal optical imaging platforms" },
  { value: "1P + 2P", label: "Light-sheet and multiphoton implementations" },
  { value: "Zebrafish & Mouse", label: "Embryogenesis imaging models" },
  { value: "Zemax OpticStudio", label: "Optical design and performance analysis" },
  { value: "Python / MATLAB / LabVIEW", label: "Analysis, automation, and visualization" },
  { value: "Quantitative Imaging", label: "Attenuation mapping and vascular workflows" },
  { value: "Publications + SPIE", label: "Peer-reviewed dissemination and conference presentations" },
];

const galleryItems = [
  {
    id: "gallery1",
    type: "image",
    src: portfolioImages.gallery1,
    label: "Image 01",
    title: "Co-registered vascular and structural embryo imaging",
    description:
      "Representative multimodal OCT-LSFM visualization showing registered morphology and vascular architecture in embryonic models.",
  },
  {
    id: "gallery2",
    type: "image",
    src: portfolioImages.gallery2,
    label: "Image 02",
    title: "Quantitative attenuation mapping in developmental imaging",
    description:
      "Depth-resolved attenuation coefficient analysis used for quantitative OCT characterization during embryonic brain development.",
  },
  {
    id: "gallery3",
    type: "image",
    src: portfolioImages.gallery3,
    label: "Image 03",
    title: "Scientific presentation and conference dissemination",
    description:
      "Conference presentation and research communication highlighting multimodal biomedical imaging, instrumentation, and translational optics.",
  },
  {
  id: "softwareDemo1",
  type: "video",
  src: "/videos/gui-lsfm-demo.mp4",
  poster: "/images/gui-lsfm-processing.png",
  label: "Demo 01",
  title: "Custom-built GUI for LSFM image processing and analysis",
  description:
    "Video demonstration of the custom software interface developed for LSFM image processing, MIP and depth-MIP generation, timelapse stabilization, ROI masking, preview control, and analysis workflow support.",
  },
  {
    id: "video2",
    type: "video",
    src: "/videos/registration-demo.mp4",
    poster: portfolioImages.galleryVideoPoster2,
    label: "Video 02",
    title: "Volumetric OCT-LSFM co-registration",
    description:
      "Demonstration of co-registration between OCT structural information and LSFM molecular or vascular signal.",
  },
];

const engagementItems = [
  {
    title: "SPIE and conference engagement",
    image: portfolioImages.spieGroup,
    text: "Presenting research and engaging with the biomedical optics community through conferences, posters, and networking.",
  },
  {
    title: "Professional networking",
    image: portfolioImages.spiePresident,
    text: "Building collaborations across optics, microscopy, translational imaging, and photonics communities.",
  },
  {
    title: "Biomedical Optics Laboratory community",
    image: portfolioImages.bolGroup,
    text: "Collaborative research environment spanning imaging system design, biological applications, and scientific communication.",
  },
];

const navItems = [
  { href: "#about", label: "About" },
  { href: "#research", label: "Research" },
  { href: "#publications", label: "Publications" },
  { href: "#gallery", label: "Gallery" },
  { href: "#education", label: "Education" },
  { href: "#projects", label: "Tools" },
  { href: "#contact", label: "Contact" },
];

const backgroundParticles = [
  { left: "8%", top: "18%", size: 6, duration: 8, delay: 0 },
  { left: "18%", top: "72%", size: 4, duration: 10, delay: 1.2 },
  { left: "28%", top: "36%", size: 5, duration: 9, delay: 0.6 },
  { left: "42%", top: "20%", size: 5, duration: 11, delay: 1.8 },
  { left: "56%", top: "70%", size: 6, duration: 9, delay: 0.9 },
  { left: "68%", top: "30%", size: 4, duration: 10, delay: 1.5 },
  { left: "78%", top: "60%", size: 5, duration: 8, delay: 0.3 },
  { left: "88%", top: "22%", size: 4, duration: 12, delay: 2.1 },
  { left: "14%", top: "48%", size: 3, duration: 7, delay: 0.5 },
  { left: "36%", top: "82%", size: 3, duration: 8, delay: 1.4 },
  { left: "62%", top: "12%", size: 3, duration: 9, delay: 1.1 },
  { left: "84%", top: "78%", size: 3, duration: 11, delay: 1.9 },
];

const heroParticles = [
  { left: "6%", top: "16%", size: 10, depth: 80, duration: 8, delay: 0.2 },
  { left: "14%", top: "70%", size: 6, depth: 30, duration: 11, delay: 1.1 },
  { left: "22%", top: "38%", size: 7, depth: 120, duration: 10, delay: 0.8 },
  { left: "31%", top: "54%", size: 5, depth: 70, duration: 9, delay: 0.5 },
  { left: "40%", top: "18%", size: 9, depth: 140, duration: 12, delay: 1.7 },
  { left: "48%", top: "72%", size: 6, depth: 90, duration: 9, delay: 0.4 },
  { left: "58%", top: "30%", size: 8, depth: 110, duration: 11, delay: 1.9 },
  { left: "66%", top: "62%", size: 5, depth: 50, duration: 8, delay: 0.7 },
  { left: "76%", top: "22%", size: 7, depth: 130, duration: 10, delay: 1.3 },
  { left: "84%", top: "52%", size: 6, depth: 65, duration: 12, delay: 2.2 },
  { left: "91%", top: "34%", size: 4, depth: 25, duration: 9, delay: 0.6 },
  { left: "72%", top: "84%", size: 4, depth: 45, duration: 11, delay: 1.5 },
];

const rotatingKeywords = [
  "OCT",
  "LSFM",
  "Embryogenesis",
  "Quantitative Imaging",
  "Optical Design",
  "Co-registration",
  "Biomedical Optics",
  "Zebrafish Imaging",
  "Murine Development",
  "Two-photon Microscopy",
];

const rotatingPapers = featuredPublications.map((item) => ({
  id: item.id,
  journal: item.journal,
  title: item.shortTitle || item.title,
}));

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.18 },
    transition: { duration: 0.55, delay },
  };
}

function SectionLabel({ children }) {
  return (
    <div className="mb-4 inline-flex items-center rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-cyan-300">
      {children}
    </div>
  );
}

function GlassCard({ className = "", children }) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.045] backdrop-blur-xl",
        "shadow-[0_20px_80px_rgba(2,12,27,0.45),inset_0_1px_0_rgba(255,255,255,0.06)]",
        "before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:content-['']",
        className
      )}
    >
      {children}
    </div>
  );
}

function Tag({ children }) {
  return (
    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
      {children}
    </span>
  );
}

function StatusTag({ children }) {
  return (
    <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.22em] text-cyan-300">
      {children}
    </span>
  );
}

function PrimaryButton({ href, children, className = "", onClick }) {
  const base =
    "inline-flex items-center gap-2 rounded-2xl bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 transition duration-300 hover:-translate-y-0.5 hover:bg-cyan-300";

  if (href) {
    const external = href.startsWith("http") || href.startsWith("mailto:");
    return (
      <a
        href={href}
        className={cn(base, className)}
        target={external && !href.startsWith("mailto:") ? "_blank" : undefined}
        rel={external && !href.startsWith("mailto:") ? "noreferrer" : undefined}
      >
        {children}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={cn(base, className)}>
      {children}
    </button>
  );
}

function SecondaryButton({ href, children, className = "", onClick }) {
  const base =
    "inline-flex items-center gap-2 rounded-2xl border border-white/12 bg-white/[0.03] px-6 py-3 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:border-cyan-400/40 hover:bg-white/[0.06]";

  if (href) {
    const external = href.startsWith("http") || href.startsWith("mailto:");
    return (
      <a
        href={href}
        className={cn(base, className)}
        target={external && !href.startsWith("mailto:") ? "_blank" : undefined}
        rel={external && !href.startsWith("mailto:") ? "noreferrer" : undefined}
      >
        {children}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={cn(base, className)}>
      {children}
    </button>
  );
}

function ThreeDBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[#020817]" />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_16%,rgba(34,211,238,0.16),transparent_20%),radial-gradient(circle_at_82%_18%,rgba(59,130,246,0.14),transparent_22%),radial-gradient(circle_at_50%_82%,rgba(14,165,233,0.10),transparent_26%)]" />

      <motion.div
        animate={{ opacity: [0.18, 0.32, 0.18], scale: [1, 1.06, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-1/2 top-[9%] h-[24rem] w-[72rem] max-w-[90vw] -translate-x-1/2 rounded-full bg-cyan-400/10 blur-[110px]"
      />

      <motion.div
        animate={{ x: [0, 26, 0, -26, 0], y: [0, -14, 0, 14, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-[8%] top-[20%] h-[20rem] w-[20rem] rounded-full border border-cyan-300/10"
      />

      <motion.div
        animate={{ x: [0, -18, 0, 18, 0], y: [0, 12, 0, -12, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-[7%] top-[28%] h-[24rem] w-[24rem] rounded-full border border-blue-300/10"
      />

      <div className="absolute inset-0 [perspective:1800px]">
        <motion.div
          animate={{ rotateZ: [0, 1.2, 0, -1.2, 0], y: [0, -12, 0, 12, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-1/2 top-[60%] h-[1200px] w-[1800px] -translate-x-1/2 -translate-y-1/2 [transform:rotateX(78deg)]"
        >
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(34,211,238,0.05)_1px,transparent_1px)] bg-[size:84px_84px] [mask-image:radial-gradient(circle_at_center,black,transparent_72%)]" />
          <div className="absolute inset-[16%] rounded-full border border-cyan-300/10" />
          <div className="absolute inset-[31%] rounded-full border border-cyan-300/10" />
          <div className="absolute inset-[45%] rounded-full border border-cyan-300/10" />
        </motion.div>
      </div>

      <motion.div
        animate={{ opacity: [0.08, 0.24, 0.08], x: [0, 40, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-[10%] top-[24%] h-[2px] w-[36%] bg-gradient-to-r from-transparent via-cyan-300/45 to-transparent blur-[1px]"
        style={{ transform: "rotate(-10deg)" }}
      />
      <motion.div
        animate={{ opacity: [0.08, 0.24, 0.08], x: [0, -34, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-[10%] top-[42%] h-[2px] w-[32%] bg-gradient-to-r from-transparent via-sky-300/40 to-transparent blur-[1px]"
        style={{ transform: "rotate(8deg)" }}
      />

      <motion.div
        animate={{ x: [0, 16, 0, -16, 0], opacity: [0.14, 0.24, 0.14] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-1/2 top-[12%] h-[22rem] w-[16rem] -translate-x-1/2 rounded-[40px] border border-cyan-300/10 bg-[linear-gradient(to_bottom,rgba(34,211,238,0.06),rgba(255,255,255,0.01),rgba(34,211,238,0.03))] backdrop-blur-[2px]"
        style={{ transform: "translateX(-50%) rotateY(22deg) rotateX(8deg)" }}
      />

      <motion.div
        animate={{ y: [0, -12, 0, 12, 0], opacity: [0.1, 0.18, 0.1] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-[18%] top-[14%] h-[30rem] w-[1px] bg-gradient-to-b from-transparent via-cyan-300/30 to-transparent"
      />
      <motion.div
        animate={{ y: [0, 12, 0, -12, 0], opacity: [0.08, 0.16, 0.08] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-[16%] top-[10%] h-[26rem] w-[1px] bg-gradient-to-b from-transparent via-blue-300/26 to-transparent"
      />

      <div className="absolute inset-0">
        {backgroundParticles.map((particle, index) => (
          <motion.span
            key={index}
            className="absolute rounded-full bg-white/30 blur-[1px]"
            style={{
              left: particle.left,
              top: particle.top,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
            }}
            animate={{
              y: [0, -18, 0],
              opacity: [0.2, 0.75, 0.2],
              scale: [1, 1.35, 1],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-10 top-[16%] rotate-[-90deg] text-[10px] font-semibold uppercase tracking-[0.9em] text-white/[0.08]">
          OCT • LSFM • Biomedical Optics • Embryogenesis • Quantitative Imaging
        </div>
        <div className="absolute right-[-120px] top-[26%] text-[78px] font-semibold uppercase tracking-[0.26em] text-white/[0.03] sm:text-[120px]">
          OCT LSFM
        </div>
      </div>

      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(2,8,23,0.10),rgba(2,8,23,0.52)_62%,rgba(2,8,23,0.92))]" />
    </div>
  );
}

function HeroParticleField() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[32px] [perspective:1600px]">
      <div className="absolute inset-0 [transform-style:preserve-3d]">
        <motion.div
          animate={{ opacity: [0.18, 0.34, 0.18], x: [0, 20, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-[-6%] top-[26%] h-24 w-[72%] rounded-full bg-gradient-to-r from-cyan-300/0 via-cyan-300/22 to-cyan-300/0 blur-2xl"
          style={{ transform: "rotate(-8deg)" }}
        />

        <motion.div
          animate={{ opacity: [0.14, 0.28, 0.14], x: [0, -16, 0] }}
          transition={{ duration: 8.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-[-4%] top-[56%] h-20 w-[54%] rounded-full bg-gradient-to-r from-sky-300/0 via-sky-300/18 to-sky-300/0 blur-2xl"
          style={{ transform: "rotate(7deg)" }}
        />

        <div className="absolute left-[8%] top-[18%] h-32 w-32 rounded-full border border-cyan-300/10" />
        <div className="absolute right-[10%] top-[16%] h-24 w-24 rounded-full border border-cyan-300/10" />
        <div className="absolute left-[20%] bottom-[14%] h-40 w-40 rounded-full border border-cyan-300/10" />

        <div className="absolute inset-x-[14%] top-[34%] h-px bg-gradient-to-r from-transparent via-cyan-300/18 to-transparent" />
        <div className="absolute inset-x-[24%] top-[62%] h-px bg-gradient-to-r from-transparent via-white/12 to-transparent" />

        <motion.div
          animate={{ rotateY: [18, 24, 18], rotateX: [4, 8, 4], opacity: [0.10, 0.18, 0.10] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-1/2 top-[14%] h-[15rem] w-[10rem] -translate-x-1/2 rounded-[32px] border border-cyan-300/10 bg-[linear-gradient(to_bottom,rgba(34,211,238,0.08),rgba(255,255,255,0.01),rgba(34,211,238,0.03))]"
          style={{ transformStyle: "preserve-3d" }}
        />

        {heroParticles.map((particle, index) => (
          <motion.div
            key={index}
            className="absolute"
            style={{ left: particle.left, top: particle.top }}
            animate={{
              x: [0, 12, -8, 0],
              y: [0, -18, 10, 0],
              opacity: [0.25, 0.95, 0.35, 0.25],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeInOut",
            }}
          >
            <div style={{ transform: `translateZ(${particle.depth}px)` }} className="[transform-style:preserve-3d]">
              <span
                className="block rounded-full bg-cyan-200/80 shadow-[0_0_24px_rgba(103,232,249,0.55)]"
                style={{ width: particle.size, height: particle.size }}
              />
            </div>
          </motion.div>
        ))}

        {[0, 1, 2, 3].map((index) => (
          <motion.div
            key={`scan-${index}`}
            className="absolute h-px bg-gradient-to-r from-transparent via-cyan-300/34 to-transparent"
            style={{
              top: `${18 + index * 16}%`,
              left: `${8 + index * 8}%`,
              width: `${34 + index * 8}%`,
            }}
            animate={{ opacity: [0.05, 0.34, 0.05], x: [0, 14, 0] }}
            transition={{ duration: 7.5 + index, repeat: Infinity, delay: index * 0.55 }}
          />
        ))}
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.14),transparent_42%),linear-gradient(135deg,rgba(2,8,23,0.22),transparent_38%,rgba(34,211,238,0.10))]" />
    </div>
  );
}

function ParallaxSection({ id, className = "", glow = "cyan", children }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], [26, -26]);
  const glowY = useTransform(scrollYProgress, [0, 1], [70, -70]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.1, 0.24, 0.1]);

  const glowMap = {
    cyan: "bg-cyan-400/14",
    blue: "bg-blue-500/14",
    sky: "bg-sky-400/14",
  };

  return (
    <section id={id} ref={ref} className={cn("relative overflow-hidden", className)}>
      <motion.div style={{ y: glowY, opacity: glowOpacity }} className="pointer-events-none absolute inset-0">
        <div className={cn("absolute -left-20 top-10 h-56 w-56 rounded-full blur-[120px]", glowMap[glow])} />
        <div className="absolute inset-x-0 top-24 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </motion.div>

      <motion.div style={{ y: contentY }} className="relative">
        {children}
      </motion.div>
    </section>
  );
}

function MobileNav({ open, setOpen }) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.24 }}
          className="mt-4 lg:hidden"
        >
          <GlassCard className="overflow-hidden p-2">
            <div className="flex flex-col">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  transition={{ duration: 0.24, delay: index * 0.04 }}
                  onClick={() => setOpen(false)}
                  className="rounded-2xl px-4 py-3 text-sm text-slate-200 transition hover:bg-white/[0.05]"
                >
                  {item.label}
                </motion.a>
              ))}
            </div>
          </GlassCard>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function PublicationModal({ item, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!item) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[110] bg-slate-950/96 backdrop-blur-md"
      onClick={onClose}
    >
      <div className="flex min-h-screen items-center justify-center p-4 sm:p-6 lg:p-10">
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.98 }}
          transition={{ duration: 0.25 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-7xl overflow-hidden rounded-[32px] border border-white/10 bg-[#020817] shadow-[0_30px_120px_rgba(0,0,0,0.72)]"
        >
          <div className="flex items-center justify-between border-b border-white/10 px-5 py-4 sm:px-7">
            <div>
              <div className="text-xs uppercase tracking-[0.32em] text-cyan-300">
                Featured publication {item.number}
              </div>
              <h3 className="mt-2 max-w-3xl text-lg font-semibold text-white sm:text-2xl">
                {item.title}
              </h3>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="rounded-2xl border border-white/10 bg-white/[0.04] p-3 text-slate-200 transition hover:bg-white/[0.08]"
              aria-label="Close publication preview"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="grid gap-0 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="relative min-h-[420px] border-b border-white/10 bg-black lg:min-h-[72vh] lg:border-b-0 lg:border-r">
              {item.image ? (
                <>
                  <img src={item.image} alt={item.title} className="h-full w-full object-contain" />
                  <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(2,8,23,0.16),transparent_45%,rgba(34,211,238,0.12))]" />
                </>
              ) : (
                <div className="flex h-full items-center justify-center p-10 text-center text-slate-400">
                  Figure preview unavailable.
                </div>
              )}
            </div>

            <div className="relative overflow-hidden p-6 sm:p-8">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.08),transparent_34%)]" />
              <div className="relative">
                <div className="flex flex-wrap items-center gap-3">
                  <StatusTag>{item.year}</StatusTag>
                  <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-400">
                    {item.journal}
                  </span>
                </div>

                <div className="mt-6 rounded-[24px] border border-white/10 bg-white/[0.03] p-5">
                  <div className="text-sm leading-7 text-slate-300">
                    <span className="font-medium text-white">[{item.number}]</span> {item.authors}.{" "}
                    <span className="font-medium text-white">{item.title}</span>.{" "}
                    <span className="italic">{item.journal}</span>. {item.year}; {item.volume}: {item.pages}.
                  </div>
                  <div className="mt-3 text-sm text-cyan-300">DOI: {item.doiLabel}</div>
                </div>

                <p className="mt-6 text-base leading-8 text-slate-300">{item.summary}</p>

                <div className="mt-6 rounded-[24px] border border-cyan-400/15 bg-cyan-400/5 p-5">
                  <div className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300">
                    Figure preview context
                  </div>
                  <p className="mt-3 text-sm leading-7 text-slate-300">{item.previewNote}</p>
                </div>

                <div className="mt-5 rounded-[24px] border border-white/10 bg-white/[0.03] p-5">
                  <div className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300">
                    Contribution
                  </div>
                  <p className="mt-3 text-sm leading-7 text-slate-300">{item.contribution}</p>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </div>

                <div className="mt-7 flex flex-wrap gap-3">
                  <SecondaryButton href={item.links.pdf}>
                    <BookOpen className="h-4 w-4" />
                    Read article
                  </SecondaryButton>
                  <SecondaryButton href={item.links.doi}>
                    <ExternalLink className="h-4 w-4" />
                    Open DOI
                  </SecondaryButton>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

function CitationCard({ item, onOpen }) {
  return (
    <motion.article {.....fadeUp()}>
      <GlassCard className="overflow-hidden transition duration-300 hover:-translate-y-1 hover:border-cyan-400/20 hover:bg-white/[0.05] hover:shadow-[0_20px_60px_rgba(34,211,238,0.08)]">
        <div className="grid gap-0 xl:grid-cols-[1.25fr_0.85fr]">
          <div className="p-6 sm:p-8">
            <div className="flex items-center justify-between gap-4">
              <div className="text-xs font-semibold uppercase tracking-[0.32em] text-cyan-300">
                Featured publication {item.number}
              </div>
              <div className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-400">
                {item.year}
              </div>
            </div>

            <div className="mt-5 rounded-[24px] border border-white/10 bg-slate-950/40 p-5">
              <div className="text-sm leading-7 text-slate-300">
                <span className="font-medium text-white">[{item.number}]</span> {item.authors}.{" "}
                <span className="font-medium text-white">{item.title}</span>.{" "}
                <span className="italic">{item.journal}</span>. {item.year}; {item.volume}: {item.pages}.
              </div>
              <div className="mt-3 text-sm text-cyan-300">DOI: {item.doiLabel}</div>
            </div>

            <p className="mt-5 text-base leading-8 text-slate-300">{item.summary}</p>

            <div className="mt-5 rounded-[22px] border border-cyan-400/15 bg-cyan-400/5 p-4">
              <div className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300">
                Contribution
              </div>
              <p className="mt-2 text-sm leading-7 text-slate-300">{item.contribution}</p>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {item.tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <PrimaryButton onClick={() => onOpen(item)}>
                <Camera className="h-4 w-4" />
                Large figure preview
              </PrimaryButton>
              <SecondaryButton href={item.links.pdf}>
                <BookOpen className="h-4 w-4" />
                PDF
              </SecondaryButton>
              <SecondaryButton href={item.links.doi}>
                <ExternalLink className="h-4 w-4" />
                DOI
              </SecondaryButton>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onOpen(item)}
            className="group relative min-h-[300px] border-t border-white/8 text-left transition xl:border-l xl:border-t-0"
          >
            {item.image ? (
              <>
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(2,8,23,0.14),transparent_48%,rgba(34,211,238,0.12))]" />
                <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-slate-950/80 to-transparent" />
                <div className="absolute bottom-4 left-4 rounded-full border border-white/10 bg-slate-950/70 px-3 py-1 text-[11px] uppercase tracking-[0.28em] text-cyan-300 backdrop-blur-sm">
                  Click to enlarge
                </div>
              </>
            ) : (
              <div className="flex h-full min-h-[300px] flex-col items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.18),_transparent_42%),linear-gradient(135deg,rgba(15,23,42,0.9),rgba(2,6,23,0.95))] p-8 text-center">
                <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-4 text-cyan-300">
                  <Camera className="h-8 w-8" />
                </div>
                <h4 className="mt-4 text-lg font-semibold text-white">Representative publication figure</h4>
                <p className="mt-2 max-w-sm text-sm leading-7 text-slate-400">
                  Key visual summary of the publication and its imaging contribution.
                </p>
              </div>
            )}
          </button>
        </div>
      </GlassCard>
    </motion.article>
  );
}

function FullCitationItem({ item, index, showStatus = false }) {
  return (
    <motion.div {.....fadeUp(index * 0.04)}>
      <div className="rounded-[22px] border border-white/10 bg-white/[0.03] p-5 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/20 hover:bg-white/[0.05] hover:shadow-[0_18px_50px_rgba(34,211,238,0.08)]">
        <div className="flex flex-wrap items-center gap-3">
          {showStatus ? <StatusTag>{item.status}</StatusTag> : <StatusTag>{item.year}</StatusTag>}
          {item.doi ? <span className="text-xs text-slate-500">DOI available</span> : null}
        </div>
        <p className="mt-4 text-sm leading-8 text-slate-300">{item.citation}</p>
        {item.doi ? (
          <a
            href={item.link}
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-cyan-300 transition hover:text-cyan-200"
          >
            <ExternalLink className="h-4 w-4" />
            {item.doi}
          </a>
        ) : null}
      </div>
    </motion.div>
  );
}

function GalleryCard({ item, onOpen }) {
  return (
    <motion.button {.....fadeUp()} type="button" onClick={onOpen} className="block h-full w-full text-left">
      <GlassCard className="h-full overflow-hidden transition duration-300 hover:-translate-y-1 hover:border-cyan-400/20 hover:bg-white/[0.05] hover:shadow-[0_18px_50px_rgba(34,211,238,0.08)]">
        <div className="relative">
          {item.type === "image" ? (
            <img src={item.src} alt={item.title} className="h-72 w-full object-cover" />
          ) : (
            <video
              src={item.src}
              poster={item.poster}
              className="h-72 w-full object-cover"
              muted
              autoPlay
              loop
              playsInline
              preload="auto"
            />
          )}

          <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(2,8,23,0.55),transparent_35%,transparent)]" />

          <div className="absolute left-4 top-4 rounded-full border border-white/10 bg-slate-950/70 px-3 py-1 text-[11px] uppercase tracking-[0.28em] text-cyan-300 backdrop-blur-sm">
            {item.label}
          </div>
        </div>

        <div className="p-6">
          <div className="mb-2 text-xs uppercase tracking-[0.24em] text-slate-500">
            {item.type === "video" ? "Video" : "Image"}
          </div>
          <h3 className="text-lg font-semibold text-white">{item.title}</h3>
          <p className="mt-3 text-sm leading-7 text-slate-400">{item.description}</p>
          <div className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-cyan-300">
            Open media
            <ChevronRight className="h-4 w-4" />
          </div>
        </div>
      </GlassCard>
    </motion.button>
  );
}

function EducationCard({ item, index }) {
  return (
    <motion.div {.....fadeUp(index * 0.06)}>
      <GlassCard className="h-full p-6 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/20 hover:bg-white/[0.05] hover:shadow-[0_18px_50px_rgba(34,211,238,0.08)]">
        <div className="flex items-start gap-4">
          <div className="rounded-2xl bg-cyan-400/10 p-3 text-cyan-300">
            <GraduationCap className="h-5 w-5" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-sm uppercase tracking-[0.28em] text-cyan-300">{item.dates}</div>
            <h3 className="mt-2 text-xl font-semibold text-white">{item.degree}</h3>
            <p className="mt-2 text-sm font-medium text-slate-200">{item.school}</p>
            <p className="mt-1 text-sm text-slate-400">{item.location}</p>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              <span className="font-medium text-white">Supervisor:</span> {item.supervisor}
            </p>
            <p className="mt-2 text-sm leading-7 text-slate-300">
              <span className="font-medium text-white">Thesis:</span> {item.thesis}
            </p>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}

function TrainingCard({ item, index }) {
  return (
    <motion.div {.....fadeUp(index * 0.06)}>
      <GlassCard className="h-full p-6 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/20 hover:bg-white/[0.05] hover:shadow-[0_18px_50px_rgba(34,211,238,0.08)]">
        <div className="flex items-start gap-4">
          <div className="rounded-2xl bg-cyan-400/10 p-3 text-cyan-300">
            <Award className="h-5 w-5" />
          </div>
          <div>
            <div className="text-sm uppercase tracking-[0.28em] text-cyan-300">{item.year}</div>
            <h3 className="mt-2 text-lg font-semibold text-white">{item.title}</h3>
            <p className="mt-2 text-sm leading-7 text-slate-300">{item.place}</p>
            <p className="mt-2 text-sm text-slate-400">{item.note}</p>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}

function ToolCard({ item, index }) {
  return (
    <motion.div {.....fadeUp(index * 0.06)}>
      <GlassCard className="h-full p-6 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/20 hover:bg-white/[0.05] hover:shadow-[0_18px_50px_rgba(34,211,238,0.08)]">
        <div className="flex items-start gap-4">
          <div className="rounded-2xl bg-cyan-400/10 p-3 text-cyan-300">
            <Briefcase className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white">{item.title}</h3>
            <p className="mt-3 text-sm leading-7 text-slate-400">{item.text}</p>
            <div className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-cyan-300">
              Built for research workflows
              <ChevronRight className="h-4 w-4" />
            </div>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}

function EngagementCard({ item, index }) {
  return (
    <motion.div {.....fadeUp(index * 0.06)}>
      <GlassCard className="h-full overflow-hidden transition duration-300 hover:-translate-y-1 hover:border-cyan-400/20 hover:bg-white/[0.05] hover:shadow-[0_18px_50px_rgba(34,211,238,0.08)]">
        <div className="relative h-56 overflow-hidden">
          <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(2,8,23,0.55),transparent_42%)]" />
        </div>
        <div className="p-6">
          <h3 className="text-lg font-semibold text-white">{item.title}</h3>
          <p className="mt-3 text-sm leading-7 text-slate-400">{item.text}</p>
        </div>
      </GlassCard>
    </motion.div>
  );
}

function MediaLightbox({ items, activeIndex, onClose, onPrev, onNext }) {
  const item = items[activeIndex];

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, onPrev, onNext]);

  if (!item) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-slate-950/95 backdrop-blur-md"
      onClick={onClose}
    >
      <div className="flex min-h-screen items-center justify-center p-4 sm:p-6 lg:p-10" onClick={(e) => e.stopPropagation()}>
        <div className="relative w-full max-w-6xl overflow-hidden rounded-[28px] border border-white/10 bg-[#020817] shadow-[0_20px_100px_rgba(0,0,0,0.6)]">
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-4 sm:px-6">
            <div>
              <div className="text-xs uppercase tracking-[0.3em] text-cyan-300">
                {item.type === "video" ? "Video" : "Image"}
              </div>
              <h3 className="mt-1 text-lg font-semibold text-white sm:text-xl">{item.title}</h3>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-3 text-slate-200 transition hover:bg-white/[0.06]"
              aria-label="Close media viewer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="relative bg-black">
            {item.type === "image" ? (
              <img src={item.src} alt={item.title} className="max-h-[75vh] w-full object-contain" />
            ) : (
              <video
                src={item.src}
                poster={item.poster}
                className="max-h-[75vh] w-full bg-black"
                controls
                autoPlay
                playsInline
              />
            )}

            {items.length > 1 ? (
              <>
                <button
                  type="button"
                  onClick={onPrev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-slate-950/70 p-3 text-white backdrop-blur transition hover:bg-slate-900/90"
                  aria-label="Previous media"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>

                <button
                  type="button"
                  onClick={onNext}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-slate-950/70 p-3 text-white backdrop-blur transition hover:bg-slate-900/90"
                  aria-label="Next media"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            ) : null}
          </div>

          <div className="border-t border-white/10 px-4 py-4 sm:px-6">
            <p className="text-sm leading-7 text-slate-300">{item.description}</p>
            <div className="mt-3 text-xs uppercase tracking-[0.25em] text-slate-500">
              {activeIndex + 1} / {items.length}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [galleryFilter, setGalleryFilter] = useState("all");
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(null);
  const [activePublication, setActivePublication] = useState(null);
  const [heroTilt, setHeroTilt] = useState({ x: 0, y: 0 });
  const [keywordIndex, setKeywordIndex] = useState(0);
  const [paperIndex, setPaperIndex] = useState(0);

  useEffect(() => {
    const previous = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = previous;
    };
  }, []);

  useEffect(() => {
    const closeMenu = () => setMobileOpen(false);
    window.addEventListener("resize", closeMenu);
    return () => window.removeEventListener("resize", closeMenu);
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setKeywordIndex((prev) => (prev + 1) % rotatingKeywords.length);
    }, 2200);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setPaperIndex((prev) => (prev + 1) % rotatingPapers.length);
    }, 3200);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    setActiveGalleryIndex(null);
  }, [galleryFilter]);

  const filteredGalleryItems = galleryItems.filter((item) => {
    if (galleryFilter === "all") return true;
    return item.type === galleryFilter;
  });

  const openGallery = (index) => setActiveGalleryIndex(index);
  const closeGallery = () => setActiveGalleryIndex(null);

  const showPrevGalleryItem = () => {
    setActiveGalleryIndex((prev) =>
      prev === null ? 0 : (prev - 1 + filteredGalleryItems.length) % filteredGalleryItems.length
    );
  };

  const showNextGalleryItem = () => {
    setActiveGalleryIndex((prev) =>
      prev === null ? 0 : (prev + 1) % filteredGalleryItems.length
    );
  };

  const handleHeroMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;

    setHeroTilt({
      x: -(py * 8),
      y: px * 10,
    });
  };

  const resetHeroTilt = () => {
    setHeroTilt({ x: 0, y: 0 });
  };

  const highlightedKeyword = rotatingKeywords[keywordIndex];
  const highlightedPaper = rotatingPapers[paperIndex];

  return (
    <div className="min-h-screen bg-[#020817] text-white selection:bg-cyan-400 selection:text-slate-950">
      <ThreeDBackground />

      <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-5 sm:px-6 lg:px-8 lg:pb-24">
        <header className="sticky top-4 z-50 mb-8">
          <GlassCard className="px-4 py-4 sm:px-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-300">
                  MD MOBARAK KARIM
                </div>
                <div className="mt-1 text-xl font-semibold text-slate-100 sm:text-2xl">
                  Md. Mobarak Karim
                </div>
              </div>

              <nav className="hidden flex-wrap gap-2 text-sm text-slate-300 lg:flex">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="rounded-xl px-3 py-2 transition hover:bg-white/[0.05]"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>

              <button
                type="button"
                onClick={() => setMobileOpen((prev) => !prev)}
                className="inline-flex rounded-2xl border border-white/10 bg-white/[0.03] p-3 text-slate-200 transition hover:bg-white/[0.06] lg:hidden"
                aria-label="Toggle navigation"
              >
                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>

            <MobileNav open={mobileOpen} setOpen={setMobileOpen} />
          </GlassCard>
        </header>

        <section className="relative grid gap-8 pb-20 pt-8 lg:grid-cols-[0.92fr_1.08fr] lg:gap-10 lg:pb-24 lg:pt-12">
          <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[36px]">
            <div className="absolute -left-20 top-10 h-60 w-60 rounded-full bg-cyan-400/10 blur-[120px]" />
            <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-blue-500/8 blur-[140px]" />
            <div className="absolute inset-x-[10%] bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-300/20 to-transparent" />
          </div>

          <div className="relative z-10 lg:pr-4">
            <SectionLabel>Biomedical Optics Researcher</SectionLabel>

            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65 }}
              className="max-w-4xl"
            >

              <h1 className="hero-balance text-3xl font-semibold leading-[1.02] text-white sm:text-4xl lg:text-6xl">
                Co-registered multimodal imaging for embryonic development and biomedical optics
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.08 }}
              className="mt-7 max-w-3xl text-lg leading-9 text-slate-300 sm:text-xl"
            >
              I developed very first co-registered multimodal imaging platforms based on optical coherence tomography and light-sheet fluorescence microscopy (OCT-LS) for simultaneous structural and molecular imaging. My work spans optical system development, quantitative tissue and image analysis, and custom software workflows for embryonic imaging in zebrafish and mouse models.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.76, delay: 0.14 }}
              className="mt-8 grid auto-rows-fr gap-4 lg:grid-cols-2"
            >
              <GlassCard className="relative min-h-[260px] h-full overflow-hidden p-5 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/20 hover:bg-white/[0.05] hover:shadow-[0_18px_50px_rgba(34,211,238,0.08)]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.10),transparent_34%)]" />
                <div className="relative flex h-full flex-col">
                  <div className="text-[11px] uppercase tracking-[0.28em] text-cyan-300">
                    Research Output
                  </div>

                  <div className="mt-4 min-h-[138px] sm:min-h-[148px]">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={highlightedPaper.id}
                        initial={{ opacity: 0, y: 14, filter: "blur(4px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        exit={{ opacity: 0, y: -14, filter: "blur(4px)" }}
                        transition={{ duration: 0.35 }}
                        className="flex h-full flex-col justify-between"
                      >
                        <div>
                          <div className="text-[11px] uppercase tracking-[0.24em] text-slate-500">
                            {highlightedPaper.journal}
                          </div>
                          <div className="mt-3 text-xl font-semibold leading-[1.12] text-white sm:text-2xl">
                            {highlightedPaper.title}
                          </div>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  <p className="mt-auto pt-3 text-sm leading-7 text-slate-400">
                    Selected papers rotate automatically.
                  </p>
                </div>
              </GlassCard>

              <GlassCard className="relative min-h-[260px] h-full overflow-hidden p-5 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/20 hover:bg-white/[0.05] hover:shadow-[0_18px_50px_rgba(34,211,238,0.08)]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.10),transparent_34%)]" />
                <div className="relative flex h-full flex-col">
                  <div className="text-[11px] uppercase tracking-[0.28em] text-cyan-300">
                    Rotating Research Keywords
                  </div>
                  <div className="mt-4 min-h-[64px]">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={highlightedKeyword}
                        initial={{ opacity: 0, y: 14, filter: "blur(4px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        exit={{ opacity: 0, y: -14, filter: "blur(4px)" }}
                        transition={{ duration: 0.35 }}
                        className="text-xl font-semibold leading-[1.15] text-white sm:text-2xl"
                      >
                        {highlightedKeyword}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                  <p className="mt-3 text-sm leading-7 text-slate-400">
                    Multimodal optics, quantitative analysis, and instrument development for embryonic imaging workflows.
                  </p>
                  <div className="mt-auto pt-4 flex flex-wrap gap-2">
                    {rotatingKeywords.slice(0, 5).map((term) => (
                      <Tag key={term}>{term}</Tag>
                    ))}
                  </div>
                </div>
              </GlassCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.72, delay: 0.18 }}
              className="mt-8 flex flex-wrap gap-4"
            >
              <PrimaryButton href="#publications">
                View Publications
                <ArrowRight className="h-4 w-4" />
              </PrimaryButton>
              <SecondaryButton href={SCHOLAR_URL}>
                <BookOpen className="h-4 w-4" />
                Google Scholar
              </SecondaryButton>
              <SecondaryButton href="/Md_Mobarak_Karim_CV.pdf">
                <Download className="h-4 w-4" />
                Download CV
              </SecondaryButton>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.74, delay: 0.22 }}
              className="mt-10 flex flex-wrap gap-3"
            >
              <Tag>University of Houston</Tag>
              <Tag>OCT, OCM, OCE, OCTA</Tag>
              <Tag>One-photon and Two-photon LSFM</Tag>
              <Tag>Biomedical Optics</Tag>
              <Tag>Zemax OpticStudio</Tag>
              <Tag>Embryonic Imaging</Tag>
              <Tag>Quantitative Imaging</Tag>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.75, delay: 0.1 }}
            className="relative z-10 lg:sticky lg:top-28 lg:self-start"
            onMouseMove={handleHeroMove}
            onMouseLeave={resetHeroTilt}
          >
            <div
              className="relative transition-transform duration-300 will-change-transform"
              style={{
                transform: `perspective(1800px) rotateX(${heroTilt.x}deg) rotateY(${heroTilt.y}deg)`,
              }}
            >
              <div className="pointer-events-none absolute -left-6 top-10 hidden h-32 w-32 rounded-full bg-cyan-400/15 blur-3xl lg:block" />
              <div className="pointer-events-none absolute -right-6 bottom-10 hidden h-36 w-36 rounded-full bg-blue-500/15 blur-3xl lg:block" />

              <GlassCard className="relative overflow-hidden p-4 sm:p-5">
                <HeroParticleField />

                <div className="relative mb-4 flex items-center justify-between gap-4">
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300">
                      Featured collage
                    </div>
                    <div className="mt-1 text-sm text-slate-400">
                      Research highlights and representative figures
                    </div>
                  </div>
                </div>

                <div className="relative grid gap-3 sm:grid-cols-[1.3fr_0.7fr]">
                  <div className="relative min-h-[320px] overflow-hidden rounded-[26px] border border-white/10 bg-slate-950/70 sm:min-h-[420px]">
                    <img
                      src={portfolioImages.hero}
                      alt="Featured research collage"
                      className="h-full w-full scale-[1.03] object-cover"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(2,8,23,0.18),transparent_34%,transparent_66%,rgba(34,211,238,0.14))]" />
                    <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-slate-950/80 to-transparent" />
                    <div className="absolute left-4 top-4 rounded-full border border-white/10 bg-slate-950/70 px-3 py-1 text-[11px] uppercase tracking-[0.28em] text-cyan-300 backdrop-blur-sm">
                      Lead figure
                    </div>
                  </div>

                  <div className="grid gap-3">
                    {[portfolioImages.tile1, portfolioImages.tile2, portfolioImages.tile3].map((src, index) => (
                      <div
                        key={index}
                        className="relative min-h-[132px] overflow-hidden rounded-[22px] border border-white/10 bg-slate-950/70"
                      >
                        <img src={src} alt={`Collage tile ${index + 1}`} className="h-full w-full object-cover" />
                        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(2,8,23,0.12),transparent_65%,rgba(34,211,238,0.08))]" />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="relative mt-4 grid gap-3 sm:grid-cols-3">
                  <GlassCard className="p-4 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/20 hover:bg-white/[0.05] hover:shadow-[0_18px_50px_rgba(34,211,238,0.08)]">
                    <div className="flex items-center gap-3">
                      <div className="rounded-2xl bg-cyan-400/10 p-3 text-cyan-300">
                        <FlaskConical className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-white">Embryogenesis</div>
                        <div className="text-xs text-slate-400">Zebrafish and murine models</div>
                      </div>
                    </div>
                  </GlassCard>

                  <GlassCard className="p-4 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/20 hover:bg-white/[0.05] hover:shadow-[0_18px_50px_rgba(34,211,238,0.08)]">
                    <div className="flex items-center gap-3">
                      <div className="rounded-2xl bg-cyan-400/10 p-3 text-cyan-300">
                        <Sparkles className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-white">Quantitative Imaging</div>
                        <div className="text-xs text-slate-400">OAC, registration, analysis</div>
                      </div>
                    </div>
                  </GlassCard>

                  <GlassCard className="p-4 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/20 hover:bg-white/[0.05] hover:shadow-[0_18px_50px_rgba(34,211,238,0.08)]">
                    <div className="flex items-center gap-3">
                      <div className="rounded-2xl bg-cyan-400/10 p-3 text-cyan-300">
                        <Award className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-white">Instrumentation</div>
                        <div className="text-xs text-slate-400">Optical design and integration</div>
                      </div>
                    </div>
                  </GlassCard>
                </div>
              </GlassCard>
            </div>
          </motion.div>
        </section>

        <ParallaxSection id="about" className="pb-14 lg:pb-20" glow="cyan">
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <motion.div {.....fadeUp()}>
              <GlassCard className="p-7 sm:p-8">
                <SectionLabel>About</SectionLabel>
                <h2 className="text-3xl font-semibold text-white sm:text-4xl">
                  Biomedical Optics Researcher and Multimodal Imaging Systems Developer
                </h2>
                <p className="mt-5 text-base leading-8 text-slate-300">
                  <p>
                  I earned my PhD in Biomedical Engineering from the University of Houston in Spring 2026. I have more than six years of research experience in biomedical optics, photonics, and multimodal optical imaging. My work focuses on the development of co-registered optical coherence tomography and light-sheet fluorescence microscopy platforms for embryonic imaging, integrating optical system design, two-photon microscopy, quantitative image analysis, and custom software tools for advanced biomedical imaging workflows.                </p>
                <p className="mt-4 text-base leading-8 text-slate-300">
                  I work at the intersection of optical system design, instrument integration, and biological imaging, with hands-on experience in beam delivery, optical alignment, scanning geometry optimization, environmental support for long-term imaging, and end-to-end data processing. My work spans zebrafish and mouse embryo models and focuses on translating advanced imaging technologies into quantitative tools for developmental biology, tissue optics, and phenotype analysis.
                </p>
                <p className="mt-4 text-base leading-8 text-slate-300">
                  My background also includes Zemax-based optical analysis for laser scanning microscopy, including scan-lens evaluation, achromatic doublet optimization, aberration assessment, and imaging performance tradeoff analysis. Across research projects, I have contributed to system validation, multimodal co-registration, quantitative attenuation mapping, and publication-ready imaging workflows that support both methodological innovation and biological discovery.
                </p>
              </GlassCard>
            </motion.div>

            <div className="grid gap-5 sm:grid-cols-2">
              {quickStats.map((stat, index) => (
                <motion.div key={stat.label} {.....fadeUp(index * 0.05)}>
                  <GlassCard className="p-6 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/20 hover:bg-white/[0.05] hover:shadow-[0_18px_50px_rgba(34,211,238,0.08)]">
                    <div className="text-2xl font-semibold text-white">{stat.value}</div>
                    <div className="mt-2 text-sm leading-7 text-slate-400">{stat.label}</div>
                  </GlassCard>
                </motion.div>
              ))}

              <motion.div {.....fadeUp(0.22)} className="sm:col-span-2">
                <GlassCard className="overflow-hidden transition duration-300 hover:-translate-y-1 hover:border-cyan-400/20 hover:bg-white/[0.05] hover:shadow-[0_18px_50px_rgba(34,211,238,0.08)]">
                  <div className="grid gap-0 md:grid-cols-[0.42fr_0.58fr]">
                    <div className="relative min-h-[320px]">
                      <img
                        src={portfolioImages.headshot}
                        alt="Md Mobarak Karim"
                        className="h-full w-full object-cover object-top"
                      />
                      <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(2,8,23,0.4),transparent_35%)]" />
                    </div>
                    <div className="p-6 sm:p-7">
                      <div className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300">
                        Research Profile
                      </div>
                      <h3 className="mt-3 text-2xl font-semibold text-white">
                        Biomedical optics researcher focused on multimodal imaging
                      </h3>
                      <p className="mt-4 text-sm leading-8 text-slate-300">
                        My work combines optical coherence tomography, light-sheet fluorescence microscopy, quantitative image analysis, software development, and instrumentation design for embryonic imaging and translational biomedical optics.
                      </p>
                      <div className="mt-5 flex flex-wrap gap-2">
                        <Tag>OCT</Tag>
                        <Tag>LSFM</Tag>
                        <Tag>Embryogenesis</Tag>
                        <Tag>Optical Design</Tag>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            </div>
          </div>
        </ParallaxSection>

        <ParallaxSection id="research" className="pb-14 lg:pb-20" glow="sky">
          <GlassCard className="p-7 sm:p-8 lg:p-10">
            <SectionLabel>Research Focus</SectionLabel>
            <div className="grid gap-5 lg:grid-cols-2">
              {researchAreas.map((item, index) => (
                <motion.div
                  key={item.title}
                  {.....fadeUp(index * 0.06)}
                  className="rounded-[24px] border border-white/10 bg-white/[0.03] p-6 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/20 hover:bg-white/[0.05] hover:shadow-[0_18px_50px_rgba(34,211,238,0.08)]"
                >
                  <div className="mb-4 inline-flex rounded-2xl bg-cyan-400/10 p-3 text-cyan-300">
                    <Microscope className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-400">{item.text}</p>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </ParallaxSection>

        <ParallaxSection id="publications" className="pb-14 lg:pb-20" glow="blue">
          <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <SectionLabel>Publications</SectionLabel>
              <h2 className="text-3xl font-semibold text-white sm:text-5xl">
                Journal articles and conference proceedings
              </h2>
              <p className="mt-4 text-base leading-8 text-slate-300 sm:text-lg">
                Featured publications include larger figure-preview modals, followed by full journal and conference lists with direct DOI links and a Google Scholar shortcut.
              </p>
            </div>
            <SecondaryButton href={SCHOLAR_URL} className="self-start lg:self-auto">
              <ExternalLink className="h-4 w-4" />
              Full list on Google Scholar
            </SecondaryButton>
          </div>

          <div className="space-y-6">
            {featuredPublications.map((item) => (
              <CitationCard key={item.id} item={item} onOpen={setActivePublication} />
            ))}
          </div>

          <div className="mt-12 grid gap-8 xl:grid-cols-2">
            <div>
              <div className="mb-5 flex items-center gap-3">
                <SectionLabel>Journal Articles</SectionLabel>
              </div>
              <div className="space-y-4">
                {journalArticles.map((item, index) => (
                  <FullCitationItem
                    key={`${item.citation}-${index}`}
                    item={item}
                    index={index}
                    showStatus
                  />
                ))}
              </div>
            </div>

            <div>
              <div className="mb-5 flex items-center gap-3">
                <SectionLabel>Conference Proceedings</SectionLabel>
              </div>
              <div className="space-y-4">
                {conferenceProceedings.map((item, index) => (
                  <FullCitationItem key={`${item.citation}-${index}`} item={item} index={index} />
                ))}
              </div>
            </div>
          </div>
        </ParallaxSection>

        <ParallaxSection id="gallery" className="pb-14 lg:pb-20" glow="cyan">
          <div className="mb-8 max-w-3xl">
            <SectionLabel>Research Gallery</SectionLabel>
            <h2 className="text-3xl font-semibold text-white sm:text-5xl">
              Interactive image and video gallery
            </h2>
            <p className="mt-4 text-base leading-8 text-slate-300 sm:text-lg">
              Browse publication figures, supplementary visuals, instrument images, and research videos in an interactive gallery with fullscreen viewing.
            </p>
          </div>

          <div className="mb-6 flex flex-wrap gap-3">
            {["all", "image", "video"].map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setGalleryFilter(filter)}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm font-medium transition",
                  galleryFilter === filter
                    ? "border-cyan-400/40 bg-cyan-400/10 text-cyan-300"
                    : "border-white/10 bg-white/[0.03] text-slate-300 hover:border-cyan-400/20 hover:bg-white/[0.05]"
                )}
              >
                {filter === "all" ? "All" : filter === "image" ? "Images" : "Videos"}
              </button>
            ))}
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {filteredGalleryItems.map((item, index) => (
              <GalleryCard key={item.id} item={item} onOpen={() => openGallery(index)} />
            ))}
          </div>
        </ParallaxSection>

        <ParallaxSection className="pb-14 lg:pb-20" glow="sky">
          <div className="mb-8 max-w-3xl">
            <SectionLabel>Professional Engagement</SectionLabel>
            <h2 className="text-3xl font-semibold text-white sm:text-5xl">
              Conference presence and research community involvement
            </h2>
            <p className="mt-4 text-base leading-8 text-slate-300 sm:text-lg">
              Scientific presentations, networking, and community engagement across biomedical optics and photonics events.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {engagementItems.map((item, index) => (
              <EngagementCard key={item.title} item={item} index={index} />
            ))}
          </div>
        </ParallaxSection>

        <ParallaxSection id="education" className="pb-14 lg:pb-20" glow="blue">
          <div className="mb-8 max-w-3xl">
            <SectionLabel>Education</SectionLabel>
            <h2 className="text-3xl font-semibold text-white sm:text-5xl">
              Academic training and advanced biophotonics programs
            </h2>
          </div>

          <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
            <div className="grid gap-5">
              {education.map((item, index) => (
                <EducationCard key={item.degree} item={item} index={index} />
              ))}
            </div>

            <GlassCard className="p-6 sm:p-7">
              <SectionLabel>Advanced Training</SectionLabel>
              <div className="space-y-5">
                {trainingPrograms.map((item, index) => (
                  <TrainingCard key={`${item.title}-${item.year}`} item={item} index={index} />
                ))}
              </div>
            </GlassCard>
          </div>
        </ParallaxSection>

        <ParallaxSection id="projects" className="pb-14 lg:pb-20" glow="cyan">
          <div className="mb-8 max-w-3xl">
            <SectionLabel>Software and Tools</SectionLabel>
            <h2 className="text-3xl font-semibold text-white sm:text-5xl">
              Research software, hardware control, and analysis workflows
            </h2>
            <p className="mt-4 text-base leading-8 text-slate-300 sm:text-lg">
              A snapshot of the engineering and software infrastructure behind the imaging systems, quantitative pipelines, and experimental workflows.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {toolProjects.map((item, index) => (
              <ToolCard key={item.title} item={item} index={index} />
            ))}
          </div>
        </ParallaxSection>

        <ParallaxSection id="contact" className="pb-10" glow="sky">
          <GlassCard className="overflow-hidden">
            <div className="grid gap-0 lg:grid-cols-[1fr_0.8fr]">
              <div className="p-7 sm:p-8 lg:p-10">
                <SectionLabel>Contact</SectionLabel>
                <h2 className="text-3xl font-semibold text-white sm:text-5xl">
                  Open to research collaboration, photonics roles, and biomedical imaging opportunities
                </h2>
                <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300">
                  I am interested in opportunities spanning biomedical optics, optical system design, computational imaging, multimodal microscopy, and translational instrumentation development.
                </p>

                <div className="mt-8 flex flex-wrap gap-4">
                  <PrimaryButton href="mailto:m.k.mobarak@gmail.com">
                    <Mail className="h-4 w-4" />
                    Email Me
                  </PrimaryButton>
                  <SecondaryButton href={LINKEDIN_URL}>
                    <Linkedin className="h-4 w-4" />
                    LinkedIn
                  </SecondaryButton>
                  <SecondaryButton href="/Md_Mobarak_Karim_CV.pdf">
                    <Download className="h-4 w-4" />
                    Download CV
                  </SecondaryButton>
                </div>
              </div>

              <div className="border-t border-white/10 bg-white/[0.03] p-7 sm:p-8 lg:border-l lg:border-t-0 lg:p-10">
                <div className="space-y-5">
                  <div className="rounded-[22px] border border-white/10 bg-slate-950/40 p-5 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/20 hover:bg-slate-950/60 hover:shadow-[0_18px_50px_rgba(34,211,238,0.08)]">
                    <div className="flex items-start gap-4">
                      <div className="rounded-2xl bg-cyan-400/10 p-3 text-cyan-300">
                        <Mail className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="text-sm uppercase tracking-[0.28em] text-cyan-300">Email</div>
                        <a
                          href="mailto:m.k.mobarak@gmail.com"
                          className="mt-2 block text-sm text-slate-200 transition hover:text-cyan-300"
                        >
                          m.k.mobarak@gmail.com
                        </a>
                        <a
                          href="mailto:mkarim@cougarnet.uh.edu"
                          className="mt-1 block text-sm text-slate-400 transition hover:text-cyan-300"
                        >
                          mkarim@cougarnet.uh.edu
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-[22px] border border-white/10 bg-slate-950/40 p-5 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/20 hover:bg-slate-950/60 hover:shadow-[0_18px_50px_rgba(34,211,238,0.08)]">
                    <div className="flex items-start gap-4">
                      <div className="rounded-2xl bg-cyan-400/10 p-3 text-cyan-300">
                        <MapPin className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="text-sm uppercase tracking-[0.28em] text-cyan-300">Location</div>
                        <div className="mt-2 text-sm text-slate-300">Houston, Texas, USA</div>
                        <div className="mt-1 text-sm text-slate-400">University of Houston • Biomedical Engineering</div>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-[22px] border border-white/10 bg-slate-950/40 p-5 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/20 hover:bg-slate-950/60 hover:shadow-[0_18px_50px_rgba(34,211,238,0.08)]">
                    <div className="flex items-start gap-4">
                      <div className="rounded-2xl bg-cyan-400/10 p-3 text-cyan-300">
                        <Linkedin className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="text-sm uppercase tracking-[0.28em] text-cyan-300">Professional Profile</div>
                        <a
                          href={LINKEDIN_URL}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-2 inline-flex items-center gap-2 text-sm text-slate-200 transition hover:text-cyan-300"
                        >
                          View LinkedIn Profile
                          <ExternalLink className="h-4 w-4" />
                        </a>
                        <a
                          href={SCHOLAR_URL}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-2 block text-sm text-slate-400 transition hover:text-cyan-300"
                        >
                          Google Scholar
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-[22px] border border-white/10 bg-slate-950/40 p-5 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/20 hover:bg-slate-950/60 hover:shadow-[0_18px_50px_rgba(34,211,238,0.08)]">
                    <div className="flex items-start gap-4">
                      <div className="rounded-2xl bg-cyan-400/10 p-3 text-cyan-300">
                        <Users className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="text-sm uppercase tracking-[0.28em] text-cyan-300">Focus Areas</div>
                        <div className="mt-2 flex flex-wrap gap-2">
                          <Tag>OCT</Tag>
                          <Tag>LSFM</Tag>
                          <Tag>Embryo Imaging</Tag>
                          <Tag>Quantitative Optics</Tag>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>
        </ParallaxSection>

        <footer className="border-t border-white/10 pt-8">
          <div className="flex flex-col gap-4 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
            <div>© {new Date().getFullYear()} Md. Mobarak Karim • Biomedical Optics Portfolio</div>
            <div className="flex flex-wrap gap-4">
              <a href="#about" className="transition hover:text-cyan-300">
                About
              </a>
              <a href="#publications" className="transition hover:text-cyan-300">
                Publications
              </a>
              <a href="#gallery" className="transition hover:text-cyan-300">
                Gallery
              </a>
              <a href="#contact" className="transition hover:text-cyan-300">
                Contact
              </a>
            </div>
          </div>
        </footer>
      </div>

      <AnimatePresence>
        {activeGalleryIndex !== null ? (
          <MediaLightbox
            items={filteredGalleryItems}
            activeIndex={activeGalleryIndex}
            onClose={closeGallery}
            onPrev={showPrevGalleryItem}
            onNext={showNextGalleryItem}
          />
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {activePublication ? (
          <PublicationModal item={activePublication} onClose={() => setActivePublication(null)} />
        ) : null}
      </AnimatePresence>
    </div>
  );
}
