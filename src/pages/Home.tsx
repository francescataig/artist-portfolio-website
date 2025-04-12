
import Layout from '@/components/Layout';

const homeVideo = '/videos/home-background.mp4';

const Home = () => {
  return (
    <Layout
      videoSrc={homeVideo}
      contentClassName="flex items-start justify-end pl-8 md:pl-16 pb-8"
    >
      <div className="home-bottom-content flex flex-col items-start w-full">
        <div className="max-w-xl text-left space-y-4">
          <h1 className="text-base md:text-lg font-light leading-relaxed tracking-wider">
            Opening eyes to the fabric of words & images
          </h1>
          <p className="text-xs md:text-sm font-light leading-relaxed opacity-90">
            Past and current design projects range from merchandising to media content creation.
            Working with digital and film photography, Adobe and traditional art methods like
            screen printing, wood carving, ceramics and ink drawings, I find every possibility <i>possible</i>.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
