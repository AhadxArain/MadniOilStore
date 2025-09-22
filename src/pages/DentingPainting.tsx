import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Car, Paintbrush, Shield, Sparkles } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Import images
import heroImage from '@/assets/denting-painting-hero.jpg';
import dentRemovalImage from '@/assets/dent-removal.jpg';
import paintMatchingImage from '@/assets/paint-matching.jpg';

const DentingPainting = () => {
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
      icon: Shield,
      title: "Dent Removal",
      description: "Professional dent pulling without damaging paint using advanced techniques.",
      image: dentRemovalImage,
      features: ["Paintless Dent Repair", "Traditional Dent Removal", "Body Panel Straightening", "Hail Damage Repair"]
    },
    {
      icon: Paintbrush,
      title: "Paint Matching",
      description: "Advanced color matching for seamless finish that blends perfectly.",
      image: paintMatchingImage,
      features: ["Computer Color Matching", "Touch-Up Paint", "Full Panel Painting", "Clear Coat Application"]
    },
    {
      icon: Car,
      title: "Bodywork",
      description: "Structural repairs and refinishing to restore your vehicle's appearance.",
      image: dentRemovalImage, // Reusing image for now
      features: ["Body Panel Replacement", "Rust Repair", "Collision Repair", "Frame Straightening"]
    },
    {
      icon: Sparkles,
      title: "Scratch Repair",
      description: "Small and deep scratch removal for a smooth, like-new look.",
      image: paintMatchingImage, // Reusing image for now
      features: ["Surface Scratch Removal", "Deep Scratch Repair", "Key Scratch Repair", "Paint Protection"]
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
              Denting & Painting
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto animate-fade-in">
              Professional bodywork and paint services to restore your vehicle's beauty
            </p>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center scroll-animate mb-16">
            <h2 className="text-4xl font-automotive font-bold text-foreground mb-6">
              Restore Your Vehicle's Beauty
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              We restore your car's body to look brand new with expert denting and painting services. 
              Our skilled technicians use advanced techniques and high-quality materials to ensure 
              a perfect finish that matches your vehicle's original appearance.
            </p>
          </div>
        </div>
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

      {/* Before/After Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center scroll-animate mb-16">
            <h2 className="text-4xl font-automotive font-bold text-foreground mb-6">
              Quality You Can See
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our expert craftsmanship transforms damaged vehicles back to their original beauty
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="scroll-animate text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-automotive font-bold text-foreground mb-2">Professional Assessment</h3>
              <p className="text-muted-foreground">Detailed evaluation of damage and repair requirements</p>
            </div>
            
            <div className="scroll-animate text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Paintbrush className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-automotive font-bold text-foreground mb-2">Expert Repair</h3>
              <p className="text-muted-foreground">Skilled technicians using advanced tools and techniques</p>
            </div>
            
            <div className="scroll-animate text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-automotive font-bold text-foreground mb-2">Perfect Finish</h3>
              <p className="text-muted-foreground">Flawless results that restore your vehicle's appearance</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="scroll-animate">
            <h2 className="text-3xl font-automotive font-bold text-primary-foreground mb-6">
              Ready to Restore Your Vehicle?
            </h2>
            <p className="text-primary-foreground/90 text-lg mb-8 max-w-2xl mx-auto">
              Get a professional assessment and quote for your denting and painting needs. 
              We'll make your vehicle look like new again.
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
                Get Free Quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default DentingPainting;