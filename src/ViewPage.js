import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // (Optional) Setup icon library properly
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { faMessage } from '@fortawesome/free-solid-svg-icons';
import { faRectangleList } from '@fortawesome/free-solid-svg-icons';
import { faNewspaper } from '@fortawesome/free-solid-svg-icons';
import { faPaintbrush } from '@fortawesome/free-solid-svg-icons';
import { faPlug } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faWrench } from '@fortawesome/free-solid-svg-icons';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { faFileCode } from '@fortawesome/free-solid-svg-icons';




const SHEET_API_URL = 'https://script.google.com/macros/s/AKfycbyTrdBUCs897m8LpvXOTlekpIoKxge7SFc013dPyGrwRS2Rn_w4mjMFTwD65htRNctT/exec';

function ViewPage() {
  const { rowIndex } = useParams();
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(SHEET_API_URL)
      .then(res => res.json())
      .then(sheetData => {
        const entry = sheetData[rowIndex];
        if (!entry) return navigate('/');
        setData(entry);
      })
      .catch(console.error);
  }, [rowIndex, navigate]);

  if (!data) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status" />
        <p className="mt-3">Loading entry...</p>
      </div>
    );
  }

  const renderDetail = (label, keyOrValue, isRawValue = false) => (
    <div className="py-2 col-12">
      <div className='row'>
        <div className="col-12" style={{ backgroundColor: '#eceff4', height: '30px' }}>{label}</div>
        <div className='mt-1'><span>{isRawValue ? keyOrValue : data[keyOrValue]}</span></div>
      </div>
    </div>
  );

  return (
    <div className="container-fluid py-4">
      <button className="btn btn-secondary mb-3" onClick={() => navigate('/')}>← Back</button>
      <div className="row">
        
        <div className='col-md-1 bg-dark me-3'>
          <div className='row text-white' style={{fontSize: "14px"}}>
            <span className='mt-2'><FontAwesomeIcon icon={faCamera}style={{ color: '#9ca2a7' }}  /> Media</span>
            <span className='mt-2'><FontAwesomeIcon icon={faCopy} style={{ color: '#9ca2a7' }} /> Pages</span>
            <span className='mt-2'><FontAwesomeIcon icon={faMessage} style={{ color: '#9ca2a7' }} /> Comments</span>
            <span className='mt-2'><FontAwesomeIcon icon={faRectangleList} style={{ color: '#9ca2a7' }} /> Feedback</span>
            <span className='mt-2' style={{backgroundColor: "#2271b1"}}><FontAwesomeIcon icon={faNewspaper} style={{ color: '#9ca2a7' }} /> WPForms</span>
          </div>

          <div className='row' style={{backgroundColor: "#2c3338", color: "#e5e9f0", fontSize: "13px"}}>
            <span className='mt-2'>All Forms</span>
            <span className='mt-2'>Add New Form</span>
            <strong className='mt-2' style={{color: "White"}}>Entries</strong>
            <span className='mt-2'>Payments</span>
            <span className='mt-2'>Form Templates</span>
            <span className='mt-2'>Settings</span>
            <span className='mt-2'>Tools</span>
            <span className='mt-2' style={{color: "orange"}}>Addons</span>
            <span className='mt-2'>Analytics</span>
            <span className='mt-2'>SMTP</span>
            <span className='mt-2'>About Us</span>
            <span className='mt-2'>Community</span>
          </div>
          <div className='row text-white' style={{fontSize: "14px"}} >
            <span className='mt-2'><FontAwesomeIcon icon={faPaintbrush} rotation={180} /> Apperance</span>
            <span className='mt-2'><FontAwesomeIcon icon={faPlug} rotation={50} /> Plugins</span>
            <span className='mt-2'><FontAwesomeIcon icon={faUser} /> Users</span>
            <span className='mt-2'><FontAwesomeIcon icon={faWrench} /> Tools</span>
            <span className='mt-2'><FontAwesomeIcon icon={faGear} /> Settings</span>
            <span className='mt-2'><FontAwesomeIcon icon={faFileCode} />Code Snippets</span>
          </div>
        </div>


        <div className="col-md-6 border">
          <h4 className="py-2 border-bottom mb-0">Braces Inquiry</h4>

          {renderDetail('Name', `${data['First Name']} ${data['Last Name']}`, true)}
          {renderDetail('Address', 'Address')}
          {renderDetail('City', 'City')}
          {renderDetail('State', 'State')}
          {renderDetail('Phone', 'Phone')}
          {renderDetail('I agree to be contacted at this phone number', 'Consent')}
          {renderDetail('Birth Date', 'BirthDate')}
          {renderDetail('Member ID', 'MemberID')}
          {renderDetail('Insurance', 'Insurance')}
          {renderDetail('Preferred Braces', 'Braces')}
        </div>

        <div className="col-md-3">
          <div className="bg-light p-4 rounded shadow-sm">
            <h6 className="mb-3 border-bottom" style={{ height: '30px' }}>Entry Details</h6>
            <p><strong>Entry ID:</strong> #{100000 + parseInt(rowIndex)}</p>
            <p><strong>Submitted:</strong> {new Date().toLocaleString()}</p>
            <p><strong>Modified:</strong> {new Date().toLocaleString()}</p>
            <p><strong>User:</strong> QA</p>
            <p><strong>User IP:</strong> {data['User IP'] || 'N/A'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewPage;
