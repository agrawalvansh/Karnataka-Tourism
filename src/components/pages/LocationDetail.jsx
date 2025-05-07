// LocationDetail.js
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, MapPin, Info } from 'react-feather';

const LocationDetail = ({ location, onClose, theme }) => {
  const [activeTab, setActiveTab] = useState('gallery');
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Mock data for demonstration - in a real app, you'd fetch these from your API
  const mockGalleryItems = [
    { type: 'image', src: location.imagePath, alt: location.imageAlt },
    { type: 'video', src: `/videos/${location.id}-video.mp4`, poster: location.imagePath },
    { type: 'image', src: `/images/${location.id}-2.jpg`, alt: `Additional view of ${location.name}` },
    { type: 'image', src: `/images/${location.id}-3.jpg`, alt: `Scenic view of ${location.name}` }
  ];

  useEffect(() => {
    // Prevent scrolling when fullscreen mode is active
    document.body.style.overflow = 'hidden';
    
    // Handle ESC key to close fullscreen mode
    const handleEscKey = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleEscKey);
    
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleEscKey);
    };
  }, [onClose]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === mockGalleryItems.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? mockGalleryItems.length - 1 : prev - 1));
  };

  return (
    <Overlay
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <DetailContainer
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
      >
        <Header style={{ backgroundColor: theme.colors.forestGreen }}>
          <LocationName>{location.name}</LocationName>
          <CloseButton onClick={onClose}>
            <X size={24} color={theme.colors.text.light} />
          </CloseButton>
        </Header>
        
        <TabsContainer style={{ backgroundColor: theme.colors.background.secondary }}>
          <Tab 
            active={activeTab === 'gallery'}
            onClick={() => setActiveTab('gallery')}
            style={{ 
              color: activeTab === 'gallery' ? theme.colors.text.accent : theme.colors.text.secondary,
              borderBottom: activeTab === 'gallery' ? `2px solid ${theme.colors.forestGreen}` : 'none'
            }}
          >
            Gallery
          </Tab>
          <Tab 
            active={activeTab === 'info'}
            onClick={() => setActiveTab('info')}
            style={{ 
              color: activeTab === 'info' ? theme.colors.text.accent : theme.colors.text.secondary,
              borderBottom: activeTab === 'info' ? `2px solid ${theme.colors.forestGreen}` : 'none'
            }}
          >
            Information
          </Tab>
          <Tab 
            active={activeTab === 'map'}
            onClick={() => setActiveTab('map')}
            style={{ 
              color: activeTab === 'map' ? theme.colors.text.accent : theme.colors.text.secondary,
              borderBottom: activeTab === 'map' ? `2px solid ${theme.colors.forestGreen}` : 'none'
            }}
          >
            Map
          </Tab>
        </TabsContainer>
        
        <ContentContainer>
          {activeTab === 'gallery' && (
            <GalleryContainer>
              <SliderContainer>
                <SliderButton onClick={prevSlide} position="left">
                  <ChevronLeft size={40} />
                </SliderButton>
                
                <SlideContent>
                  {mockGalleryItems[currentSlide].type === 'image' ? (
                    <SlideImage 
                      src={mockGalleryItems[currentSlide].src} 
                      alt={mockGalleryItems[currentSlide].alt}
                    />
                  ) : (
                    <SlideVideo 
                      src={mockGalleryItems[currentSlide].src}
                      poster={mockGalleryItems[currentSlide].poster}
                      controls
                    />
                  )}
                </SlideContent>
                
                <SliderButton onClick={nextSlide} position="right">
                  <ChevronRight size={40} />
                </SliderButton>
              </SliderContainer>
              
              <ThumbnailContainer>
                {mockGalleryItems.map((item, index) => (
                  <Thumbnail 
                    key={index}
                    active={index === currentSlide}
                    onClick={() => setCurrentSlide(index)}
                    style={{ 
                      border: index === currentSlide ? `2px solid ${theme.colors.forestGreen}` : 'none',
                      opacity: index === currentSlide ? 1 : 0.7
                    }}
                  >
                    {item.type === 'image' ? (
                      <img src={item.src} alt={`Thumbnail ${index + 1}`} />
                    ) : (
                      <div className="video-thumbnail">
                        <img src={item.poster} alt={`Video thumbnail ${index + 1}`} />
                        <span className="play-icon">▶</span>
                      </div>
                    )}
                  </Thumbnail>
                ))}
              </ThumbnailContainer>
            </GalleryContainer>
          )}
          
          {activeTab === 'info' && (
            <InfoContainer>
              <InfoSection>
                <SectionTitle style={{ color: theme.colors.forestGreen }}>About</SectionTitle>
                <Description>{location.fullDescription}</Description>
              </InfoSection>
              
              <InfoSection>
                <SectionTitle style={{ color: theme.colors.forestGreen }}>Location</SectionTitle>
                <LocationInfo>
                  <LocationIcon><MapPin size={20} color={theme.colors.forestGreen} /></LocationIcon>
                  <div>
                    <p>{location.location.region}, {location.location.district}</p>
                    <p>{location.location.state}, India</p>
                  </div>
                </LocationInfo>
              </InfoSection>
              
              <InfoSection>
                <SectionTitle style={{ color: theme.colors.forestGreen }}>Fun Facts</SectionTitle>
                <FactsList>
                  {location.funFacts.map((fact, index) => (
                    <FactItem key={index}>
                      <FactIcon><Info size={16} color={theme.colors.forestGreen} /></FactIcon>
                      <FactText>{fact.replace('&amp;', '&')}</FactText>
                    </FactItem>
                  ))}
                </FactsList>
              </InfoSection>
            </InfoContainer>
          )}
          
          {activeTab === 'map' && (
            <MapContainer>
              <iframe 
                src={`https://maps.google.com/maps?q=${location.location.coordinates.lat},${location.location.coordinates.lng}&t=k&z=15&ie=UTF8&iwloc=&output=embed`}
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </MapContainer>
          )}
        </ContentContainer>
      </DetailContainer>
    </Overlay>
  );
};

