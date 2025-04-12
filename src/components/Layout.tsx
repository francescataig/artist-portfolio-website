
import { ReactNode } from 'react';
import Navbar from './Navbar';

interface LayoutProps {
  children: ReactNode;
  videoSrc: string;
  className?: string;
  contentClassName?: string;
}

const Layout = ({ children, videoSrc, className = '', contentClassName = '' }: LayoutProps) => {
  return (
    <div className={`content-container ${className}`}>
      <video
        autoPlay
        muted
        loop
        playsInline
        className="background-video"
      >
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <Navbar />
      <main className={`page-content mt-20 text-white h-[calc(100vh-80px)] ${contentClassName}`}>
        {children}
      </main>
    </div>
  );
};

export default Layout;
