import React from 'react';
import { motion } from 'framer-motion';
import { 
  Bike,
  Facebook,
  Twitter,
   
  Mail,
  Phone
} from 'lucide-react';

const Footer = () => {
  const footerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <motion.footer 
      className="bg-black text-white py-8 lg:py-12"
      initial="hidden"
      animate="visible"
      variants={footerVariants}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Company Info */}
          <motion.div 
            className="space-y-4"
            variants={childVariants}
          >
            <div className="flex items-center space-x-2">
              <Bike className="h-5 w-5 lg:h-6 lg:w-6 text-blue-400" />
              <h3 className="text-lg lg:text-xl font-bold">GreenRide</h3>
            </div>
            <p className="text-sm lg:text-base text-gray-400">
              Discover the best biking routes and adventures around the world.
            </p>
            <div className="flex items-center space-x-2 text-gray-400 text-sm lg:text-base">
              <Phone className="h-4 w-4" />
              <span>+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-400 text-sm lg:text-base">
              <Mail className="h-4 w-4" />
              <span>contact@greenride.com</span>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div 
            className="space-y-4"
            variants={childVariants}
          >
            <h3 className="text-lg lg:text-xl font-bold">Quick Links</h3>
            <ul className="space-y-2 text-sm lg:text-base">
              {['Home', 'About ',    'Contact Support'].map((link) => (
                <motion.li 
                  key={link}
                  whileHover={{ x: 5 }}
                  className="cursor-pointer hover:text-blue-400 transition-colors duration-200"
                >
                  {link}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Social Media */}
          <motion.div 
            className="space-y-4"
            variants={childVariants}
          >
            <h3 className="text-lg lg:text-xl font-bold">Connect With Us</h3>
            <div className="flex space-x-4">
              {[
                { icon: Facebook, color: "#1877f2", link: "https://facebook.com" },
                { icon: Twitter, color: "#1da1f2", link: "https://twitter.com" },
                 
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ 
                    scale: 1.2, 
                    color: social.color,
                    transition: { duration: 0.2 }
                  }}
                  className="p-2 bg-gray-700 rounded-full hover:bg-gray-600 transition-colors duration-200"
                >
                  <social.icon className="h-5 w-5 lg:h-6 lg:w-6" />
                </motion.a>
              ))}
            </div>
             
          </motion.div>
        </div>

         

        {/* Copyright */}
        <motion.div 
          className="mt-12 pt-8 border-t border-gray-700 text-center text-sm lg:text-base text-gray-400"
          variants={childVariants}
        >
          <p>© {new Date().getFullYear()} GreenRide. All rights reserved.</p>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;