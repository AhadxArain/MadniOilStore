import React from 'react';
import { Link } from 'react-router-dom';
import { Wrench, Zap, Car, Settings } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const Services = () => {
  const headerAnimation = useScrollAnimation('fade-in');
  const ctaAnimation = useScrollAnimation('slide-up', { delay: 200 });

  const services = [
    {
      icon: Wrench,
      title: "Mechanical Work",
      description: "Complete engine diagnostics, repairs, and maintenance services by certified mechanics.",
      features: ["Engine Repair", "Transmission Service", "Brake Systems", "Suspension Work"]
    },
    {
      icon: Zap,
      title: "Electrical Work",
      description: "Professional automotive electrical services and electronic system diagnostics.",
      features: ["Battery Service", "Alternator Repair", "Wiring Systems", "ECU Diagnostics"]
    },
    {
      icon: Car,
      title: "Denting & Painting",
      description: "Professional bodywork and paint services to restore your vehicle's appearance.",
      features: ["Dent Removal", "Paint Matching", "Bodywork", "Scratch Repair"]
    },
    {
      icon: Settings,
      title: "Oil Change Setup",
      description: "Quick and professional oil change services with premium quality engine oils.",
      features: ["Oil Filters", "Premium Oils", "Quick Service", "Multi-Grade Options"]
    }
  ];

  return (
    <section id="services" className="py-20 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={headerAnimation.ref} className={`text-center mb-16 ${headerAnimation.className}`}>
          <h2 className="text-4xl md:text-5xl font-automotive font-bold text-foreground mb-4">
            Our Services
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Professional automotive services with the latest equipment and certified technicians
          </p>
          <div className="w-24 h-1 bg-primary mx-auto mt-6"></div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => {
            const serviceAnimation = useScrollAnimation('fade-in', { delay: index * 100 });
            
            return (
              <div
                key={index}
                ref={serviceAnimation.ref}
                className={`service-card group ${serviceAnimation.className}`}
              >
              {/* Icon */}
              <div className="bg-primary/10 w-16 h-16 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary transition-colors duration-300">
                <service.icon className="w-8 h-8 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-automotive font-bold text-foreground mb-3">
                {service.title}
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {service.description}
              </p>

              {/* Features */}
              <ul className="space-y-2">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-sm text-muted-foreground">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Learn More Button */}
              <div className="mt-6 pt-6 border-t border-border">
                <Link 
                  to={
                    service.title === "Mechanical Work" ? "/mechanical-work" :
                    service.title === "Electrical Work" ? "/electrical-work" :
                    service.title === "Denting & Painting" ? "/denting-painting" :
                    service.title === "Oil Change Setup" ? "/oil-change-setup" : "#"
                  }
                  onClick={() => {
                    // Force scroll to top on navigation
                    setTimeout(() => window.scrollTo(0, 0), 0);
                  }}
                  className="text-primary hover:text-primary-dark font-semibold transition-colors duration-300"
                >
                  Learn More →
                </Link>
              </div>
            </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div ref={ctaAnimation.ref} className={`text-center mt-16 ${ctaAnimation.className}`}>
          <div className="bg-gradient-primary p-8 rounded-2xl shadow-automotive">
            <h3 className="text-2xl font-automotive font-bold text-primary-foreground mb-4">
              Need Immediate Service?
            </h3>
            <p className="text-primary-foreground/90 mb-6 max-w-2xl mx-auto">
              Contact us today for fast, reliable automotive services. We're here to keep your vehicle running at its best.
            </p>
            <a 
                href="tel:+923120786259"
                className="btn-automotive bg-secondary hover:bg-secondary/90 transform hover:scale-105 transition-all duration-300 inline-block text-center"
              >
                Call Now: +92-312-0786259
              </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;