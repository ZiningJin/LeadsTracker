import React, { useState } from 'react';
import axios from 'axios';
import './update.css'

const Update = () => {
    const [id, setId] = useState('');
    const [record, setRecord] = useState(null);
    const [status, setStatus] = useState('');
    const [feedback, setFeedback] = useState('');
    const [opptynumber, setOpptynumber] = useState('');
    const [amountcny, setAmountcny] = useState('');

    const [updateMessage, setUpdateMessage] = useState('');

    const handleSearch = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/update?id=${id}`);
            if (response.data) {
                setRecord(response.data);
            } else {
                setRecord(null);
            }
        } catch (error) {
            console.log('API Error:', error);
            setRecord(null);
        }
    };

    const handleUpdate = async () => {
        try {
            const data = {
                id:record.id,
                status, 
                feedback, 
                oppty_number: opptynumber,
                amount_cny: amountcny,
            };
            const response = await axios.post(`/api/update?id=${id}`, data, {
                baseURL: 'http://localhost:5000',
                headers: { 'Content-Type': 'application/json' },
            });
            console.log('API Response:', response.data);

            if (response.status === 200) {
                setUpdateMessage('Update Successfully');
            } else {
                setUpdateMessage('Update Failed');
            }

            // Reset input values to placeholders
            setStatus("");
            setFeedback("");
            setOpptynumber("");
            setAmountcny("");

        } catch (error) {
            console.log('API Error:', error);
            setUpdateMessage('Update Failed');
        }
    };

  return (
    <section id='update'>
        <h2>Update By ID</h2>
        <div className='container update__container'>
            <div className='update-row'>
                <label>
                    ID: 
                    <input type="text" value={id} onChange={(e) => setId(e.target.value)} />
                </label>
                <button className='btn btn-primary' onClick={handleSearch}>Search</button>
            </div>

            <h3>Update here:</h3>
            <div className="updaterecord__container">
                {record && (
                    <div className='update-container'>
                        <p>Start Date: {record.start_date}</p>
                        <p>Project Name: {record.project_name}</p>
                        <p>Status: {record.status}</p>
                        <p>Feedback: {record.feedback}</p>
                        <p>Opportunity Number: {record.oppty_number}</p>
                        <p>Amount CNY: {record.amount_cny}</p>

                        <div className='update-column'>
                            <label>
                                Status:
                                <input className="record-update" type="text" value={status} onChange={(e) => setStatus(e.target.value)} placeholder="update status" />
                            </label>
                        </div>
                        <div className='update-column'>
                            <label>
                                Feedback:
                                <input className="record-update" type="text" value={feedback} onChange={(e) => setFeedback(e.target.value)} placeholder="update feedback" />
                            </label>
                        </div>
                        <div className='update-column'>
                            <label>
                                Opportunity Number:
                                <input className="record-update" type="text" value={opptynumber} onChange={(e) => setOpptynumber(e.target.value)} placeholder="update oppty number" />
                            </label>
                        </div>
                        <div className='update-column'>
                            <label>
                                Amount CNY:
                                <input className="record-update" type="text" value={amountcny} onChange={(e) => setAmountcny(e.target.value)} placeholder="update amount in CNY" />
                            </label>
                        </div>
                        
                        <button className='btn btn-primary' onClick={handleUpdate}>Update</button>
                        <p>{updateMessage}</p>
                    </div>
                )}
            </div>
        </div>
    </section>
  )
}

export default Update;
