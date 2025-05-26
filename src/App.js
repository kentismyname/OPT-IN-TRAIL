import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';



const SHEET_API_URL = 'https://script.google.com/macros/s/AKfycbz95PWGViXN6f9o73nu0zyq1lxhtZGNbrjE20kMy5uwdxo8hdFG93_NufRwxotOVgY5/exec';

function App({ setRowData }) {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [editing, setEditing] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(SHEET_API_URL)
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleEdit = (rowIndex, columnName) => {
    setEditing({ rowIndex, columnName });
  };

  const handleChange = (e, rowIndex, columnName) => {
    const newValue = e.target.value;
    const updated = [...data];
    updated[rowIndex][columnName] = newValue;
    setData(updated);

    fetch(SHEET_API_URL, {
      method: 'POST',
      body: JSON.stringify({ rowIndex, columnName, newValue }),
      headers: { 'Content-Type': 'application/json' },
    }).catch(console.error);

    setEditing({});
  };

  const columns = data.length > 0 ? Object.keys(data[0]) : [];
  const filteredData = data.filter(row =>
  (`${row['First Name']} ${row['Last Name']}`.toLowerCase().includes(searchQuery.toLowerCase()))
);


  return (
    <div className="container py-4">
      <h2 className="mb-4 text-center">Google Sheet Editor</h2>
      <div className="mb-3 text-center">
        <input
          type="text"
          className="form-control w-50 mx-auto"
          placeholder="Search by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>


      {loading ? (
        <div className="text-center mt-5">
          <div className="spinner-border text-primary" role="status" />
          <p className="mt-3">Loading data...</p>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="table-dark">
              <tr>
                <th>Action</th>
                {columns.map(col => (
                  <th key={col}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
             {filteredData.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  <td>
                    <Link className="btn btn-sm btn-outline-primary" to={`/view/${rowIndex}`}>
                      View
                    </Link>
                  </td>
                  {columns.map(col => (
                    <td key={col} onClick={() => handleEdit(rowIndex, col)}>
                      {editing.rowIndex === rowIndex && editing.columnName === col ? (
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          value={row[col]}
                          onChange={(e) => handleChange(e, rowIndex, col)}
                          autoFocus
                        />
                      ) : (
                        row[col]
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default App;
