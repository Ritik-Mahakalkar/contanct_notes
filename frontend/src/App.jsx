// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import NotesSection from './Component/NotesSection'; // Adjust path if needed

function App() {
  const defaultContactId = '661f2e547d4c5dd0e9fb24c9'; // Replace with a real contact ID

  return (
    <Router>
      <Routes>
        {/* Redirect from / to default contact */}
        <Route path="/" element={<Navigate to={`/contacts/${defaultContactId}`} replace />} />

        {/* Route for NotesSection with contactId */}
        <Route path="/contacts/:contactId" element={<NotesSection />} />
      </Routes>
    </Router>
  );
}

export default App;