// Styled Components
const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DetailContainer = styled(motion.div)`
  width: 100%;
  height: 100%;
  background-color: white;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  color: white;
`;

const LocationName = styled.h2`
  margin: 0;
  font-size: 1.5rem;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  border-radius: 50%;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

const TabsContainer = styled.div`
  display: flex;
  border-bottom: 1px solid #e0e0e0;
`;

const Tab = styled.button`
  flex: 1;
  padding: 1rem;
  background: none;
  border: none;
  cursor: pointer;
  font-weight: ${props => props.active ? 'bold' : 'normal'};
  font-size: 1rem;
  transition: all 0.2s;
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
`;

const ContentContainer = styled.div`
  flex: 1;
  overflow-y: auto;
`;

const GalleryContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const SliderContainer = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #111;
`;

const SliderButton = styled.button`
  position: absolute;
  ${props => props.position}: 1rem;
  background: rgba(0, 0, 0, 0.5);
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 5;
  color: white;
  transition: background-color 0.2s;
  
  &:hover {
    background: rgba(0, 0, 0, 0.8);
  }
`;

const SlideContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SlideImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
`;

const SlideVideo = styled.video`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
`;

const ThumbnailContainer = styled.div`
  display: flex;
  overflow-x: auto;
  padding: 1rem;
  background-color: #f5f5f5;
  gap: 0.5rem;
`;

const Thumbnail = styled.div`
  width: 100px;
  height: 60px;
  flex-shrink: 0;
  cursor: pointer;
  position: relative;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .video-thumbnail {
    position: relative;
    width: 100%;
    height: 100%;
    
    .play-icon {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: white;
      background: rgba(0, 0, 0, 0.5);
      border-radius: 50%;
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
    }
  }
`;

const InfoContainer = styled.div`
  padding: 1.5rem;
`;

const InfoSection = styled.div`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h3`
  margin-top: 0;
  margin-bottom: 1rem;
  font-size: 1.25rem;
`;

const Description = styled.p`
  line-height: 1.6;
  margin: 0;
`;

const LocationInfo = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
`;

const LocationIcon = styled.div`
  margin-top: 0.25rem;
`;

const FactsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const FactItem = styled.li`
  display: flex;
  align-items: flex-start;
  margin-bottom: 0.75rem;
  gap: 0.75rem;
`;

const FactIcon = styled.div`
  margin-top: 0.25rem;
`;

const FactText = styled.p`
  margin: 0;
`;

const MapContainer = styled.div`
  width: 100%;
  height: 100%;
`;

export default LocationDetail;