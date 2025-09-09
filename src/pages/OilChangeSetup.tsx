import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Settings, Droplets, Clock, Award } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LogoSlideshow from '@/components/LogoSlideshow';

// Import images
import heroImage from '@/assets/oil-change-hero.jpg';
import oilFiltersImage from '@/assets/oil-filters.jpg';
import premiumOilsImage from '@/assets/premium-oils.jpg';
import airfilter from '@/assets/airfilter.png'
import dispstick from '@/assets/dipStick.png'

const OilChangeSetup = () => {
  useEffect(() => {
    // Force scroll to top when page loads - with delay for React Router
    setTimeout(() => window.scrollTo(0, 0), 100);
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target as HTMLElement;
          target.style.opacity = '1';
          target.style.transform = 'translateY(0)';
          target.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        }
      });
    });
    
    const elements = document.querySelectorAll('.scroll-animate');
    elements.forEach((el) => {
      const element = el as HTMLElement;
      element.style.opacity = '0';
      element.style.transform = 'translateY(30px)';
      observer.observe(el);
    });
    
    return () => observer.disconnect();
  }, []);

  const services = [
    {
      icon: Droplets,
      title: "Oil Filters",
      description: "Genuine filters for better engine performance and longevity.",
      image: oilFiltersImage,
      features: ["OEM Quality Filters", "Multi-Brand Compatibility", "Professional Installation", "Filter Quality Guarantee"]
    },
    {
      icon: Award,
      title: "Premium Oils",
      description: "Top-quality oils for long-lasting engine health and performance.",
      image: premiumOilsImage,
      features: ["Synthetic Oils", "Conventional Oils", "High-Mileage Formulas", "Racing Grade Oils"]
    },
    {
      icon: Clock,
      title: "Quick Service",
      description: "Fast oil change without compromising quality or thoroughness.",
      image: airfilter , 
      features: ["15-Minute Service", "While-You-Wait", "No Appointment Needed", "Complete Vehicle Inspection"]
    },
    {
      icon: Settings,
      title: "Multi-Grade Options",
      description: "Oils suitable for every vehicle type and driving condition.",
      image: dispstick, 
      features: ["Multi-Grade Viscosity Options", "Diesel Engine Oils", "Motorcycle Oils", "Heavy Duty Options"]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-96 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center text-white">
            <div className="flex items-center justify-center mb-4">
              <Link 
                to="/" 
                className="inline-flex items-center text-white/80 hover:text-white transition-colors mr-4"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Home
              </Link>
            </div>
            <h1 className="text-5xl font-automotive font-bold mb-4 animate-fade-in">
              Oil Change Setup
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto animate-fade-in">
              Fast, reliable, and high-quality oil change services
            </p>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center scroll-animate mb-16">
            <h2 className="text-4xl font-automotive font-bold text-foreground mb-6">
              Premium Oil Change Services
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              We provide fast, reliable, and high-quality oil change services with premium brands. 
              Our experienced technicians ensure your engine gets the right oil for optimal performance 
              and longevity, using only genuine filters and top-grade lubricants.
            </p>
          </div>
        </div>
      </section>

      {/* Logo Slideshow */}
      <section className="scroll-animate">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-automotive font-bold text-foreground mb-4">
            Trusted Oil Brands We Use
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We stock premium oils from the world's leading manufacturers
          </p>
        </div>
        <LogoSlideshow />
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {services.map((service, index) => (
              <div
                key={index}
                className="scroll-animate bg-card rounded-2xl overflow-hidden shadow-automotive hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 flex items-center text-white">
                    <service.icon className="w-8 h-8 mr-3" />
                    <h3 className="text-2xl font-automotive font-bold">{service.title}</h3>
                  </div>
                </div>
                
                <div className="p-8">
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  
                  <div className="space-y-3">
                    <h4 className="font-semibold text-foreground mb-4">Our Services Include:</h4>
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-primary mr-3"></div>
                        <span className="text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center scroll-animate mb-16">
            <h2 className="text-4xl font-automotive font-bold text-foreground mb-6">
              Why Choose Our Oil Change Service?
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="scroll-animate text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-automotive font-bold text-foreground mb-2">Quick Service</h3>
              <p className="text-muted-foreground">15-minute express oil changes</p>
            </div>
            
            <div className="scroll-animate text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-automotive font-bold text-foreground mb-2">Premium Quality</h3>
              <p className="text-muted-foreground">Top-grade oils and genuine filters</p>
            </div>
            
            <div className="scroll-animate text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Settings className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-automotive font-bold text-foreground mb-2">Expert Technicians</h3>
              <p className="text-muted-foreground">Certified and experienced staff</p>
            </div>
            
            <div className="scroll-animate text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Droplets className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-automotive font-bold text-foreground mb-2">All Vehicles</h3>
              <p className="text-muted-foreground">Cars, SUVs, and motorcycles</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="scroll-animate">
            <h2 className="text-3xl font-automotive font-bold text-primary-foreground mb-6">
              Ready for Your Oil Change?
            </h2>
            <p className="text-primary-foreground/90 text-lg mb-8 max-w-2xl mx-auto">
              Keep your engine running smoothly with our premium oil change service. 
              Quick, reliable, and using only the best oils and filters.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="tel:+923120786259"
                className="btn-automotive bg-secondary hover:bg-secondary/90 transform hover:scale-105 transition-all duration-300 inline-block text-center"
              >
                Call Now: +92-312-0786259
              </a>
              <Link 
                to="/#contact"
                className="btn-automotive bg-transparent border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary transform hover:scale-105 transition-all duration-300"
              >
                Book Service
              </Link>
             
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default OilChangeSetup;