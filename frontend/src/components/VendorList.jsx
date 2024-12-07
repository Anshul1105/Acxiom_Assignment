import React, { useState, useEffect } from 'react';
import { fetchVendors } from '../api'; // Import the API call function

const VendorsList = () => {
    const [vendors, setVendors] = useState([]);

    useEffect(() => {
        const getVendors = async () => {
            try {
                const response = await fetchVendors();
                setVendors(response.data);
            } catch (err) {
                console.error('Error fetching vendors:', err);
            }
        };
        getVendors();
    }, []);

    return (
        <div>
            <h2>Vendors</h2>
            <ul>
                {vendors.map((vendor) => (
                    <li key={vendor._id}>Vendor {vendor.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default VendorsList;
