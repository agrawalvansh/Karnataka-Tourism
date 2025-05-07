// Home.js
import React from 'react';
import InteractiveMap from './InteractiveMap';
import VideoHero from '../ui/VideoHero';
const Home = () => {
  const locations = [
    {
      id: 'badavi-linga',
      name: 'Badavi Linga, Hampi',
      shortDescription: 'The largest monolithic Shiva Linga in Hampi, standing at about 3 meters tall.',
      fullDescription: `Badavi Linga is the largest monolithic Shiva Linga in Hampi, standing at about 3 meters tall. Carved from a single black stone, it is housed within a modest stone chamber that is perpetually filled with water, owing to a nearby canal. The term 'Badavi' translates to 'poor' in Kannada, suggesting that the shrine was commissioned by a poverty-stricken woman, highlighting the inclusive nature of devotion during the Vijayanagara Empire.`,
      imagePath: '/images/badavi-linga.jpg',
      imageAlt: 'The massive Badavi Linga monolith in Hampi',
      funFacts: [
        'It stands at approximately 3 meters in height',
        'The chamber housing it is perpetually filled with water',
        'The name suggests it was commissioned by a poor woman',
        'It&amp;s one of the most significant religious monuments in Hampi'
      ],
      location: {
        region: 'Hampi',
        district: 'Ballari',
        state: 'Karnataka',
        coordinates: {
          lat: 15.335,
          lng: 76.460
        }
      }
    },
    {
      id: 'sanapur-lake',
      name: 'Sanapur Lake, Hampi',
      shortDescription: 'A serene reservoir surrounded by boulder-strewn landscapes and lush greenery.',
      fullDescription: `Sanapur Lake is a serene reservoir located near Hampi, surrounded by boulder-strewn landscapes and lush greenery. It offers coracle rides, swimming, and picturesque spots for relaxation, making it a favored destination for nature lovers and adventure enthusiasts.`,
      imagePath: '/images/sanapur-lake.jpg',
      imageAlt: 'The serene Sanapur Lake with granite boulders in the background',
      funFacts: [
        'The lake is formed by a dam across the Tungabhadra River',
        'Local fishermen offer coracle rides to tourists',
        'It&amp;s one of the few places near Hampi where swimming is possible',
        'The lake is surrounded by unique boulder formations'
      ],
      location: {
        region: 'Hampi',
        district: 'Ballari',
        state: 'Karnataka',
        coordinates: {
          lat: 15.348,
          lng: 76.393
        }
      }
    },
    {
      id: 'kavaledurga-fort',
      name: 'Kavaledurga Fort, Shimoga',
      shortDescription: 'A 9th-century fort nestled amidst the Western Ghats, featuring three lines of fortification.',
      fullDescription: `Kavaledurga Fort is a 9th-century fort located approximately 18 km from Thirthahalli in the Shimoga district. Nestled amidst the Western Ghats, the fort features three lines of fortification, remnants of a palace, temples, and a freshwater pond. The trek to the summit offers panoramic views of the surrounding hills and is a testament to the architectural prowess of the Keladi Nayakas.`,
      imagePath: '/images/kavaledurga-fort.jpg',
      imageAlt: 'The ancient stone fortifications of Kavaledurga Fort',
      funFacts: [
        'The fort dates back to the 9th century',
        'It features three distinctive lines of fortification',
        'The fort was ruled by the Keladi Nayakas',
        'It has a freshwater pond at the summit'
      ],
      location: {
        region: 'Western Ghats',
        district: 'Shimoga',
        state: 'Karnataka',
        coordinates: {
          lat: 13.972,
          lng: 75.233
        }
      }
    },
    {
      id: 'kodachadri',
      name: 'Kodachadri, Western Ghats',
      shortDescription: 'A mountain peak in the Western Ghats, standing at an elevation of about 1,343 meters.',
      fullDescription: `Kodachadri is a mountain peak in the Western Ghats, standing at an elevation of about 1,343 meters. It is a biodiversity hotspot, home to dense forests, diverse wildlife, and the revered Mookambika Temple. Trekkers frequent Kodachadri for its challenging trails and the reward of witnessing stunning sunsets over the Arabian Sea.`,
      imagePath: '/images/kodachadri.jpg',
      imageAlt: 'The majestic Kodachadri peak in the Western Ghats',
      funFacts: [
        'It stands at an elevation of 1,343 meters above sea level',
        'It&amp;s one of the highest peaks in Karnataka',
        'The peak is home to the sacred Mookambika Temple',
        'On clear days, the Arabian Sea is visible from the summit'
      ],
      location: {
        region: 'Western Ghats',
        district: 'Shimoga',
        state: 'Karnataka',
        coordinates: {
          lat: 13.855,
          lng: 74.866
        }
      }
    }
  ];

  return (
    <div className="bg-white">
       <VideoHero />
      {/* Hero Section */}
      <div className="relative h-[70vh] bg-gray-800 overflow-hidden">
        <div className="relative h-full flex items-center justify-center text-center px-4">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
              Discover Karnataka
            </h1>
            <p className="mt-4 text-xl text-white max-w-xl mx-auto">
              From ancient monuments to breathtaking landscapes, experience the rich heritage and natural beauty
            </p>
            <button 
              onClick={() => {
                document.getElementById('explore-map').scrollIntoView({ behavior: 'smooth' });
              }} 
              className="mt-8 px-6 py-3 bg-emerald-700 text-white rounded-md hover:bg-emerald-800 transition cursor-pointer"
            >
              Start Exploring
            </button>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div id="explore-map" className="container mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-emerald-800">Explore Karnataka's Wonders</h2>
          <p className="mt-2 text-gray-600">
            Discover the most beautiful destinations across Karnataka with our interactive map
          </p>
        </div>
        
        <div className="border rounded-lg overflow-hidden shadow-md">
          <InteractiveMap locations={locations} />
        </div>
      </div>
    </div>
  );
};

export default Home;