/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  X,
  Check,
  Car,
  Menu,
} from 'lucide-react';

const HERO_G63_IMG = '/src/assets/images/hero_lagos_luxury_suv_1794332219372.jpg';
const VIP_CABIN_IMG = '/src/assets/images/service_vip_interior_cabin_1794332220868.jpg';
const CERAMIC_SHIELD_IMG = '/src/assets/images/service_harmattan_ceramic_shield_1794332223833.jpg';

interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  image: string;
  ctaLabel: string;
  actionType: 'learn' | 'book';
  duration: string;
  startingPriceNaira: number;
  deliverables: string[];
}

interface GalleryItem {
  id: string;
  title: string;
  vehicle: string;
  packageUsed: string;
  location: string;
  duration: string;
  afterImage: string;
  beforeImage: string;
  summary: string;
  metrics: string;
}

interface PricingPlan {
  id: string;
  name: string;
  subtitle: string;
  monthlyPrice: number;
  yearlyPrice: number;
  recommended?: boolean;
  ctaLabel: string;
  features: string[];
}

const formatNaira = (amount: number) => `₦${amount.toLocaleString('en-NG')}`;

const SERVICES_LIST: ServiceItem[] = [
  {
    id: 'borehole-correction',
    title: 'Borehole Spot & Swirl Correction',
    shortDesc:
      'Erases white mineral ring etching from untreated borehole washes and circular scratch webs from roadside sponges.',
    fullDesc:
      'Untreated borehole water in Lagos and Abuja leaves stubborn calcium and iron deposits that bake into your clear coat under the tropical sun. We perform chemical mineral decontamination followed by multi-stage rotary and dual-action machine polishing to restore deep, liquid-glass reflectivity.',
    image: HERO_G63_IMG,
    ctaLabel: 'Learn more',
    actionType: 'learn',
    duration: '4–6 Hours',
    startingPriceNaira: 145000,
    deliverables: [
      'Acid-free mineral deposit & borehole water-spot dissolving treatment',
      'Two-stage machine polish eliminating 90%+ of roadside sponge swirl marks',
      '0-PPM deionized spot-free rinse & clay bar decontamination',
      '6-month tropical UV polymer sealant protection',
    ],
  },
  {
    id: 'harmattan-ceramic',
    title: 'Harmattan & Sun Shield 9H Ceramic',
    shortDesc:
      "Liquid-glass 9H SiO2 armor that locks in 'Tear Rubber' depth while repelling harsh UV rays, Harmattan dust, and road grit.",
    fullDesc:
      'Engineered for West African climate extremes. Our multi-layer 9H ceramic matrix forms a permanent chemical bond over your paintwork, wheels, and trim—making Harmattan dust, Third Mainland Bridge grime, and acidic bird droppings slide off effortlessly without scratching.',
    image: CERAMIC_SHIELD_IMG,
    ctaLabel: 'Book now',
    actionType: 'book',
    duration: '1–2 Days',
    startingPriceNaira: 480000,
    deliverables: [
      'Full single or two-stage paint correction prior to coating application',
      'Dual-layer 9H SiO2 Ceramic Coating on all painted surfaces & headlights',
      'Hydrophobic windshield & panoramic roof rain-repellent glass armor',
      '3-to-5 Year written studio warranty with quarterly booster inspections',
    ],
  },
  {
    id: 'rainy-recovery',
    title: 'Rainy Season & Cabin Recovery',
    shortDesc:
      'Complete carpet extraction, antibacterial ozone sterilization, and Windsor leather hydration after heavy downpours.',
    fullDesc:
      'High coastal humidity and rainy-season splashback can trap dampness inside luxury SUV carpets and air ducts. We strip, steam-extract, and sanitize the entire cabin while nourishing perforated Nappa and Windsor leather to a factory-matte, zero-grease finish.',
    image: VIP_CABIN_IMG,
    ctaLabel: 'Learn more',
    actionType: 'learn',
    duration: '5–6 Hours',
    startingPriceNaira: 165000,
    deliverables: [
      'Deep hot-water & anti-fungal extraction for carpets and floor insulation',
      'Medical-grade ozone cabin & AC evaporator odor neutralization',
      'pH-neutral leather cleansing & satin UV barrier conditioning (no sticky shine)',
      'Panoramic sunroof drain channel clearing to prevent interior leaks',
    ],
  },
  {
    id: 'estate-mobile',
    title: 'Estate-Doorstep Mobile Studio',
    shortDesc:
      'Our self-contained van arrives at your Ikoyi, Lekki, Ikeja GRA, or Maitama compound with onboard deionized water & power.',
    fullDesc:
      'Skip the weekend car wash queue and keep your keys in your hand. Our security-vetted detailing crew brings a fully equipped mobile bay directly to your residence or corporate car park—complete with 500L of 0-PPM treated water and whisper-quiet power.',
    image: CERAMIC_SHIELD_IMG,
    ctaLabel: 'Book now',
    actionType: 'book',
    duration: '3–4 Hours',
    startingPriceNaira: 95000,
    deliverables: [
      '100% self-contained: zero draw on your home borehole or prepaid meter',
      'pH-neutral snow foam bath, two-bucket hand wash & wheel barrel deep clean',
      'Full interior vacuum, steam wipe-down & satin leather dressing',
      'Engine bay sensor-safe steam degreasing & matte dressing',
    ],
  },
];

const PROCESS_STEPS = [
  {
    step: 'STEP 01',
    title: 'Paint-gauge & borehole etching audit',
    description:
      'We inspect every panel under CRI 98+ sun-gun lighting and ultrasonic depth gauges to map out borehole mineral spots, tar, and swirl marks.',
    image: HERO_G63_IMG,
    details: 'Ultrasonic Clear-Coat Readings · Mineral Scale Mapping · Security-Vetted Team',
  },
  {
    step: 'STEP 02',
    title: '0-PPM deionized water & precision care',
    description:
      'Zero untreated borehole water ever touches your vehicle. We use 100% filtered deionized water, German compounds, and virgin microfiber per panel.',
    image: VIP_CABIN_IMG,
    details: '0-PPM Treated Water · Self-Contained Silent Power · Sensor-Safe Steam',
  },
  {
    step: 'STEP 03',
    title: 'Sun-gun inspection & tear-rubber handover',
    description:
      'A rigorous 45-point multi-angle LED inspection ensures showroom mirror clarity and a crisp, factory-fresh cabin before you or your driver take the keys.',
    image: CERAMIC_SHIELD_IMG,
    details: '45-Point Executive Sign-off · Ceramic Warranty Card · WhatsApp Service Log',
  },
];

