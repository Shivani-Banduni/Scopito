import React, { useState } from 'react';
import Form from './Form';
import './image.css'


function Image() {
  const [showForm, setShowForm] = useState(false);
  const [zoom, setZoom] = useState(false); // State to control zoom
  const [formPosition, setFormPosition] = useState({ x: 0, y: 0 });
  const [report, setReport] = useState(""); // State for the generated report
const [zoomLevel, setZoomLevel] = useState(100); // Start with 100% (normal size)
const thumbnails = new Array(5).fill("https://halorobotics.com/en/wp-content/uploads/2021/09/underwater-drone-rov-fifish-pro-26-untuk-mainetance-pekerjaan-konstruksi-edited.jpeg");


  // Adjusted marker data with colors and percentage-based positions for better control
 // Updated marker data with more markers and varied colors
const markers = [
    { id: 1, color: 'rgb(237,65,51)', position: { x: '20%', y: '20%' } },
    { id: 2, color: 'rgb(74,177,187)', position: { x: '30%', y: '30%' } },
    { id: 3, color: 'rgb(74,177,187)', position: { x: '30%', y: '50%' } },

    { id: 4, color: 'rgb(74,177,187)', position: { x: '40%', y: '10%' } },
    { id: 5, color: 'rgb(240,116,57)', position: { x: '10%', y: '10%' } },
    { id: 6, color: 'orange', position: { x: '10%', y: '20%' } },
    { id: 7, color: 'rgb(240,116,57)', position: { x: '70%', y: '30%' } },

    // Add more as needed
  ];
  
  const handleMarkerClick = (e, marker) => {
    e.stopPropagation();
    setZoomLevel(180); // Set zoom to 180%
    if (marker.color === 'rgb(240,116,57)') { // Assuming this is your "form" condition
      setShowForm(true);
    } else {
      // Generate and display a report for other markers
      setReport(`Random report for marker ${marker.id}`);
      setShowForm(false); // Hide form if it's open
    }
  };
  
  const handleImageClick = () => {
    setShowForm(false);
    setZoomLevel(100); // Reset zoom
  };
  

  return (
      <>
    <div className="app">
      <div className={`image-container ${zoomLevel > 100 ? 'zoomed' : ''}`} onClick={handleImageClick}>
        <img src="https://halorobotics.com/en/wp-content/uploads/2021/09/underwater-drone-rov-fifish-pro-26-untuk-mainetance-pekerjaan-konstruksi-edited.jpeg" alt="Drone view of a building" alt="Drone view of a building" />
        {/* Marker buttons */}
         {markers.map((marker) => (
        <button
           key={marker.id}
         className="marker"
             style={{ left: marker.position.x, top: marker.position.y, backgroundColor: marker.color }}
            onClick={(e) => handleMarkerClick(e, marker)}
          />
      ))}
      </div><br/>
     
      <div className="sidebar">
      {showForm && <Form onClose={() => setShowForm(false)} />}

      </div> 

      
        </div>

        <div className="thumbnails">
        {thumbnails.map((src, index) => (
          <img key={index} src={src} alt="Thumbnail" className="thumbnail" />
        ))}
      </div> 

        </>
  );
  

//   return (
//     <div className="app">
//       <div className="image-container" onClick={handleImageClick}>
//               <img  src="https://halorobotics.com/en/wp-content/uploads/2021/09/underwater-drone-rov-fifish-pro-26-untuk-mainetance-pekerjaan-konstruksi-edited.jpeg" alt="Drone view of a building" />

//         {/* Image and markers as before */}

//         {markers.map((marker) => (
//          <button
//            key={marker.id}
//           className="marker"
//              style={{ left: marker.position.x, top: marker.position.y, backgroundColor: marker.color }}
//             onClick={(e) => handleMarkerClick(e, marker)}
//            />
//         ))}
//       </div>
//       <div className="sidebar">
//       {showForm && <Form onClose={() => setShowForm(false)} />}

//       </div>
//     </div>
//   );
  

}

export default Image;
