import { useState, useEffect, useRef } from 'react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  Code2, 
  ChevronDown, 
  ArrowRight, 
  Menu, 
  X, 
  Search, 
  FileText, 
  Download, 
  
  Briefcase, 
  GraduationCap, 
  CheckCircle2, 
  Sparkles,
  Layers,
  MapPin,
  BookOpen
} from 'lucide-react';

interface Certificate {
  fileName: string;
  filePath: string;
  title: string;
  issuer: string;
  year: string;
  category: string;
}

const SKILLS_DATA = [
  { name: 'Python', category: 'Programming Languages' },
  { name: 'Java', category: 'Programming Languages' },
  { name: 'C', category: 'Programming Languages' },
  { name: 'HTML', category: 'Programming Languages' },
  { name: 'MySQL', category: 'Programming Languages' },

  { name: 'Machine Learning', category: 'AI & Machine Learning' },
  { name: 'Deep Learning', category: 'AI & Machine Learning' },
  { name: 'Computer Vision', category: 'AI & Machine Learning' },
  { name: 'NLP', category: 'AI & Machine Learning' },
  { name: 'U-Net', category: 'AI & Machine Learning' },
  { name: 'CNN', category: 'AI & Machine Learning' },
  { name: 'Generative AI', category: 'AI & Machine Learning' },
  { name: 'Prompt Engineering', category: 'AI & Machine Learning' },
  { name: 'AI Agents', category: 'AI & Machine Learning' },

  { name: 'PyTorch', category: 'Frameworks & Libraries' },
  { name: 'TensorFlow', category: 'Frameworks & Libraries' },
  { name: 'OpenCV', category: 'Frameworks & Libraries' },
  { name: 'Hugging Face', category: 'Frameworks & Libraries' },
  { name: 'React', category: 'Frameworks & Libraries' },
  { name: 'Node.js', category: 'Frameworks & Libraries' },

  { name: 'Git', category: 'Cloud & Tools' },
  { name: 'GitHub', category: 'Cloud & Tools' },
  { name: 'AWS', category: 'Cloud & Tools' },
  { name: 'Azure', category: 'Cloud & Tools' },
  { name: 'GCP', category: 'Cloud & Tools' },
  { name: 'VS Code', category: 'Cloud & Tools' }
];

function Counter({ value, suffix = '', decimals = 0 }: { value: number; suffix?: string; decimals?: number }) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasStarted) return;
    
    let start = 0;
    const end = value;
    const duration = 1500; // ms
    const stepTime = 25; // ms
    const steps = duration / stepTime;
    const increment = end / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [value, hasStarted]);

  return (
    <span ref={elementRef} className="font-mono">
      {count.toFixed(decimals)}
      {suffix}
    </span>
  );
}

