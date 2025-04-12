
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 font-navbar ${
        isScrolled ? 'transparent-navbar' : 'bg-transparent'
      } transition-all duration-300`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <img
              src="/bones.png"
              alt="Bones Logo"
              className="h-12 w-auto"
            />
          </Link>
          <div className="space-x-8">
            <NavLink to="/" active={location.pathname === "/"}>
              home
            </NavLink>
            <NavLink to="/projects" active={location.pathname === "/projects"}>
              past projects
            </NavLink>
            <NavLink to="/gallery" active={location.pathname === "/gallery"}>
              gallery
            </NavLink>
            <NavLink to="/contact" active={location.pathname === "/contact"}>
              contact
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

interface NavLinkProps {
  to: string;
  active: boolean;
  children: React.ReactNode;
}

const NavLink = ({ to, active, children }: NavLinkProps) => {
  return (
    <Link
      to={to}
      className={`text-white text-sm font-light tracking-wider transition duration-300 font-navbar ${active ? 'font-medium' : 'hover:text-white/80'}`}
    >
      {children}
    </Link>
  );
};

export default Navbar;
