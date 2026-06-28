import { useEffect, useRef, useState } from 'react';
import {
  Trophy,
  GraduationCap,
  Gamepad2,
  Instagram,
  ChevronDown,
  MapPin,
  Calendar,
  Star,
  Award,
  Users,
  Smartphone,
  Monitor,
  Swords,
  Menu,
  X,
} from 'lucide-react';
/* @vite-ignore */
const profileImageSrc = new URL('./assets/image.png', import.meta.url).href;

function useIntersection(options?: IntersectionObserverInit) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.15, ...options });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const links = [
    { href: '#about', label: 'Tentang' },
    { href: '#education', label: 'Pendidikan' },
    { href: '#achievements', label: 'Prestasi' },
    { href: '#hobbies', label: 'Hobi' },
    { href: '#contact', label: 'Kontak' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg shadow-blue-900/10'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <a
          href="#hero"
          className={`font-bold text-lg tracking-tight transition-colors duration-300 ${
            scrolled ? 'text-blue-900' : 'text-white'
          }`}
        >
          MA<span className={`${scrolled ? 'text-blue-500' : 'text-blue-300'}`}>MR</span>
        </a>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className={`text-sm font-medium nav-link transition-colors duration-200 ${
                  scrolled ? 'text-slate-700 hover:text-blue-600' : 'text-blue-100 hover:text-white'
                }`}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          className={`md:hidden transition-colors ${scrolled ? 'text-blue-900' : 'text-white'}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white/98 backdrop-blur-md border-t border-blue-100 px-6 py-4">
          <ul className="flex flex-col gap-4">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="text-slate-700 font-medium hover:text-blue-600 transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}

function ProfileAvatar() {
  const [imgError, setImgError] = useState(false);
  return imgError ? (
    <div className="w-full h-full bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center">
      <span className="text-white font-bold text-4xl tracking-tight">MA</span>
    </div>
  ) : (
    <img
      src={profileImageSrc}
      alt="Muhammad Agil Marwan Rahman"
      className="w-full h-full object-cover object-top"
      onError={() => setImgError(true)}
    />
  );
}

function HeroSection() {
  return (
    <section
      id="hero"
      className="hero-gradient min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Decorative orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-300/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-800/20 rounded-full blur-3xl pointer-events-none" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-5"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-24 flex flex-col items-center text-center">
        {/* Profile photo */}
        <div className="mb-8 float-animation">
          <div className="relative">
            <div className="w-40 h-40 md:w-52 md:h-52 rounded-full overflow-hidden border-4 border-white/30 pulse-ring shadow-2xl shadow-blue-900/50">
              <ProfileAvatar />
            </div>
            <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center shadow-lg">
              <Star size={18} className="text-white fill-white" />
            </div>
          </div>
        </div>

        {/* Name */}
        <div className="animate-fade-up" style={{ animationDelay: '0.1s' }}>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-3 leading-tight tracking-tight">
            Muhammad Agil
            <br />
            <span className="text-blue-300">Marwan Rahman</span>
          </h1>
        </div>

        {/* Title badge */}
        <div className="animate-fade-up mt-4" style={{ animationDelay: '0.25s' }}>
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2 text-blue-100 text-sm font-medium">
            <GraduationCap size={16} />
            Mahasiswa Teknik Informatika
            <span className="text-blue-300">|</span>
            <Gamepad2 size={16} />
            Gamer
            <span className="text-blue-300">|</span>
            <Trophy size={16} />
            Achiever
          </div>
        </div>

        {/* Tagline */}
        <div className="animate-fade-up mt-6" style={{ animationDelay: '0.4s' }}>
          <p className="text-blue-100/80 text-lg md:text-xl max-w-xl leading-relaxed">
            Menggabungkan semangat teknologi, jiwa kompetitif, dan dedikasi tinggi untuk meraih prestasi terbaik.
          </p>
        </div>

        {/* CTA */}
        <div className="animate-fade-up mt-10 flex flex-col sm:flex-row gap-4" style={{ animationDelay: '0.55s' }}>
          <a
            href="#about"
            className="inline-flex items-center gap-2 bg-white text-blue-900 font-semibold px-8 py-3 rounded-full hover:bg-blue-50 transition-all duration-300 shadow-lg shadow-blue-900/30 hover:shadow-xl hover:shadow-blue-900/40 hover:-translate-y-0.5"
          >
            Kenali Saya
            <ChevronDown size={18} />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-transparent border-2 border-white/30 text-white font-semibold px-8 py-3 rounded-full hover:bg-white/10 transition-all duration-300 hover:-translate-y-0.5"
          >
            <Instagram size={18} />
            Hubungi Saya
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown size={28} className="text-white/50" />
      </div>
    </section>
  );
}

function AboutSection() {
  const { ref, isVisible } = useIntersection();

  const stats = [
    { value: '2005', label: 'Tahun Lahir', icon: <Calendar size={20} /> },
    { value: 'Kendari', label: 'Asal Kota', icon: <MapPin size={20} /> },
    { value: '2+', label: 'Prestasi Nasional', icon: <Trophy size={20} /> },
    { value: 'S1', label: 'Jenjang Studi', icon: <GraduationCap size={20} /> },
  ];

  return (
    <section id="about" className="py-24 section-gradient">
      <div className="max-w-6xl mx-auto px-6">
        <div
          ref={ref}
          className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          {/* Section header */}
          <div className="text-center mb-16">
            <span className="inline-block text-blue-600 font-semibold text-sm uppercase tracking-widest mb-3">
              Tentang Saya
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800">
              Siapa <span className="gradient-text">Muhammad Agil?</span>
            </h2>
            <div className="mt-4 w-16 h-1 bg-gradient-to-r from-blue-600 to-blue-300 rounded-full mx-auto" />
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left: Bio */}
            <div
              className={`transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}
            >
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-blue-100 rounded-2xl -z-10" />
                <div className="bg-white rounded-2xl p-8 shadow-xl shadow-blue-900/8 border border-blue-50">
                  <p className="text-slate-600 leading-relaxed mb-5 text-base">
                    Halo! Saya <strong className="text-blue-700">Muhammad Agil Marwan Rahman</strong>, seorang mahasiswa aktif di
                    Universitas Halu Oleo, Kendari, yang sedang menempuh pendidikan di Jurusan{' '}
                    <strong className="text-blue-700">Teknik Informatika</strong>.
                  </p>
                  <p className="text-slate-600 leading-relaxed mb-5 text-base">
                    Lahir pada tahun <strong className="text-blue-700">2005</strong> di Kendari, Sulawesi Tenggara, saya memiliki
                    semangat yang tinggi dalam dunia teknologi dan informatika. Setelah menyelesaikan
                    pendidikan menengah atas di <strong className="text-blue-700">SMA Negeri 2 Kendari</strong>, saya melanjutkan
                    perjalanan akademik di UHO untuk mendalami ilmu komputer dan informatika.
                  </p>
                  <p className="text-slate-600 leading-relaxed text-base">
                    Selain berprestasi di bidang akademik, saya juga aktif dalam kegiatan organisasi dan
                    dunia gaming kompetitif, membuktikan bahwa dedikasi dan kerja keras adalah kunci
                    keberhasilan di segala bidang.
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Stats */}
            <div
              className={`transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}
            >
              <div className="grid grid-cols-2 gap-4">
                {stats.map((s, i) => (
                  <div
                    key={i}
                    className="card-hover bg-white rounded-2xl p-6 shadow-lg shadow-blue-900/8 border border-blue-50 flex flex-col items-center text-center cursor-default"
                  >
                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-3">
                      {s.icon}
                    </div>
                    <div className="text-2xl font-bold text-blue-700 mb-1">{s.value}</div>
                    <div className="text-xs text-slate-500 font-medium">{s.label}</div>
                  </div>
                ))}
              </div>

              <div className="mt-6 bg-gradient-to-r from-blue-600 to-blue-400 rounded-2xl p-6 text-white">
                <div className="flex items-center gap-3 mb-3">
                  <Users size={20} className="text-blue-100" />
                  <span className="font-semibold text-sm">Aktif Berorganisasi</span>
                </div>
                <p className="text-blue-100 text-sm leading-relaxed">
                  Aktif dalam berbagai kegiatan organisasi kampus, mengembangkan jiwa kepemimpinan dan
                  kemampuan berkolaborasi bersama rekan-rekan.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function EducationSection() {
  const { ref, isVisible } = useIntersection();

  const timeline = [
    {
      period: '2020 – 2023',
      institution: 'SMA Negeri 2 Kendari',
      degree: 'Sekolah Menengah Atas',
      description:
        'Menyelesaikan pendidikan menengah atas dengan penuh semangat di salah satu sekolah unggulan di Kota Kendari, Sulawesi Tenggara.',
      status: 'Lulus',
      color: 'bg-blue-500',
      icon: <GraduationCap size={20} className="text-white" />,
    },
    {
      period: '2023 – Sekarang',
      institution: 'Universitas Halu Oleo',
      degree: 'S1 Teknik Informatika – Fakultas Teknik',
      description:
        'Sedang menempuh pendidikan sarjana di jurusan Teknik Informatika UHO, berfokus pada pengembangan software, algoritma, dan teknologi informasi.',
      status: 'Aktif',
      color: 'bg-blue-600',
      icon: <Star size={20} className="text-white fill-white" />,
    },
  ];

  return (
    <section id="education" className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <div
          ref={ref}
          className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div className="text-center mb-16">
            <span className="inline-block text-blue-600 font-semibold text-sm uppercase tracking-widest mb-3">
              Riwayat Pendidikan
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800">
              Perjalanan <span className="gradient-text">Akademik</span>
            </h2>
            <div className="mt-4 w-16 h-1 bg-gradient-to-r from-blue-600 to-blue-300 rounded-full mx-auto" />
          </div>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-blue-400 to-blue-200 rounded-full" />

            <div className="flex flex-col gap-10">
              {timeline.map((item, i) => (
                <div
                  key={i}
                  className={`flex gap-6 transition-all duration-700 ${
                    isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
                  }`}
                  style={{ transitionDelay: `${i * 200 + 200}ms` }}
                >
                  {/* Icon */}
                  <div className="relative flex-shrink-0">
                    <div className={`w-16 h-16 ${item.color} rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30 z-10 relative`}>
                      {item.icon}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 card-hover bg-white border border-blue-100 rounded-2xl p-6 shadow-lg shadow-blue-900/6">
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                      <div>
                        <h3 className="text-xl font-bold text-slate-800">{item.institution}</h3>
                        <p className="text-blue-600 font-medium text-sm mt-0.5">{item.degree}</p>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <span className="text-xs text-slate-400 font-medium bg-slate-50 px-3 py-1 rounded-full border border-slate-100">
                          {item.period}
                        </span>
                        <span
                          className={`text-xs font-semibold px-3 py-1 rounded-full ${
                            item.status === 'Aktif'
                              ? 'bg-green-50 text-green-600 border border-green-200'
                              : 'bg-blue-50 text-blue-600 border border-blue-200'
                          }`}
                        >
                          {item.status === 'Aktif' ? '● ' : ''}{item.status}
                        </span>
                      </div>
                    </div>
                    <p className="text-slate-500 text-sm leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function AchievementsSection() {
  const { ref, isVisible } = useIntersection();

  const achievements = [
    {
      rank: '🥇',
      title: 'Juara 1 FORKESTRA',
      subtitle: 'Forum Ekonomi Sulawesi Tenggara',
      year: '2024',
      description:
        'Meraih juara pertama dalam ajang FORKESTRA, kompetisi bergengsi tingkat Sulawesi Tenggara yang menguji kemampuan intelektual dan inovasi peserta.',
      color: 'from-yellow-400 to-amber-500',
      badge: 'Regional',
    },
    {
      rank: '🥇',
      title: 'Juara 1 LKTI Nasional FT UHO',
      subtitle: 'Lomba Karya Tulis Ilmiah Nasional',
      year: '2026',
      description:
        'Berhasil menjuarai Lomba Karya Tulis Ilmiah Nasional yang diselenggarakan oleh Fakultas Teknik Universitas Halu Oleo, mengalahkan peserta dari seluruh Indonesia.',
      color: 'from-blue-500 to-indigo-600',
      badge: 'Nasional',
    },
    {
      rank: '🎮',
      title: 'Kompetitor Mobile Game Tournament',
      subtitle: 'Turnamen Game Mobile Aktif',
      year: 'Ongoing',
      description:
        'Aktif berpartisipasi dan berkompetisi dalam berbagai turnamen game mobile, mengasah kemampuan strategi dan kerja tim dalam lingkungan kompetitif.',
      color: 'from-emerald-500 to-teal-600',
      badge: 'Gaming',
    },
    {
      rank: '⭐',
      title: 'Aktif Kegiatan Organisasi',
      subtitle: 'Kontribusi Kampus',
      year: 'Ongoing',
      description:
        'Berperan aktif dalam berbagai kegiatan dan organisasi kampus, membangun jaringan, kepemimpinan, dan kontribusi nyata bagi lingkungan akademik.',
      color: 'from-rose-500 to-pink-600',
      badge: 'Organisasi',
    },
  ];

  return (
    <section id="achievements" className="py-24 section-gradient">
      <div className="max-w-6xl mx-auto px-6">
        <div
          ref={ref}
          className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div className="text-center mb-16">
            <span className="inline-block text-blue-600 font-semibold text-sm uppercase tracking-widest mb-3">
              Prestasi & Pencapaian
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800">
              Ragam <span className="gradient-text">Kebanggaan</span>
            </h2>
            <div className="mt-4 w-16 h-1 bg-gradient-to-r from-blue-600 to-blue-300 rounded-full mx-auto" />
            <p className="mt-4 text-slate-500 max-w-xl mx-auto text-sm">
              Kumpulan pencapaian yang menjadi bukti nyata kerja keras, dedikasi, dan semangat tanpa henti.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {achievements.map((item, i) => (
              <div
                key={i}
                className={`card-hover bg-white rounded-2xl overflow-hidden shadow-lg shadow-blue-900/8 border border-blue-50 transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${i * 120 + 200}ms` }}
              >
                {/* Top gradient bar */}
                <div className={`h-1.5 bg-gradient-to-r ${item.color}`} />

                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-4xl">{item.rank}</div>
                    <div className="flex flex-col items-end gap-1">
                      <span className={`text-xs font-bold px-3 py-1 rounded-full bg-gradient-to-r ${item.color} text-white`}>
                        {item.badge}
                      </span>
                      <span className="text-xs text-slate-400 font-medium">{item.year}</span>
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 mb-1">{item.title}</h3>
                  <p className="text-blue-600 text-sm font-medium mb-3">{item.subtitle}</p>
                  <p className="text-slate-500 text-sm leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Summary badge */}
          <div className="mt-12 flex justify-center">
            <div className="inline-flex items-center gap-3 bg-blue-900 text-white px-8 py-4 rounded-2xl shadow-xl shadow-blue-900/30">
              <Award size={24} className="text-blue-300" />
              <div>
                <div className="font-bold text-lg">2 Juara Nasional & Regional</div>
                <div className="text-blue-200 text-xs">dan terus bertumbuh...</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HobbiesSection() {
  const { ref, isVisible } = useIntersection();

  const hobbies = [
    {
      icon: <Smartphone size={32} />,
      title: 'Mobile Gaming',
      description: 'Bermain dan berkompetisi dalam berbagai genre game mobile, dari MOBA hingga battle royale.',
      color: 'bg-blue-50 text-blue-600',
      accent: 'border-blue-200',
    },
    {
      icon: <Monitor size={32} />,
      title: 'Game PC & Console',
      description: 'Menikmati pengalaman gaming lintas platform dengan berbagai jenis permainan seru.',
      color: 'bg-indigo-50 text-indigo-600',
      accent: 'border-indigo-200',
    },
    {
      icon: <Swords size={32} />,
      title: 'Turnamen Kompetitif',
      description: 'Aktif mengikuti turnamen game mobile dan ajang esports di berbagai event lokal.',
      color: 'bg-emerald-50 text-emerald-600',
      accent: 'border-emerald-200',
    },
    {
      icon: <Users size={32} />,
      title: 'Komunitas & Organisasi',
      description: 'Berinteraksi aktif dalam komunitas gamer dan kegiatan organisasi kampus.',
      color: 'bg-rose-50 text-rose-600',
      accent: 'border-rose-200',
    },
    {
      icon: <Gamepad2 size={32} />,
      title: 'Berbagai Jenis Game',
      description: 'Tertarik pada berbagai genre: strategi, RPG, aksi — selalu siap untuk tantangan baru.',
      color: 'bg-amber-50 text-amber-600',
      accent: 'border-amber-200',
    },
    {
      icon: <Trophy size={32} />,
      title: 'Prestasi Kompetitif',
      description: 'Menjadikan gaming sebagai sarana mengasah mental juara, strategi, dan kerja tim.',
      color: 'bg-sky-50 text-sky-600',
      accent: 'border-sky-200',
    },
  ];

  return (
    <section id="hobbies" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div
          ref={ref}
          className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div className="text-center mb-16">
            <span className="inline-block text-blue-600 font-semibold text-sm uppercase tracking-widest mb-3">
              Hobi & Minat
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800">
              Passion <span className="gradient-text">Saya</span>
            </h2>
            <div className="mt-4 w-16 h-1 bg-gradient-to-r from-blue-600 to-blue-300 rounded-full mx-auto" />
          </div>

          {/* Gaming banner */}
          <div
            className={`mb-10 rounded-3xl overflow-hidden bg-gradient-to-r from-blue-900 to-blue-700 p-8 md:p-12 relative transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-4 right-4 w-48 h-48 bg-blue-300 rounded-full blur-3xl" />
              <div className="absolute bottom-4 left-4 w-32 h-32 bg-blue-100 rounded-full blur-2xl" />
            </div>
            <div className="relative flex flex-col md:flex-row items-center gap-6">
              <div className="flex-shrink-0 w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center border border-white/20">
                <Gamepad2 size={40} className="text-white" />
              </div>
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Gamer & Kompetitor</h3>
                <p className="text-blue-100 leading-relaxed max-w-2xl">
                  Gaming bukan sekadar hiburan — ini adalah passion yang melatih ketangkasan berpikir, strategi,
                  dan mentalitas juara. Aktif dalam berbagai turnamen mobile game dan terus mengasah kemampuan
                  di arena kompetitif.
                </p>
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {hobbies.map((h, i) => (
              <div
                key={i}
                className={`card-hover bg-white border ${h.accent} rounded-2xl p-6 shadow-md shadow-blue-900/5 transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${i * 80 + 300}ms` }}
              >
                <div className={`w-14 h-14 ${h.color} rounded-xl flex items-center justify-center mb-4`}>
                  {h.icon}
                </div>
                <h3 className="font-bold text-slate-800 mb-2">{h.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{h.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const { ref, isVisible } = useIntersection();

  return (
    <section id="contact" className="py-24 section-gradient">
      <div className="max-w-3xl mx-auto px-6">
        <div
          ref={ref}
          className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div className="text-center mb-16">
            <span className="inline-block text-blue-600 font-semibold text-sm uppercase tracking-widest mb-3">
              Hubungi Saya
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800">
              Let's <span className="gradient-text">Connect!</span>
            </h2>
            <div className="mt-4 w-16 h-1 bg-gradient-to-r from-blue-600 to-blue-300 rounded-full mx-auto" />
            <p className="mt-6 text-slate-500 text-base max-w-lg mx-auto leading-relaxed">
              Ingin berkolaborasi, berdiskusi, atau sekadar menyapa? Jangan ragu untuk terhubung dengan saya
              melalui media sosial di bawah ini!
            </p>
          </div>

          {/* Instagram Card */}
          <div
            className={`card-hover transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <a
              href="https://www.instagram.com/mhmmd_agilll?igsh=MWF0cXIzYXNlZDVzdQ%3D%3D&utm_source=qr"
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-white rounded-3xl shadow-xl shadow-blue-900/10 border border-blue-50 overflow-hidden group"
            >
              {/* Instagram gradient top bar */}
              <div className="h-2 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400" />

              <div className="p-8 flex flex-col sm:flex-row items-center gap-6">
                {/* Instagram icon */}
                <div className="flex-shrink-0 w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 flex items-center justify-center shadow-lg shadow-pink-500/30 group-hover:scale-110 transition-transform duration-300">
                  <Instagram size={36} className="text-white" />
                </div>

                <div className="flex-1 text-center sm:text-left">
                  <div className="text-xs text-slate-400 font-semibold uppercase tracking-widest mb-1">Instagram</div>
                  <div className="text-2xl font-bold text-slate-800 mb-1">@mhmmd_agilll</div>
                  <div className="text-slate-500 text-sm">Ikuti perjalanan dan aktivitas saya di Instagram</div>
                </div>

                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white shadow-md group-hover:translate-x-1 transition-transform duration-300">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </a>
          </div>

          {/* Info card */}
          <div
            className={`mt-6 bg-blue-900 rounded-2xl p-6 text-center transition-all duration-700 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <p className="text-blue-100 text-sm">
              Berbasis di <strong className="text-white">Kendari, Sulawesi Tenggara</strong> — Mahasiswa aktif yang
              siap berkolaborasi dan berkembang bersama!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <div className="text-2xl font-bold">
              <span className="text-white">MA</span>
              <span className="text-blue-400">MR</span>
            </div>
            <div className="text-slate-400 text-xs mt-1">Muhammad Agil Marwan Rahman</div>
          </div>

          <div className="flex items-center gap-6 text-sm text-slate-400">
            <a href="#about" className="hover:text-white transition-colors">Tentang</a>
            <a href="#education" className="hover:text-white transition-colors">Pendidikan</a>
            <a href="#achievements" className="hover:text-white transition-colors">Prestasi</a>
            <a href="#contact" className="hover:text-white transition-colors">Kontak</a>
          </div>

          <div className="text-slate-500 text-xs text-center">
            © {new Date().getFullYear()} Muhammad Agil Marwan Rahman.<br className="sm:hidden" /> All rights reserved.
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-slate-800 text-center">
          <p className="text-slate-600 text-xs">
            Built with <span className="text-blue-400">React</span> & <span className="text-blue-400">Tailwind CSS</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div className="font-poppins">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <EducationSection />
      <AchievementsSection />
      <HobbiesSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
