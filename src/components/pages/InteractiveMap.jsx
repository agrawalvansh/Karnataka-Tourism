// InteractiveMap.js
import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';
import LocationDetail from './LocationDetail';

const InteractiveMap = ({ locations }) => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [fullscreenMode, setFullscreenMode] = useState(false);
  const mapRef = useRef(null);
  const navigate = useNavigate();
  
  // Use effect for leaflet initialization - we'll use dynamic imports to avoid SSR issues
  useEffect(() => {
    // Dynamic import Leaflet to avoid SSR issues
    const initializeMap = async () => {
      const L = await import('leaflet');
      
      // Fix for Leaflet icons not displaying correctly
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      });
      // Only initialize map if mapRef is defined and we don't already have a map
      if (mapRef.current && !mapRef.current._leaflet_id) {
        // Create the map
        const map = L.map(mapRef.current).setView([15.317, 75.713], 7);
        
        // Add tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          maxZoom: 18,
        }).addTo(map);
        
        // Create custom icons for different types of locations
        const createCustomIcon = (type) => {
          const iconColors = {
            water: 'bg-blue-500',
            mountain: 'bg-amber-700',
            monument: 'bg-purple-600',
            landmark: 'bg-emerald-600',
          };
          
          const element = document.createElement('div');
          element.className = `flex items-center justify-center w-8 h-8 rounded-full ${iconColors[type] || 'bg-emerald-600'} text-white shadow-lg`;
          
          return L.divIcon({
            html: element.outerHTML,
            className: 'custom-div-icon',
            iconSize: [32, 32],
            iconAnchor: [16, 32],
          });
        };
        
        // Add markers for each location
        locations.forEach(location => {
          const { lat, lng } = location.location.coordinates;
          
          // Determine icon type based on description
          let iconType = 'landmark';
          const description = location.fullDescription?.toLowerCase() || '';
          
          if (description.includes('lake') || description.includes('reservoir') || description.includes('water')) {
            iconType = 'water';
          } else if (description.includes('mountain') || description.includes('peak') || description.includes('hill')) {
            iconType = 'mountain';
          } else if (description.includes('fort') || description.includes('temple') || description.includes('monument')) {
            iconType = 'monument';
          }
          
          const marker = L.marker([lat, lng], { icon: createCustomIcon(iconType) }).addTo(map);
          
          // Create popup
          const popupContent = document.createElement('div');
          popupContent.className = 'p-2';
          popupContent.innerHTML = `
            <div class="font-semibold text-lg">${location.name}</div>
            <p class="text-sm my-1">${location.shortDescription || ''}</p>
            <button class="bg-emerald-700 text-white px-3 py-1 rounded-md text-sm mt-2 explore-button" data-location-id="${location.id}">
              Explore
            </button>
          `;
          
          marker.bindPopup(popupContent);
          
          // Add event listener to the marker
          marker.on('click', () => {
            // In a real app, we might want to show a preview in the popup first
            // But for now, we'll directly set the selected location
            setSelectedLocation(location);
          });
        });
        
        // Add event listener to the explore buttons in popups
        document.addEventListener('click', (e) => {
          if (e.target.classList.contains('explore-button')) {
            const locationId = e.target.getAttribute('data-location-id');
            const location = locations.find(loc => loc.id === locationId);
            if (location) {
              setSelectedLocation(location);
              setFullscreenMode(true);
            }
          }
        });
        
        // Ensure the map takes up available space when container resizes
        setTimeout(() => {
          map.invalidateSize();
        }, 0);
        
        // Store map reference for later use
        mapRef.current._leafletMap = map;
      }
    };
    
    initializeMap();
    
    // Cleanup function
    return () => {
      if (mapRef.current && mapRef.current._leafletMap) {
        mapRef.current._leafletMap.remove();
        mapRef.current._leafletMap = null;
      }
    };
  }, [locations]);
  
  // Effect to center map on selected location
  useEffect(() => {
    if (selectedLocation && mapRef.current && mapRef.current._leafletMap) {
      const { lat, lng } = selectedLocation.location.coordinates;
      mapRef.current._leafletMap.flyTo([lat, lng], 14, {
        duration: 2
      });
    }
  }, [selectedLocation]);
  
  const handleLocationClick = (locationId) => {
    navigate(`/${locationId}`);
  };
  
  const exitFullscreenMode = () => {
    setFullscreenMode(false);
  };
  
  // Theme object for LocationDetail component
  const theme = {
    colors: {
      forestGreen: '#1E5631',
      background: {
        primary: '#FFFFFF',
        secondary: '#F9F9F9',
      },
      text: {
        primary: '#333333',
        secondary: '#666666',
        accent: '#1E5631',
        light: '#FFFFFF',
      }
    }
  };

  return (
    <div className="relative w-full">
      <MapContainer 
        center={[14.1674, 75.0406]} 
        zoom={7} 
        style={{ height: '500px', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {locations.map(location => (
          <Marker 
            key={location.id} 
            position={[location.location.coordinates.lat, location.location.coordinates.lng]}
          >
            <Popup>
              <div>
                <h3 className="font-bold text-lg">{location.name}</h3>
                <p className="text-sm">{location.shortDescription}</p>
                <button 
                  onClick={() => handleLocationClick(location.id)}
                  className="mt-2 px-4 py-2 bg-emerald-700 text-white rounded-md hover:bg-emerald-800 transition w-full"
                >
                  View Details
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      
      
      {/* LocationDetail Modal */}
      {fullscreenMode && selectedLocation && (
        <LocationDetail 
          location={selectedLocation} 
          onClose={exitFullscreenMode} 
          theme={theme}
        />
      )}
      
      {/* Location List for Mobile */}
      <div className="md:hidden mt-4 bg-white rounded-md shadow-md p-4">
        <h3 className="text-lg font-semibold text-emerald-800 mb-2">Featured Locations</h3>
        <div className="space-y-2">
          {locations.slice(0, 5).map(location => (
            <div 
              key={location.id}
              className="p-2 border-b border-gray-200 last:border-b-0"
              onClick={() => handleLocationClick(location.id)}
            >
              <div className="font-medium">{location.name}</div>
              <div className="text-sm text-gray-600">{location.shortDescription || 'Explore this destination'}</div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Custom map styles */}
      <style jsx global>{`
        .leaflet-container {
          width: 100%;
          height: 100%;
          z-index: 1;
        }
        
        .leaflet-control-zoom {
          margin-top: 70px !important;
        }
        
        .custom-div-icon {
          background: none;
          border: none;
        }
        
        .leaflet-popup-content-wrapper {
          border-radius: 8px;
          padding: 0;
          overflow: hidden;
        }
        
        .leaflet-popup-content {
          margin: 0;
          padding: 12px;
          min-width: 200px;
        }
      `}</style>
    </div>
  );
};

export default InteractiveMap;