const TESTIMONIALS = [
  {
    name: 'Tunde Bakare',
    role: 'Managing Partner, Victoria Island · 2024 Mercedes-AMG G63',
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
    quote:
      '"Estate washers had left terrible borehole water rings all over my Obsidian Black G63. Carzap leveled the clear coat and applied 9H ceramic—six months later, rainwater and Third Mainland dust just slide right off."',
  },
  {
    name: 'Chidinma Okonkwo',
    role: 'Tech Executive, Lekki Phase 1 · 2023 Range Rover Autobiography',
    avatar:
      'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=200&auto=format&fit=crop',
    quote:
      '"Their mobile van comes straight into my compound in Lekki with their own treated water and silent generator. My tan Windsor leather seats feel genuinely tear-rubber without that sticky roadside silicone shine."',
  },
  {
    name: 'Alhaji Mustapha Danjuma',
    role: 'Real Estate Director, Maitama Abuja · 2024 Land Cruiser 300 ZX',
    avatar:
      'https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?q=80&w=200&auto=format&fit=crop',
    quote:
      '"During Harmattan, dust used to dull my Land Cruiser within hours. Since signing up for the Executive SUV retainer, every vehicle in my compound looks like it just rolled off a showroom floor."',
  },
];

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Borehole Water-Spot Removal & 9H Ceramic',
    vehicle: '2024 Mercedes-AMG G63 (Obsidian Black)',
    packageUsed: 'Harmattan & Sun Shield 9H Ceramic',
    location: 'Victoria Island Studio',
    duration: '14 Hours',
    afterImage: HERO_G63_IMG,
    beforeImage: HERO_G63_IMG,
    summary:
      'Eliminated severe calcium borehole water etching and wash-induced holograms across jet-black AMG paintwork, sealing the finish with dual-layer 9H SiO2 ceramic armor.',
    metrics: '98% Swirl & Mineral Etch Removal · +46 GU Mirror Gloss Reading',
  },
  {
    id: 'gal-2',
    title: 'VIP Windsor Leather Steam & Cabin Reset',
    vehicle: '2023 Range Rover Autobiography',
    packageUsed: 'VIP Cabin & Leather Restoration',
    location: 'Ikoyi Mobile Concierge',
    duration: '5 Hours',
    afterImage: VIP_CABIN_IMG,
    beforeImage: VIP_CABIN_IMG,
    summary:
      'Removed glossy silicone buildup from previous washes, deep-steamed perforated tan Windsor leather bolsters, and sanitized the AC system with medical-grade ozone.',
    metrics: 'Factory-Matte Leather Finish · 100% Cabin Odor & Bacteria Neutralized',
  },
  {
    id: 'gal-3',
    title: 'Harmattan Shield & Hydrophobic Glass Armor',
    vehicle: '2024 Porsche Cayenne Turbo GT',
    packageUsed: 'Executive SUV Concierge Plan',
    location: 'Lekki Phase 1 Studio',
    duration: '8 Hours',
    afterImage: CERAMIC_SHIELD_IMG,
    beforeImage: CERAMIC_SHIELD_IMG,
    summary:
      'Full iron fallout decontamination from coastal driving followed by single-stage jewel polishing and extreme hydrophobic ceramic top-coat application.',
    metrics: '115° Water Contact Angle · 36-Month Tropical UV Protection',
  },
  {
    id: 'gal-4',
    title: 'Port-Clearing Tokunbo to Tear-Rubber Reset',
    vehicle: '2023 Lexus LX600 Ultra Luxury',
    packageUsed: 'Borehole Spot & Swirl Correction',
    location: 'Maitama Abuja Studio',
    duration: '10 Hours',
    afterImage: HERO_G63_IMG,
    beforeImage: HERO_G63_IMG,
    summary:
      'Complete post-clearing transformation removing transit film adhesive, oxidized clear coat, and ocean salt residue for a flawless showroom handover.',
    metrics: '99.4 GU Clarity · Sensor-Safe Engine Bay & Undercarriage Detail',
  },
];

const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'basic',
    name: 'Daily Driver Care',
    subtitle: 'Essential tear-rubber maintenance for 1 executive sedan or crossover',
    monthlyPrice: 85000,
    yearlyPrice: 850000,
    ctaLabel: 'Book Daily Driver',
    features: [
      'Bi-weekly 0-PPM deionized mobile wash at your home or VI/Ikoyi office',
      'Monthly interior steam sanitization & matte leather conditioning',
      'Quarterly hydrophobic sealant booster against tropical sun & rain',
    ],
  },
  {
    id: 'business',
    name: 'Executive SUV Concierge',
    subtitle: 'Most popular for G-Wagons, Range Rovers, Land Cruisers & LX600s',
    monthlyPrice: 165000,
    yearlyPrice: 1650000,
    recommended: true,
    ctaLabel: 'Book Executive SUV',
    features: [
      'Weekly estate-doorstep or VI/Maitama studio detailing visits',
      'Annual machine gloss enhancement & borehole spot removal',
      '9H Ceramic Coating maintenance & hydrophobic glass armor included',
      'Priority Friday pre-weekend / Owambe express scheduling',
    ],
  },
  {
    id: 'enterprise',
    name: 'Collector & Fleet Retainer',
    subtitle: 'VIP multi-vehicle care for family compounds & corporate fleets (up to 4 rides)',
    monthlyPrice: 320000,
    yearlyPrice: 3200000,
    ctaLabel: 'Book Fleet Retainer',
    features: [
      'Unlimited scheduled detailing across up to 4 registered vehicles',
      'Full two-stage paint correction & 5-year 9H Ceramic protection',
      'Emergency rainy-season flood extraction & cabin recovery callouts',
      'Dedicated account manager & security-vetted estate team',
    ],
  },
];

/**
 * Resilient image component with fallback styling so no broken image frame ever renders.
 */
