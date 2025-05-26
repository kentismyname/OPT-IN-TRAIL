import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // (Optional) Setup icon library properly
import { faCamera, faEnvelope, faEyeSlash, faFileArrowDown, faLocationDot, faShieldHalved, faTrash } from '@fortawesome/free-solid-svg-icons';
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
import { faKey } from '@fortawesome/free-solid-svg-icons';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import { faPrint } from '@fortawesome/free-solid-svg-icons';
import { faFileExport } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';









const SHEET_API_URL = 'https://script.google.com/macros/s/AKfycbxz6YYQ8QYbCj2S3mXY5E1RyhZxEUDvjAts7NVpYituz6VzRd9EYrGmCjUYCmBeTA/exec';

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
        <div className="col-12" style={{ backgroundColor: '#eceff4', height: '45px', padding: '10px' }}>{label}</div>
        <div className='mt-1' style={{height: '25px', padding: '5px 10px'}}><span>{isRawValue ? keyOrValue : data[keyOrValue]}</span></div>
      </div>
    </div>
  );
  const renderDetail1 = (label, keyOrValue, isRawValue = false) => (
    <div className="py-1 col-12" style={{fontSize: "18px"}}>
      <div className='row'>
        <div className="col-5" >{label}</div>
        <div className='col-7' style={{marginLeft: "-80px"}}><span>{isRawValue ? keyOrValue : data[keyOrValue]}</span></div>
      </div>
    </div>
  );

  return (
    <div className=" container-fluid py-4" style={{backgroundColor: "#f8f9fa"}} >
      <button className="btn btn-secondary mb-3" onClick={() => navigate('/')}>← Back</button>
      <div className="row">
        
        <div className='col-md-1 bg-dark me-3'>
          <div className='row text-white' style={{fontSize: "18px"}}>
            <span className='mt-3'><FontAwesomeIcon icon={faCamera}style={{ color: '#9ca2a7' }}  /> Media</span>
            <span className='mt-3'><FontAwesomeIcon icon={faCopy} style={{ color: '#9ca2a7' }} /> Pages</span>
            <span className='mt-3'><FontAwesomeIcon icon={faMessage} style={{ color: '#9ca2a7' }} /> Comments</span>
            <span className='mt-3'><FontAwesomeIcon icon={faRectangleList} style={{ color: '#9ca2a7' }} /> Feedback</span>
            <span className='mt-3' style={{backgroundColor: "#2271b1"}}><FontAwesomeIcon icon={faNewspaper} style={{ color: '#9ca2a7' }} /> WPForms</span>
          </div>

          <div className='row' style={{backgroundColor: "#2c3338", color: "#e5e9f0", fontSize: "15px"}}>
            <span className='mt-3'>All Forms</span>
            <span className='mt-3'>Add New Form</span>
            <strong className='mt-3' style={{color: "White"}}>Entries</strong>
            <span className='mt-3'>Payments</span>
            <span className='mt-3'>Form Templates</span>
            <span className='mt-3'>Settings</span>
            <span className='mt-3'>Tools</span>
            <span className='mt-3' style={{color: "orange"}}>Addons</span>
            <span className='mt-3'>Analytics</span>
            <span className='mt-3'>SMTP</span>
            <span className='mt-3'>About Us</span>
            <span className='mt-3'>Community</span>
          </div>
          <div className='row text-white' style={{fontSize: "18px"}} >
            <span className='mt-3'><FontAwesomeIcon icon={faPaintbrush} rotation={180} style={{ color: '#9ca2a7'}} /> Apperance</span>
            <span className='mt-3'><FontAwesomeIcon icon={faPlug} rotation={50} style={{ color: '#9ca2a7'}} /> Plugins</span>
            <span className='mt-3'><FontAwesomeIcon icon={faUser} style={{ color: '#9ca2a7'}} /> Users</span>
            <span className='mt-3'><FontAwesomeIcon icon={faWrench} style={{ color: '#9ca2a7'}} /> Tools</span>
            <span className='mt-3'><FontAwesomeIcon icon={faGear} style={{ color: '#9ca2a7'}} /> Settings</span>
            <span className='mt-3'><FontAwesomeIcon icon={faFileCode} style={{ color: '#9ca2a7'}} />Code Snippets</span>
          </div>
        </div>


        <div className="col-md-7 border rounded shadow-sm">
          <h4 className="py-3 border-bottom mb-0" style={{fontSize: "18px"}}>Braces Inquiry</h4>

          {renderDetail('Name', `${data['First Name']} ${data['Last Name']}`, true)}
          {renderDetail('Address', 'Address')}
          {renderDetail('City', 'City')}
          {renderDetail('State', 'State')}
          {renderDetail('Phone', 'Phone')}
          {renderDetail('I agree to be contacted at this phone number', 'Yes', true)}
          {renderDetail('Birth Date', 'Birthdate')}
          {renderDetail('Member ID', 'MemberID')}
          {renderDetail('Insurance', 'Medicare' , true)}
          {renderDetail('Preferred Braces', 'Brace Types')}
        </div>

        <div className="col-md-3 mx-4" >
          <div className="row">
            <div className=" p-3 rounded shadow-sm border" style={{backgroundColor: "white"}}>
              <h5 className="mb-2 border-bottom" style={{ height: '35px' }}>Entry Details</h5>
              {renderDetail1(<><FontAwesomeIcon icon={faKey} style={{ color: '#9ca2a7', marginRight: '10px' }} />Entry ID:</>,`${506216 + parseInt(rowIndex)}`,true)}
              {renderDetail1(<><FontAwesomeIcon icon={faCalendarDays} style={{ marginRight: "10px" , fontSize: "15px" , color: '#9ca2a7'}} />Submitted:</>,'Submitted')}
              {renderDetail1(<><FontAwesomeIcon icon={faCalendarDays} style={{ marginRight: "10px" , fontSize: "15px" , color: '#9ca2a7'}} />Modified:</>,'Modified')}
              {renderDetail1(<><FontAwesomeIcon icon={faUser} style={{ marginRight: "10px" , fontSize: "15px" , color: '#9ca2a7'}} />User:</>, 'QA', true)}
              {renderDetail1(<><FontAwesomeIcon icon={faLocationDot} style={{ marginRight: "10px" , fontSize: "15px" , color: '#9ca2a7'}} />User IP:</>, 'IP ADDRESS')}
            </div>

            <div className="p-3 rounded shadow-sm border mt-4" style={{fontSize: "18px", backgroundColor: "white"}}>
                <h5 className="mb-2 border-bottom" style={{ height: '35px' }}>Actions</h5>
              <div className="row" style={{color: "#0566ac"}}>
                <span className='mt-2'><FontAwesomeIcon icon={faPrint} style={{ marginRight: "10px" , fontSize: "15px" , color: '#9ca2a7'}} /> Print</span>
                <span className='mt-2'><FontAwesomeIcon icon={faFileExport} style={{ marginRight: "8px" , fontSize: "15px" , color: '#9ca2a7'}} /> Export (CSV)</span>
                <span className='mt-2'><FontAwesomeIcon icon={faFileArrowDown} style={{ marginRight: "14px" , fontSize: "15px" , color: '#9ca2a7'}} /> Export (XLSX)</span>
                <span className='mt-2'><FontAwesomeIcon icon={faEnvelope} style={{ marginRight: "10px" , fontSize: "15px" , color: '#9ca2a7'}} /> Resend Notifications</span>
                <span className='mt-2'><FontAwesomeIcon icon={faStar} style={{ marginRight: "9px" , fontSize: "15px" , color: '#9ca2a7'}} /> Unstar</span>
                <span className='mt-2'><FontAwesomeIcon icon={faEyeSlash} flip='horizontal' style={{ marginRight: "10px" , fontSize: "15px" , color: '#9ca2a7'}} /> Mark as Unread</span>
                <span className='mt-2'><FontAwesomeIcon icon={faShieldHalved} style={{ marginRight: "10px" , fontSize: "15px" , color: '#9ca2a7'}} /> Mark as Spam</span>
                <span className='mt-2'><FontAwesomeIcon icon={faTrash} style={{ marginRight: "10px" , fontSize: "15px" , color: '#9ca2a7'}} /> Delete Entry</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewPage;
