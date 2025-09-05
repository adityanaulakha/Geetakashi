import React, { useState, useEffect, useCallback } from 'react';
import { Menu, X, ShoppingCart, User, Instagram, ChevronLeft, ChevronRight, Star, Quote, ArrowRight, Heart, Eye, Mail, Phone, MapPin, Send } from 'lucide-react';
import banner1 from './assets/Images/1.png';
import banner2 from './assets/Images/2.png';
import logo from './assets/logo.avif';
import one from './assets/hero-section/1.jpg';
import two from './assets/hero-section/2.jpg';
import three from './assets/hero-section/3.jpg';
import four from './assets/hero-section/4.jpg';

// Currency formatter (Indian Rupees)
const formatINR = (value) => `Rs. ${Number(value).toFixed(2)}`;
// Base64 tiny transparent placeholder (1x1) used as fallback
const FALLBACK_IMG = 'data:image/gif;base64,R0lGODlhAQABAAAAACw=';
const handleImageError = (e) => {
  if (e.currentTarget.dataset.fallbackApplied) return; // avoid loop
  e.currentTarget.dataset.fallbackApplied = 'true';
  e.currentTarget.src = FALLBACK_IMG;
  e.currentTarget.classList.add('bg-gray-100','animate-pulse');
  e.currentTarget.alt = (e.currentTarget.alt || 'Product') + ' (image not available)';
};

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { label: 'ABOUT US', href: '#about' },
    { label: 'COLLECTIONS', href: '#collections' },
    { label: 'ALL PRODUCTS', href: '#all-products' },
    { label: 'BEST-SELLERS', href: '#best-sellers' },
    { label: 'DEALS', href: '#deals' },
    { label: 'CONTACT US', href: '#contact' }
  ];

  // Hero carousel slides
  const heroSlides = [
    {
      id: 'h1',
      image: one,
      heading: 'Festive Glow Collection',
      sub: 'Warm, radiant pieces for luminous evenings.'
    },
    {
      id: 'h2',
      image: two,
      heading: 'Curated Resin Creations',
      sub: 'Unique platters and accents crafted to impress.'
    },
    {
      id: 'h3',
      image: three,
      heading: 'Floral Serenity',
      sub: 'Soft botanical elements to refresh your space.'
    },
    {
      id: 'h4',
      image: four,
      heading: 'Tranquil Retreat',
      sub: 'Create a peaceful ambiance with calming decor.'
    }
  ];

  // Featured (4 cards)
  const featuredProducts = [
    {
      id: 1,
      name: 'Glass Lotus Flower Tea Light Candle Holder Set',
      price: 566,
      image: '//geetaakshi.com/cdn/shop/files/8305763939.jpg?v=1755364307&width=533',
      tag: 'New',
      rating: 4.9,
      reviews: 27
    },
    {
      id: 2,
      name: 'Sleep & Destress Aromatherapy Scented Candle',
      price: 250,
      compareAt: 350,
      sale: true,
      image: '//geetaakshi.com/cdn/shop/files/61IfZA8YUoL._SL1440.jpg?v=1755363062&width=533',
      rating: 4.7,
      reviews: 54
    },
    {
      id: 3,
      name: 'Intricately Crafted Spiritual Decor Ganesha with Tealight Candle Holder',
      price: 890,
      image: '//geetaakshi.com/cdn/shop/files/7620900208.jpg?v=1755364297&width=533',
      rating: 5,
      reviews: 12
    },
    {
      id: 4,
      name: 'Relaxing Kinetic Sandscape Art Table Desk Decor',
      price: 620,
      image: '//geetaakshi.com/cdn/shop/files/7944549039.jpg?v=1755364374&width=533',
      rating: 4.6,
      reviews: 31
    }
  ];

  // Exclusive Deals: convert to a pure image carousel (stock Unsplash images)
  const exclusiveDeals = [
    {
      id: 'd1',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1400&h=800&fit=crop&crop=center&auto=format',
      title: 'Limited Time Offer',
      subtitle: 'Save on artisan desk decor sets.'
    },
    {
      id: 'd2',
      image: 'https://images.unsplash.com/photo-1556912173-3bb406ef7e77?w=1400&h=800&fit=crop&crop=center&auto=format',
      title: 'Festive Candle Glow',
      subtitle: 'Soothing scents for every celebration.'
    },
    {
      id: 'd3',
      image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1400&h=800&fit=crop&crop=center&auto=format&q=80',
      title: 'Natural Light Spaces',
      subtitle: 'Airy interiors with organic warmth.'
    },
    {
      id: 'd4',
      image: 'https://images.unsplash.com/photo-1582588678413-dbf45f4823e9?w=1400&h=800&fit=crop&crop=center&auto=format',
      title: 'Calming Decor Accents',
      subtitle: 'Create tranquil corners at home.'
    }
  ];

  const bestCategories = [
    {
      id: 1,
      name: 'Desk Decor',
      slug: 'desk-decor',
      tagline: 'Elevate your workspace aesthetic',
      count: 24,
      image: '//geetaakshi.com/cdn/shop/collections/81PxikOZzqL._SL1500.jpg?v=1755353302&width=1500'
    },
    {
      id: 2,
      name: 'Scented Candles',
      slug: 'scented-candles',
      tagline: 'Soothing aromas & ambiance',
      count: 18,
      image: '//geetaakshi.com/cdn/shop/collections/518bQQYns1L._SL1440.jpg?v=1756886870&width=1500'
    },
    {
      id: 3,
      name: 'Floral Decor',
      slug: 'floral-decor',
      tagline: 'Botanical accents that refresh',
      count: 32,
      image: '//geetaakshi.com/cdn/shop/collections/floral_decore.jpg?v=1756886936&width=1500'
    },
    {
      id: 4,
      name: 'Resin Platters',
      slug: 'resin-platters',
      tagline: 'Artful serving & styling pieces',
      count: 12,
      image: '//geetaakshi.com/cdn/shop/collections/rezen_platters.jpg?v=1756886920&width=1500'
    }
  ];

  const testimonials = [
    {
      id: 't1',
      name: 'Aarohi M.',
      location: 'Mumbai',
      text: 'Beautiful craftsmanship and fast shipping. The candle holders added instant charm to my festive decor!',
      rating: 5,
      verified: true
    },
    {
      id: 't2',
      name: 'Rohan K.',
      location: 'Bengaluru',
      text: 'Loved the aroma candle – subtle, calming and long lasting. Will definitely order again.',
      rating: 5,
      verified: true
    },
    {
      id: 't3',
      name: 'Simran P.',
      location: 'Chandigarh',
      text: 'The resin platter is stunning – looks even better in person and became the highlight of my center table.',
      rating: 5,
      verified: true
    },
    {
      id: 't4',
      name: 'Devansh L.',
      location: 'Gurugram',
      text: 'High quality and thoughtfully packed. You can tell a lot of care goes into every product.',
      rating: 4,
      verified: true
    }
  ];

  // Carousel states
  const [heroIndex, setHeroIndex] = useState(0);
  const [dealIndex, setDealIndex] = useState(0);
  // Testimonials carousel state
  const [testimonialSlide, setTestimonialSlide] = useState(0);
  const [itemsPerGroup, setItemsPerGroup] = useState(1);
  const [isTestimonialHovered, setIsTestimonialHovered] = useState(false);

  // Responsive grouping for testimonials (1 on mobile, 2 on md+)
  useEffect(() => {
    const update = () => setItemsPerGroup(window.innerWidth >= 768 ? 2 : 1);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const groupedTestimonials = React.useMemo(() => {
    const groups = [];
    for (let i = 0; i < testimonials.length; i += itemsPerGroup) {
      groups.push(testimonials.slice(i, i + itemsPerGroup));
    }
    return groups;
  }, [testimonials, itemsPerGroup]);

  const nextTestimonial = useCallback(() => {
    setTestimonialSlide(s => (s + 1) % groupedTestimonials.length);
  }, [groupedTestimonials.length]);
  const prevTestimonial = useCallback(() => {
    setTestimonialSlide(s => (s - 1 + groupedTestimonials.length) % groupedTestimonials.length);
  }, [groupedTestimonials.length]);

  // Autoplay testimonials
  useEffect(() => {
    if (isTestimonialHovered) return; // pause on hover
    const id = setInterval(() => nextTestimonial(), 6000);
    return () => clearInterval(id);
  }, [nextTestimonial, isTestimonialHovered]);

  const nextHero = useCallback(() => setHeroIndex(i => (i + 1) % heroSlides.length), [heroSlides.length]);
  const prevHero = useCallback(() => setHeroIndex(i => (i - 1 + heroSlides.length) % heroSlides.length), [heroSlides.length]);
  const nextDeal = useCallback(() => setDealIndex(i => (i + 1) % exclusiveDeals.length), [exclusiveDeals.length]);
  const prevDeal = useCallback(() => setDealIndex(i => (i - 1 + exclusiveDeals.length) % exclusiveDeals.length), [exclusiveDeals.length]);

  // Auto-play hero
  useEffect(() => {
    const id = setInterval(() => nextHero(), 5000);
    return () => clearInterval(id);
  }, [nextHero]);

  // Auto-play deals
  useEffect(() => {
    const id = setInterval(() => nextDeal(), 4500);
    return () => clearInterval(id);
  }, [nextDeal]);

  // Autoplay exclusive deals (single image carousel)
  useEffect(() => {
    const id = setInterval(() => nextDeal(), 5500);
    return () => clearInterval(id);
  }, [nextDeal]);

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-800">
      {/* Header / Navigation */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            <a href="#" className="flex items-center gap-3 group" aria-label="Geetaakshi Deliteful Creations Home">
              <img src={logo} alt="Geetaakshi Deliteful Creations Logo" className="h-18 md:h-20 w-auto object-contain drop-shadow-sm transition-transform duration-300 group-hover:scale-105" loading="eager" fetchpriority="high" />
              <span className="sr-only">Geetaakshi Deliteful Creations</span>
            </a>
            <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8 text-sm font-medium">
              {navLinks.map(link => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.external ? '_blank' : undefined}
                  rel={link.external ? 'noopener noreferrer' : undefined}
                  className="hover:text-amber-700 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <div className="hidden sm:flex items-center gap-4">
              <button className="flex items-center gap-1 text-sm hover:text-amber-700"><User size={18}/> Log in</button>
              <button className="relative hover:text-amber-700" aria-label="Cart">
                <ShoppingCart size={22} />
                <span className="absolute -top-2 -right-2 bg-amber-700 text-white text-[10px] font-semibold px-1.5 py-0.5 rounded-full">0</span>
              </button>
            </div>
            <button className="lg:hidden p-2" onClick={() => setIsMenuOpen(v => !v)} aria-label="Toggle Menu">
              {isMenuOpen ? <X/> : <Menu/>}
            </button>
          </div>
          {isMenuOpen && (
            <div className="lg:hidden border-t border-gray-200 pb-4">
              <div className="flex flex-col pt-3 space-y-2 text-sm font-medium">
                {navLinks.map(link => (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noopener noreferrer' : undefined}
                    className="px-2 py-2 rounded hover:bg-amber-50 hover:text-amber-700"
                  >{link.label}</a>
                ))}
                <div className="flex gap-4 px-2 pt-2">
                  <button className="flex items-center gap-1 text-sm hover:text-amber-700"><User size={18}/> Log in</button>
                  <button className="relative hover:text-amber-700" aria-label="Cart">
                    <ShoppingCart size={22} />
                    <span className="absolute -top-2 -right-2 bg-amber-700 text-white text-[10px] font-semibold px-1.5 py-0.5 rounded-full">0</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Carousel */}
        <section id="hero" className="relative">
          <div className="relative h-[56vh] md:h-[68vh] overflow-hidden">
            {heroSlides.map((slide, idx) => (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-opacity duration-1000 ease-out ${idx === heroIndex ? 'opacity-100 z-10' : 'opacity-0'} `}
                aria-hidden={idx !== heroIndex}
              >
                <img
                  src={slide.image}
                  alt={slide.heading}
                  className="w-full h-full object-cover"
                  draggable={false}
                  onError={handleImageError}
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute inset-0 flex items-center justify-center px-4 text-center">
                  <div className="max-w-2xl">
                    <h1 className="text-white text-3xl md:text-5xl font-light tracking-tight mb-4 drop-shadow">{slide.heading}</h1>
                    <p className="text-white/90 text-sm md:text-base mb-6 md:mb-8">{slide.sub}</p>
                    <a href="#collections" className="inline-block bg-amber-700 hover:bg-amber-600 text-white px-6 py-3 rounded-md text-sm font-medium tracking-wide">Explore Now</a>
                  </div>
                </div>
              </div>
            ))}
            {/* Controls */}
            <button onClick={prevHero} aria-label="Previous" className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white text-gray-800 p-2 rounded-full shadow">
              <ChevronLeft size={20} />
            </button>
            <button onClick={nextHero} aria-label="Next" className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white text-gray-800 p-2 rounded-full shadow">
              <ChevronRight size={20} />
            </button>
            <div className="absolute bottom-4 inset-x-0 flex justify-center gap-2">
              {heroSlides.map((_, i) => (
                <button
                  key={i}
                  aria-label={`Go to slide ${i + 1}`}
                  onClick={() => setHeroIndex(i)}
                  className={`h-2 w-2 rounded-full transition-all ${i === heroIndex ? 'bg-white w-6' : 'bg-white/60 hover:bg-white/90'}`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Categories (Enhanced cards) */}
        <section id="categories" className="max-w-7xl mx-auto px-4 lg:px-8 py-12 md:py-16">
          <div className="flex items-end justify-between mb-8">
            <h2 className="text-3xl md:text-4xl font-light tracking-tight">Categories</h2>
            <a href="#collections" className="hidden md:inline-flex items-center gap-1 text-sm font-medium text-amber-700 hover:text-amber-600 group">
              View All <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </a>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {bestCategories.map(cat => (
              <article key={cat.id} className="group relative rounded-2xl overflow-hidden border border-gray-200 bg-white shadow-sm hover:shadow-lg transition-all cursor-pointer focus-within:ring-2 focus-within:ring-amber-500/60">
                <a href={`#/category/${cat.slug}`} className="absolute inset-0" aria-label={`Browse ${cat.name}`} />
                <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover transition duration-700 ease-out group-hover:scale-110 group-hover:brightness-[1.08]"
                    loading="lazy"
                    onError={handleImageError}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent opacity-70 group-hover:opacity-90 transition-opacity" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 flex flex-col items-start">
                    <h3 className="text-white text-base font-medium tracking-wide drop-shadow-sm flex items-center gap-2">
                      {cat.name}
                      <ArrowRight size={16} className="opacity-0 -translate-x-1 group-hover:translate-x-0 group-hover:opacity-100 transition" />
                    </h3>
                    <p className="text-white/80 text-[11px] mt-1 font-light line-clamp-1">{cat.tagline}</p>
                    <span className="mt-3 inline-flex items-center gap-1 text-[11px] font-medium uppercase tracking-wide text-amber-50/90 bg-white/10 backdrop-blur px-2 py-1 rounded-full border border-white/20">
                      {cat.count} Items
                    </span>
                  </div>
                </div>
                <div className="absolute inset-0 rounded-2xl ring-0 group-hover:ring-1 ring-amber-500/40 pointer-events-none transition" />
              </article>
            ))}
          </div>
        </section>

        {/* Inline Banner Image 1 */}
          {/* Full-Width Feature Banner */}
          <section className="w-full relative bg-black/5">
            <div className="relative w-full h-[55vh] md:h-[65vh] lg:h-[72vh] overflow-hidden group">
              <img
                src={banner1}
                alt="Geetaakshi curated decor showcase"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[3000ms] ease-out group-hover:scale-105"
                loading="lazy"
              />
              {/* Layered gradients for readability */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/25 to-black/10" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10" />
              {/* Content */}
              <div className="relative z-10 h-full flex items-center">
                <div className="px-6 md:px-14 max-w-xl">
                  <h3 className="text-white text-3xl md:text-5xl font-light tracking-tight drop-shadow-sm leading-tight mb-4">Inspired Spaces</h3>
                  <p className="text-white/85 text-sm md:text-base leading-relaxed max-w-md mb-6">Layer gentle light, organic textures and meaningful accents to create a sanctuary that feels intentional and alive.</p>
                  <div className="flex flex-wrap gap-3">
                    <a href="#featured" className="inline-flex items-center gap-2 bg-amber-700 hover:bg-amber-600 text-white text-xs md:text-sm font-medium tracking-wide px-5 py-3 rounded-md shadow">
                      Shop New Arrivals
                    </a>
                    <a href="#collections" className="inline-flex items-center gap-2 bg-white/90 hover:bg-white text-gray-900 text-xs md:text-sm font-medium tracking-wide px-5 py-3 rounded-md shadow border border-white/60">
                      Browse Collections
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

        {/* Featured Products */}
        <section id="featured" className="bg-amber-50/40 border-y border-amber-100">
          <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12 md:py-16">
            <div className="flex items-end justify-between mb-8">
              <h2 className="text-3xl md:text-4xl font-light tracking-tight">Featured Products</h2>
              <a href="#all-products" className="hidden md:inline-flex items-center gap-1 text-sm font-medium text-amber-700 hover:text-amber-600 group">
                View All <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </a>
            </div>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {featuredProducts.map(p => {
                const discount = p.compareAt ? Math.round(((p.compareAt - p.price) / p.compareAt) * 100) : null;
                const roundedRating = p.rating ? Math.round(p.rating) : 0;
                return (
                  <article
                    key={p.id}
                    className="group relative flex flex-col border border-gray-200 rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-lg transition-all focus-within:ring-2 focus-within:ring-amber-500/50"
                  >
                    <div className="relative aspect-square bg-gray-50 overflow-hidden">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-110"
                        loading="lazy"
                        onError={handleImageError}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="absolute top-3 left-3 flex flex-col gap-2">
                        {p.sale && discount && (
                          <span className="bg-rose-600 text-white text-[10px] font-semibold px-2 py-1 rounded shadow">-{discount}%</span>
                        )}
                        {p.tag && !p.sale && (
                          <span className="bg-amber-700 text-white text-[10px] font-semibold px-2 py-1 rounded shadow">{p.tag}</span>
                        )}
                      </div>
                      <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all">
                        <button aria-label="Add to wishlist" className="p-2 rounded-full bg-white/90 backdrop-blur hover:bg-white text-gray-700 shadow border border-white/60 hover:text-rose-600">
                          <Heart size={16} />
                        </button>
                        <button aria-label="Quick view" className="p-2 rounded-full bg-white/90 backdrop-blur hover:bg-white text-gray-700 shadow border border-white/60 hover:text-amber-700">
                          <Eye size={16} />
                        </button>
                      </div>
                    </div>
                    <div className="p-4 flex flex-col flex-1">
                      <h3 className="text-sm font-medium leading-snug line-clamp-2 min-h-[38px]">{p.name}</h3>
                      <div className="mt-2 flex items-center gap-2">
                        <span className="font-semibold text-base text-gray-900">{formatINR(p.price)}</span>
                        {p.compareAt && (
                          <span className="text-xs line-through text-gray-500">{formatINR(p.compareAt)}</span>
                        )}
                      </div>
                      {p.rating && (
                        <div className="mt-2 flex items-center gap-1" aria-label={`${p.rating} star rating`}>
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} size={14} className={i < roundedRating ? 'fill-amber-500 text-amber-500' : 'text-gray-300'} />
                          ))}
                          <span className="ml-1 text-[11px] text-gray-600 font-medium">{p.rating.toFixed(1)}</span>
                        </div>
                      )}
                      {p.reviews && (
                        <div className="mt-1 text-[11px] text-gray-500">{p.reviews} review{p.reviews === 1 ? '' : 's'}</div>
                      )}
                      <div className="mt-4 space-y-2">
                        <button
                          aria-label={`Add ${p.name} to cart`}
                          className="w-full bg-gray-900 text-white text-sm py-2.5 rounded-md font-medium tracking-wide hover:bg-amber-700 transition-colors flex items-center justify-center gap-2"
                        >
                          <ShoppingCart size={16} /> Add to Cart
                        </button>
                        <button
                          aria-label={`View details of ${p.name}`}
                          className="w-full text-[11px] uppercase tracking-wide font-semibold text-amber-700 hover:text-amber-600"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                    <div className="absolute inset-0 rounded-2xl ring-0 group-hover:ring-1 ring-amber-500/40 pointer-events-none transition" />
                  </article>
                );
              })}
            </div>
            <div className="mt-10 md:hidden text-center">
              <a href="#all-products" className="inline-flex items-center gap-1 text-sm font-medium text-amber-700 hover:text-amber-600">
                View All <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </section>

        {/* Exclusive Deals Carousel */}
        <section id="deals" className="max-w-7xl mx-auto px-4 lg:px-8 py-12 md:py-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl md:text-4xl font-light tracking-tight">Exclusive Deals</h2>
            <div className="flex gap-2">
              <button onClick={prevDeal} aria-label="Previous deal" className="p-2 rounded-full border bg-white hover:bg-amber-50 text-gray-700"><ChevronLeft size={18}/></button>
              <button onClick={nextDeal} aria-label="Next deal" className="p-2 rounded-full border bg-white hover:bg-amber-50 text-gray-700"><ChevronRight size={18}/></button>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-2xl shadow-lg h-[42vh] md:h-[55vh]">
            {exclusiveDeals.map((slide, idx) => (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-opacity duration-1000 ease-out ${idx === dealIndex ? 'opacity-100 z-10' : 'opacity-0'} `}
                aria-hidden={idx !== dealIndex}
              >
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-[42vh] md:h-[55vh] object-cover"
                  loading={idx === 0 ? 'eager' : 'lazy'}
                  onError={handleImageError}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />
                <div className="absolute inset-0 flex items-end md:items-center justify-start md:justify-center p-6 md:p-10 text-white">
                  <div className="max-w-xl text-left md:text-center">
                    <h3 className="text-2xl md:text-4xl font-light tracking-tight mb-3 drop-shadow">{slide.title}</h3>
                    <p className="text-sm md:text-base text-white/85 mb-5">{slide.subtitle}</p>
                    <a href="#featured" className="inline-block bg-amber-700 hover:bg-amber-600 text-white px-5 py-2.5 rounded-md text-xs md:text-sm font-medium tracking-wide">Shop Now</a>
                  </div>
                </div>
              </div>
            ))}
            {/* Dots */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
              {exclusiveDeals.map((_, i) => (
                <button
                  key={i}
                  aria-label={`Go to deal slide ${i + 1}`}
                  onClick={() => setDealIndex(i)}
                  className={`h-2 w-2 rounded-full transition-all ${i === dealIndex ? 'bg-white w-6' : 'bg-white/60 hover:bg-white/90'}`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Inline Banner Image 2  */}
          {/* Full-Width Feature Banner */}
          <section className="w-full relative bg-black/5">
            <div className="relative w-full h-[55vh] md:h-[65vh] lg:h-[72vh] overflow-hidden group">
              <img
                src={banner2}
                alt="Geetaakshi curated decor showcase"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[3000ms] ease-out group-hover:scale-105"
                loading="lazy"
              />
              {/* Layered gradients for readability */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/25 to-black/10" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10" />
              {/* Content */}
              <div className="relative z-10 h-full flex items-center">
                <div className="px-6 md:px-14 max-w-xl">
                  <h3 className="text-white text-3xl md:text-5xl font-light tracking-tight drop-shadow-sm leading-tight mb-4">Crafted Ambiance</h3>
                  <p className="text-white/85 text-sm md:text-base leading-relaxed max-w-md mb-6">Handpicked pieces to elevate every corner. Discover warmth, texture and character in a single glance.</p>
                  <div className="flex flex-wrap gap-3">
                    <a href="#featured" className="inline-flex items-center gap-2 bg-amber-700 hover:bg-amber-600 text-white text-xs md:text-sm font-medium tracking-wide px-5 py-3 rounded-md shadow">
                      Shop Featured
                    </a>
                    <a href="#all-products" className="inline-flex items-center gap-2 bg-white/90 hover:bg-white text-gray-900 text-xs md:text-sm font-medium tracking-wide px-5 py-3 rounded-md shadow border border-white/60">
                      Explore All
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

        {/* Testimonials (Improved Carousel) */}
        <section id="testimonials" className="bg-gradient-to-b from-white to-amber-50/40 border-t border-amber-100">
          <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12 md:py-16">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
              <div>
                <h2 className="text-3xl md:text-4xl font-light tracking-tight">What Our Customers Say</h2>
                <p className="text-sm md:text-base text-gray-600 mt-3 max-w-xl">Real impressions from delighted customers who elevated their spaces with our curated decor.</p>
              </div>
              <div className="flex items-center gap-2 self-start md:self-end">
                <button onClick={prevTestimonial} aria-label="Previous testimonial" className="p-2 rounded-full border bg-white hover:bg-amber-50 text-gray-700 disabled:opacity-40 disabled:cursor-not-allowed" disabled={groupedTestimonials.length <= 1}>
                  <ChevronLeft size={18} />
                </button>
                <button onClick={nextTestimonial} aria-label="Next testimonial" className="p-2 rounded-full border bg-white hover:bg-amber-50 text-gray-700 disabled:opacity-40 disabled:cursor-not-allowed" disabled={groupedTestimonials.length <= 1}>
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
            <div
              className="relative overflow-hidden"
              onMouseEnter={() => setIsTestimonialHovered(true)}
              onMouseLeave={() => setIsTestimonialHovered(false)}
            >
              <div
                className="flex transition-transform duration-700 ease-out"
                style={{ transform: `translateX(-${testimonialSlide * 100}%)` }}
              >
                {groupedTestimonials.map((group, idx) => (
                  <div key={idx} className="w-full flex-shrink-0 px-1">
                    <div className={`grid gap-8 ${itemsPerGroup === 2 ? 'md:grid-cols-2' : ''}`}> {/* Responsive grouping */}
                      {group.map(t => (
                        <div
                          key={t.id}
                          className="relative p-6 rounded-xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow group"
                        >
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-amber-500 to-amber-700 text-white flex items-center justify-center text-sm font-semibold shadow-inner">
                                {t.name.split(' ').map(w => w[0]).join('').slice(0,2)}
                              </div>
                              <div>
                                <p className="text-xs font-semibold text-gray-900 leading-tight">{t.name}</p>
                                {t.location && <p className="text-[10px] uppercase tracking-wide text-gray-500">{t.location}</p>}
                              </div>
                            </div>
                            <div className="flex" aria-label={`${t.rating} star rating`}>
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star key={i} size={14} className={i < t.rating ? 'fill-amber-500 text-amber-500' : 'text-gray-300'} />
                              ))}
                            </div>
                          </div>
                          <div className="relative">{/* Quote block */}
                            <Quote size={26} className="absolute -top-3 -left-1 text-amber-200" aria-hidden="true" />
                            <p className="text-sm text-gray-700 leading-relaxed pl-6">{t.text}</p>
                          </div>
                          <div className="mt-4 flex items-center gap-2">
                            {t.verified && <span className="inline-flex items-center px-2 py-0.5 rounded bg-emerald-50 text-emerald-600 border border-emerald-200 text-[10px] font-medium tracking-wide">Verified Buyer</span>}
                          </div>
                          <div className="absolute inset-0 rounded-xl ring-0 group-hover:ring-1 ring-amber-500/40 pointer-events-none transition" />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              {/* Dots */}
              {groupedTestimonials.length > 1 && (
                <div className="flex justify-center gap-2 mt-10">
                  {groupedTestimonials.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setTestimonialSlide(i)}
                      aria-label={`Go to testimonial slide ${i + 1}`}
                      className={`h-2.5 rounded-full transition-all ${i === testimonialSlide ? 'bg-amber-600 w-8' : 'bg-amber-200 w-2.5 hover:bg-amber-300'}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-neutral-950 text-gray-300 text-sm">
        {/* Upper */}
        <div className="max-w-7xl mx-auto px-4 lg:px-8 pt-16 pb-10 grid gap-14 lg:gap-10 md:grid-cols-12">
          {/* Brand */}
            <div className="md:col-span-5 lg:col-span-4 space-y-5">
              <a href="#" className="inline-flex items-center gap-3 group" aria-label="Geetaakshi Deliteful Creations Home">
                <img src={logo} alt="Geetaakshi Deliteful Creations Logo" className="h-28 w-auto object-contain drop-shadow-sm group-hover:scale-105 transition-transform" />
              </a>
              <p className="text-xs leading-relaxed text-gray-400 max-w-sm">Curated decor & ambient accents crafted to elevate living and working spaces with warmth, serenity and character.</p>
              <div className="flex items-center gap-4 pt-1">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="h-9 w-9 flex items-center justify-center rounded-full bg-neutral-800 hover:bg-amber-600 text-gray-300 hover:text-white transition-colors">
                  <Instagram size={18} />
                </a>
              </div>
            </div>
          {/* Links */}
          <nav className="md:col-span-4 lg:col-span-3 grid grid-cols-2 gap-10 text-xs">
            <div>
              <h3 className="text-white font-semibold mb-4 tracking-wide text-[13px]">Company</h3>
              <ul className="space-y-2">
                <li><a href="#about" className="hover:text-white">About Us</a></li>
                <li><a href="#collections" className="hover:text-white">Collections</a></li>
                <li><a href="#best-sellers" className="hover:text-white">Best Sellers</a></li>
                <li><a href="#faq" className="hover:text-white">FAQ's</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4 tracking-wide text-[13px]">Support</h3>
              <ul className="space-y-2">
                <li><a href="#contact" className="hover:text-white">Contact</a></li>
                <li><a href="#shipping" className="hover:text-white">Shipping</a></li>
                <li><a href="#refund" className="hover:text-white">Refunds</a></li>
                <li><a href="#privacy" className="hover:text-white">Privacy</a></li>
              </ul>
            </div>
          </nav>
          {/* Newsletter & Contact */}
          <div className="md:col-span-7 lg:col-span-5 space-y-8">
            <div>
              <h3 className="text-white font-semibold mb-4 tracking-wide text-[13px]">Stay Updated</h3>
              <form className="flex flex-col sm:flex-row gap-3" onSubmit={(e) => { e.preventDefault(); }}>
                <div className="relative flex-1">
                  <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input type="email" required aria-label="Email" placeholder="Enter your email" className="w-full bg-neutral-900/60 border border-neutral-700 focus:border-amber-600 focus:ring-1 focus:ring-amber-600 rounded-md py-2.5 pl-9 pr-3 text-xs placeholder:text-gray-500 text-gray-200 outline-none" />
                </div>
                <button type="submit" className="inline-flex items-center justify-center gap-1 bg-amber-700 hover:bg-amber-600 text-white text-xs font-medium tracking-wide px-5 py-2.5 rounded-md shadow">
                  Subscribe <Send size={14} />
                </button>
              </form>
              <p className="mt-2 text-[10px] text-gray-500">We respect your inbox. Unsubscribe anytime.</p>
            </div>
            <div className="grid sm:grid-cols-2 gap-6 text-xs">
              <div>
                <h4 className="text-white font-semibold mb-3 tracking-wide text-[12px]">Contact</h4>
                <ul className="space-y-2 text-gray-400">
                  <li className="flex items-start gap-2"><MapPin size={14} className="mt-0.5 text-amber-600" /> <span>725/69, Sector-69, Mohali, Punjab – 160062</span></li>
                  <li className="flex items-center gap-2"><Mail size={14} className="text-amber-600" /> <a href="mailto:info@geetakshi.com" className="hover:text-white">info@geetakshi.com</a></li>
                  <li className="flex items-center gap-2"><Phone size={14} className="text-amber-600" /> <a href="tel:+919464522614" className="hover:text-white">+91 94645 22614</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-3 tracking-wide text-[12px]">Payments</h4>
                <div className="flex flex-wrap gap-2 text-[10px] uppercase tracking-wide font-semibold text-gray-400">
                  <span className="px-2 py-1 bg-neutral-800 rounded">Visa</span>
                  <span className="px-2 py-1 bg-neutral-800 rounded">Mastercard</span>
                  <span className="px-2 py-1 bg-neutral-800 rounded">UPI</span>
                  <span className="px-2 py-1 bg-neutral-800 rounded">Rupay</span>
                  <span className="px-2 py-1 bg-neutral-800 rounded">NetBanking</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Lower */}
        <div className="border-t border-neutral-800 py-6">
          <div className="max-w-7xl mx-auto px-4 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-gray-500">© 2025 Geetaakshi Deliteful Creations. All rights reserved.</p>
            <div className="flex items-center gap-4 text-[11px] text-gray-400">
              <a href="#terms" className="hover:text-white">Terms</a>
              <span className="opacity-30">|</span>
              <a href="#privacy" className="hover:text-white">Privacy</a>
              <span className="opacity-30">|</span>
              <a href="#refund" className="hover:text-white">Refunds</a>
            </div>
            <a href="#hero" className="text-[11px] font-medium text-amber-500 hover:text-amber-400">Back to top ↑</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;