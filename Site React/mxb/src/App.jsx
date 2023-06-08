import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Main from './pages/Main';
import BlogEditor from './pages/BlogEditor';
import BlogTest from './pages/BlogTest'


function App(){

  return (
    <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/blogeditor" element={<BlogEditor />} />
        <Route path="/blogtest" element={<BlogTest />} />
    </Routes>
  )
};

export default App;