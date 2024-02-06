import React, { useState } from 'react';
import axios from 'axios';
import './track.css'
import { statusValues, wgamtValues, brandsValues } from '../../data';

const Track = () => {
    const [status, setStatus] = useState('');
    const [wg_amt, setWGAMT] = useState('');
    const [brands, setBrands] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [emailMqls, setEmailMqls] = useState([]);
    const [salesforceData, setSalesforceData] = useState([]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        let queryString = `/api/track?status=${status}`;
        if (startDate && endDate) {
            queryString += `&start_date=${startDate}&end_date=${endDate}`;
        }

        if (wg_amt) {
            queryString += `&wg_amt=${wg_amt}`;
        }
        if (brands) {
            queryString += `&brands=${brands}`;
        }

        console.log('Check Query String:', queryString);

        try {
            const response = await axios.get(queryString, {
                baseURL: 'http://localhost:5000'
            });
            console.log('API Reponse:', response.data);
            setEmailMqls(response.data);
        } catch (error) {
            console.log('API Error:', error);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = date.getMonth() + 1; // Month is zero-based
        const day = date.getDate();

        return `${year}/${month}/${day}`;
    };

    const handleTrackNow = (email) => {
        const subject = '1688 Leads Tracking';
        const body = `
        Please response the tracking progress of below leads:
        - id: ${email.id}
        - Start Date: ${email.start_date}
        - Project Name: ${email.project_name}
        - State: ${email.state} 
        - City: ${email.city}
        - Project Description: ${email.project_desp}
        `
        const mailtoLink = `mailto:${email.mail_to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.location.href = mailtoLink;
    };

    const handleSalesforceQuery = async (projectName) => {
        try {
            const response = await axios.get(`/api/salesforce/query?project_name=${projectName}`, {
                baseURL: 'http://localhost:5000',
                headers: { 'Content-Type': 'application/json' },
            });
            setSalesforceData(response.data);
            console.log('Salesforce Query Response:', response.data);
        } catch (error) { 
            console.log('Salesforce Query Error:', error);
        }
    };

  return (
    <section id='track'>
        <h2>Select and Track</h2>
        <div className='container track__container'>
            <form onSubmit={handleSubmit}>
                <label>
                    Status:
                    <select value={status} onChange={(event) => setStatus(event.target.value)}>
                        <option value="">--Select emailMQL Status--</option>
                        {statusValues.map((value, index) => {
                        return <option key={index} value={value}>{value}</option>
                        })}
                    </select>
                </label>
                <br />
                <label>
                Start Date:
                    <input
                        type="date"
                        value={startDate}
                        onChange={(event) => setStartDate(event.target.value)}
                    />
                </label>
                <br />
                <label>
                End Date:
                    <input
                        type="date"
                        value={endDate}
                        onChange={(event) => setEndDate(event.target.value)}
                    />
                </label>
                <br />

                <label>
                    WG or AMT:
                    <select value={wg_amt} onChange={(event) => setWGAMT(event.target.value)}>
                        <option value="">--Select WG or AMT--</option>
                        {wgamtValues.map((value, index) => {
                        return <option key={index} value={value}>{value}</option>
                        })}
                    </select>
                </label>
                <br />
                <label>
                    Brand:
                    <select value={brands} onChange={(event) => setBrands(event.target.value)}>
                        <option value="">--Select Brand--</option>
                        {brandsValues.map((value, index) => {
                        return <option key={index} value={value}>{value}</option>
                        })}
                    </select>
                </label>
                <button className='btn btn-primary' type="submit">Search</button>
            </form>
            
            <h3>emailmql detail table:</h3>
            <table className='track-table'>
            <thead>
                <tr>
                <th>ID</th>
                <th>Start Date</th>
                <th>Project Name</th>
                <th>State</th>
                <th>City</th>
                <th>Project Description</th>
                <th>Mail To</th>
                <th>Feedback</th>
                <th>Check SFA</th>
                <th>Track Now</th>
                </tr>
            </thead>
            <tbody>
                {emailMqls.map((emailMql) => (
                <tr key={emailMql.id}>
                    <td>{emailMql.id}</td>
                    <td>{formatDate(emailMql.start_date)}</td>
                    <td>{emailMql.project_name}</td>
                    <td>{emailMql.state}</td>
                    <td>{emailMql.city}</td>
                    <td>{emailMql.project_desp}</td>
                    <td>{emailMql.mail_to}</td>
                    <td>{emailMql.feedback}</td>
                    <td>
                        <button className='btn' onClick={() => handleSalesforceQuery(emailMql.project_name)}>Check SFA</button>
                    </td>
                    <td>
                        <button className='btn' onClick={() => handleTrackNow(emailMql)}>Track Now</button>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>

            <h3>The lead's status and CloseReason and RejectReason in Salesforce:</h3>
            <div className="salesforceData__container">
                {salesforceData.map((data) => (
                    <div key={data.Id}>
                        <p>SFAID: {data.Id}</p>
                        <a 
                            href={`https://ircoap.lightning.force.com/lightning/r/Lead/${data.Id}/view`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            class="custom-link"
                        >
                        SFA LINK</a>
                        <p>Company: {data.Company}</p>
                        <p>Status: {data.Status}</p>
                        <p>Closed Reason: {data.ClosedReason}</p>
                        <p>Reject Reason: {data.RejectReason}</p>
                    </div>
                ))}
            </div>

            <div className="separator"></div>
        </div>
    </section>
  )
}

/*
        <ul>
            {emailMqls.map((emailMql) => (
                <li key={emailMql.id}>
                    {emailMql.start_date} - {emailMql.project_name} - {emailMql.state} - {emailMql.city} - {emailMql.project_desp} - {emailMql.mail_to} - {emailMql.feedback}
                </li>
            ))}
        </ul>
*/

export default Track;
