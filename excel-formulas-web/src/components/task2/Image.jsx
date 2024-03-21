import React, { useState } from 'react';
import Form from './Form';
import './image.css'


function Image() {
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState([]);


    const [zoom, setZoom] = useState(false);
    const [formPosition, setFormPosition] = useState({ x: 0, y: 0 });
    const [report, setReport] = useState("");

    const [zoomLevel, setZoomLevel] = useState(100);
    const [mainImage, setMainImage] = useState("https://halorobotics.com/en/wp-content/uploads/2021/09/underwater-drone-rov-fifish-pro-26-untuk-mainetance-pekerjaan-konstruksi-edited.jpeg");

    const thumbnails = [
        "https://halorobotics.com/en/wp-content/uploads/2021/09/underwater-drone-rov-fifish-pro-26-untuk-mainetance-pekerjaan-konstruksi-edited.jpeg",
        "https://i.vimeocdn.com/video/784846707-de04ac746205f35f6626818de0c17e8ce7777ebcc5a6010e912dce794f9f2e7d-d_640x360.jpg",
        "https://bsmedia.business-standard.com/_media/bs/img/article/2024-03/13/full/1710304213-7746.jpg?im=FeatureCrop,size=(826,465)"
    ];

    const markers = [
        { id: 1, color: 'rgb(237,65,51)', position: { x: '20%', y: '20%' } },
        { id: 2, color: 'rgb(74,177,187)', position: { x: '90%', y: '30%' } },
        { id: 3, color: 'rgb(74,177,187)', position: { x: '60%', y: '50%' } },

        { id: 4, color: 'rgb(74,177,187)', position: { x: '80%', y: '10%' } },
        { id: 5, color: 'rgb(240,116,57)', position: { x: '50%', y: '10%' } },
        { id: 6, color: 'orange', position: { x: '50%', y: '20%' } },
        { id: 7, color: 'rgb(240,116,57)', position: { x: '70%', y: '30%' } },

    ];


    const handleFormSubmit = (newFormData) => {
        setFormData([...formData, newFormData]);
    };

    const handleMarkerClick = (e, marker) => {
        e.stopPropagation();
        setZoomLevel(200);
        if (marker.color === 'rgb(240,116,57)') {
            setShowForm(true);
        } else {
            const randomReportText = ` Report for marker ${marker.id}: Issue detected at position (${marker.position.x}, ${marker.position.y}).`;
            setReport(randomReportText);
            setShowForm(false);
        }
    };

    const handleImageClick = () => {
        setShowForm(false);
        setZoomLevel(100);
    };


    const handleThumbnailClick = (thumbnailUrl) => {
        setMainImage(thumbnailUrl);
    };

    return (
        <>
            <div className="app">
                <div className={`image-container ${zoomLevel > 100 ? 'zoomed' : ''}`} onClick={handleImageClick}>
                    <img src={mainImage} alt="Drone view of a building" />
                    {markers.map((marker) => (
                        <button
                            key={marker.id}
                            className="marker"
                            style={{ left: marker.position.x, top: marker.position.y, backgroundColor: marker.color }}
                            onClick={(e) => handleMarkerClick(e, marker)}
                        > {marker.id}</button>
                    ))}
                </div><br />

                <div className="sidebar">
                    {showForm ? <Form onSubmit={handleFormSubmit} onClose={() => setShowForm(false)} /> : <div className="report-section"><b>{report}</b></div>}
                </div>


            </div>

            <div className="thumbnails">
                {thumbnails.map((src, index) => (
                    <img
                        key={index}
                        src={src}
                        alt={`Thumbnail ${index + 1}`}
                        className="thumbnail"
                        onClick={() => handleThumbnailClick(src)}
                    />
                ))}


            </div>
            <table>
                <thead>
                    <tr>
                        <td>Issue</td>
                        <td>component</td>
                        <td>issueType</td>
                        <td>severity</td>
                        <td>resolved</td>
                        <td>repairCost</td>
                        <td>comments</td>

                    </tr>
                </thead>
                <tbody>
                    {formData.map((data, index) => (
                        <tr key={index}>
                            <td>{data.issue}</td>
                            <td>{data.component}</td>
                            <td>{data.issueType}</td>
                            <td>{data.severity}</td>
                            <td>{data.resolved}</td>
                            <td>{data.repairCost}</td>
                            <td>{data.comments}</td>


                        </tr>
                    ))}
                </tbody>
            </table>

        </>
    );





}

export default Image;
