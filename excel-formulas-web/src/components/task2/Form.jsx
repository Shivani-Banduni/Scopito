import React from 'react';
import './form.css'
const Form = ({ position, onSubmit, onClose }) => {
    const [formData, setFormData] = React.useState({
        issue: '',
        component: '',
        issueType: 'Structural',
        severity: 'High',
        resolved: 'Yes',
        repairCost: '',
        comments: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
        onClose();
    };
    return (
        <div className="issue-form" style={{ left: position?.x, top: position?.y }}>
            <form onSubmit={handleSubmit}>
                <label >Add Issue</label>
                <input   type="text" name="issue" value={formData.issue} onChange={handleChange} required/>
                <label>Component</label>
                <input required type="text" name="component" value={formData.component} onChange={handleChange} />
                <label>Issue Type</label>
                <select required name="issueType" value={formData.issueType} onChange={handleChange}>
                    <option>Structural</option>
                    <option>Electrical</option>
                </select>
                <label>Severity</label>
                <select required name="severity" value={formData.severity} onChange={handleChange}>
                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>
                </select>
                <label>Resolved</label>
                <select required name="resolved" value={formData.resolved} onChange={handleChange}>
                    <option>Yes</option>
                    <option>No</option>
                </select>
                <label>Repair Cost (USD)</label>
                <input type="number" name="repairCost" value={formData.repairCost} onChange={handleChange} />
                <label>Comments</label>
                <textarea required name='comments' onChange={handleChange} type='text' value={formData.comments} />
                <button type="submit">Submit</button>
                <button type="button" onClick={onClose}>Close</button>
            </form>
        </div>
    );
};

export default Form;
