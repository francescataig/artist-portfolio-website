
import Layout from '@/components/Layout';

const homeVideo = '/artist-portfolio-website/videos/home-background.mp4';

const Home = () => {
  return (
    <Layout videoSrc={homeVideo}>
      <div className="flex flex-col items-center justify-center space-y-8">
        <div className="max-w-2xl text-center space-y-6">
          <h1 className="text-2xl md:text-3xl font-light leading-relaxed tracking-wider">
            Opening eyes to the fabric of words & images
          </h1>
          <p className="text-lg font-light leading-relaxed opacity-90">
            Past and current design projects range from merchandising to media content creation.
            Working with digital and film photography, Adobe and traditional art methods like
            screen printing, wood carving, ceramics and ink drawings, I find every possibility.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
