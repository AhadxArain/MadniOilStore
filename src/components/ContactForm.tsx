import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import emailjs from '@emailjs/browser';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const headerAnimation = useScrollAnimation('fade-in');
  const contactInfoAnimation = useScrollAnimation('slide-in-left', { delay: 200 });
  const formAnimation = useScrollAnimation('slide-in-right', { delay: 300 });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Replace these with your EmailJS credentials
      const serviceID = 'service_56l6f5v';
      const templateID = 'template_7j44soi';
      const publicKey = 'FDvEVtgZavk4Bmwe-';

      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        service: formData.service,
        message: formData.message,
        to_email: 'madnioilstoreandworkshop@gmail.com'
      };

      await emailjs.send(serviceID, templateID, templateParams, publicKey);
      
      toast({
        title: "Message Sent Successfully!",
        description: "We'll get back to you within 24 hours.",
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: ''
      });
    } catch (error) {
      console.error('EmailJS Error:', error);
      toast({
        title: "Failed to Send Message",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Call Us",
      details: "+92-312-0786259",
      subtitle: "Mon-Sat: 9AM-9PM"
    },
    {
      icon: Mail,
      title: "Email Us",
      details: "madnioilstoreandworkshop@gmail.com",
      subtitle: "24/7 Support"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      details: "Bedian Road, Workshop Stop,near DHA phase 9 Underpass",
      subtitle: "Lahore, Pakistan"
    }
  ];

  return (
    <section id="contact" className="py-20 bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={headerAnimation.ref} className={`text-center mb-16 ${headerAnimation.className}`}>
          <h2 className="text-4xl md:text-5xl font-automotive font-bold text-secondary-foreground mb-4">
            Get In Touch
          </h2>
          <p className="text-xl text-secondary-foreground/80 max-w-3xl mx-auto">
            Ready to service your vehicle? Contact us today for a quote or to schedule an appointment
          </p>
          <div className="w-24 h-1 bg-primary mx-auto mt-6"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div ref={contactInfoAnimation.ref} className={`space-y-8 ${contactInfoAnimation.className}`}>
            {contactInfo.map((info, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="bg-primary p-3 rounded-lg flex-shrink-0">
                  <info.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-secondary-foreground mb-1">
                    {info.title}
                  </h3>
                  <p className="text-primary font-medium mb-1">
                    {info.details}
                  </p>
                  <p className="text-secondary-foreground/70 text-sm">
                    {info.subtitle}
                  </p>
                </div>
              </div>
            ))}

            {/* Business Hours */}
            <div className="bg-secondary-light p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-secondary-foreground mb-4">
                Business Hours
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-secondary-foreground/80">Monday - Friday</span>
                  <span className="text-secondary-foreground font-medium">9:00 AM - 9:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondary-foreground/80">Saturday</span>
                  <span className="text-secondary-foreground font-medium">9:00 AM - 8:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondary-foreground/80">Sunday</span>
                  <span className="text-primary font-medium">11:00 AM - 6:00 PM</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div ref={formAnimation.ref} className={`lg:col-span-2 ${formAnimation.className}`}>
            <form onSubmit={handleSubmit} className="bg-background p-8 rounded-2xl shadow-xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                    placeholder="+92-XXX-XXXXXXX"
                  />
                </div>
                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-foreground mb-2">
                    Service Needed
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                  >
                    <option value="">Select a service</option>
                    <option value="mechanical">Mechanical Work</option>
                    <option value="electrical">Electrical Work</option>
                    <option value="denting">Denting & Painting</option>
                    <option value="oil-change">Oil Change</option>
                    <option value="general">General Inspection</option>
                  </select>
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 resize-vertical"
                  placeholder="Please describe your vehicle's issues or service requirements..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-automotive w-full flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                <Send className="w-5 h-5" />
                <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
