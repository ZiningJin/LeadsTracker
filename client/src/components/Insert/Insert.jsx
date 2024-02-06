import React, { useState } from 'react'
import axios from 'axios';
import { statusValues, wgamtValues, brandsValues, productcategoryValues, leadsource1Values, countryValues, stateValues } from '../../data'
import './insert.css'

const Insert = () => {
    const [formData, setFormData] = useState({
        start_date: '',
        project_name: '',
        customer_name: '',
        customer_phone: '',
        wg_amt: '',
        brands: '',
        product_category: '',
        country: '',
        state: '',
        city: '',
        lead_source1: '',
        mail_to: '',
        project_desp: '',
        status: '',
        oppty_number: '',
        feedback: '',
        amount_cny: '',
    });

    const [tableData, setTableData] = useState([]);

    const [insertMessage, setInsertMessage] = useState('');

    const handleInsert = (name, value) => {
        setFormData({
            ...formData,
            [name]: value,
        });
    }
    const handleInsertSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/insert', formData, {
                baseURL: 'http://localhost:5000',
                headers: { 'Content-Type': 'application/json' },
            });
            console.log('API Response:', response.data);
            if (response.status === 200) {
                setInsertMessage('Update Successfully');
            } else {
                setInsertMessage('Update Failed');
            }
            // Update the table data with the form data
            const newTableData = [...tableData, formData];
            setTableData(newTableData);
            // Reset form data if needed
            setFormData({
                start_date: '',
                project_name: '',
                customer_name: '',
                customer_phone: '',
                wg_amt: '',
                brands: '',
                product_category: '',
                state: '',
                city: '',
                lead_source1: '',
                mail_to: '',
                project_desp: '',
                status: '',
                oppty_number: '',
                feedback: '',
                amount_cny: '',
            });
        } catch (error) {
            console.log('API Error:', error);
            setInsertMessage('Insert Failed');
        }
    };

