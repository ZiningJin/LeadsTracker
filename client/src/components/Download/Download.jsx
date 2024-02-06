import React ,{ useState } from 'react'
import axios  from 'axios';
import './download.css'
import { leadsource1Values } from '../../data'

const Download = () => {
const [leadSource1, setLeadSource1] = useState('');
const [startDate, setStartDate] = useState('');
const [endDate, setEndDate] = useState('');
const [downloadSuccess, setDownloadSuccess] = useState(false);
const [downloadedFile, setDownloadedFile] = useState(null);

const handleDownload = async (event) => {
    event.preventDefault();
    let queryString = `/api/download?lead_source1=${leadSource1}`;
    if (startDate && endDate) {
        queryString += `&start_date=${startDate}&end_date=${endDate}`;
    }

    console.log('Check Query String:', queryString);

    try {
        const response = await axios.get(queryString, {
            baseURL: 'http://localhost:5000',
            responseType: 'blob',  // Set the response type to 'blob' for file download
        });
        console.log('API Reponse:', response.data);
        
        // Create a blob URL from the response data and set it in the state
        const downloadUrl = URL.createObjectURL(response.data);
        setDownloadedFile(downloadUrl);
        setDownloadSuccess(true);
    } catch (error) {
        console.log('API Error:', error);
    }
};

  return (
    <section id='download'>
        <h2>Download Excel</h2>
        <div className="container download__container">
            <form onSubmit={handleDownload}>
                <label>
                    Lead Source1:
                    <select value={leadSource1} onChange={(event) => setLeadSource1(event.target.value)}>
                        <option value="">--Select Lead Source1--</option>
                        {leadsource1Values.map((value, index) => {
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
                    Download:
                    <button className='btn btn-primary' type='submit' disabled={downloadSuccess}>
                        {downloadSuccess ? 'Downloaded' : 'Download Now'}
                    </button>
                </label>
            </form>
             {/* Render the downloaded data */}
             {downloadedFile && (
                <div className="download-link">
                    <p>Excel file downloaded successfully!</p>
                    <div>
                        <a href={downloadedFile} target="_blank" rel="noopener noreferrer">
                            Open Excel
                        </a>
                    </div>
                    <div>
                        <iframe src={downloadedFile} title="Downloaded Excel" width="100%" height="500px" />
                    </div>
                </div>
                )}
        </div>
    </section>
  )
}

export default Download
