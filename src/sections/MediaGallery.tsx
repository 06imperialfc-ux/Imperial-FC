import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Camera, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { mediaGalleryConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

const MediaGallery = () => {
  // Null check
  if (!mediaGalleryConfig.images || mediaGalleryConfig.images.length === 0) {
    return null;
  }

  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        headerRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Gallery items fade in
      gsap.fromTo(
        galleryRef.current?.children || [],
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: galleryRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Masonry layout - different heights for visual interest
  const getItemHeight = (index: number) => {
    const heights = ['h-64', 'h-80', 'h-56', 'h-72', 'h-64', 'h-80'];
    return heights[index % heights.length];
  };

  const openLightbox = (index: number) => {
    setSelectedImage(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  const navigateLightbox = (direction: 'prev' | 'next') => {
    if (selectedImage === null) return;
    const newIndex = direction === 'prev' 
      ? (selectedImage - 1 + mediaGalleryConfig.images.length) % mediaGalleryConfig.images.length
      : (selectedImage + 1) % mediaGalleryConfig.images.length;
    setSelectedImage(newIndex);
  };

  return (
    <section
      ref={sectionRef}
      id="media"
      className="relative w-full min-h-screen bg-imperial-void py-20 px-4 md:px-8 lg:px-16"
    >
      {/* Section Header */}
      <div ref={headerRef} className="max-w-7xl mx-auto mb-16">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-2 h-2 bg-imperial-yellow" />
          <span className="font-mono-custom text-xs text-imperial-yellow uppercase tracking-[0.2em]">
            {mediaGalleryConfig.sectionLabel}
          </span>
        </div>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <h2 className="font-aggressive text-4xl md:text-5xl lg:text-6xl text-white">
            {mediaGalleryConfig.sectionTitle}
          </h2>
          <div className="flex items-center gap-2 text-white/50">
            <Camera className="w-5 h-5" />
            <span className="font-mono-custom text-sm">{mediaGalleryConfig.images.length} Photos</span>
          </div>
        </div>
      </div>

      {/* Masonry Grid */}
      <div
        ref={galleryRef}
        className="max-w-7xl mx-auto columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4"
      >
        {mediaGalleryConfig.images.map((image, index) => (
          <div
            key={image.id}
            className="break-inside-avoid group relative overflow-hidden cursor-pointer bevel-sm"
            onClick={() => openLightbox(index)}
          >
            <div className={`relative ${getItemHeight(index)} overflow-hidden`}>
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Title on hover */}
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <p className="font-aggressive text-lg text-white">{image.title}</p>
                <p className="font-mono-custom text-xs text-imperial-yellow/70 mt-1">{image.alt}</p>
              </div>

              {/* Corner accent */}
              <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-imperial-yellow opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {selectedImage !== null && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button 
            className="absolute top-6 right-6 w-12 h-12 bg-imperial-yellow/10 border border-imperial-yellow/30 flex items-center justify-center bevel-sm hover:bg-imperial-yellow/20 transition-colors z-10"
            onClick={closeLightbox}
          >
            <X className="w-6 h-6 text-imperial-yellow" />
          </button>

          {/* Navigation */}
          <button 
            className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-imperial-yellow/10 border border-imperial-yellow/30 flex items-center justify-center bevel-sm hover:bg-imperial-yellow/20 transition-colors z-10"
            onClick={(e) => { e.stopPropagation(); navigateLightbox('prev'); }}
          >
            <ChevronLeft className="w-6 h-6 text-imperial-yellow" />
          </button>
          <button 
            className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-imperial-yellow/10 border border-imperial-yellow/30 flex items-center justify-center bevel-sm hover:bg-imperial-yellow/20 transition-colors z-10"
            onClick={(e) => { e.stopPropagation(); navigateLightbox('next'); }}
          >
            <ChevronRight className="w-6 h-6 text-imperial-yellow" />
          </button>

          {/* Image */}
          <div 
            className="max-w-5xl max-h-[80vh] px-20"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={mediaGalleryConfig.images[selectedImage].src}
              alt={mediaGalleryConfig.images[selectedImage].alt}
              className="max-w-full max-h-[70vh] object-contain bevel-md"
            />
            <div className="mt-4 text-center">
              <p className="font-aggressive text-2xl text-white">{mediaGalleryConfig.images[selectedImage].title}</p>
              <p className="font-mono-custom text-sm text-imperial-yellow/70 mt-1">
                {selectedImage + 1} / {mediaGalleryConfig.images.length}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-imperial-yellow/30 to-transparent" />
      <div className="absolute top-40 right-8 w-24 h-24 border-r-2 border-t-2 border-imperial-yellow/10" />
    </section>
  );
};

export default MediaGallery;
