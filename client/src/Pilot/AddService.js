// AddServiceComponent.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AddService.css';
import ServiceCatalogTable from '../ServiceCatalogTable';
import { useNavigate } from "react-router-dom";

const AddServiceComponent = () => {
    const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [serviceTypes, setServiceTypes] = useState([]);
  const [selectedService, setSelectedService] = useState('');
  const [selectedServiceType, setSelectedServiceType] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [serviceCatalog, setServiceCatalog] = useState([]);
  const [editEntry, setEditEntry] = useState(null);

  useEffect(() => {
    fetchServices();
    fetchServiceCatalog();
  }, []);

  useEffect(() => {
    if (selectedService) {
      fetchServiceTypes(selectedService);
    }
  }, [selectedService]);

  const fetchServices = async () => {
    try {
      const response = await axios.get('${process.env.REACT_APP_F_URL}all/services');
      setServices(response.data);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  const fetchServiceTypes = async (serviceId) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_F_URL}all/getservicetypes/${serviceId}`);
      setServiceTypes(response.data);
    } catch (error) {
      console.error('Error fetching service types:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const serviceProviderId = localStorage.getItem('userId');
    const newServiceCatalogEntry = {
      service: selectedService,
      serviceType: selectedServiceType,
      serviceProvider: serviceProviderId,
      price,
      description,
    };
    try {
      await axios.post('${process.env.REACT_APP_F_URL}all/addserviceprovider', newServiceCatalogEntry);
      fetchServiceCatalog();
    } catch (error) {
      console.error('Error adding service catalog entry:', error);
    }
  };

  const fetchServiceCatalog = async () => {
    const serviceProviderId = localStorage.getItem('userId');
    try {
      const response = await axios.get(`${process.env.REACT_APP_F_URL}all/getserviceproviders/${serviceProviderId}`);
      setServiceCatalog(response.data);
    } catch (error) {
      console.error('Error fetching service catalog:', error);
    }
  };

  const handleEditServiceCatalogEntry = async (editedEntry) => {
    try {
      const response = await axios.put(`${process.env.REACT_APP_F_URL}all/updateserviceprovider/${editedEntry._id}`, editedEntry);
      if (response.status === 200) {
        fetchServiceCatalog();
        setEditEntry(null);
      }
    } catch (error) {
      console.error('Error updating service catalog entry:', error);
    }
  };

  const handleDeleteServiceCatalogEntry = async (entryId) => {
    try {
      const response = await axios.delete(`${process.env.REACT_APP_F_URL}all/deleteserviceprovider/${entryId}`);
      if (response.status === 200) {
        fetchServiceCatalog();
      }
    } catch (error) {
      console.error('Error deleting service catalog entry:', error);
    }
  };

  return (
    <div className="form-container">
        <div className="form-container-1">
      <form onSubmit={handleSubmit}>
        <select className="form-select" value={selectedService} onChange={e => setSelectedService(e.target.value)} required>
          <option value="">Select Service</option>
          {services.map(service => (
            <option key={service._id} value={service._id}>{service.serviceName}</option>
          ))}
        </select>
        <select className="form-select" value={selectedServiceType} onChange={e => setSelectedServiceType(e.target.value)} required>
          <option value="">Select Service Type</option>
          {serviceTypes.map(type => (
            <option key={type._id} value={type._id}>{type.serviceType}</option>
          ))}
        </select>
        <input className="form-select" type="number" value={price} onChange={e => setPrice(e.target.value)} placeholder="Price in dollars" required />
        <textarea className="form-select" value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" />
        <button className="form-button" type="submit">Add Service</button>
      </form>
      </div>
      <div className="table-wrapper">
        <h3>My Service Catalog</h3>
        <ServiceCatalogTable
          serviceCatalog={serviceCatalog}
          onEdit={setEditEntry}
          onDelete={handleDeleteServiceCatalogEntry}
          onSave={handleEditServiceCatalogEntry}
          editEntry={editEntry}
        />
      </div>
      <div className='row'>
        <button onClick={() => navigate('/Pilot')} className="buttonPayment">Back to dashboard</button>
      </div>
    </div>
  );
};

export default AddServiceComponent;
