
import Layout from '@/components/Layout';

// Using a placeholder video path - you'll need to replace this with your actual video
const projectsVideo = '/videos/projects-background.mp4';

const Projects = () => {
  return (
    <Layout videoSrc={projectsVideo}>
      <div className="flex flex-col items-center justify-center">
        <div className="max-w-2xl text-center">
          <p className="text-lg font-light leading-relaxed">
            Greatly influenced by the flames of ancient greek & japanese cultures and american popart,
            dipped in the wax of modern practices and at their core, a wick of idea realization,
            my projects have heavily relied on my own perspective. Whether private commissions or
            in-house marketing, each project aims to burn bright.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Projects;
