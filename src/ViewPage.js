import jsPDF from 'jspdf';
import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import html2canvas from 'html2canvas';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // (Optional) Setup icon library properly
import { faCamera, faEnvelope, faEyeSlash, faFileArrowDown, faLocationDot, faShieldHalved, faTrash, faCopy, faMessage, faRectangleList, faNewspaper, faPaintbrush, faPlug, faUser, faWrench, faGear, faFileCode, faKey, faCalendarDays, faPrint, faFileExport, faStar } from '@fortawesome/free-solid-svg-icons';

const SHEET_API_URL = 'https://script.google.com/macros/s/AKfycbzVzisg7_pE1UwBOzj7jxNLzAYN9Lzx48AHFqpmGqEMYTXJ3-wW1EklCyhjVZGq31Z2/exec';

function ViewPage() {
  const { rowIndex } = useParams();
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  const captureRef = useRef(null);

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

  const takeScreenshot = () => {
  if (captureRef.current && data) {
    html2canvas(captureRef.current, { scale: 2 }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');

      // Create PDF in landscape mode
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4',
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      const firstName = data['First Name'] || 'FirstName';
      const lastName = data['Last Name'] || 'LastName';
      const fileName = `${firstName} ${lastName}.pdf`;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;

      while (heightLeft > 0) {
        position -= pdfHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;
      }

      pdf.save(fileName);
    });
  }
};

  if (!data) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status" />
        <p className="mt-3">Loading entry...</p>
      </div>
    );
  }

  const renderDetail = (label, keyOrValue, isRawValue = false) => {
  let value = isRawValue ? keyOrValue : data[keyOrValue];

  // Check and format if it's an ISO date string
  if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}T/.test(value)) {
    const date = new Date(value);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    value = `${day}/${month}/${year}`;
  }

  return (
    <div className="py-2 col-12">
      <div className='row'>
        <div className="col-12" style={{ backgroundColor: '#eceff4', height: '45px', padding: '10px' }}>{label}</div>
        <div className='mt-1' style={{ height: '25px', padding: '5px 10px' }}>
          <span>{value}</span>
        </div>
      </div>
    </div>
  );
};

  const renderDetail1 = (label, keyOrValue, isRawValue = false) => {
  let value = isRawValue ? keyOrValue : data[keyOrValue];

  // Format ISO date string to DD/MM/YYYY hh:mm AM/PM
  if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}T/.test(value)) {
    const date = new Date(value);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12 || 12; // convert 0 to 12 for AM

    value = `${day}/${month}/${year} ${hours}:${minutes} ${ampm}`;
  }

  return (
    <div className="py-1 col-12" style={{ fontSize: "18px" }}>
      <div className='row'>
        <div className="col-5">{label}</div>
        <div className='col-7' style={{ marginLeft: "-80px" }}>
          <span>{value}</span>
        </div>
      </div>
    </div>
  );
};


  return (
    <div className=" container-fluid py-4" style={{backgroundColor: "#f8f9fa"}} >
      <button className="btn btn-secondary mb-3" onClick={() => navigate('/')}>← Back</button>
      <button className="btn btn-primary mb-3 ms-2" onClick={takeScreenshot}>📸 Take Screenshot</button>

      
      
      <div className="row" ref={captureRef}>  
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
