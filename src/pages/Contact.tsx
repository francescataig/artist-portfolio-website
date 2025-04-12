
import Layout from '@/components/Layout';

// Using a placeholder video path - you'll need to replace this with your actual video
const contactVideo = '/videos/contact-background.mp4';

const Contact = () => {
  return (
    <Layout videoSrc={contactVideo}>
      <div className="flex flex-col items-center justify-center">
        <div className="text-center">
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
