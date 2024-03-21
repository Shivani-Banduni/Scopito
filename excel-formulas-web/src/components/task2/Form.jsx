import React from 'react';
import './form.css'
const Form = ({ position, onClose }) => {
  return (
<div className="issue-form" style={{ left: position?.x, top: position?.y }}>
      <form>
        <label>Add Issue</label>
        <input type="text" />
        <label>Component</label>
        <input type="text" />
        <label>Issue Type</label>
        <select>
          <option>Structural</option>
          <option>Electrical</option>
        </select>
        <label>Severity</label>
        <select>
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>
        <label>Resolved</label>
        <select>
          <option>Yes</option>
          <option>No</option>
        </select>
        <label>Repair Cost (USD)</label>
        <input type="number" />
        <label>Comments</label>
        <textarea />
        <button type="submit">Submit</button>
        <button type="button" onClick={onClose}>Close</button>
      </form>
    </div>
  );
};

export default Form;
