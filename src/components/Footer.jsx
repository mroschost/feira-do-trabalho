import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, ExternalLink } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import logofeira from '../assets/logos/feira.webp';
import logoAcolher from '../assets/logos/logo_acolher.avif';
import logoSedet from '../assets/logos/logo_sedet.png';
import logoEconomiaSolidaria from '../assets/logos/logo_economia_solidaria.png';

const Footer = () => {
  const {
    toast
  } = useToast();
  const handleSocialClick = platform => {
    toast({
      title: "🚧 Link em breve!",
      description: `O link para ${platform} estará disponível em breve!`,
      duration: 3000
    });
  };
  const handleWhatsAppClick = () => {
    window.open('https://wa.me/5561992675677', '_blank', 'noopener,noreferrer');
  };
  const handleEmailClick = () => {
    window.open('mailto:contato@feiracampodf.gov.br', '_blank', 'noopener,noreferrer');
  };
  return <footer className="bg-[#3FA637] text-white">
      <div className="container px-4 py-12 mx-auto">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Logo e Descrição */}
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6
        }} viewport={{
          once: true
        }} className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              {/* <img className="w-auto h-12 p-1 rounded-md bg-green" alt="Logo Economia Solidária" src="https://horizons-cdn.hostinger.com/718b8f64-1940-429b-a87c-9e47a937b76f/logo_-feira-do-trabalho-e-do-campo_completa-copiar-Uz5t4.webp" /> */}
              <div>
                <span className="text-xl font-bold">Institudo Acolher</span>
              </div>
            </div>
            <p className="max-w-md mb-6 text-green-100">
              Conectando conhecimentos e incentivando o empreendedorismo local.
            </p>
            
            {/* Redes Sociais */}
            <div className="flex gap-4">
              <button onClick={() => window.open('https://www.instagram.com/instituto_acolherdf?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==', '_blank', 'noopener,noreferrer')} className="p-3 transition-colors duration-200 rounded-full bg-white/10 hover:bg-white/20" aria-label="Instagram">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </button>
              <button onClick={() => handleSocialClick('Facebook')} className="p-3 transition-colors duration-200 rounded-full bg-white/10 hover:bg-white/20" aria-label="Facebook">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </button>
              <button onClick={() => handleSocialClick('YouTube')} className="p-3 transition-colors duration-200 rounded-full bg-white/10 hover:bg-white/20" aria-label="YouTube">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </button>
            </div>
          </motion.div>

          {/* Contato */}
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6,
          delay: 0.2
        }} viewport={{
          once: true
        }}>
            <span className="block mb-4 text-lg font-semibold">Contato</span>
            <div className="space-y-3">
              <button onClick={handleWhatsAppClick} className="flex items-center gap-3 text-green-100 transition-colors hover:text-white group">
                <Phone className="w-5 h-5" />
                <span>(61) 99267-5677</span>
                <ExternalLink className="w-4 h-4 transition-opacity opacity-0 group-hover:opacity-100" />
              </button>
              <button onClick={handleEmailClick} className="flex items-center gap-3 text-green-100 transition-colors hover:text-white group">
                <Mail className="w-5 h-5" />
                <span>projetosinstitutoacolher@gmail.com</span>
                <ExternalLink className="w-4 h-4 transition-opacity opacity-0 group-hover:opacity-100" />
              </button>
            </div>
          </motion.div>

          {/* Realizacáo */}
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6,
          delay: 0.4
        }} viewport={{
          once: true
        }}>
            <span className="block mb-4 text-lg font-semibold">Realização</span>
            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <li className="flex items-center justify-center h-24 p-4 transition-colors bg-white/10 hover:bg-white/15 rounded-xl ring-1 ring-white/10">
                <img
                  src={logofeira}
                  alt="Feira do Trabalho e do Campo DF"
                  className="object-contain w-auto max-h-12"
                  loading="lazy"
                  decoding="async"
                />
              </li>
              <li className="flex items-center justify-center h-24 p-4 transition-colors bg-white/10 hover:bg-white/15 rounded-xl ring-1 ring-white/10">
                <img
                  src={logoAcolher}
                  alt="Instituto Acolher"
                  className="object-contain w-auto max-h-12"
                  loading="lazy"
                  decoding="async"
                />
              </li>
              <li className="flex items-center justify-center h-24 p-4 transition-colors bg-white/10 hover:bg-white/15 rounded-xl ring-1 ring-white/10">
                <img
                  src={logoEconomiaSolidaria}
                  alt="Economia Solidária"
                  className="object-contain w-auto max-h-12"
                  loading="lazy"
                  decoding="async"
                />
              </li>
              <li className="flex items-center justify-center h-24 p-4 transition-colors bg-white/10 hover:bg-white/15 rounded-xl ring-1 ring-white/10">
                <img
                  src={logoSedet}
                  alt="SEDET/DF"
                  className="object-contain w-auto max-h-12"
                  loading="lazy"
                  decoding="async"
                />
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div initial={{
        opacity: 0
      }} whileInView={{
        opacity: 1
      }} transition={{
        duration: 0.6,
        delay: 0.6
      }} viewport={{
        once: true
      }} className="pt-8 mt-8 text-center border-t border-green-600">
          <p className="text-sm text-green-200">
            © 2026 Feira do Trabalho e do Campo DF. Todos os direitos reservados.
          </p>
          <p className="mt-2 text-xs text-green-300">
            Abrindo caminhos para a agricultura familiar e negócios locais sustentáveis.
          </p>
        </motion.div>
      </div>
    </footer>;
};
export default Footer;