/*
       const handleEmailNow = (data) => {
        const subject = 'EmailBody';
        const body = `
        We receive below leads:
        - Start Date: ${data.start_date}
        - Project Name: ${data.project_name}
        - Last Name: ${data.customer_name}
        - Phone: ${data.customer_phone}
        - WG_AMT: ${data.wg_amt}
        - Brands: ${data.brands}
        - Product Category: ${data.product_category}
        - State: ${data.state} 
        - City: ${data.city}
        - Lead Source 1: ${data.lead_source1}
        - Project Description: ${data.project_desp}
        Please Contact Us if any problem
        `;
        const mailtoLink = `mailto:${data.mail_to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.location.href = mailtoLink;
        console.log('handleEmailNow executed'); 
        console.log('formData in Insert Module', data);
    };
*/

  return (
    <section id='insert'>
        <h2>Insert New EmailMql</h2>
        <div className="container insert__container">
            <div className="insert__container-action">
                <form onSubmit={handleInsert}>
                    {/* START OF Input/Select/Picker Fields */}
                        <div>
                            <label htmlFor="start_date">Start Date:</label>
                            <input type="date" id='start_date' 
                            name='start_date' value={formData.start_date} onChange={(e) => handleInsert(e.target.name, e.target.value)} />
                        </div>

                        <div>
                            <label htmlFor="project_name">Project Name:</label>
                            <input type="text" id='project_name' 
                            name='project_name' value={formData.project_name} onChange={(e) => handleInsert(e.target.name, e.target.value)} />
                        </div>

                        <div>
                            <label htmlFor="customer_name">Customer Name:</label>
                            <input type="text" id='customer_name' 
                            name='customer_name' value={formData.customer_name} onChange={(e) => handleInsert(e.target.name, e.target.value)} />
                        </div>

                        <div>
                            <label htmlFor="customer_phone">Customer Phone:</label>
                            <input type="text" id='customer_phone' 
                            name='customer_phone' value={formData.customer_phone} onChange={(e) => handleInsert(e.target.name, e.target.value)} />
                        </div>

                        <div>
                            <label htmlFor='wg_amt'>WG or AMT:</label>
                            <select id="wg_amt" name="wg_amt" value={formData.wg_amt} onChange={(e) => handleInsert('wg_amt', e.target.value)}>
                                <option value="" style={{ fontSize: '8px' }}>Select WGAMT</option>
                                {wgamtValues.map((name, index) => (
                                    <option key={index} value={name}>{name}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label htmlFor='brands'>Brands:</label>
                            <select id="brands" name="brands" value={formData.brands} onChange={(e) => handleInsert('brands', e.target.value)}>
                                <option value="" style={{ fontSize: '8px' }}>Select Brand</option>
                                {brandsValues.map((name, index) => (
                                    <option key={index} value={name}>{name}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label htmlFor='product_category'>Product Category:</label>
                            <select id="product_category" name="product_category" value={formData.product_category} onChange={(e) => handleInsert('product_category', e.target.value)}>
                                <option value="" style={{ fontSize: '8px' }}>Select Product Category</option>
                                {productcategoryValues.map((name, index) => (
                                    <option key={index} value={name}>{name}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label htmlFor='country'>Country:</label>
                            <select id="country" name="country" value={formData.country} onChange={(e) => handleInsert('country', e.target.value)}>
                                <option value="" style={{ fontSize: '8px' }}>Select Country</option>
                                {countryValues.map((name, index) => (
                                    <option key={index} value={name}>{name}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label htmlFor='state'>State:</label>
                            <select id="state" name="state" value={formData.state} onChange={(e) => handleInsert('state', e.target.value)}>
                                <option value="" style={{ fontSize: '8px' }}>Select State</option>
                                {stateValues.map((name, index) => (
                                    <option key={index} value={name}>{name}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label htmlFor="city">City:</label>
                            <input type="text" id='city' name='city' value={formData.city} onChange={(e) => handleInsert(e.target.name, e.target.value)} />
                        </div>

                        <div>
                            <label htmlFor='lead_source1'>Lead Source1:</label>
                            <select id="lead_source1" name="lead_source1" value={formData.lead_source1} onChange={(e) => handleInsert('lead_source1', e.target.value)}>
                                <option value="" style={{ fontSize: '8px' }}>Select Lead Source1</option>
                                {leadsource1Values.map((name, index) => (
                                    <option key={index} value={name}>{name}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label htmlFor="mail_to">Main To:</label>
                            <input type="text" id="mail_to"  name='mail_to' value={formData.mail_to} onChange={(e) => handleInsert(e.target.name, e.target.value)} />
                        </div>

                        <div>
                            <label htmlFor="project_desp">Project Description:</label>
                            <input type="text" id='project_desp' name='project_desp' value={formData.project_desp} onChange={(e) => handleInsert(e.target.name, e.target.value)} />
                        </div>

                        <div>
                            <label htmlFor='status'>Status:</label>
                            <select id="status" name="status" value={formData.status} onChange={(e) => handleInsert('status', e.target.value)}>
                                <option value="" style={{ fontSize: '8px' }}>Select Status</option>
                                {statusValues.map((name, index) => (
                                    <option key={index} value={name}>{name}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label htmlFor="oppty_number">Opportunity Number:</label>
                            <input type="text" id='oppty_number' name='oppty_number' value={formData.oppty_number} onChange={(e) => handleInsert(e.target.name, e.target.value)} />
                        </div>

                        <div>
                            <label htmlFor="feedback">Feedback:</label>
                            <input type="text" id='feedback' name='feedback' value={formData.feedback} onChange={(e) => handleInsert(e.target.name, e.target.value)} />
                        </div>

                        <div>
                            <label htmlFor="amount_cny">Amount CNY:</label>
                            <input type="text" id='amount_cny' name='amount_cny' value={formData.amount_cny} onChange={(e) => handleInsert(e.target.name, e.target.value)} />
                        </div>

                    {/* END OF Input/Select/Picker Fields */}
                    <button className='btn btn-primary' onClick={handleInsertSubmit}>Insert</button>
                    <p>{insertMessage}</p>
                </form>
            </div>

            <div className="insert__container-table">
                {/* Table to display the form data */}
                {tableData.length > 0 && (
                    <table className='insert-table'>
                        <thead>
                        <tr>
                            <th>Start Date</th>
                            <th>Project Name</th>
                            <th>Customer Name</th>
                            <th>Customer Phone</th>
                            <th>WG_AMT</th>
                            <th>Brands</th>
                            <th>Product Category</th>
                            <th>Country</th>
                            <th>State</th>
                            <th>City</th>
                            <th>Lead Source1</th>
                            <th>Mail To</th>
                            <th>Project Description</th>
                        </tr>
                        </thead>
                        <tbody>
                        {tableData.map((data, index) => (
                            <tr key={index}>
                            <td>{data.start_date}</td>
                            <td>{data.project_name}</td>
                            <td>{data.customer_name}</td>
                            <td>{data.customer_phone}</td>
                            <td>{data.wg_amt}</td>
                            <td>{data.brands}</td>
                            <td>{data.product_category}</td>
                            <td>{data.country}</td>
                            <td>{data.state}</td>
                            <td>{data.city}</td>
                            <td>{data.lead_source1}</td>
                            <td>{data.mail_to}</td>
                            <td>{data.project_desp}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    </section>
  )
}

/*
    <td>
        <button className='btn' onClick={() => handleEmailNow(data)}>Email Now</button>
    </td>
*/

export default Insert
