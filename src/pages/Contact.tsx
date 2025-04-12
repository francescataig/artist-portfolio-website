
import Layout from '@/components/Layout';

// Using a placeholder video path - you'll need to replace this with your actual video
const contactVideo = '/videos/contact-background.mp4';

const Contact = () => {
  return (
    <Layout
      videoSrc={contactVideo}
      contentClassName="flex items-center justify-end"
    >
      <div className="home-bottom-content flex flex-col items-center w-full">
        <div className="text-center mb-8">
          <p className="text-xl font-light">
            Chat with me about ideas{' '}
            <a
              href="mailto:ftaiganides@outlook.com"
              className="underline hover:opacity-70 transition-opacity"
            >
              here
            </a>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
