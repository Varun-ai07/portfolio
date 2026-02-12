import { Github, Linkedin, Mail, Twitter } from 'lucide-react';
import { motion } from 'framer-motion';
import { SOCIAL_LINKS, FOOTER_DATA } from '@/lib/constants';

const Footer = () => {
  return (
    <motion.footer
      id="contact"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
      className="bg-black text-white w-full pt-20 pb-10 overflow-hidden"
    >
      <div className="container mx-auto px-6 md:px-20 max-w-[1440px]">

        {/* Bottom Connect Section: Centered Buttons */}
        <div className="flex flex-col items-center justify-center mb-32">
          {/* Animated Title */}
          <motion.h5
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-[14px] font-medium uppercase tracking-[0.3em] text-[#999999] mb-10 font-unique relative"
          >
            <motion.span
              animate={{
                textShadow: [
                  "0 0 10px rgba(163, 255, 0, 0.3)",
                  "0 0 20px rgba(163, 255, 0, 0.6)",
                  "0 0 10px rgba(163, 255, 0, 0.3)",
                ]
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-10"
            >
              {FOOTER_DATA.eyebrow}
            </motion.span>
            {/* Shimmer overlay */}
            <span className="absolute inset-0 text-shimmer opacity-50">
              {FOOTER_DATA.eyebrow}
            </span>
          </motion.h5>

          {/* Animated Button Grid */}
          <motion.div
            className="flex flex-wrap justify-center gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.15,
                  delayChildren: 0.2
                }
              }
            }}
          >
            {SOCIAL_LINKS.map((link, index) => (
              <motion.a
                key={index}
                href={link.href}
                target={link.name !== "Email" ? "_blank" : undefined}
                rel={link.name !== "Email" ? "noopener noreferrer" : undefined}
                variants={{
                  hidden: { opacity: 0, y: 30, scale: 0.9 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: {
                      type: "spring",
                      stiffness: 100,
                      damping: 15
                    }
                  }
                }}
                whileHover={{
                  scale: 1.05,
                  y: -5,
                  boxShadow: "0 10px 30px rgba(163, 255, 0, 0.3)"
                }}
                whileTap={{ scale: 0.95 }}
                className="group relative flex items-center gap-4 px-10 py-5 border border-[#333333] bg-[#0D0D0D] hover:bg-[#A3FF00] hover:border-[#A3FF00] transition-all duration-500 rounded-[2px] overflow-hidden"
              >
                {/* Animated background glow */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-[#A3FF00]/0 via-[#A3FF00]/20 to-[#A3FF00]/0"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                />

                {/* Icon - Static */}
                <div className="text-white group-hover:text-black transition-colors relative z-10">
                  {link.icon}
                </div>

                {/* Text */}
                <span className="text-[16px] font-bold uppercase tracking-widest text-white group-hover:text-black transition-colors font-professional relative z-10">
                  {link.name}
                </span>

                {/* Corner accents */}
                <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-transparent group-hover:border-black transition-all duration-300" />
                <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-transparent group-hover:border-black transition-all duration-300" />
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* Bottom Bar: Copyright & Credit */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center text-[#444444] text-[13px] border-t border-[#111111] font-professional">
          <div className="mb-4 md:mb-0 uppercase tracking-[0.1em] font-medium">
            {FOOTER_DATA.copyright}
          </div>
          <div className="flex gap-8">
            <span className="text-[#A3FF00]/60 uppercase tracking-[0.1em] font-medium">
              {FOOTER_DATA.subtext}
            </span>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
