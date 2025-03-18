import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useKarnatakaTheme } from '../../context/ThemeContext';
import ParallaxSection from '../ui/ParallaxSection';
import ExpandableInfo from '../ui/ExpandableInfo';
import MediaGallery from '../ui/MediaGallery';
import ScrollToTop from '../layout/ScrollToTop';
import locations from '../../data/locations';
import conservationPolicies from '../../data/conservationPolicies';

// Import icons
import { MapPin, Calendar, Home, FileText, Compass, Phone } from 'lucide-react';

const SanapurLake = () => {
  const theme = useKarnatakaTheme();
  const [locationData, setLocationData] = useState(null);
  const [policyData, setPolicyData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Find the location data for Sanapur Lake
    const sanapurData = locations.find(loc => loc.id === 'sanapur-lake');
    const sanapurPolicies = conservationPolicies['sanapur-lake'];
    
    if (sanapurData && sanapurPolicies) {
      setLocationData(sanapurData);
      setPolicyData(sanapurPolicies);
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen" style={{ background: theme.colors.background.secondary }}>
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 rounded-full" style={{ backgroundColor: theme.colors.forestGreen }}></div>
          <p className="mt-4 font-medium" style={{ color: theme.colors.text.accent }}>Loading...</p>
        </div>
      </div>
    );
  }

  // Additional images for the gallery
  const galleryImages = [
    {
      src: '/images/SanapurLake_1.jpg',
      alt: 'Sanapur Lake with granite boulders',
      caption: ''
    },
    {
      src: '/images/SanapurLake_2.jpg',
      alt: 'Coracle rides on Sanapur Lake',
      caption: ''
    },
    {
      src: '/videos/SanapurLake_3.mp4',
      alt: 'Sunset view at Sanapur Lake',
      caption: ''
    },
    {
      src: '/videos/SanapurLake_4.mp4',
      alt: 'Surrounding boulder landscape of Sanapur Lake',
      caption: ''  
    },
    {
      src: '/videos/SanapurLake_5.mp4',
      alt: 'Swimming in Sanapur Lake',
      caption: ''
    }
  ];

  // Content sections for scrollytelling
  const scrollySections = [
    {
      id: 'activities',
      title: 'Water Activities',
      content: 'Sanapur Lake offers various activities including swimming, coracle rides, and cliff jumping for adventure seekers. The calm waters are perfect for a refreshing swim during hot days.',
      backgroundColor: theme.colors.forestGreen,
      icon: <Compass size={32} color={theme.colors.goldenYellow} />
    },
    {
      id: 'landscape',
      title: 'Unique Landscape',
      content: 'The lake is surrounded by distinctive granite boulder formations characteristic of Hampi\'s topography. These natural rock formations create a stunning backdrop against the blue waters.',
      backgroundColor: theme.colors.earthyBrown,
      icon: <Compass size={32} color={theme.colors.cream} />
    },
    {
      id: 'relaxation',
      title: 'Peaceful Getaway',
      content: 'Away from the historical ruins of Hampi, Sanapur Lake provides a tranquil retreat where visitors can unwind and enjoy the natural beauty. Many travelers come here to escape the heat and crowds.',
      backgroundColor: theme.colors.deepPurple,
      icon: <Home size={32} color={theme.colors.cream} />
    },
    {
      id: 'sunset',
      title: 'Spectacular Sunsets',
      content: 'The lake offers breathtaking sunset views with the sun dipping behind the boulders and casting golden reflections on the water. It\'s a popular spot for photographers and nature enthusiasts.',
      backgroundColor: theme.colors.sunsetOrange,
      icon: <Calendar size={32} color={theme.colors.cream} />
    }
  ];

  const cardStyle = {
    backgroundColor: theme.colors.background.primary,
    borderRadius: theme.borderRadius.lg,
    boxShadow: theme.shadows.md,
    border: `1px solid ${theme.colors.border.light}`
  };

  const cardHeaderStyle = {
    borderBottom: `2px solid ${theme.colors.forestGreen}`,
    color: theme.colors.text.accent,
    fontFamily: theme.typography.fontFamily.heading,
    fontWeight: theme.typography.fontWeight.semibold
  };

  return (
    <div style={{ backgroundColor: theme.colors.background.secondary, minHeight: '100vh' }}>
      <ScrollToTop />
      
      {/* Hero Cover Image */}
      <div className="relative h-screen w-full overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: `url(${locationData.imagePath})`,
            height: '100%',
            width: '100%'
          }}
        >
          {/* Gradient overlay */}
          <div 
            className="absolute inset-0" 
            style={{ 
              background: `linear-gradient(to bottom, rgba(30, 86, 49, 0.3), rgba(30, 86, 49, 0.7))`,
            }}
          ></div>
        </div>
        
        {/* Content for cover image */}
        <div className="relative h-full flex flex-col justify-end items-center text-center px-4 pb-16">
          <div className="max-w-4xl">
            <h1 
              className="text-6xl md:text-7xl mb-4"
              style={{ 
                color: theme.colors.text.light, 
                fontFamily: theme.typography.fontFamily.heading,
                fontWeight: theme.typography.fontWeight.bold,
                textShadow: '0 2px 4px rgba(0,0,0,0.3)'
              }}
            >
              {locationData.name}
            </h1>
            <p 
              className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto"
              style={{ 
                color: theme.colors.cream,
                fontFamily: theme.typography.fontFamily.body,
                textShadow: '0 1px 2px rgba(0,0,0,0.5)'
              }}
            >
              {locationData.shortDescription}
            </p>
            <button 
              className="px-8 py-3 rounded-full text-lg font-medium transition-transform transform hover:scale-105"
              style={{ 
                backgroundColor: theme.colors.goldenYellow,
                color: theme.colors.text.primary 
              }}
            >
              Explore Sanapur Lake
            </button>
          </div>
          
          {/* Scroll down indicator */}
          <div className="absolute bottom-8 animate-bounce">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 5V19M12 19L5 12M12 19L19 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Quick Info Bar */}
      <div 
        className="sticky top-0 z-10 w-full py-4 px-6"
        style={{ backgroundColor: theme.colors.forestGreen }}
      >
        <div className="container mx-auto flex flex-wrap justify-between items-center gap-4">
          <div className="flex items-center text-sm" style={{ color: theme.colors.text.light }}>
            <MapPin size={16} className="mr-1" />
            <span>Hampi, Karnataka</span>
          </div>
          <div className="flex items-center text-sm" style={{ color: theme.colors.text.light }}>
            <Calendar size={16} className="mr-1" />
            <span>Best time: October to March</span>
          </div>
          <div className="flex items-center text-sm" style={{ color: theme.colors.text.light }}>
            <Compass size={16} className="mr-1" />
            <span>Water Reservoir</span>
          </div>
          <button onClick={() => window.open('https://www.google.com/maps/place/Sanapur,+Karnataka/@15.3466391,76.4196354,6553m/data=!3m2!1e3!4b1!4m6!3m5!1s0x3bb9d5440d0bb9af:0x88d8d8cdc5827f9b!8m2!3d15.349226!4d76.4359818!16s%2Fg%2F11c0r5y55p?entry=ttu&g_ep=EgoyMDI1MDMxNi4wIKXMDSoASAFQAw%3D%3D', '_blank')}
            className="cursor-pointer px-4 py-1.5 rounded-full text-sm font-medium"
            style={{ 
              backgroundColor: theme.colors.goldenYellow,
              color: theme.colors.forestGreen 
            }}
          >
            Get Directions
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Information */}
          <div className="lg:col-span-2 space-y-8">
            {/* Main Description */}
            <div style={cardStyle} className="p-6">
              <h2 
                className="text-3xl mb-6 pb-2"
                style={cardHeaderStyle}
              >
                Discover Sanapur Lake
              </h2>
              <p 
                className="mb-6 leading-relaxed"
                style={{ 
                  color: theme.colors.text.primary,
                  fontFamily: theme.typography.fontFamily.body,
                  fontSize: theme.typography.fontSize.lg
                }}
              >
                {locationData.fullDescription}
              </p>
              
              <div className="my-8">
                <h3 
                  className="text-2xl mb-4 font-semibold"
                  style={{ color: theme.colors.text.accent }}
                >
                  Interesting Facts
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {locationData.funFacts.map((fact, index) => (
                    <li 
                      key={index} 
                      className="flex items-start p-3 rounded-lg"
                      style={{ 
                        backgroundColor: theme.colors.background.accent,
                        color: theme.colors.text.primary
                      }}
                    >
                      <div 
                        className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full mr-3"
                        style={{ backgroundColor: theme.colors.forestGreen }}
                      >
                        <span style={{ color: theme.colors.goldenYellow }}>{index + 1}</span>
                      </div>
                      <span>{fact.replace('&amp;', '&')}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Image Gallery */}
            <div style={cardStyle} className="p-6">
              <h3 
                className="text-2xl mb-6 pb-2"
                style={cardHeaderStyle}
              >
                Gallery
              </h3>
              <MediaGallery media={galleryImages} />
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-8">
            {/* Location Info */}
            <div style={cardStyle} className="p-6">
              <h3 
                className="text-2xl mb-6 pb-2 flex items-center"
                style={cardHeaderStyle}
              >
                <MapPin className="mr-2" size={24} /> Location
              </h3>
              <div 
                className="space-y-3 mb-4"
                style={{ color: theme.colors.text.primary }}
              >
                <p className="flex items-center">
                  <span className="font-medium w-24">Region:</span> 
                  <span>{locationData.location.region}</span>
                </p>
                <p className="flex items-center">
                  <span className="font-medium w-24">District:</span> 
                  <span>{locationData.location.district}</span>
                </p>
                <p className="flex items-center">
                  <span className="font-medium w-24">State:</span> 
                  <span>{locationData.location.state}</span>
                </p>
                <p className="flex items-center">
                  <span className="font-medium w-24">Coordinates:</span> 
                  <span>{locationData.location.coordinates.lat}, {locationData.location.coordinates.lng}</span>
                </p>
              </div>
            </div>

            {/* Visit Planning */}
            <div style={cardStyle} className="p-6">
              <h3 
                className="text-2xl mb-6 pb-2 flex items-center"
                style={cardHeaderStyle}
              >
                <Calendar className="mr-2" size={24} /> Plan Your Visit
              </h3>
              <div className="space-y-4">
                <div className="p-3 rounded-lg" style={{ backgroundColor: theme.colors.background.accent }}>
                  <h4 
                    className="font-medium text-lg flex items-center mb-2"
                    style={{ color: theme.colors.forestGreen }}
                  >
                    <Calendar size={18} className="mr-2" />
                    Best Time to Visit
                  </h4>
                  <p style={{ color: theme.colors.text.secondary }}>
                    October to March, when the weather is pleasant and ideal for water activities.
                  </p>
                </div>
                
                <div className="p-3 rounded-lg" style={{ backgroundColor: theme.colors.background.accent }}>
                  <h4 
                    className="font-medium text-lg flex items-center mb-2"
                    style={{ color: theme.colors.forestGreen }}
                  >
                    <Compass size={18} className="mr-2" />
                    How to Reach
                  </h4>
                  <p style={{ color: theme.colors.text.secondary }}>
                    Sanapur Lake is located about 10 km from Hampi. You can reach here by
                    auto-rickshaw, rented bicycles, or motorbikes from Hampi. The roads are well-maintained.
                  </p>
                </div>
                
                <div className="p-3 rounded-lg" style={{ backgroundColor: theme.colors.background.accent }}>
                  <h4 
                    className="font-medium text-lg flex items-center mb-2"
                    style={{ color: theme.colors.forestGreen }}
                  >
                    <Home size={18} className="mr-2" />
                    Accommodation
                  </h4>
                  <p style={{ color: theme.colors.text.secondary }}>
                    There are several guesthouses and homestays around Sanapur Lake area. Hippie Island,
                    nearby, offers budget-friendly accommodations with lake views.
                  </p>
                </div>
                
                <div className="p-3 rounded-lg" style={{ backgroundColor: theme.colors.background.accent }}>
                  <h4 
                    className="font-medium text-lg flex items-center mb-2"
                    style={{ color: theme.colors.forestGreen }}
                  >
                    <FileText size={18} className="mr-2" />
                    Activities
                  </h4>
                  <p style={{ color: theme.colors.text.secondary }}>
                    Enjoy coracle rides (₹150-200 per person), swimming in designated areas, 
                    cliff jumping for adventure enthusiasts, and photography of the unique landscape.
                  </p>
                </div>
              </div>
            </div>           
          </div>
        </div>
      </div>

      {/* Next Destination */}
      <div 
        className="py-16"
        style={{ 
          background: theme.brandElements.gradients.culturalVibrance
        }}
      >
        <div className="container mx-auto px-4 text-center">
          <h3 
            className="text-3xl font-semibold mb-6"
            style={{ 
              color: theme.colors.text.light,
              fontFamily: theme.typography.fontFamily.heading
            }}
          >
            Continue Exploring Karnataka
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {locations.filter(loc => loc.id !== 'sanapur-lake').slice(0, 4).map(loc => (
              <Link 
                key={loc.id} 
                to={`/${loc.id}`}
                className="block group relative overflow-hidden rounded-lg h-64 transition-transform transform hover:scale-105"
                style={{ boxShadow: theme.shadows.lg }}
              >
                {/* Background image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ 
                    backgroundImage: `url(${loc.imagePath})`,
                  }}
                ></div>
                
                {/* Gradient overlay */}
                <div 
                  className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"
                ></div>
                
                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-4 text-left">
                  <h4 
                    className="text-xl font-semibold mb-2"
                    style={{ 
                      color: theme.colors.text.light,
                      fontFamily: theme.typography.fontFamily.heading
                    }}
                  >
                    {loc.name}
                  </h4>
                  <p 
                    className="text-sm line-clamp-2"
                    style={{ color: theme.colors.cream }}
                  >
                    {loc.shortDescription}
                  </p>
                  
                  <div 
                    className="mt-3 inline-flex items-center text-sm font-medium"
                    style={{ color: theme.colors.goldenYellow }}
                  >
                    Explore
                    <svg 
                      className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SanapurLake;