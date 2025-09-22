import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Wrench, Settings, Hammer, Cog } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Import images
import heroImage from '@/assets/mechanical-work-hero.jpg';
import engineRepairImage from '@/assets/engine-repair.jpg';
import transmissionImage from '@/assets/transmission-service.jpg';
import brakeSystemsImage from '@/assets/brake-systems.jpg';
import suspensionImage from '@/assets/suspension-work.jpg';

const MechanicalWork = () => {
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
      icon: Wrench,
      title: "Engine Repair",
      description: "Complete engine diagnostics, repairs, and maintenance by experienced technicians.",
      image: engineRepairImage,
      features: ["Diagnostic Testing", "Component Replacement", "Performance Tuning", "Regular Maintenance"]
    },
    {
      icon: Settings,
      title: "Transmission Service",
      description: "Comprehensive inspection and repair of transmission systems.",
      image: transmissionImage,
      features: ["Transmission Fluid", "Gear System Repair", "Clutch Replacement", "Performance Check"]
    },
    {
      icon: Hammer,
      title: "Brake Systems",
      description: "Inspection, maintenance, and replacement of brake pads, discs, and fluid.",
      image: brakeSystemsImage,
      features: ["Brake Pad Replacement", "Disc Resurfacing", "Brake Fluid Service", "Safety Inspection"]
    },
    {
      icon: Cog,
      title: "Suspension Work",
      description: "Repair and maintenance of car suspension systems for smooth driving.",
      image: suspensionImage,
      features: ["Shock Absorbers", "Spring Replacement", "Alignment Check", "Ride Quality"]
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
              Mechanical Work
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto animate-fade-in">
              Professional mechanical services with precision and expertise
            </p>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center scroll-animate mb-16">
            <h2 className="text-4xl font-automotive font-bold text-foreground mb-6">
              Expert Mechanical Services
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Our certified mechanics handle all types of mechanical issues with precision and care. 
              From engines to suspensions, we provide complete solutions using the latest diagnostic 
              equipment and genuine parts to ensure your vehicle runs at peak performance.
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

      {/* Call to Action */}
      <section className="py-20 bg-gradient-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="scroll-animate">
            <h2 className="text-3xl font-automotive font-bold text-primary-foreground mb-6">
              Need Mechanical Service Today?
            </h2>
            <p className="text-primary-foreground/90 text-lg mb-8 max-w-2xl mx-auto">
              Our expert mechanics are ready to diagnose and fix your vehicle's mechanical issues. 
              Contact us for professional service you can trust.
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

export default MechanicalWork;