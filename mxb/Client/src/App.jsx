import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import Main from './pages/Main';
import BlogEditor from './pages/BlogEditor';
import BlogDashbord from './pages/BlogDashboard';
import BlogsInformatiques from './pages/BlogsInformatiques';

function App(){
  const { pathname } = useLocation();  

  useEffect(() => {
      window.scrollTo(0, 0);
  }, [pathname]);


  return (
    <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/blogeditor" element={<BlogEditor />} />
        <Route path="/blogeditor/:existingBlogId" element={<BlogEditor />} />
        <Route path="/blogdashboard" element={<BlogDashbord />} />
        <Route path="/blogsinformatiques" element={<BlogsInformatiques />} />
    </Routes>
  )
};

export default App;