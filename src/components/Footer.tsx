import React from "react";
import { Wrench, Phone, Mail, MapPin, Facebook, Instagram } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const footerAnimation = useScrollAnimation("fade-in");

  return (
    <footer
      ref={footerAnimation.ref}
      className={`bg-secondary text-secondary-foreground ${footerAnimation.className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-primary p-2 rounded-lg">
                <Wrench className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h3 className="text-2xl font-automotive font-bold text-primary">
                  Madni Oil Store
                </h3>
                <p className="text-secondary-foreground/80">
                  FROM OIL TO OVERHAUL, WE FIX IT ALL AT MADNI
                </p>
              </div>
            </div>
            <p className="text-secondary-foreground/80 mb-6 max-w-md leading-relaxed">
              Your trusted partner for complete automotive care. We provide
              professional mechanical, electrical, and denting services with
              years of experience and certified technicians.
            </p>

            {/* Social Links */}
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/share/1Y7D3QrQqY/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-secondary-light p-3 rounded-lg hover:bg-primary transition-colors duration-300 group"
              >
                <Facebook className="w-5 h-5 text-secondary-foreground group-hover:text-primary-foreground" />
              </a>
              <a
                href="https://www.instagram.com/madni.oil.store?igsh=a2NmN2xhYXNiaDlv&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-secondary-light p-3 rounded-lg hover:bg-primary transition-colors duration-300 group"
              >
                <Instagram className="w-5 h-5 text-secondary-foreground group-hover:text-primary-foreground" />
              </a>
              <a
                href="https://www.tiktok.com/@madnioilstore?_t=ZS-8zL3V7NQ1vs&_r=1"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-secondary-light p-3 rounded-lg hover:bg-primary transition-colors duration-300 group"
              >
                <svg
                  className="w-5 h-5 text-secondary-foreground group-hover:text-primary-foreground"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-.88-.05A6.33 6.33 0 0 0 5.16 20.5a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.5z" />
                </svg>
              </a>
              <a
                href="https://wa.link/rooodb"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-secondary-light p-3 rounded-lg hover:bg-primary transition-colors duration-300 group"
              >
                <svg
                  className="w-5 h-5 text-secondary-foreground group-hover:text-primary-foreground"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-automotive font-semibold mb-6">
              Services
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#services"
                  className="text-secondary-foreground/80 hover:text-primary transition-colors duration-300"
                >
                  Mechanical Work
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="text-secondary-foreground/80 hover:text-primary transition-colors duration-300"
                >
                  Electrical Work
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="text-secondary-foreground/80 hover:text-primary transition-colors duration-300"
                >
                  Denting & Painting
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="text-secondary-foreground/80 hover:text-primary transition-colors duration-300"
                >
                  Oil Change
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-automotive font-semibold mb-6">
              Contact Info
            </h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="text-secondary-foreground font-medium">
                    +92-312-0786259
                  </p>
                  <p className="text-secondary-foreground/70 text-sm">
                    Mon-Sat: 9AM-9PM
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="text-secondary-foreground font-medium">
                    madnioilstoreandworkshop@gmail.com
                  </p>
                  <p className="text-secondary-foreground/70 text-sm">
                    24/7 Support
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="text-secondary-foreground font-medium">
                    Bedian Road, Workshop Stop,near DHA phase 9 Underpass
                  </p>
                  <p className="text-secondary-foreground/70 text-sm">
                    Lahore, Pakistan
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-secondary-light">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-secondary-foreground/70 text-sm">
              © {currentYear} Madni Oil Store. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <a
                href="#"
                className="text-secondary-foreground/70 hover:text-primary transition-colors duration-300"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-secondary-foreground/70 hover:text-primary transition-colors duration-300"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-secondary-foreground/70 hover:text-primary transition-colors duration-300"
              >
                Warranty
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
