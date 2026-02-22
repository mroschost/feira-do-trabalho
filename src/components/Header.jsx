import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logoFeira from '../assets/logos/feira.webp';
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuItems = [{
    id: 'inicio',
    label: 'Início',
    href: '/'
  }, {
    id: 'cronograma',
    label: 'Cronograma',
    href: '/cronograma'
  }, {
    id: 'galeria',
    label: 'Galeria',
    href: '/galeria'
  }, {
    id: 'noticias',
    label: 'Notícias',
    href: '/noticias'
  }];
  const activeLinkStyle = {
    color: '#FFFFFF',
    borderBottom: '2px solid #FFFFFF',
    paddingBottom: '4px'
  };
  const activeMobileLinkStyle = {
    color: '#3FA637',
    backgroundColor: '#F0FDF4' // green-50
  };
  return <header className="fixed top-0 left-0 right-0 z-50 bg-[#3FA637] shadow-md">
      <nav className="container flex items-center justify-between px-4 py-3 mx-auto">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3" onClick={() => setIsMenuOpen(false)}>
          <img className="w-auto h-20" alt="Logo Feira do Trabalho e do campo" src={logoFeira} />
        </Link>

        {/* Desktop Menu */}
        <div className="items-center hidden space-x-8 md:flex">
          {menuItems.map(item => <NavLink key={item.id} to={item.href} style={({
          isActive
        }) => isActive ? activeLinkStyle : undefined} className="text-sm font-medium text-white transition-colors duration-200 hover:text-green-100">
              {item.label}
            </NavLink>)}
        </div>

        {/* Mobile Menu Button */}
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 transition-colors rounded-lg md:hidden hover:bg-green-700" aria-label="Toggle menu">
          {isMenuOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && <motion.div initial={{
        opacity: 0,
        height: 0
      }} animate={{
        opacity: 1,
        height: 'auto'
      }} exit={{
        opacity: 0,
        height: 0
      }} className="bg-white border-t border-gray-200 md:hidden">
            <div className="container px-4 py-4 mx-auto space-y-3">
              {menuItems.map(item => <NavLink key={item.id} to={item.href} onClick={() => setIsMenuOpen(false)} style={({
            isActive
          }) => isActive ? activeMobileLinkStyle : undefined} className="block w-full px-3 py-2 text-sm font-medium text-left text-gray-700 transition-colors rounded-lg hover:bg-gray-50">
                  {item.label}
                </NavLink>)}
            </div>
          </motion.div>}
      </AnimatePresence>
    </header>;
};
export default Header;