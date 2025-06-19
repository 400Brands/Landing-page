export const works = [
  {
    name: "Promotionalproductsnow",
    image1:
      "https://res.cloudinary.com/dgbreoalg/image/upload/v1750091518/promotional_irhlrv.jpg",
    image:
      "https://res.cloudinary.com/dgbreoalg/image/upload/v1746718752/pro_bj1wxu.jpg",
    desc: "Website, WhatsApp bot, and Google visibility (from 12 bookings/month → 80+)",
    icon: "https://res.cloudinary.com/dgbreoalg/image/upload/v1746716076/logo-CEQPpPRZ_p5otwz.png",
    avatar: "https://dummyimage.com/300.png/09f/fff&text=PPN",
  },
  {
    name: "ClevaHq",
    image1:
      "https://res.cloudinary.com/dgbreoalg/image/upload/v1750344541/cleva_ppkte4.jpg",
    image:
      "https://res.cloudinary.com/dgbreoalg/image/upload/v1746719104/cmm_kiwctc.jpg",
    desc: "Mobile app + influencer campaign = 3x consultation growth",
    icon: "https://clevahq.com/clevaLogo.svg",
    avatar: "https://dummyimage.com/300.png/09f/fff&text=CLQ",
  },
  {
    name: "Defrankfurtglobal",
    image1:
      "https://res.cloudinary.com/dgbreoalg/image/upload/v1750344161/defrankfurt_qd0mht.png",
    image:
      "https://res.cloudinary.com/dgbreoalg/image/upload/v1746719449/defrank_y2gyxf.jpg",
    desc: "Marketplace setup, social media, and AI pricing engine",
    icon: "https://www.defrankfurtglobal.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.ec8a5c02.png&w=256&q=75",
    avatar: "https://dummyimage.com/300.png/09f/fff&text=DFG",
  },
  {
    name: "londonhotel&apartments",
    image1:
      "https://res.cloudinary.com/dgbreoalg/image/upload/v1750344821/london-web_bwuigo.png",
    image:
      "https://res.cloudinary.com/dgbreoalg/image/upload/v1746718256/london_glixpi.jpg",
    desc: "Full-stack digital suite, SEO blog, and thought leadership content",
    icon: "https://jnoznbd6y3.ufs.sh/f/PKy8oE1GN2J3pe5blUVwi394rogIqdXzW56n8bYJTPQ1MAjv",
    avatar: "https://dummyimage.com/300.png/09f/fff&text=LHA",
  },
];


// For Blog Page
interface SocialLinks {
  linkedin: string;
  twitter: string;
  email: string;
}

export interface Leader {
  name: string;
  title: string;
  bio: string;
  image: string;
  social: SocialLinks;
}

export const leaders: Leader[] = [
  {
    name: "Wisdom Chris",
    title: "Chair & Cofounder",
    bio: "Julie leads Accenture's strategy and operations globally, driving innovation and sustainable growth across all markets and services.",
    image:
      "https://res.cloudinary.com/dgbreoalg/image/upload/v1747926521/1644496074350_gzqhkf.jpg",
    social: {
      linkedin: "#",
      twitter: "#",
      email: "#",
    },
  },
  {
    name: "KC McClure",
    title: "Chief Financial Officer",
    bio: "KC oversees Accenture's global financial operations, investor relations, and strategic financial planning initiatives.",
    image:
      "https://res.cloudinary.com/dgbreoalg/image/upload/v1725004015/samples/man-portrait.jpg",
    social: {
      linkedin: "#",
      twitter: "#",
      email: "#",
    },
  },
  {
    name: "Emeka Chukwu",
    title: "Graphics Designer",
    bio: "Paul leads Accenture's technology services and innovation strategy, helping clients transform through emerging technologies.",
    image:
      "https://res.cloudinary.com/dgbreoalg/image/upload/v1747927520/1743692080459_lzws4s.jpg",
    social: {
      linkedin: "#",
      twitter: "#",
      email: "#",
    },
  },
  {
    name: "Manish Sharma",
    title: "Group Chief Executive – Strategy & Consulting",
    bio: "Manish drives strategic consulting services, helping organizations navigate complex business transformations.",
    image:
      "https://res.cloudinary.com/dgbreoalg/image/upload/v1725004015/samples/man-portrait.jpg",
    social: {
      linkedin: "#",
      twitter: "#",
      email: "#",
    },
  },
  {
    name: "Julie Spellman Sweet",
    title: "Group Chief Executive – Operations",
    bio: "Julie leads operational excellence initiatives and manages global service delivery across all client engagements.",
    image:
      "https://res.cloudinary.com/dgbreoalg/image/upload/v1725004015/samples/man-portrait.jpg",
    social: {
      linkedin: "#",
      twitter: "#",
      email: "#",
    },
  },
  {
    name: "Ellyn Shook",
    title: "Chief Leadership & Human Resources Officer",
    bio: "Ellyn champions talent development, diversity & inclusion, and organizational culture transformation initiatives.",
    image:
      "https://res.cloudinary.com/dgbreoalg/image/upload/v1725004016/samples/upscale-face-1.jpg",
    social: {
      linkedin: "#",
      twitter: "#",
      email: "#",
    },
  },
  // Add more leaders as needed
];