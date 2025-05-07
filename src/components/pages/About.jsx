import React from 'react';
import ParallaxSection from '../ui/ParallaxSection';
import ExpandableInfo from '../ui/ExpandableInfo';

const About = () => {
  return (
    <div className="min-h-screen">
      <ParallaxSection
        backgroundImage="/images/karnataka-forests.jpg"
        height="40vh"
      >
        <div className="container mx-auto px-4 py-16 text-white text-center">
          <h1 className="text-5xl font-bold mb-4">About This Project</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Uncovering Karnataka's hidden treasures through multimedia storytelling
          </p>
        </div>
      </ParallaxSection>
      
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
          <p className="text-lg mb-6">
            This project aims to showcase the lesser-known wonders of Karnataka through immersive 
            multimedia storytelling. By combining engaging narratives with interactive elements, 
            we hope to inspire a deeper appreciation for Karnataka's rich cultural heritage and 
            natural beauty.
          </p>
          
          <h2 className="text-3xl font-bold mb-6">Multimedia Storytelling Approach</h2>
          <p className="text-lg mb-6">
            Our approach to multimedia storytelling draws inspiration from innovative platforms 
            and examples that have revolutionized digital narratives. We incorporate diverse 
            media integration, immersive scrollytelling techniques, and responsive design to 
            create an engaging user experience.
          </p>
          
          <ExpandableInfo title="Our Storytelling Principles">
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Clean Layout:</strong> Minimalistic design ensuring distraction-free navigation</li>
              <li><strong>Interactive Elements:</strong> Engaging components that deepen user connection with the content</li>
              <li><strong>Responsive Design:</strong> Seamless adaptation across various devices</li>
              <li><strong>Diverse Media Integration:</strong> Blending text, images, videos, and interactive elements</li>
              <li><strong>User-Friendly Navigation:</strong> Clear headings and logical flow for intuitive exploration</li>
              <li><strong>Immersive Scrollytelling:</strong> Narratives that unfold as users scroll</li>
            </ul>
          </ExpandableInfo>
          
          <h2 className="text-3xl font-bold my-6">Conservation Focus</h2>
          <p className="text-lg mb-6">
            Beyond showcasing Karnataka's treasures, this project also highlights the conservation 
            policies and initiatives that protect these valuable sites. We believe that awareness 
            is the first step toward preservation, and we aim to educate visitors about the 
            importance of sustainable tourism and conservation efforts.
          </p>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 mt-12">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-center">Explore</h3>
              <p className="text-center">Discover the hidden gems of Karnataka</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4 text-center">Learn</h3>
              <p className="text-center">Understand their historical and cultural significance</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4 text-center">Protect</h3>
              <p className="text-center">Support conservation efforts to preserve them</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;