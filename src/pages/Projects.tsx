
import Layout from '@/components/Layout';
import { Link } from 'react-router-dom';

// Using a placeholder video path - you'll need to replace this with your actual video
const projectsVideo = '/videos/projects-background.mp4';

const Projects = () => {
  return (
    <Layout videoSrc={projectsVideo}>
      <div className="flex flex-col items-center justify-center">
        <div className="max-w-2xl text-left">
          <h3 className="text-base md:text-lg font-light leading-relaxed mb-2">past projects</h3>
          <p className="text-xs md:text-sm font-light leading-relaxed">
            Greatly influenced by the flames of ancient greek & japanese cultures and american popart,
            dipped in the wax of modern practices and at their core, a wick of idea realization,
            my projects have heavily relied on my own perspective. Whether private commissions or
            in-house marketing, each project aims to burn bright.
          </p>
          <p className="text-xs md:text-sm font-light leading-relaxed mt-4">
            If you'd like further information about the context, planning & launch of the listed projects and more, feel free to <Link to="/contact" className="underline hover:opacity-70 transition-opacity">contact me</Link>.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Projects;
