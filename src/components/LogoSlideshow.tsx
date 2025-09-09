import React, { useState, useEffect } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

// Import your custom logos
import amsOilLogo from '@/assets/slideshow-brand-logos/ams-oil.svg';
import caltexDeloLogo from '@/assets/slideshow-brand-logos/caltex-delo.jpg';
import enocLogo from '@/assets/slideshow-brand-logos/enoc.svg';
import hondaLogo from '@/assets/slideshow-brand-logos/honda.svg';
import kendallLogo from '@/assets/slideshow-brand-logos/kendall.png';
import kixxLogo from '@/assets/slideshow-brand-logos/kixx.svg';
import koyamaLogo from '@/assets/slideshow-brand-logos/koyama.png';
import petronasLogo from '@/assets/slideshow-brand-logos/petronas.svg';
import shellLogo from '@/assets/slideshow-brand-logos/shell.svg';
import suzukiLogo from '@/assets/slideshow-brand-logos/suzuki.svg';
import totalLogo from '@/assets/slideshow-brand-logos/total.svg';
import toyotaLogo from '@/assets/slideshow-brand-logos/toyota.svg';
import wolfLogo from '@/assets/slideshow-brand-logos/wolf.png';
import zicLogo from '@/assets/slideshow-brand-logos/zic.png';

const LogoSlideshow = () => {
  const slideshowAnimation = useScrollAnimation('fade-in');
  const [isMobile, setIsMobile] = useState(false);

  // Screen size detection for responsive behavior
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const brands = [
    { name: 'AMS Oil', logo: amsOilLogo },
    { name: 'Caltex Delo', logo: caltexDeloLogo },
    { name: 'ENOC', logo: enocLogo },
    { name: 'Honda', logo: hondaLogo },
    { name: 'Kendall', logo: kendallLogo },
    { name: 'KIXX', logo: kixxLogo },
    { name: 'Koyama', logo: koyamaLogo },
    { name: 'Petronas', logo: petronasLogo },
    { name: 'Shell', logo: shellLogo },
    { name: 'Suzuki', logo: suzukiLogo },
    { name: 'Total', logo: totalLogo },
    { name: 'Toyota', logo: toyotaLogo },
    { name: 'Wolf', logo: wolfLogo },
    { name: 'ZIC', logo: zicLogo }
  ];

  // Consistent logo component with responsive sizing
  const LogoComponent = ({ brand, keyPrefix }: { brand: { name: string; logo: string }; keyPrefix: string }) => (
    <div
      className="flex-shrink-0 bg-card rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 hover:bg-primary/5 group flex items-center justify-center
                 w-16 sm:w-20 md:w-28 lg:w-36 
                 h-10 sm:h-12 md:h-16 lg:h-20 
                 p-1 sm:p-2 md:p-3 lg:p-4"
    >
      <div className="group-hover:scale-110 transition-transform duration-300 w-full h-full flex items-center justify-center">
        <img 
          src={brand.logo} 
          alt={brand.name} 
          className="max-h-full max-w-full object-contain filter brightness-90 group-hover:brightness-100 transition-all duration-300"
        />
      </div>
    </div>
  );

  // Calculate total width needed for all logos to determine proper animation duration
  const logoWidth = isMobile ? 64 : 112; // w-16 (64px) mobile, w-28 (112px) desktop base
  const logoGap = isMobile ? 8 : 16; // gap between logos
  const totalLogosWidth = (logoWidth + logoGap) * brands.length;
  
  // Animation duration calculated to ensure all logos are visible
  const animationDuration = isMobile 
    ? Math.max(25, totalLogosWidth / 50) // Minimum 25s, or based on width
    : Math.max(35, totalLogosWidth / 40); // Minimum 35s, or based on width

  return (
    <div 
      ref={slideshowAnimation.ref} 
      className={`w-full overflow-hidden bg-gradient-to-r from-muted/50 to-muted py-8 md:py-12 ${slideshowAnimation.className}`}
    >
      <div className="relative">
        {/* Enhanced gradient overlays for seamless effect */}
        <div className="absolute left-0 top-0 w-16 sm:w-24 md:w-32 h-full bg-gradient-to-r from-muted via-muted/90 to-transparent z-10"></div>
        <div className="absolute right-0 top-0 w-16 sm:w-24 md:w-32 h-full bg-gradient-to-l from-muted via-muted/90 to-transparent z-10"></div>
        
        {/* Sliding container with calculated animation duration */}
        <div 
          className="flex"
          style={{
            gap: isMobile ? '0.5rem' : '1rem', // 8px mobile, 16px desktop
            animation: `slideRight ${animationDuration}s linear infinite`,
          }}
        >
          {/* First set of logos */}
          {brands.map((brand, index) => (
            <LogoComponent key={`first-${index}`} brand={brand} keyPrefix="first" />
          ))}
          {/* Duplicate set for seamless loop */}
          {brands.map((brand, index) => (
            <LogoComponent key={`second-${index}`} brand={brand} keyPrefix="second" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LogoSlideshow;