const InteractiveMap = ({ 
  locations, 
  initialCenter = [14.1674, 75.0406],
  initialZoom = 7 
}) => {
  // ... existing code ...

  return (
    <div className="relative w-full h-full">
      <MapContainer 
        center={initialCenter} 
        zoom={initialZoom} 
        style={{ height: '100%', width: '100%' }}
      >
        {/* ... rest of the component ... */}
      </MapContainer>
      
      {/* Remove the mobile location list since we don't need it in the location page */}
      
      {/* ... rest of the component ... */}
    </div>
  );
}; 