import React from 'react';
import { Shield, Clock, Users, Award } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const About = () => {
  const contentAnimation = useScrollAnimation('slide-in-left');
  const statsAnimation = useScrollAnimation('slide-in-right', { delay: 200 });
  const guaranteeAnimation = useScrollAnimation('scale-in', { delay: 400 });

  const features = [
    {
      icon: Shield,
      title: "Quality Assurance",
      description: "Certified technicians using premium parts and industry-standard procedures"
    },
    {
      icon: Clock,
      title: "Fast Service",
      description: "Quick turnaround times without compromising on quality workmanship"
    },
    {
      icon: Users,
      title: "Expert Team",
      description: "Experienced mechanics specializing in all automotive systems"
    },
    {
      icon: Award,
      title: "Trusted Service",
      description: "Years of experience serving the local automotive community"
    }
  ];

  return (
    <section id="about" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div ref={contentAnimation.ref} className={contentAnimation.className}>
            <h2 className="text-4xl md:text-5xl font-automotive font-bold text-foreground mb-6">
              Why Choose <span className="text-primary">Madni Oil Store</span>?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              With years of experience in the automotive industry, Madni Oil Store has established itself 
              as a trusted name for comprehensive car care services. We combine traditional craftsmanship 
              with modern technology to deliver exceptional results.
            </p>
            
            <div className="space-y-6 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-3 rounded-lg flex-shrink-0">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <button 
              className="btn-automotive"
              onClick={() => {
                const event = new CustomEvent('openChatWithMessage', {
                  detail: { 
                    message: "Hello! I would like to learn more about Madni Oil Store and the services you offer."
                  }
                });
                window.dispatchEvent(event);
              }}
            >
              Learn More About Us
            </button>
          </div>

          {/* Stats */}
          <div ref={statsAnimation.ref} className={statsAnimation.className}>
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center p-6 bg-card rounded-xl shadow-card">
                <div className="text-3xl font-automotive font-bold text-primary mb-2">500+</div>
                <div className="text-muted-foreground">Happy Customers</div>
              </div>
              <div className="text-center p-6 bg-card rounded-xl shadow-card">
                <div className="text-3xl font-automotive font-bold text-primary mb-2">10+</div>
                <div className="text-muted-foreground">Years Experience</div>
              </div>
              <div className="text-center p-6 bg-card rounded-xl shadow-card">
                <div className="text-3xl font-automotive font-bold text-primary mb-2">Expert Team</div>
                <div className="text-muted-foreground">Skilled Technicians</div>
              </div>
              <div className="text-center p-6 bg-card rounded-xl shadow-card">
                <div className="text-3xl font-automotive font-bold text-primary mb-2">100%</div>
                <div className="text-muted-foreground">Satisfaction Rate</div>
              </div>
            </div>

            {/* Call to Action Box */}
            <div 
              ref={guaranteeAnimation.ref} 
              className={`mt-8 p-6 bg-secondary rounded-xl text-center ${guaranteeAnimation.className}`}
            >
              <h3 className="text-xl font-automotive font-bold text-secondary-foreground mb-3">
                Professional Service Guarantee
              </h3>
              <p className="text-secondary-foreground/90 mb-4">
                We stand behind our work with comprehensive warranties and quality guarantees.
              </p>
              <div className="flex justify-center space-x-4">
                <div className="text-center">
                  <div className="text-primary text-lg font-bold">✓</div>
                  <div className="text-xs text-secondary-foreground/80">Warranty</div>
                </div>
                <div className="text-center">
                  <div className="text-primary text-lg font-bold">✓</div>
                  <div className="text-xs text-secondary-foreground/80">Quality</div>
                </div>
                <div className="text-center">
                  <div className="text-primary text-lg font-bold">✓</div>
                  <div className="text-xs text-secondary-foreground/80">Trust</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;