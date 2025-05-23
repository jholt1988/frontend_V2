import React, { useState } from 'react';

const ContractorsList = () => {
    const [contractors, setContractors] = useState([]);
    const [newContractor, setNewContractor] = useState('');

    const handleAddContractor = () => {
        if (newContractor.trim()) {
            setContractors([...contractors, newContractor.trim()]);
            setNewContractor('');
        }
    };

    const handleRemoveContractor = (index) => {
        setContractors(contractors.filter((_, i) => i !== index));
    };

    return (
        <div>
            <h2>Contractor List</h2>
            <div>
                <input
                    type="text"
                    placeholder="Enter contractor name"
                    value={newContractor}
                    onChange={(e) => setNewContractor(e.target.value)}
                />
                <button onClick={handleAddContractor}>Add Contractor</button>
            </div>
            <ul>
                {contractors.map((contractor, index) => (
                    <li key={index}>
                        {contractor}{' '}
                        <button onClick={() => handleRemoveContractor(index)}>Remove</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ContractorsList;