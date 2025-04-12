
import { ReactNode } from 'react';
import Navbar from './Navbar';

interface LayoutProps {
  children: ReactNode;
  videoSrc: string;
}

const Layout = ({ children, videoSrc }: LayoutProps) => {
  return (
    <div className="content-container">
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
      <main className="page-content mt-20 text-white">
        {children}
      </main>
    </div>
  );
};

export default Layout;