function App() {
  const [scrollY, setScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [visibleCount, setVisibleCount] = useState(8);
  const [previewFile, setPreviewFile] = useState<Certificate | null>(null);
  const [activeSkillTab, setActiveSkillTab] = useState('All');
  
  const heroRef = useRef<HTMLDivElement>(null);

  // Track scroll position for nav styling
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fetch certificates index
  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}certificates.json`)
      .then(res => res.json())
      .then((data: Certificate[]) => setCertificates(data))
      .catch(err => console.error('Failed to load certificates manifest', err));
  }, []);

  // Particle network animation
  useEffect(() => {
    const canvas = document.getElementById('neural-network-canvas') as HTMLCanvasElement;
    const parentContainer = heroRef.current;
    if (!canvas || !parentContainer) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
    }> = [];

    const resizeCanvas = () => {
      canvas.width = parentContainer.clientWidth || window.innerWidth;
      canvas.height = parentContainer.clientHeight || window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const count = Math.min(60, Math.floor((canvas.width * canvas.height) / 16000));
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          radius: Math.random() * 2 + 1,
        });
      }
    };

    const mouse = { x: -1000, y: -1000 };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener('resize', resizeCanvas);
    parentContainer.addEventListener('mousemove', handleMouseMove);
    parentContainer.addEventListener('mouseleave', handleMouseLeave);

    resizeCanvas();

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw connections
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        
        // Update position
        p1.x += p1.vx;
        p1.y += p1.vy;
        
        // Bounce off bounds
        if (p1.x < 0 || p1.x > canvas.width) p1.vx *= -1;
        if (p1.y < 0 || p1.y > canvas.height) p1.vy *= -1;

        // Draw node
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 214, 10, 0.4)';
        ctx.fill();

        // Connect nodes
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(255, 214, 10, ${0.12 * (1 - dist / 130)})`;
            ctx.stroke();
          }
        }

        // Connect to pointer position
        if (mouse.x > -500) {
          const mDist = Math.hypot(p1.x - mouse.x, p1.y - mouse.y);
          if (mDist < 200) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(255, 214, 10, ${0.25 * (1 - mDist / 200)})`;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      parentContainer.removeEventListener('mousemove', handleMouseMove);
      parentContainer.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Filtering Certificates
  const filteredCertificates = certificates.filter(cert => {
    const matchesSearch = 
      cert.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      cert.issuer.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (selectedCategory === 'All') return matchesSearch;
    
    // Categorization matching
    if (selectedCategory.toLowerCase() === 'cisco') return cert.category === 'Cisco' && matchesSearch;
    if (selectedCategory.toLowerCase() === 'oracle') return cert.category === 'Oracle' && matchesSearch;
    if (selectedCategory.toLowerCase() === 'ibm') return cert.category === 'IBM' && matchesSearch;
    if (selectedCategory.toLowerCase() === 'gfg') return cert.issuer.toLowerCase().includes('geeks') && matchesSearch;
    if (selectedCategory.toLowerCase() === 'infosys') return cert.category === 'Infosys' && matchesSearch;
    if (selectedCategory.toLowerCase() === 'hackathons') return cert.category === 'Hackathons' && matchesSearch;
    
    // Other categories fallback
    return cert.category.toLowerCase() !== 'cisco' && 
           cert.category.toLowerCase() !== 'oracle' && 
           cert.category.toLowerCase() !== 'ibm' && 
           !cert.issuer.toLowerCase().includes('geeks') && 
           cert.category.toLowerCase() !== 'infosys' && 
           cert.category.toLowerCase() !== 'hackathons' && matchesSearch;
  });

  // Calculate certification stats
  const certStats = {
    total: certificates.length,
    cisco: certificates.filter(c => c.category === 'Cisco').length,
    oracle: certificates.filter(c => c.category === 'Oracle').length,
    ibm: certificates.filter(c => c.category === 'IBM').length,
    gfg: certificates.filter(c => c.issuer.toLowerCase().includes('geeks')).length,
    infosys: certificates.filter(c => c.category === 'Infosys').length
  };

  // Skill categories list
  const skillCategories = ['All', 'Programming Languages', 'AI & Machine Learning', 'Frameworks & Libraries', 'Cloud & Tools'];

  // Note: skills are grouped and rendered as tags; `activeSkillTab` filters categories below.

  // Group skills by category for tag display
  const groupedSkills: Record<string, string[]> = {};
  SKILLS_DATA.forEach(s => {
    if (!groupedSkills[s.category]) groupedSkills[s.category] = [];
    groupedSkills[s.category].push(s.name);
  });

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#E5E5E5] font-sans selection:bg-[#FFD60A] selection:text-[#0A0A0A] overflow-x-hidden">
      <style>{`
        .gold-gradient-text {
          background: linear-gradient(135deg, #FFD60A 0%, #FFE566 100%);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .gold-border-glow {
          border: 1px solid rgba(255, 214, 10, 0.15);
          box-shadow: 0 0 20px rgba(255, 214, 10, 0.03);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .gold-border-glow:hover {
          border-color: rgba(255, 214, 10, 0.4);
          box-shadow: 0 0 30px rgba(255, 214, 10, 0.15);
        }

        .glass-card {
          background: rgba(18, 18, 18, 0.6);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.05);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .glass-card:hover {
          border-color: rgba(255, 214, 10, 0.25);
          box-shadow: 0 10px 30px rgba(255, 214, 10, 0.08);
          transform: translateY(-4px);
        }

        /* Nav links underline */
        .nav-link {
          position: relative;
          color: #A1A1AA;
          transition: color 0.3s ease;
        }
        .nav-link:hover {
          color: #FFD60A;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -6px;
          left: 0;
          width: 0;
          height: 2px;
          background: #FFD60A;
          transition: width 0.3s ease;
        }
        .nav-link:hover::after {
          width: 100%;
        }

        /* Progress Bar Animation */
        @keyframes fill-progress {
          from { width: 0%; }
        }
        .animate-progress {
          animation: fill-progress 1.5s cubic-bezier(0.1, 0.8, 0.2, 1) forwards;
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #0A0A0A;
        }
        ::-webkit-scrollbar-thumb {
          background: #27272A;
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #FFD60A;
        }
      `}</style>

      {/* NAVIGATION BAR */}
      <nav className={`fixed top-0 w-full z-50 border-b transition-all duration-300 ${
        scrollY > 30 
          ? 'bg-[#0A0A0A]/85 backdrop-blur-md border-white/5 py-4 shadow-lg' 
          : 'bg-transparent border-transparent py-6'
      }`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-lg bg-[#FFD60A] text-[#0A0A0A] flex items-center justify-center font-bold text-xl transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_0_20px_rgba(255,214,10,0.5)]">
              SN
            </div>
            <span className="text-xl font-bold tracking-wider text-white group-hover:text-[#FFD60A] transition-colors">
              SHAISTA NAAZ
            </span>
          </a>
          
          <div className="hidden lg:flex gap-10">
            <a href="#about" className="nav-link font-medium text-sm uppercase tracking-wider">About</a>
            <a href="#achievements" className="nav-link font-medium text-sm uppercase tracking-wider">Achievements</a>
            <a href="#skills" className="nav-link font-medium text-sm uppercase tracking-wider">Skills</a>
            <a href="#projects" className="nav-link font-medium text-sm uppercase tracking-wider">Projects</a>
            <a href="#certifications" className="nav-link font-medium text-sm uppercase tracking-wider">Certifications</a>
            <a href="#resume" className="nav-link font-medium text-sm uppercase tracking-wider">Resume</a>
            <a href="#contact" className="nav-link font-medium text-sm uppercase tracking-wider">Contact</a>
          </div>

          <div className="lg:hidden flex items-center">
            <button 
              onClick={() => setMenuOpen(!menuOpen)} 
              aria-label="Toggle menu" 
              className="p-2 text-gray-400 hover:text-white transition-colors"
            >
              {menuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {menuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-[#0A0A0A] border-b border-white/5 shadow-2xl py-6 px-8 flex flex-col gap-5 animate-fadeIn">
            <a href="#about" onClick={() => setMenuOpen(false)} className="text-gray-300 hover:text-[#FFD60A] transition-colors uppercase tracking-wider font-semibold text-sm">About</a>
            <a href="#achievements" onClick={() => setMenuOpen(false)} className="text-gray-300 hover:text-[#FFD60A] transition-colors uppercase tracking-wider font-semibold text-sm">Achievements</a>
            <a href="#skills" onClick={() => setMenuOpen(false)} className="text-gray-300 hover:text-[#FFD60A] transition-colors uppercase tracking-wider font-semibold text-sm">Skills</a>
            <a href="#projects" onClick={() => setMenuOpen(false)} className="text-gray-300 hover:text-[#FFD60A] transition-colors uppercase tracking-wider font-semibold text-sm">Projects</a>
            <a href="#certifications" onClick={() => setMenuOpen(false)} className="text-gray-300 hover:text-[#FFD60A] transition-colors uppercase tracking-wider font-semibold text-sm">Certifications</a>
            <a href="#resume" onClick={() => setMenuOpen(false)} className="text-gray-300 hover:text-[#FFD60A] transition-colors uppercase tracking-wider font-semibold text-sm">Resume</a>
            <a href="#contact" onClick={() => setMenuOpen(false)} className="text-gray-300 hover:text-[#FFD60A] transition-colors uppercase tracking-wider font-semibold text-sm">Contact</a>
          </div>
        )}
      </nav>

      {/* HERO SECTION */}
      <section 
        ref={heroRef} 
        className="min-h-screen flex items-center justify-center relative pt-24 pb-16 overflow-hidden border-b border-white/5"
      >
        {/* Canvas Neural Background */}
        <canvas id="neural-network-canvas" className="absolute inset-0 z-0 opacity-55 pointer-events-auto" />
        
        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-[#FFD60A]/5 rounded-full filter blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-[#FFD60A]/5 rounded-full filter blur-[110px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 md:px-12 w-full z-10 grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Hero Content (Left) */}
          <div className="lg:col-span-7 text-center lg:text-left order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 bg-[#FFD60A]/10 border border-[#FFD60A]/20 px-4 py-2 rounded-full mb-6">
              <Sparkles size={16} className="text-[#FFD60A] animate-pulse" />
              <span className="text-xs font-bold text-[#FFD60A] uppercase tracking-widest">
                AI/ML Engineer Portfolio
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight">
              Hi, I'm <br />
              <span className="gold-gradient-text">Shaista Naaz</span>
            </h1>

            <h2 className="text-xl sm:text-2xl font-semibold text-white tracking-wide mb-3">
              AI/ML Engineer • Computer Vision Enthusiast • Generative AI Developer
            </h2>

            <p className="text-sm sm:text-md uppercase tracking-wider text-[#FFD60A]/90 font-bold mb-6">
              Building Intelligent Systems for Real-World Impact
            </p>

            <p className="text-gray-400 text-base md:text-lg mb-10 max-w-2xl leading-relaxed">
              I specialize in training deep learning models, constructing conversational NLP systems, and designing autonomous AI agents, supported by hands-on engineering experience.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start mb-16">
              <a 
                href="#contact" 
                className="px-8 py-4 bg-[#FFD60A] text-[#0A0A0A] rounded-xl font-bold hover:bg-[#FFB700] hover:shadow-[0_0_20px_rgba(255,214,10,0.4)] hover:scale-[1.02] transition-all duration-300 flex items-center gap-2"
              >
                Get in Touch
                <ArrowRight size={18} />
              </a>
              <a 
                href="#resume" 
                className="px-8 py-4 bg-white/[0.04] text-white border border-white/10 rounded-xl font-semibold hover:bg-white/[0.08] hover:border-white/20 transition-all duration-300 flex items-center gap-2"
              >
                View Resume
              </a>
            </div>

            {/* Stats Counter */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl border-t border-white/5 pt-8">
              <div className="text-center lg:text-left">
                <div className="text-3xl md:text-4xl font-extrabold text-white">
                  <Counter value={10} suffix="+" />
                </div>
                <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">AI Projects</p>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl md:text-4xl font-extrabold text-[#FFD60A]">
                  <Counter value={37} />
                </div>
                <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">Certifications</p>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl md:text-4xl font-extrabold text-white">
                  <Counter value={1} />
                </div>
                <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">Internship</p>
              </div>
              <div className="text-center lg:text-left">
                  <div className="text-3xl md:text-4xl font-extrabold text-[#FFD60A]">
                    CGPA: 8.6
                  </div>
                  <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">B.Tech</p>
              </div>
            </div>
          </div>

          {/* Profile Picture Container (Right) */}
          <div className="lg:col-span-5 flex justify-center order-1 lg:order-2">
            <div className="relative group">
              {/* Spinning background gradients */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#FFD60A] to-[#FFE566] rounded-full opacity-60 blur-xl group-hover:opacity-85 transition-opacity duration-500 animate-pulse" />
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#FFD60A] via-transparent to-[#FFB700] opacity-40 blur-sm group-hover:scale-105 transition-all duration-300" />
              
              {/* Image Border Frame */}
              <div className="relative w-72 h-72 sm:w-85 sm:h-85 rounded-full p-2 bg-[#0A0A0A] border-2 border-[#FFD60A]/40 group-hover:border-[#FFD60A] group-hover:scale-[1.01] transition-all duration-500 shadow-[0_0_40px_rgba(255,214,10,0.15)] group-hover:shadow-[0_0_50px_rgba(255,214,10,0.3)]">
                <img 
                  src={`${import.meta.env.BASE_URL}PROF_pic.jpeg`} 
                  alt="Shaista Naaz Profile" 
                  className="w-full h-full object-cover rounded-full"
                />
              </div>

              {/* Status Badge */}
              <div className="absolute -bottom-2 right-6 bg-[#121212] border border-[#FFD60A]/30 px-4 py-1.5 rounded-full flex items-center gap-2 shadow-xl hover:scale-105 transition-transform duration-300">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FFD60A] animate-ping" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#FFD60A] absolute left-4" />
                <span className="text-xs font-semibold text-white uppercase tracking-wider">
                </span>
              </div>
            </div>
          </div>

        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block">
          <a href="#about" aria-label="Scroll down">
            <ChevronDown className="text-gray-500 hover:text-[#FFD60A] animate-bounce transition-colors" size={32} />
          </a>
        </div>
      </section>

      {/* ABOUT ME SECTION */}
      <section id="about" className="py-24 bg-[#121212] relative border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="text-center lg:text-left mb-16">
            <p className="text-[#FFD60A] font-bold text-xs uppercase tracking-widest mb-3">WHO I AM</p>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white">About Me</h2>
          </div>

          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            {/* Bio Card (Left) - expanded to full width after removing quick cards */}
            <div className="lg:col-span-12 space-y-6">
              <p className="text-gray-300 text-lg leading-relaxed">
                I am Shaista Naaz, a Computer Science Engineering student specializing in Artificial Intelligence, Machine Learning, Computer Vision, and Generative AI. I am passionate about building intelligent systems that solve real-world problems through data-driven innovation.
              </p>
              
              <p className="text-gray-400 text-md leading-relaxed">
                My experience spans deep learning architectures, multilingual Natural Language Processing (NLP), dynamic AI agents, and scalable AI pipeline development. Through hands-on internships, hackathons, and individual research experiments, I design robust, efficient systems aimed at resolving industry challenges.
              </p>

              {/* Personal details cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex items-start gap-3">
                  <GraduationCap className="text-[#FFD60A] shrink-0 mt-0.5" size={20} />
                  <div>
                    <h4 className="text-sm font-semibold text-white">Education</h4>
                    <p className="text-xs text-gray-400">B.Tech in CSE </p>
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex items-start gap-3">
                  <Briefcase className="text-[#FFD60A] shrink-0 mt-0.5" size={20} />
                  <div>
                    <h4 className="text-sm font-semibold text-white">Specialization</h4>
                    <p className="text-xs text-gray-400">Computer Vision & LLMs</p>
                  </div>
                </div>
              </div>

              {/* Social Connect */}
              <div className="pt-6">
                <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Connect with me</h3>
                <div className="flex items-center gap-4">
                  <a
                    href="mailto:shaistanaaz1106@gmail.com"
                    className="p-3.5 bg-white/[0.03] border border-white/5 hover:border-[#FFD60A]/30 hover:bg-[#FFD60A]/10 rounded-xl transition-all duration-300 hover:scale-105 flex items-center gap-2"
                    title="Email"
                  >
                    <Mail size={18} className="text-gray-300 hover:text-[#FFD60A] transition-colors" />
                    <span className="hidden sm:inline text-xs text-gray-300"></span>
                  </a>

                  <a
                    href="https://github.com/shaistanaaz8"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3.5 bg-white/[0.03] border border-white/5 hover:border-[#FFD60A]/30 hover:bg-[#FFD60A]/10 rounded-xl transition-all duration-300 hover:scale-105 flex items-center gap-2"
                    title="GitHub"
                  >
                    <Github size={18} className="text-gray-300 hover:text-[#FFD60A]" />
                    <span className="hidden sm:inline text-xs text-gray-300"></span>
                  </a>

                  <a
                    href="https://www.linkedin.com/in/shaista-naaz-202499335/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3.5 bg-white/[0.03] border border-white/5 hover:border-[#FFD60A]/30 hover:bg-[#FFD60A]/10 rounded-xl transition-all duration-300 hover:scale-105 flex items-center gap-2"
                    title="LinkedIn"
                  >
                    <Linkedin size={18} className="text-gray-300 hover:text-[#FFD60A]" />
                    <span className="hidden sm:inline text-xs text-gray-300"></span>
                  </a>
                </div>
              </div>
            </div>

            {/* Social Icons moved into 'Connect with me' above to display side-by-side */}

            {/* Quick Cards removed as requested */}

          </div>
        </div>
      </section>

      {/* ACHIEVEMENTS SECTION */}
      <section id="achievements" className="py-24 bg-[#0A0A0A] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <p className="text-[#FFD60A] font-bold text-xs uppercase tracking-widest mb-3">MILESTONES</p>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white">Achievement Highlights</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="p-6 rounded-2xl glass-card border border-white/5 flex flex-col justify-between h-48">
              <div className="w-12 h-12 rounded-xl bg-[#FFD60A]/10 flex items-center justify-center mb-4">
                <GraduationCap className="text-[#FFD60A]" size={24} />
              </div>
              <div>
                <h3 className="text-2xl font-black text-white">8.6 CGPA</h3>
                <p className="text-sm font-semibold text-gray-300 mt-1">B.Tech Engineering</p>
                <p className="text-xs text-gray-500 mt-2"></p>
              </div>
            </div>

            {/* Intermediate percentage removed per requirements */}

            <div className="p-6 rounded-2xl glass-card border border-white/5 flex flex-col justify-between h-48">
              <div className="w-12 h-12 rounded-xl bg-[#FFD60A]/10 flex items-center justify-center mb-4">
                <Briefcase className="text-[#FFD60A]" size={24} />
              </div>
              <div>
                <h3 className="text-lg font-black text-white leading-tight">ML Internship</h3>
                <p className="text-sm font-semibold text-gray-300 mt-1">Bluestock FinTech</p>
                <p className="text-xs text-gray-500 mt-2">Developed software model integration</p>
              </div>
            </div>

            <div className="p-6 rounded-2xl glass-card border border-white/5 flex flex-col justify-between h-48">
              <div className="w-12 h-12 rounded-xl bg-[#FFD60A]/10 flex items-center justify-center mb-4">
                <Sparkles className="text-[#FFD60A]" size={24} />
              </div>
              <div>
                <h3 className="text-lg font-black text-white leading-tight">AI Agent Dev</h3>
                <p className="text-sm font-semibold text-gray-300 mt-1">Lyzr Certifications</p>
                <p className="text-xs text-gray-500 mt-2">Constructed multi-agent workflows</p>
              </div>
            </div>

            <div className="p-6 rounded-2xl glass-card border border-white/5 flex flex-col justify-between h-48">
              <div className="w-12 h-12 rounded-xl bg-[#FFD60A]/10 flex items-center justify-center mb-4">
                <Code2 className="text-[#FFD60A]" size={24} />
              </div>
              <div>
                <h3 className="text-lg font-black text-white leading-tight">Multiple AI Projects</h3>
                <p className="text-sm font-semibold text-gray-300 mt-1">SkyScan AI, NLP Agents</p>
                <p className="text-xs text-gray-500 mt-2">Designed and deployed custom networks</p>
              </div>
            </div>

            <div className="p-6 rounded-2xl glass-card border border-white/5 flex flex-col justify-between h-48">
              <div className="w-12 h-12 rounded-xl bg-[#FFD60A]/10 flex items-center justify-center mb-4">
                <Layers className="text-[#FFD60A]" size={24} />
              </div>
              <div>
                <h3 className="text-lg font-black text-white leading-tight">Hackathon Competitor</h3>
                <p className="text-sm font-semibold text-gray-300 mt-1">ISRO, Agentathon</p>
                <p className="text-xs text-gray-500 mt-2">Delivered models under short timelines</p>
              </div>
            </div>

            <div className="p-6 rounded-2xl glass-card border border-white/5 flex flex-col justify-between h-48">
              <div className="w-12 h-12 rounded-xl bg-[#FFD60A]/10 flex items-center justify-center mb-4">
                <MapPin className="text-[#FFD60A]" size={24} />
              </div>
              <div>
                <h3 className="text-lg font-black text-white leading-tight">Computer Vision</h3>
                <p className="text-sm font-semibold text-gray-300 mt-1">Image Segmentation</p>
                <p className="text-xs text-gray-500 mt-2">CNNs, U-Net, & OpenCV frameworks</p>
              </div>
            </div>

            <div className="p-6 rounded-2xl glass-card border border-white/5 flex flex-col justify-between h-48">
              <div className="w-12 h-12 rounded-xl bg-[#FFD60A]/10 flex items-center justify-center mb-4">
                <CheckCircle2 className="text-[#FFD60A]" size={24} />
              </div>
              <div>
                <h3 className="text-lg font-black text-white leading-tight">Generative AI Dev</h3>
                <p className="text-sm font-semibold text-gray-300 mt-1">Retrieval Augmented Dev</p>
                <p className="text-xs text-gray-500 mt-2">Custom RAG architectures & parameters</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SKILLS SECTION */}
      <section id="skills" className="py-24 bg-[#121212] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <p className="text-[#FFD60A] font-bold text-xs uppercase tracking-widest mb-3">EXPERTISE</p>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white">Skills & Toolkit</h2>
          </div>

          {/* Categories Tab Navigation */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {skillCategories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveSkillTab(cat)}
                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold tracking-wide uppercase transition-all duration-300 ${
                  activeSkillTab === cat
                    ? 'bg-[#FFD60A] text-[#0A0A0A] shadow-[0_0_15px_rgba(255,214,10,0.3)]'
                    : 'bg-[#0A0A0A]/40 text-gray-400 border border-white/5 hover:border-[#FFD60A]/30 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Skills Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.keys(groupedSkills)
              .filter(cat => activeSkillTab === 'All' || activeSkillTab === cat)
              .map(cat => (
                <div key={cat} className="p-6 rounded-2xl glass-card border border-white/5 transition-all duration-300">
                  <h4 className="text-md font-semibold text-white mb-3">{cat}</h4>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {groupedSkills[cat].map(skillName => (
                      <span key={skillName} className="text-xs px-3 py-1 bg-[#0A0A0A] rounded-md border border-white/5 text-gray-300">
                        {skillName}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* RECENT PROJECTS SECTION */}
      <section id="projects" className="py-24 bg-[#0A0A0A] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-20">
            <p className="text-[#FFD60A] font-bold text-xs uppercase tracking-widest mb-3">PORTFOLIO</p>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white">Recent Projects</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            
            {/* Project 1: SkyScan AI */}
            <div className="p-8 rounded-3xl glass-card flex flex-col justify-between hover:border-[#FFD60A]/30 transition-all duration-300">
              <div>
                <div className="flex justify-between items-start mb-6">
                  <span className="px-3 py-1 bg-[#FFD60A]/10 border border-[#FFD60A]/20 text-[#FFD60A] text-xs font-bold uppercase tracking-wider rounded-full">
                    Featured
                  </span>
                  <div className="flex gap-2">
                    <span className="text-xs text-gray-400 font-mono"></span>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">SkyScan AI</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  A state-of-the-art sky and cloud classification pipeline. Trains high-accuracy convolutional neural networks (CNNs) for cloud clustering, meteorological evaluations, and drone flight navigation safety parameters.
                </p>
                <div className="flex flex-wrap gap-2 mb-8">
                  <span className="text-xs px-3 py-1 bg-[#0A0A0A] rounded-md border border-white/5 text-gray-300">PyTorch</span>
                  <span className="text-xs px-3 py-1 bg-[#0A0A0A] rounded-md border border-white/5 text-gray-300">OpenCV</span>
                  <span className="text-xs px-3 py-1 bg-[#0A0A0A] rounded-md border border-white/5 text-gray-300">CNN</span>
                  <span className="text-xs px-3 py-1 bg-[#0A0A0A] rounded-md border border-white/5 text-gray-300">ResNet</span>
                </div>
              </div>
              <div className="flex items-center justify-between border-t border-white/5 pt-6 mt-auto">
                <span className="text-xs text-gray-500 font-mono">Dataset: 12k sky frames</span>
                <a href="#" className="text-[#FFD60A] text-sm font-semibold hover:text-[#FFB700] flex items-center gap-1">
                </a>
              </div>
            </div>

            {/* Project 2: Multilingual NLP Agent */}
            <div className="p-8 rounded-3xl glass-card flex flex-col justify-between hover:border-[#FFD60A]/30 transition-all duration-300">
              <div>
                <div className="flex justify-between items-start mb-6">
                  <span className="px-3 py-1 bg-[#FFD60A]/10 border border-[#FFD60A]/20 text-[#FFD60A] text-xs font-bold uppercase tracking-wider rounded-full">
                    AI Agentic
                  </span>
                  <div className="flex gap-2">
                    <span className="text-xs text-gray-400 font-mono"></span>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Multilingual NLP Agent</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  Developed an intelligent agent system utilizing LLMs for multi-language document translation, context summarization, and key parameter extraction. Implements retrieval structures (RAG) to process documentation.
                </p>
                <div className="flex flex-wrap gap-2 mb-8">
                  <span className="text-xs px-3 py-1 bg-[#0A0A0A] rounded-md border border-white/5 text-gray-300">Hugging Face</span>
                  <span className="text-xs px-3 py-1 bg-[#0A0A0A] rounded-md border border-white/5 text-gray-300">Lyzr AI</span>
                  <span className="text-xs px-3 py-1 bg-[#0A0A0A] rounded-md border border-white/5 text-gray-300">Python</span>
                  <span className="text-xs px-3 py-1 bg-[#0A0A0A] rounded-md border border-white/5 text-gray-300">LangChain</span>
                </div>
              </div>
              <div className="flex items-center justify-between border-t border-white/5 pt-6 mt-auto">
                <span className="text-xs text-gray-500 font-mono">Lang Support: 8+ Languages</span>
                <a href="#" className="text-[#FFD60A] text-sm font-semibold hover:text-[#FFB700] flex items-center gap-1">
                </a>
              </div>
            </div>

            {/* Project 3: U-Net Satellite Image Segmenter */}
            <div className="p-8 rounded-3xl glass-card flex flex-col justify-between hover:border-[#FFD60A]/30 transition-all duration-300">
              <div>
                <div className="flex justify-between items-start mb-6">
                  <span className="px-3 py-1 bg-[#FFD60A]/10 border border-[#FFD60A]/20 text-[#FFD60A] text-xs font-bold uppercase tracking-wider rounded-full">
                    Computer Vision
                  </span>
                  <div className="flex gap-2">
                    <span className="text-xs text-gray-400 font-mono"></span>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Satellite Image Segmenter</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  Custom high-resolution landscape segmentation framework based on a modified U-Net encoder-decoder network. Performs pixel-level land division mappings to detect environmental changes over time.
                </p>
                <div className="flex flex-wrap gap-2 mb-8">
                  <span className="text-xs px-3 py-1 bg-[#0A0A0A] rounded-md border border-white/5 text-gray-300">TensorFlow</span>
                  <span className="text-xs px-3 py-1 bg-[#0A0A0A] rounded-md border border-white/5 text-gray-300">U-Net</span>
                  <span className="text-xs px-3 py-1 bg-[#0A0A0A] rounded-md border border-white/5 text-gray-300">CNN</span>
                  <span className="text-xs px-3 py-1 bg-[#0A0A0A] rounded-md border border-white/5 text-gray-300">Keras</span>
                </div>
              </div>
              <div className="flex items-center justify-between border-t border-white/5 pt-6 mt-auto">
                <span className="text-xs text-gray-500 font-mono">Training Epochs: 50</span>
                <a href="#" className="text-[#FFD60A] text-sm font-semibold hover:text-[#FFB700] flex items-center gap-1">
                </a>
              </div>
            </div>

            {/* Project 4: AI Model Diagnostics Dashboard */}
            <div className="p-8 rounded-3xl glass-card flex flex-col justify-between hover:border-[#FFD60A]/30 transition-all duration-300">
              <div>
                <div className="flex justify-between items-start mb-6">
                  <span className="px-3 py-1 bg-[#FFD60A]/10 border border-[#FFD60A]/20 text-[#FFD60A] text-xs font-bold uppercase tracking-wider rounded-full">
                    Full-Stack AI
                  </span>
                  <div className="flex gap-2">
                    <span className="text-xs text-gray-400 font-mono"></span>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Diagnostics Dashboard</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  A developer-friendly diagnostic interface. Connects backend AI models with React dashboards to display loss rates, GPU loads, batch queues, training times, and prediction confidence rates in real time.
                </p>
                <div className="flex flex-wrap gap-2 mb-8">
                  <span className="text-xs px-3 py-1 bg-[#0A0A0A] rounded-md border border-white/5 text-gray-300">React</span>
                  <span className="text-xs px-3 py-1 bg-[#0A0A0A] rounded-md border border-white/5 text-gray-300">Node.js</span>
                  <span className="text-xs px-3 py-1 bg-[#0A0A0A] rounded-md border border-white/5 text-gray-300">Express</span>
                  <span className="text-xs px-3 py-1 bg-[#0A0A0A] rounded-md border border-white/5 text-gray-300">Socket.io</span>
                </div>
              </div>
              <div className="flex items-center justify-between border-t border-white/5 pt-6 mt-auto">
                <span className="text-xs text-gray-500 font-mono">Socket updates: 60Hz</span>
                <a href="#" className="text-[#FFD60A] text-sm font-semibold hover:text-[#FFB700] flex items-center gap-1">
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* DYNAMIC CERTIFICATIONS SECTION */}
      <section id="certifications" className="py-24 bg-[#121212] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="text-center mb-16">
            <p className="text-[#FFD60A] font-bold text-xs uppercase tracking-widest mb-3">ACCREDITATIONS</p>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Certifications</h2>
            <p className="text-gray-400 text-md max-w-xl mx-auto">
              Automatically scanned credentials representing skill pathways in networks, programming languages, databases, cloud systems, and artificial intelligence models.
            </p>
          </div>

          {/* Stats Dashboard */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-12">
            <div className="p-4 rounded-xl bg-[#0A0A0A]/60 border border-white/5 text-center">
              <span className="text-2xl font-extrabold text-[#FFD60A]">{certStats.total}</span>
              <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Total</p>
            </div>
            <div className="p-4 rounded-xl bg-[#0A0A0A]/60 border border-white/5 text-center">
              <span className="text-2xl font-extrabold text-white">{certStats.cisco}</span>
              <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Cisco</p>
            </div>
            <div className="p-4 rounded-xl bg-[#0A0A0A]/60 border border-white/5 text-center">
              <span className="text-2xl font-extrabold text-white">{certStats.oracle}</span>
              <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Oracle</p>
            </div>
            <div className="p-4 rounded-xl bg-[#0A0A0A]/60 border border-white/5 text-center">
              <span className="text-2xl font-extrabold text-white">{certStats.gfg}</span>
              <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">GFG</p>
            </div>
            <div className="p-4 rounded-xl bg-[#0A0A0A]/60 border border-white/5 text-center">
              <span className="text-2xl font-extrabold text-white">{certStats.ibm}</span>
              <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">IBM</p>
            </div>
            <div className="p-4 rounded-xl bg-[#0A0A0A]/60 border border-white/5 text-center">
              <span className="text-2xl font-extrabold text-white">{certStats.infosys}</span>
              <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Infosys</p>
            </div>
          </div>

          {/* Search and Category Tabs */}
          <div className="flex flex-col lg:flex-row gap-6 justify-between items-center mb-10 pb-4 border-b border-white/5">
            {/* Search Input */}
            <div className="relative w-full lg:w-96">
              <input 
                type="text" 
                placeholder="Search certificates by title or issuer..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setVisibleCount(8); // Reset pagination on search
                }}
                className="w-full px-5 py-3.5 pl-12 rounded-xl bg-[#0A0A0A]/85 border border-white/5 focus:border-[#FFD60A]/40 outline-none text-white text-sm transition-all placeholder:text-gray-500"
              />
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-2 w-full lg:w-auto justify-start lg:justify-end">
              {['All', 'Cisco', 'Oracle', 'IBM', 'GFG', 'Infosys', 'Hackathons', 'Other'].map(cat => (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setVisibleCount(8); // Reset pagination on filter
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
                    selectedCategory === cat 
                      ? 'bg-[#FFD60A]/10 border border-[#FFD60A]/40 text-[#FFD60A]'
                      : 'bg-transparent border border-white/5 text-gray-400 hover:text-white hover:border-white/10'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Grid Layout */}
          {filteredCertificates.length > 0 ? (
            <div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredCertificates.slice(0, visibleCount).map((cert, idx) => (
                  <div 
                    key={idx}
                    className="p-6 rounded-2xl glass-card flex flex-col justify-between h-[230px] border border-white/5 hover:border-[#FFD60A]/20 transition-all duration-300"
                  >
                    <div>
                      <div className="flex justify-between items-start gap-2 mb-3">
                        <span className="text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider bg-white/5 border border-white/10 text-gray-400">
                          {cert.category}
                        </span>
                        <span className="text-xs text-gray-500 font-mono font-medium">{cert.year}</span>
                      </div>
                      <h3 className="text-md font-bold text-white leading-tight line-clamp-3 mb-2">{cert.title}</h3>
                      <p className="text-xs text-gray-400 font-medium mb-4">{cert.issuer}</p>
                    </div>
                    
                    <div className="flex gap-2.5 mt-auto pt-4 border-t border-white/5">
                      <button 
                        onClick={() => setPreviewFile(cert)}
                        className="flex-1 py-2 rounded-lg bg-white/[0.04] text-white hover:bg-white/[0.08] hover:text-[#FFD60A] text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors border border-white/5"
                      >
                        <FileText size={14} />
                        Preview
                      </button>
                      <a 
                        href={cert.filePath}
                        download
                        className="p-2 rounded-lg bg-white/[0.04] hover:bg-[#FFD60A]/10 text-gray-400 hover:text-[#FFD60A] transition-colors border border-white/5"
                        title="Download Certificate"
                      >
                        <Download size={14} />
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              {/* Show More Button */}
              {filteredCertificates.length > visibleCount && (
                <div className="flex justify-center mt-12">
                  <button 
                    onClick={() => setVisibleCount(prev => prev + 8)}
                    className="px-6 py-3 bg-[#FFD60A] text-[#0A0A0A] hover:bg-[#FFB700] font-bold rounded-xl text-sm transition-all duration-200 shadow-md hover:shadow-[0_0_15px_rgba(255,214,10,0.3)]"
                  >
                    Load More Certificates ({filteredCertificates.length - visibleCount} remaining)
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-16 bg-[#0A0A0A]/40 rounded-2xl border border-dashed border-white/10">
              <BookOpen size={48} className="text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 font-semibold text-lg">No certificates found</p>
              <p className="text-gray-500 text-sm mt-1">Try modifying your search query or filter settings.</p>
            </div>
          )}

        </div>
      </section>

      {/* RESUME INTEGRATION SECTION */}
      <section id="resume" className="py-24 bg-[#0A0A0A] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="text-center mb-16">
            <p className="text-[#FFD60A] font-bold text-xs uppercase tracking-widest mb-3">CURRICULUM VITAE</p>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white">Resume & Timelines</h2>
          </div>

          <div className="grid lg:grid-cols-12 gap-12 items-stretch">
            
            {/* Timeline (Left Column) */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-12">
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-8">
                  <GraduationCap className="text-[#FFD60A]" size={22} />
                  Education Timeline
                </h3>

                <div className="relative border-l border-white/10 pl-6 space-y-8 ml-3">
                  
                  {/* Ed Item 1 */}
                  <div className="relative">
                    <div className="absolute -left-[31px] top-1.5 w-4.5 h-4.5 rounded-full bg-[#FFD60A] border-4 border-[#0A0A0A] shadow-[0_0_8px_rgba(255,214,10,0.8)]" />
                    <span className="text-xs font-bold font-mono text-[#FFD60A] bg-[#FFD60A]/10 px-2.5 py-0.5 rounded-full border border-[#FFD60A]/20">
                      2023 - 2027 (Expected)
                    </span>
                    <h4 className="text-lg font-bold text-white mt-3 leading-tight">
                      B.Tech in Computer Science and Engineering 
                    </h4>
                    <p className="text-sm font-semibold text-gray-400 mt-1">Malla Reddy Engineering College for Women / Engineering Institute</p>
                    <p className="text-xs text-gray-500 mt-2">
                      Core focus: Artificial Intelligence, Deep Learning models, Neural Architectures, Computations, and Algorithms. CGPA: 8.6.
                    </p>
                  </div>

                  {/* Ed Item 2 */}
                  <div className="relative">
                    <div className="absolute -left-[31px] top-1.5 w-4.5 h-4.5 rounded-full bg-[#FFD60A] border-4 border-[#0A0A0A]" />
                    <span className="text-xs font-bold font-mono text-gray-400 bg-white/5 px-2.5 py-0.5 rounded-full border border-white/5">
                      2021 - 2023
                    </span>
                    <h4 className="text-lg font-bold text-white mt-3 leading-tight">
                      Intermediate Board of Education
                    </h4>
                    <p className="text-sm font-semibold text-gray-400 mt-1">MPC stream (Maths, Physics, Chemistry)</p>
                    <p className="text-xs text-gray-500 mt-2">
                      Intermediate (MPC stream) completed.
                    </p>
                  </div>

                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-8 mt-4">
                  <Briefcase className="text-[#FFD60A]" size={22} />
                  Professional Experience
                </h3>

                <div className="relative border-l border-white/10 pl-6 space-y-8 ml-3">
                  
                  {/* Exp Item 1 */}
                  <div className="relative">
                    <div className="absolute -left-[31px] top-1.5 w-4.5 h-4.5 rounded-full bg-[#FFD60A] border-4 border-[#0A0A0A] shadow-[0_0_8px_rgba(255,214,10,0.8)]" />
                    <span className="text-xs font-bold font-mono text-[#FFD60A] bg-[#FFD60A]/10 px-2.5 py-0.5 rounded-full border border-[#FFD60A]/20">
                      2024
                    </span>
                    <h4 className="text-lg font-bold text-white mt-3 leading-tight">
                      Machine Learning Engineering Intern
                    </h4>
                    <p className="text-sm font-semibold text-gray-400 mt-1">BlueStock FinTech</p>
                    <p className="text-xs text-gray-500 mt-2">
                      Engineered algorithms for data prediction, structured finance API feeds, evaluated model performance matrices, and integrated backend services.
                    </p>
                  </div>

                  {/* Exp Item 2 */}
                  <div className="relative">
                    <div className="absolute -left-[31px] top-1.5 w-4.5 h-4.5 rounded-full bg-[#FFD60A] border-4 border-[#0A0A0A]" />
                    <span className="text-xs font-bold font-mono text-gray-400 bg-white/5 px-2.5 py-0.5 rounded-full border border-white/5">
                      2023 - Present
                    </span>
                    <h4 className="text-lg font-bold text-white mt-3 leading-tight">
                      AI Agent Developer & Hackathon Competitor
                    </h4>
                    <p className="text-sm font-semibold text-gray-400 mt-1">Autonomous Projects / Competitions</p>
                    <p className="text-xs text-gray-500 mt-2">
                      Constructed conversational agent frameworks using Lyzr SDKs. Competed in multiple regional and global hackathons (e.g. Agentathon, ISRO Hackathon, GFG challenges).
                    </p>
                  </div>

                </div>
              </div>
            </div>

            {/* Resume Preview Box (Right Column) */}
            <div className="lg:col-span-6 flex flex-col justify-between">
              <div className="p-8 rounded-3xl glass-card flex flex-col justify-between h-full border border-white/5 hover:border-[#FFD60A]/20 transition-all duration-300">
                <div>
                  <h3 className="text-xl font-bold text-white mb-6">Interactive Resume Dashboard</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-6">
                    A direct summary of core credentials. Access the primary PDF resume generated for recruiter sharing and job matches.
                  </p>

                  <div className="p-6 rounded-2xl bg-[#0A0A0A]/85 border border-white/5 mb-8 space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Candidate Name</span>
                      <span className="text-sm font-bold text-white">Shaista Naaz</span>
                    </div>
                    <div className="flex justify-between items-center border-t border-white/5 pt-3">
                      <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Target Role</span>
                      <span className="text-sm font-bold text-[#FFD60A]">AI/ML Engineer</span>
                    </div>
                    <div className="flex justify-between items-center border-t border-white/5 pt-3">
                      <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Core Frameworks</span>
                      <span className="text-sm font-bold text-white">PyTorch, TensorFlow, OpenCV</span>
                    </div>
                    <div className="flex justify-between items-center border-t border-white/5 pt-3">
                      <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Education Level</span>
                      <span className="text-sm font-bold text-white">B.Tech Final Year Student</span>
                    </div>
                  </div>
                </div>

                {/* PDF Viewer Mock / Document preview button */}
                <div className="space-y-4">
                  <div className="h-44 rounded-2xl bg-[#0A0A0A]/40 border border-white/5 flex flex-col items-center justify-center text-center p-6">
                    <FileText size={40} className="text-[#FFD60A]/40 mb-3" />
                    <span className="text-xs text-gray-400 font-medium">Resume_26.pdf (Indexed)</span>
                    <button 
                      onClick={() => setPreviewFile({
                        fileName: 'resume.pdf',
                        filePath: '/resume.pdf',
                        title: 'Shaista Naaz - Professional Resume',
                        issuer: 'Curriculum Vitae',
                        year: '2026',
                        category: 'Resume'
                      })}
                      className="text-xs text-[#FFD60A] hover:underline mt-2 flex items-center gap-1 font-semibold"
                    >
                      Quick Preview Document <ExternalLink size={12} />
                    </button>
                  </div>

                  <div className="flex gap-4">
                    <a 
                      href={`${import.meta.env.BASE_URL}resume.pdf`}
                      download
                      className="flex-1 py-4 bg-[#FFD60A] hover:bg-[#FFB700] text-[#0A0A0A] font-bold rounded-xl text-center flex items-center justify-center gap-2 shadow-md transition-all duration-200"
                    >
                      <Download size={18} />
                      Download Resume PDF
                    </a>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* GET IN TOUCH / CONTACT SECTION */}
      <section id="contact" className="py-24 bg-[#121212] relative overflow-hidden border-b border-white/5">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#FFD60A]/3 rounded-full filter blur-[120px] pointer-events-none" />
        
        <div className="relative max-w-4xl mx-auto px-6 text-center z-10">
          <p className="text-[#FFD60A] font-bold text-xs uppercase tracking-widest mb-4">GET IN TOUCH</p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">Let's Connect & Collaborate</h2>
          <p className="text-gray-400 text-lg mb-12 max-w-xl mx-auto leading-relaxed">
            I am actively seeking internship opportunities, hackathon teams, and networking collaborations. Drop me a line or link up!
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a 
              href="mailto:shaistanaaz1106@gmail.com"
              className="flex items-center gap-3 px-8 py-5 bg-[#FFD60A] hover:bg-[#FFB700] text-[#0A0A0A] rounded-xl font-bold shadow-lg transition-all duration-300 hover:scale-105"
            >
              <Mail size={22} />
              shaistanaaz1106@gmail.com
            </a>
            
            <div className="flex gap-4">
              <a
                href="https://github.com/shaistanaaz8"
                target="_blank"
                rel="noopener noreferrer"
                className="p-5 bg-white/[0.03] border border-white/5 hover:border-[#FFD60A]/30 rounded-xl hover:bg-[#FFD60A]/10 hover:scale-105 transition-all duration-300"
                title="GitHub"
              >
                <Github size={22} className="text-gray-300 hover:text-[#FFD60A]" />
              </a>
              <a
                href="https://www.linkedin.com/in/shaista-naaz-202499335/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-5 bg-white/[0.03] border border-white/5 hover:border-[#FFD60A]/30 rounded-xl hover:bg-[#FFD60A]/10 hover:scale-105 transition-all duration-300"
                title="LinkedIn"
              >
                <Linkedin size={22} className="text-gray-300 hover:text-[#FFD60A]" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0A0A0A] py-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <span className="text-md font-bold tracking-wider text-white">SHAISTA NAAZ</span>
            <p className="text-xs text-gray-500 mt-1.5">© {new Date().getFullYear()} Shaista Naaz. Developed with React & Tailwind.</p>
          </div>
          <div className="flex gap-6 text-sm">
            <a href="#about" className="text-gray-500 hover:text-[#FFD60A] transition-colors">About</a>
            <a href="#skills" className="text-gray-500 hover:text-[#FFD60A] transition-colors">Skills</a>
            <a href="#projects" className="text-gray-500 hover:text-[#FFD60A] transition-colors">Projects</a>
            <a href="#certifications" className="text-gray-500 hover:text-[#FFD60A] transition-colors">Certificates</a>
          </div>
        </div>
      </footer>

      {/* INTERACTIVE FULLSCREEN MODAL PREVIEW OVERLAY */}
      {previewFile && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md transition-opacity">
          <div className="relative w-full max-w-4xl bg-[#121212] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
            
            {/* Modal Header */}
            <div className="flex justify-between items-center px-6 py-4 border-b border-white/5 bg-[#0A0A0A]/50">
              <div>
                <h3 className="text-md font-bold text-white leading-tight">{previewFile.title}</h3>
                <p className="text-xs text-gray-400 mt-0.5">{previewFile.issuer} • {previewFile.year}</p>
              </div>
              <div className="flex items-center gap-3">
                <a 
                  href={previewFile.filePath} 
                  download
                  className="p-2 rounded-lg bg-white/[0.03] hover:bg-[#FFD60A]/10 text-gray-400 hover:text-[#FFD60A] transition-all border border-white/5"
                  title="Download File"
                >
                  <Download size={16} />
                </a>
                <button 
                  onClick={() => setPreviewFile(null)}
                  className="p-2 rounded-lg bg-white/[0.03] hover:bg-red-500/10 text-gray-400 hover:text-red-500 transition-all border border-white/5"
                  title="Close Preview"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Modal Body (Embedded content) */}
            <div className="p-6 bg-[#0A0A0A]/20 flex items-center justify-center min-h-[50vh]">
              {previewFile.filePath.toLowerCase().endsWith('.pdf') ? (
                <iframe 
                  src={previewFile.filePath} 
                  className="w-full h-[65vh] rounded-lg border border-white/5 bg-black" 
                  title={previewFile.title}
                />
              ) : (
                <img 
                  src={previewFile.filePath} 
                  className="max-w-full max-h-[65vh] object-contain rounded-lg shadow-xl" 
                  alt={previewFile.title}
                />
              )}
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-white/5 bg-[#0A0A0A]/50 flex justify-end">
              <button 
                onClick={() => setPreviewFile(null)}
                className="px-5 py-2 rounded-xl bg-white/[0.03] border border-white/5 hover:border-white/10 hover:bg-white/[0.05] text-white text-xs font-semibold tracking-wider transition-all uppercase"
              >
                Close Preview
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}

export default App;
