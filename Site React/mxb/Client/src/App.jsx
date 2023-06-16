import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import Main from './pages/Main';
import BlogEditor from './pages/BlogEditor';
import BlogTest from './pages/BlogTest'


function App(){
  const { pathname } = useLocation();  

  useEffect(() => {
      window.scrollTo(0, 0);
  }, [pathname]);


  return (
    <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/blogeditor" element={<BlogEditor />} />
        <Route path="/blogtest" element={<BlogTest />} />
    </Routes>
  )
};

export default App;