function SmartImage({
  src,
  alt,
  className = '',
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-zinc-900 via-zinc-950 to-black text-zinc-400 p-6 text-center ${className}`}
        role="img"
        aria-label={alt}
      >
        <Car className="w-10 h-10 text-brand-primary/80 mb-2 shrink-0" />
        <span className="text-xs font-medium tracking-wide text-zinc-300">{alt}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className={className}
    />
  );
}

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');

  // Interactive Modals
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState<'book' | 'quote'>('book');
  const [selectedService, setSelectedService] = useState<string>(
    'Harmattan & Sun Shield 9H Ceramic'
  );
  const [selectedLocation, setSelectedLocation] = useState<string>(
    'Victoria Island Flagship Studio'
  );
  const [selectedVehicleSize, setSelectedVehicleSize] = useState<
    'sedan' | 'suv' | 'armored' | 'exotic'
  >('suv');
  const [paintCondition, setPaintCondition] = useState<'new' | 'borehole' | 'tokunbo'>('borehole');
  const [addCeramic, setAddCeramic] = useState<boolean>(true);
  const [bookingSubmitted, setBookingSubmitted] = useState(false);

  // Booking Form State
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [vehicleModel, setVehicleModel] = useState('');
  const [preferredDate, setPreferredDate] = useState('2026-11-14');
  const [formError, setFormError] = useState('');

  // Service Detail Modal State
  const [activeServiceDetail, setActiveServiceDetail] = useState<ServiceItem | null>(null);

  // Gallery Lightbox State
  const [activeGalleryItem, setActiveGalleryItem] = useState<GalleryItem | null>(null);
  const [comparisonSlider, setComparisonSlider] = useState<number>(60);

  const galleryContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openBooking = (preselectedService?: string, tab: 'book' | 'quote' = 'book') => {
    if (preselectedService) {
      setSelectedService(preselectedService);
    }
    setModalTab(tab);
    setBookingSubmitted(false);
    setFormError('');
    setBookingModalOpen(true);
    setMobileMenuOpen(false);
  };

  const scrollGallery = (direction: 'prev' | 'next') => {
    const container = galleryContainerRef.current;
    if (!container) return;
    const firstCard = container.querySelector('div');
    const scrollAmount = firstCard ? firstCard.offsetWidth + 16 : 360;
    container.scrollBy({
      left: direction === 'prev' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  // Instant Naira Quote Calculation
  const calculateEstimatedQuoteNaira = () => {
    const sizeMultiplier =
      selectedVehicleSize === 'sedan'
        ? 1
        : selectedVehicleSize === 'suv'
          ? 1.25
          : selectedVehicleSize === 'armored'
            ? 1.5
            : 1.4;
    const conditionAdder =
      paintCondition === 'new' ? 0 : paintCondition === 'borehole' ? 65000 : 140000;
    const ceramicAdder = addCeramic ? 220000 : 0;

    const lower = selectedService.toLowerCase();
    const base = lower.includes('daily')
      ? 85000
      : lower.includes('executive suv')
        ? 165000
        : lower.includes('fleet')
          ? 320000
          : lower.includes('ceramic')
            ? 480000
            : lower.includes('rainy')
              ? 165000
              : lower.includes('mobile')
                ? 95000
                : 145000;

    return Math.round((base * sizeMultiplier + conditionAdder + ceramicAdder) / 5000) * 5000;
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !clientEmail.includes('@') || !clientPhone.trim()) {
      setFormError('Please provide your name, a valid email address, and WhatsApp/phone number.');
      return;
    }
    setFormError('');
    setBookingSubmitted(true);
  };

  return (
    <div className="font-secondary bg-neutral-background text-text-primary min-h-screen overflow-x-hidden antialiased selection:bg-brand-primary/30">
      {/* Top Navigation Bar - Strict 3-Zone Contract */}
      <nav
        id="navbar"
        className={`fixed top-0 w-full z-50 border-b border-white/10 backdrop-blur-sm transition-all duration-200 ${
          scrolled ? 'bg-black/90 shadow-lg' : 'bg-black/20'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-8 h-20">
            {/* Zone 1: Brand Wordmark */}
            <a
              href="#"
              data-editable="text"
              data-path="header.logo"
              className="text-2xl font-serif italic font-bold text-white hover:text-brand-primary transition-colors whitespace-nowrap shrink-0"
            >
              Carzap
            </a>

            {/* Zone 2: Desktop Navigation Links */}
            <div
              className="hidden md:flex items-center gap-8"
              data-editable-list="header.navLinks"
            >
              <a
                href="#services"
                className="text-gray-300 hover:text-white py-2 text-sm font-medium transition-colors whitespace-nowrap shrink-0"
              >
                Services
              </a>
              <a
                href="#gallery"
                className="text-gray-300 hover:text-white py-2 text-sm font-medium transition-colors whitespace-nowrap shrink-0"
              >
                Gallery
              </a>
              <a
                href="#about"
                className="text-gray-300 hover:text-white py-2 text-sm font-medium transition-colors whitespace-nowrap shrink-0"
              >
                About
              </a>
              <a
                href="#pricing"
                className="text-gray-300 hover:text-white py-2 text-sm font-medium transition-colors whitespace-nowrap shrink-0"
              >
                Pricing
              </a>
            </div>

            {/* Zone 3: Primary Action & Mobile Trigger */}
            <div className="flex items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => openBooking('Executive SUV Concierge (Annual)', 'book')}
                data-editable="text"
                data-path="header.cta"
                className="hidden md:inline-flex bg-brand-primary hover:bg-brand-secondary text-white px-6 py-2.5 rounded text-sm font-medium transition-colors duration-200 items-center justify-center gap-2 shadow-cta whitespace-nowrap shrink-0 cursor-pointer"
              >
                Book Concierge
              </button>

              <button
                type="button"
                id="mobile-menu-btn"
                aria-label="Toggle navigation menu"
                onClick={() => setMobileMenuOpen((prev) => !prev)}
                className="md:hidden text-gray-400 hover:text-white p-2 focus:outline-none cursor-pointer"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Panel */}
        {mobileMenuOpen && (
          <div
            id="mobile-menu"
            className="md:hidden bg-neutral-surface border-b border-neutral-border shadow-2xl w-full"
          >
            <div className="px-4 pt-2 pb-4 space-y-1">
              <a
                href="#services"
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-300 hover:text-white hover:bg-white/5 block px-3 py-2.5 rounded-md text-base font-medium"
              >
                Services
              </a>
              <a
                href="#gallery"
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-300 hover:text-white hover:bg-white/5 block px-3 py-2.5 rounded-md text-base font-medium"
              >
                Gallery
              </a>
              <a
                href="#about"
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-300 hover:text-white hover:bg-white/5 block px-3 py-2.5 rounded-md text-base font-medium"
              >
                About
              </a>
              <a
                href="#pricing"
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-300 hover:text-white hover:bg-white/5 block px-3 py-2.5 rounded-md text-base font-medium"
              >
                Pricing
              </a>
              <div className="pt-3">
                <button
                  type="button"
                  onClick={() => openBooking('Executive SUV Concierge (Annual)', 'book')}
                  className="w-full bg-brand-primary hover:bg-brand-secondary text-white px-6 py-3 rounded text-sm font-medium transition-colors duration-200 cursor-pointer"
                >
                  Book Concierge
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      <main>
        {/* Hero Section */}
        <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <SmartImage
              src={HERO_G63_IMG}
              alt="Mercedes-AMG G63 detailing at Carzap Victoria Island Lagos Studio"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/65 to-black/20" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 w-full">
            <div className="max-w-2xl space-y-6">
              <div className="text-xs font-medium tracking-wider text-text-tertiary">
                Victoria Island · Ikoyi · Lekki Phase 1 · Maitama Abuja · 0-PPM Deionized Water
              </div>
              <h1
                data-editable="text"
                data-path="hero.heading"
                className="text-4xl md:text-6xl font-secondary font-bold leading-tight tracking-tight text-white [text-wrap:balance]"
              >
                KEEP YOUR RIDE LOOKING &lsquo;TEAR RUBBER&rsquo; EVERY SINGLE DAY
              </h1>
              <p
                data-editable="text"
                data-path="hero.subheading"
                className="text-lg text-text-tertiary leading-relaxed max-w-xl"
              >
                Stop handing your keys to roadside washes with salty borehole water and gritty
                rags. We protect Lagos and Abuja&apos;s finest SUVs and executive sedans with 9H
                ceramic armor, swirl-free correction, and estate-doorstep mobile studio care.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => openBooking('Executive SUV Concierge (Annual)', 'book')}
                  className="bg-brand-primary hover:bg-brand-secondary text-white px-8 py-3.5 rounded text-sm font-medium transition-colors duration-200 flex items-center justify-center gap-2 shadow-cta whitespace-nowrap shrink-0 cursor-pointer"
                >
                  Book Concierge
                </button>
                <button
                  type="button"
                  onClick={() => openBooking('Harmattan & Sun Shield 9H Ceramic', 'quote')}
                  className="border border-white/30 text-white hover:bg-white/10 px-8 py-3.5 rounded text-sm font-medium transition-colors duration-200 flex items-center justify-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
                >
                  Calculate Naira Quote
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-24 bg-neutral-surface-alt">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <h4 className="text-text-secondary text-xs uppercase tracking-widest mb-2 font-medium">
                Executive Care Packages
              </h4>
              <h2
                data-editable="text"
                data-path="services.heading"
                className="text-3xl md:text-4xl font-secondary font-bold text-white mb-4"
              >
                Engineered for Nigerian roads &amp; climate
              </h2>
              <p className="text-text-secondary max-w-2xl mx-auto">
                From Third Mainland Bridge grit and coastal humidity to Harmattan dust and borehole
                water-spot etching, our treatments preserve your vehicle&apos;s showroom prestige.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              {/* Featured Service (Left) */}
              <div className="lg:col-span-5 min-h-[480px] lg:h-auto">
                <div className="group relative h-full flex flex-col overflow-hidden rounded-md bg-neutral-surface border border-neutral-border">
                  <div className="absolute inset-0 z-0">
                    <SmartImage
                      src={VIP_CABIN_IMG}
                      alt="VIP Range Rover Autobiography Cabin & Windsor Leather Restoration"
                      className="w-full h-full object-cover opacity-45 group-hover:opacity-55 transition-opacity duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-surface-alt via-neutral-surface/80 to-transparent" />
                  </div>
                  <div className="p-8 flex-1 flex flex-col justify-end z-10 relative">
                    <span className="text-xs text-text-secondary mb-2">
                      Featured Executive Reset · 4–5 Hours · Studio or Compound
                    </span>
                    <h3 className="text-3xl font-bold text-white mb-4">
                      VIP Cabin &amp; Windsor Leather Restoration
                    </h3>
                    <p className="text-text-tertiary mb-6 max-w-md">
                      Lagos and Abuja traffic means hours inside your cabin. We deep-steam AC
                      ducts, extract dampness, and hydrate Nappa and Windsor leather to a
                      factory-matte, zero-grease finish.
                    </p>
                    <div className="flex flex-wrap items-center gap-3">
                      <button
                        type="button"
                        onClick={() => openBooking('Rainy Season & Cabin Recovery', 'book')}
                        className="bg-brand-primary hover:bg-brand-secondary text-white px-6 py-3 rounded text-sm font-medium transition-colors duration-200 inline-flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        Book Cabin Reset
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveServiceDetail(SERVICES_LIST[2])}
                        className="border border-white/20 hover:bg-white/10 text-white px-5 py-3 rounded text-sm font-medium transition-colors duration-200 inline-flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        View Protocol
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Grid Services (Right) */}
              <div
                className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6"
                data-editable-list="services.list"
              >
                {SERVICES_LIST.map((service) => (
                  <div
                    key={service.id}
                    className="group relative overflow-hidden rounded-md bg-neutral-surface border border-neutral-border flex flex-col justify-between"
                  >
                    <div>
                      <div className="aspect-video w-full overflow-hidden bg-zinc-950">
                        <SmartImage
                          src={service.image}
                          alt={service.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-70 group-hover:opacity-90"
                        />
                      </div>
                      <div className="p-6">
                        <div className="flex items-center justify-between text-xs text-text-secondary mb-2 tabular-nums">
                          <span>{service.duration}</span>
                          <span>From {formatNaira(service.startingPriceNaira)}</span>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
                        <p className="text-text-secondary text-sm mb-4 line-clamp-3">
                          {service.shortDesc}
                        </p>
                        <button
                          type="button"
                          onClick={() =>
                            service.actionType === 'learn'
                              ? setActiveServiceDetail(service)
                              : openBooking(service.title, 'book')
                          }
                          className="inline-flex items-center text-brand-text text-sm font-medium hover:text-brand-primary transition-colors cursor-pointer"
                        >
                          {service.ctaLabel} <span className="ml-1">→</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-24 bg-neutral-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <h4 className="text-text-secondary text-xs uppercase tracking-widest mb-2 font-medium">
                Our Standard
              </h4>
              <h2 className="text-3xl md:text-4xl font-secondary font-bold text-white mb-4">
                How our executive care works
              </h2>
              <p className="text-text-secondary max-w-2xl mx-auto">
                Whether at our Victoria Island climate-controlled bay or inside your gated estate
                compound, every vehicle undergoes a strict three-stage protocol.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8" data-editable-list="process.steps">
              {PROCESS_STEPS.map((step) => (
                <div
                  key={step.step}
                  className="group relative h-96 overflow-hidden rounded-md border border-neutral-border"
                >
                  <SmartImage
                    src={step.image}
                    alt={step.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/65 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-8 w-full">
                    <span className="text-xs font-mono text-brand-text mb-2 block tabular-nums">
                      {step.step}
                    </span>
                    <h3 className="text-2xl font-bold text-white mb-2">{step.title}</h3>
                    <p className="text-text-secondary text-sm opacity-95 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300 transform md:translate-y-4 md:group-hover:translate-y-0">
                      {step.description}
                    </p>
                    <p className="text-xs text-zinc-400 mt-3 pt-3 border-t border-white/10">
                      {step.details}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section
          id="about"
          className="py-24 bg-neutral-surface-alt border-t border-neutral-surface"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <h4 className="text-text-secondary text-xs uppercase tracking-widest mb-2 font-medium">
                Client Verdicts
              </h4>
              <h2 className="text-3xl md:text-4xl font-secondary font-bold text-white mb-4">
                Trusted by Lagos &amp; Abuja&apos;s most discerning owners
              </h2>
            </div>

            <div
              className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
              data-editable-list="testimonials"
            >
              {TESTIMONIALS.map((item) => (
                <div
                  key={item.name}
                  className="p-6 bg-neutral-surface rounded-lg border border-neutral-border flex flex-col justify-between"
                >
                  <div>
                    <div className="w-16 h-16 rounded-full overflow-hidden mx-auto mb-4 border-2 border-neutral-border">
                      <SmartImage
                        src={item.avatar}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h4 className="font-bold text-white">{item.name}</h4>
                    <p className="text-xs text-brand-text mb-4">{item.role}</p>
                    <div
                      className="flex justify-center gap-1 mb-4 text-yellow-500 text-xs"
                      aria-label="5 out of 5 stars"
                    >
                      <span>★</span>
                      <span>★</span>
                      <span>★</span>
                      <span>★</span>
                      <span>★</span>
                    </div>
                    <p className="text-text-secondary text-sm leading-relaxed">{item.quote}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Showcase / Before & After Gallery Section */}
        <section id="gallery" className="py-24 bg-neutral-background relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
              <div>
                <h4 className="text-text-secondary text-xs uppercase tracking-widest mb-2 font-medium">
                  Showroom Transformations
                </h4>
                <h2 className="text-3xl md:text-4xl font-secondary font-bold text-white">
                  Before and after
                </h2>
                <p className="text-text-secondary mt-2">
                  See how we erase borehole etching, oxidized clear coats, and cabin wear. Click any
                  vehicle to inspect the comparison.
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  id="gallery-prev"
                  aria-label="Previous showcase slide"
                  onClick={() => scrollGallery('prev')}
                  className="p-2.5 rounded-full border border-neutral-border text-white hover:bg-neutral-surface transition cursor-pointer hover:text-brand-primary"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  id="gallery-next"
                  aria-label="Next showcase slide"
                  onClick={() => scrollGallery('next')}
                  className="p-2.5 rounded-full border border-neutral-border text-white hover:bg-neutral-surface transition cursor-pointer hover:text-brand-primary"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div
              id="gallery-container"
              ref={galleryContainerRef}
              className="flex overflow-x-auto snap-x snap-mandatory gap-4 scroll-smooth pb-4 no-scrollbar"
              data-editable-list="gallery.items"
            >
              {GALLERY_ITEMS.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    setComparisonSlider(60);
                    setActiveGalleryItem(item);
                  }}
                  className="min-w-[85%] md:min-w-[calc(33.333%-11px)] snap-start h-80 rounded-lg overflow-hidden relative group shrink-0 border border-neutral-border cursor-pointer"
                >
                  <SmartImage
                    src={item.afterImage}
                    alt={item.vehicle}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                    <div>
                      <p className="text-xs text-text-tertiary">
                        {item.vehicle} · {item.location}
                      </p>
                      <h3 className="text-sm font-bold text-white">{item.title}</h3>
                    </div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <span className="text-white text-xs font-bold tracking-widest uppercase border border-white px-4 py-2 bg-black/40">
                      Inspect Transformation
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-24 bg-neutral-surface-alt">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8 text-center">
              <h4 className="text-text-secondary text-xs uppercase tracking-widest mb-2 font-medium">
                Membership &amp; Retainers
              </h4>
              <h2 className="text-3xl md:text-4xl font-secondary font-bold text-white mb-4">
                Transparent Naira pricing
              </h2>
              <p className="text-text-secondary max-w-2xl mx-auto">
                Protect your vehicles year-round with scheduled estate visits or priority Victoria
                Island &amp; Maitama studio bays.
              </p>
            </div>

            {/* Monthly / Yearly Toggle */}
            <div className="flex justify-center mb-12">
              <div className="bg-neutral-surface p-1 rounded-full border border-neutral-border inline-flex relative">
                <div
                  id="price-toggle-bg"
                  className={`absolute top-1 bottom-1 w-[86px] bg-white rounded-full transition-transform duration-200 ${
                    billingCycle === 'monthly' ? 'translate-x-0 left-1' : 'translate-x-[88px] left-1'
                  }`}
                />
                <button
                  type="button"
                  id="btn-monthly"
                  onClick={() => setBillingCycle('monthly')}
                  className={`relative z-10 px-6 py-2 rounded-full text-sm font-medium transition-colors w-[90px] whitespace-nowrap shrink-0 cursor-pointer ${
                    billingCycle === 'monthly'
                      ? 'text-black'
                      : 'text-text-secondary hover:text-white'
                  }`}
                >
                  Monthly
                </button>
                <button
                  type="button"
                  id="btn-yearly"
                  onClick={() => setBillingCycle('yearly')}
                  className={`relative z-10 px-6 py-2 rounded-full text-sm font-medium transition-colors w-[90px] whitespace-nowrap shrink-0 cursor-pointer ${
                    billingCycle === 'yearly'
                      ? 'text-black'
                      : 'text-text-secondary hover:text-white'
                  }`}
                >
                  Yearly
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
              {PRICING_PLANS.map((plan) => {
                const isRecommended = Boolean(plan.recommended);
                const price = billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice;
                const periodLabel = billingCycle === 'monthly' ? '/mo' : '/yr';

                return (
                  <div
                    key={plan.id}
                    className={
                      isRecommended
                        ? 'p-8 rounded-lg bg-white text-black shadow-xl md:scale-105 z-10 flex flex-col justify-between'
                        : 'p-8 rounded-lg bg-neutral-surface border border-neutral-border text-white hover:border-brand-primary transition-colors duration-200 flex flex-col justify-between'
                    }
                  >
                    <div>
                      <div className="mb-8">
                        <h3 className="font-bold text-lg mb-2">{plan.name}</h3>
                        <p
                          className={`text-sm ${
                            isRecommended ? 'text-gray-600' : 'text-text-secondary'
                          }`}
                        >
                          {plan.subtitle}
                        </p>
                      </div>
                      <div className="mb-8 tabular-nums">
                        <div className="flex items-baseline">
                          <span className="text-3xl lg:text-4xl font-bold price-val">
                            {formatNaira(price)}
                          </span>
                          <span
                            className={`text-sm ml-1 price-period ${
                              isRecommended ? 'text-gray-500' : 'text-text-secondary'
                            }`}
                          >
                            {periodLabel}
                          </span>
                        </div>
                        <p
                          className={`text-xs mt-2 ${
                            isRecommended ? 'text-green-600 font-medium' : 'text-green-500'
                          }`}
                        >
                          {billingCycle === 'yearly'
                            ? 'Save 15% (2 months complimentary care)'
                            : 'Switch to Yearly to save 15%'}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          openBooking(
                            `${plan.name} (${billingCycle === 'yearly' ? 'Annual' : 'Monthly'})`,
                            'book'
                          )
                        }
                        className={
                          isRecommended
                            ? 'w-full mb-8 bg-brand-primary hover:bg-brand-secondary text-white py-3 px-4 rounded text-sm font-medium transition-colors shadow-cta whitespace-nowrap cursor-pointer'
                            : 'w-full mb-8 border border-white/20 hover:bg-white hover:text-black text-white py-3 px-4 rounded text-sm font-medium transition-colors whitespace-nowrap cursor-pointer'
                        }
                      >
                        {plan.ctaLabel}
                      </button>
                      <ul className="space-y-4">
                        {plan.features.map((feat) => (
                          <li key={feat} className="flex items-start gap-3 text-sm">
                            <span className={isRecommended ? 'text-black font-bold' : 'text-white'}>
                              ✓
                            </span>
                            <span
                              className={isRecommended ? 'text-gray-700' : 'text-text-tertiary'}
                            >
                              {feat}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-16 bg-black border-t border-neutral-border text-center">
        <div className="max-w-7xl mx-auto px-6">
          <h2
            data-editable="text"
            data-path="footer.heading"
            className="text-2xl md:text-3xl font-secondary font-bold text-white mb-3"
          >
            Give your vehicle the &lsquo;Tear Rubber&rsquo; treatment today
          </h2>
          <p className="text-sm text-text-secondary max-w-xl mx-auto mb-6">
            Book a studio slot in Victoria Island or Maitama, or dispatch our self-contained mobile
            van directly to your estate in Ikoyi, Lekki Phase 1, VGC, or Ikeja GRA.
          </p>
          <button
            type="button"
            onClick={() => openBooking('Executive SUV Concierge (Annual)', 'book')}
            className="bg-brand-primary hover:bg-brand-secondary text-white px-8 py-3.5 rounded text-sm font-medium transition-colors duration-200 inline-flex items-center justify-center gap-2 shadow-cta cursor-pointer"
          >
            Schedule Studio or Estate Visit
          </button>

          <div className="mt-12 pt-8 border-t border-neutral-border/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-sm">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4">
              <span className="font-serif italic text-white font-bold text-lg">Carzap</span>
              <span>
                Lagos: Adeola Odeku St, Victoria Island · Abuja: Gana St, Maitama · Mon–Sat 8 AM – 7
                PM
              </span>
            </div>
            <div>© {new Date().getFullYear()} Carzap Nigeria Ltd. All rights reserved.</div>
          </div>
        </div>
      </footer>

      {/* Service Detail Modal */}
      {activeServiceDetail && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setActiveServiceDetail(null)}
        >
          <div
            className="bg-neutral-surface border border-neutral-border rounded-lg max-w-xl w-full overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-52 w-full">
              <SmartImage
                src={activeServiceDetail.image}
                alt={activeServiceDetail.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-surface via-black/40 to-transparent" />
              <button
                type="button"
                aria-label="Close service details"
                onClick={() => setActiveServiceDetail(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-white hover:bg-brand-primary transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-4 left-6 right-6">
                <div className="text-xs text-text-tertiary mb-1 tabular-nums">
                  Est. Time: {activeServiceDetail.duration} · Starting at{' '}
                  {formatNaira(activeServiceDetail.startingPriceNaira)}
                </div>
                <h3 className="text-2xl font-bold text-white">{activeServiceDetail.title}</h3>
              </div>
            </div>

            <div className="p-6 space-y-5">
              <p className="text-sm text-text-tertiary leading-relaxed">
                {activeServiceDetail.fullDesc}
              </p>

              <div>
                <h4 className="text-xs uppercase tracking-wider text-text-secondary font-semibold mb-3">
                  Included Treatment Protocol
                </h4>
                <ul className="space-y-2.5">
                  {activeServiceDetail.deliverables.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-gray-200">
                      <Check className="w-4 h-4 text-brand-text shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-neutral-border flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setActiveServiceDetail(null)}
                  className="px-4 py-2.5 rounded border border-neutral-border text-sm text-gray-300 hover:text-white transition-colors cursor-pointer"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const title = activeServiceDetail.title;
                    setActiveServiceDetail(null);
                    openBooking(title, 'book');
                  }}
                  className="px-6 py-2.5 rounded bg-brand-primary hover:bg-brand-secondary text-white text-sm font-medium transition-colors shadow-cta cursor-pointer"
                >
                  Book {activeServiceDetail.title}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Gallery Before & After Lightbox Modal */}
      {activeGalleryItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4"
          onClick={() => setActiveGalleryItem(null)}
        >
          <div
            className="bg-neutral-surface border border-neutral-border rounded-lg max-w-3xl w-full overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-border">
              <div>
                <p className="text-xs text-text-secondary">
                  {activeGalleryItem.vehicle} · {activeGalleryItem.location} ·{' '}
                  {activeGalleryItem.duration}
                </p>
                <h3 className="text-lg font-bold text-white">{activeGalleryItem.title}</h3>
              </div>
              <button
                type="button"
                aria-label="Close gallery comparison"
                onClick={() => setActiveGalleryItem(null)}
                className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Interactive Before/After Slider Area */}
            <div className="relative h-80 sm:h-96 w-full overflow-hidden select-none bg-black">
              {/* After Image (Full Base) */}
              <SmartImage
                src={activeGalleryItem.afterImage}
                alt={`After: ${activeGalleryItem.vehicle}`}
                className="w-full h-full object-cover"
              />
              {/* Before Image (Simulated Borehole Haze / Pre-Correction Filter Clipped by Slider) */}
              <div
                className="absolute inset-y-0 left-0 overflow-hidden"
                style={{ width: `${comparisonSlider}%` }}
              >
                <SmartImage
                  src={activeGalleryItem.beforeImage}
                  alt={`Before: ${activeGalleryItem.vehicle}`}
                  className="w-full h-full object-cover filter brightness-75 contrast-75 saturate-50 sepia-[.15]"
                />
              </div>

              {/* Divider Line */}
              <div
                className="absolute inset-y-0 w-0.5 bg-brand-primary shadow-lg pointer-events-none"
                style={{ left: `${comparisonSlider}%` }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-brand-primary text-white flex items-center justify-center shadow-lg text-xs font-bold">
                  ↔
                </div>
              </div>

              <div className="absolute top-3 left-3 bg-black/75 px-2.5 py-1 rounded text-xs text-gray-200">
                Before (Borehole Haze &amp; Swirls)
              </div>
              <div className="absolute top-3 right-3 bg-black/75 px-2.5 py-1 rounded text-xs text-white">
                After (&lsquo;Tear Rubber&rsquo; 9H Finish)
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div className="flex items-center gap-4">
                <label
                  htmlFor="comparison-range"
                  className="text-xs font-medium text-text-secondary whitespace-nowrap"
                >
                  Slide Comparison:
                </label>
                <input
                  id="comparison-range"
                  type="range"
                  min={5}
                  max={95}
                  value={comparisonSlider}
                  onChange={(e) => setComparisonSlider(Number(e.target.value))}
                  className="w-full accent-brand-primary cursor-pointer"
                />
                <span className="text-xs font-mono text-gray-300 tabular-nums w-10 text-right">
                  {comparisonSlider}%
                </span>
              </div>

              <p className="text-sm text-text-tertiary">{activeGalleryItem.summary}</p>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-3 border-t border-neutral-border">
                <span className="text-xs text-brand-text font-medium tabular-nums">
                  {activeGalleryItem.metrics}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    const pkg = activeGalleryItem.packageUsed;
                    setActiveGalleryItem(null);
                    openBooking(pkg, 'book');
                  }}
                  className="bg-brand-primary hover:bg-brand-secondary text-white px-5 py-2.5 rounded text-xs font-medium transition-colors cursor-pointer whitespace-nowrap"
                >
                  Book This Treatment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Booking & Instant Naira Quote Modal */}
      {bookingModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto"
          onClick={() => setBookingModalOpen(false)}
        >
          <div
            className="bg-neutral-surface border border-neutral-border rounded-lg max-w-lg w-full overflow-hidden shadow-2xl my-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header & Mode Tabs */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-border">
              <div className="flex items-center gap-2 bg-neutral-surface-alt p-1 rounded-md border border-neutral-border">
                <button
                  type="button"
                  onClick={() => setModalTab('book')}
                  className={`px-3.5 py-1.5 rounded text-xs font-medium transition-colors cursor-pointer ${
                    modalTab === 'book'
                      ? 'bg-brand-primary text-white'
                      : 'text-text-secondary hover:text-white'
                  }`}
                >
                  Book Concierge
                </button>
                <button
                  type="button"
                  onClick={() => setModalTab('quote')}
                  className={`px-3.5 py-1.5 rounded text-xs font-medium transition-colors cursor-pointer ${
                    modalTab === 'quote'
                      ? 'bg-brand-primary text-white'
                      : 'text-text-secondary hover:text-white'
                  }`}
                >
                  Naira Quote Calculator
                </button>
              </div>
              <button
                type="button"
                aria-label="Close modal"
                onClick={() => setBookingModalOpen(false)}
                className="p-1.5 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {bookingSubmitted ? (
              <div className="p-8 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white">Concierge Slot Reserved</h3>
                <p className="text-sm text-text-secondary max-w-sm mx-auto">
                  Thank you, <span className="text-white font-medium">{clientName}</span>. Our
                  dispatch team has reserved your{' '}
                  <span className="text-white font-medium">{selectedService}</span> appointment for{' '}
                  <span className="text-white font-medium tabular-nums">{preferredDate}</span>.
                </p>
                <div className="p-4 rounded bg-neutral-surface-alt border border-neutral-border text-xs text-text-tertiary space-y-1.5 text-left">
                  <div>
                    Location: <span className="text-white">{selectedLocation}</span>
                  </div>
                  <div>
                    Vehicle: <span className="text-white">{vehicleModel || 'Executive SUV'}</span>
                  </div>
                  <div>
                    WhatsApp / Email Pass sent to:{' '}
                    <span className="text-white">
                      {clientPhone} · {clientEmail}
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setBookingModalOpen(false)}
                  className="mt-4 bg-brand-primary hover:bg-brand-secondary text-white px-6 py-2.5 rounded text-sm font-medium transition-colors cursor-pointer"
                >
                  Done
                </button>
              </div>
            ) : modalTab === 'quote' ? (
              <div className="p-6 space-y-5">
                <div>
                  <label className="block text-xs text-text-secondary mb-2">
                    1. Select Treatment or Retainer
                  </label>
                  <select
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    className="w-full bg-neutral-surface-alt border border-neutral-border rounded px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-brand-primary"
                  >
                    <option value="Borehole Spot & Swirl Correction">
                      Borehole Spot &amp; Swirl Correction (₦145,000 base)
                    </option>
                    <option value="Harmattan & Sun Shield 9H Ceramic">
                      Harmattan &amp; Sun Shield 9H Ceramic (₦480,000 base)
                    </option>
                    <option value="Rainy Season & Cabin Recovery">
                      VIP Cabin &amp; Windsor Leather Restoration (₦165,000 base)
                    </option>
                    <option value="Estate-Doorstep Mobile Studio">
                      Estate-Doorstep Mobile Studio Detail (₦95,000 base)
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs text-text-secondary mb-2">
                    2. Vehicle Classification
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {(
                      [
                        { id: 'sedan', label: 'Exec Sedan' },
                        { id: 'suv', label: 'Luxury SUV' },
                        { id: 'armored', label: 'Bulletproof SUV' },
                        { id: 'exotic', label: 'Coupe / Exotic' },
                      ] as const
                    ).map((v) => (
                      <button
                        key={v.id}
                        type="button"
                        onClick={() => setSelectedVehicleSize(v.id)}
                        className={`py-2 px-2 rounded text-xs font-medium border transition-colors cursor-pointer ${
                          selectedVehicleSize === v.id
                            ? 'bg-white text-black border-white'
                            : 'bg-neutral-surface-alt text-text-secondary border-neutral-border hover:text-white'
                        }`}
                      >
                        {v.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-text-secondary mb-2">
                    3. Current Paint &amp; Clear-Coat Condition
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(
                      [
                        { id: 'new', label: 'Tear Rubber' },
                        { id: 'borehole', label: 'Borehole Spots' },
                        { id: 'tokunbo', label: 'Tokunbo Reset' },
                      ] as const
                    ).map((c) => (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => setPaintCondition(c.id)}
                        className={`py-2 px-2 rounded text-xs font-medium border transition-colors cursor-pointer ${
                          paintCondition === c.id
                            ? 'bg-white text-black border-white'
                            : 'bg-neutral-surface-alt text-text-secondary border-neutral-border hover:text-white'
                        }`}
                      >
                        {c.label}
                      </button>
                    ))}
                  </div>
                </div>

                <label className="flex items-center justify-between p-3.5 rounded bg-neutral-surface-alt border border-neutral-border cursor-pointer">
                  <div>
                    <span className="text-sm font-medium text-white block">
                      Add Harmattan 9H Ceramic Glass &amp; Rim Shield
                    </span>
                    <span className="text-xs text-text-secondary">
                      Hydrophobic windshield, panoramic roof &amp; alloy caliper armor (+₦220,000)
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={addCeramic}
                    onChange={(e) => setAddCeramic(e.target.checked)}
                    className="w-4 h-4 accent-brand-primary"
                  />
                </label>

                <div className="p-4 rounded bg-neutral-surface-alt border border-neutral-border flex items-center justify-between">
                  <div>
                    <span className="text-xs text-text-secondary block">Estimated Total</span>
                    <span className="text-2xl sm:text-3xl font-bold text-white tabular-nums">
                      {formatNaira(calculateEstimatedQuoteNaira())}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setModalTab('book')}
                    className="bg-brand-primary hover:bg-brand-secondary text-white px-5 py-2.5 rounded text-sm font-medium transition-colors shadow-cta cursor-pointer whitespace-nowrap"
                  >
                    Lock In Quote →
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="p-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-text-secondary mb-1.5">
                      Selected Package / Plan
                    </label>
                    <select
                      value={selectedService}
                      onChange={(e) => setSelectedService(e.target.value)}
                      className="w-full bg-neutral-surface-alt border border-neutral-border rounded px-3 py-2.5 text-sm text-white focus:outline-none focus:border-brand-primary"
                    >
                      <option value="Borehole Spot & Swirl Correction">
                        Borehole Spot &amp; Swirl Correction (₦145k)
                      </option>
                      <option value="Harmattan & Sun Shield 9H Ceramic">
                        Harmattan &amp; Sun Shield 9H Ceramic (₦480k)
                      </option>
                      <option value="Rainy Season & Cabin Recovery">
                        VIP Cabin &amp; Leather Restoration (₦165k)
                      </option>
                      <option value="Estate-Doorstep Mobile Studio">
                        Estate-Doorstep Mobile Studio (₦95k)
                      </option>
                      <option value="Daily Driver Care (Annual)">
                        Daily Driver Care — Annual (₦850k/yr)
                      </option>
                      <option value="Executive SUV Concierge (Annual)">
                        Executive SUV Concierge — Annual (₦1.65M/yr)
                      </option>
                      <option value="Collector & Fleet Retainer (Annual)">
                        Collector &amp; Fleet Retainer — Annual (₦3.2M/yr)
                      </option>
                      <option value="Daily Driver Care (Monthly)">
                        Daily Driver Care — Monthly (₦85k/mo)
                      </option>
                      <option value="Executive SUV Concierge (Monthly)">
                        Executive SUV Concierge — Monthly (₦165k/mo)
                      </option>
                      <option value="Collector & Fleet Retainer (Monthly)">
                        Collector &amp; Fleet Retainer — Monthly (₦320k/mo)
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs text-text-secondary mb-1.5">
                      Service Location / Zone
                    </label>
                    <select
                      value={selectedLocation}
                      onChange={(e) => setSelectedLocation(e.target.value)}
                      className="w-full bg-neutral-surface-alt border border-neutral-border rounded px-3 py-2.5 text-sm text-white focus:outline-none focus:border-brand-primary"
                    >
                      <option value="Victoria Island Flagship Studio">
                        Victoria Island Flagship Studio
                      </option>
                      <option value="Ikoyi Estate Mobile Dispatch">
                        Ikoyi Estate Mobile Dispatch
                      </option>
                      <option value="Lekki Phase 1 / VGC Mobile Dispatch">
                        Lekki Phase 1 / VGC Mobile Dispatch
                      </option>
                      <option value="Ikeja GRA / Magodo Mobile Dispatch">
                        Ikeja GRA / Magodo Mobile Dispatch
                      </option>
                      <option value="Maitama Abuja Studio & Mobile">
                        Maitama Abuja Studio &amp; Mobile
                      </option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-text-secondary mb-1.5">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="e.g. Tunde Bakare"
                      className="w-full bg-neutral-surface-alt border border-neutral-border rounded px-3.5 py-2 text-sm text-white focus:outline-none focus:border-brand-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-text-secondary mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      placeholder="tunde@company.ng"
                      className="w-full bg-neutral-surface-alt border border-neutral-border rounded px-3.5 py-2 text-sm text-white focus:outline-none focus:border-brand-primary"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-text-secondary mb-1.5">
                      WhatsApp / Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      placeholder="+234 803 000 0000"
                      className="w-full bg-neutral-surface-alt border border-neutral-border rounded px-3.5 py-2 text-sm text-white focus:outline-none focus:border-brand-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-text-secondary mb-1.5">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      className="w-full bg-neutral-surface-alt border border-neutral-border rounded px-3.5 py-2 text-sm text-white focus:outline-none focus:border-brand-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-text-secondary mb-1.5">
                    Vehicle Year, Make &amp; Model (Plus Estate Gate Note if Mobile)
                  </label>
                  <input
                    type="text"
                    value={vehicleModel}
                    onChange={(e) => setVehicleModel(e.target.value)}
                    placeholder="e.g. 2024 Mercedes G63 AMG — Banana Island Zone B"
                    className="w-full bg-neutral-surface-alt border border-neutral-border rounded px-3.5 py-2 text-sm text-white focus:outline-none focus:border-brand-primary"
                  />
                </div>

                {formError && <p className="text-xs text-brand-text">{formError}</p>}

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setBookingModalOpen(false)}
                    className="px-4 py-2.5 rounded border border-neutral-border text-sm text-gray-300 hover:text-white transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-brand-primary hover:bg-brand-secondary text-white px-6 py-2.5 rounded text-sm font-medium transition-colors shadow-cta cursor-pointer"
                  >
                    Confirm Dispatch / Slot
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
