import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function SkeletonBlogCard() {

    return (
        <SkeletonTheme baseColor="#0e001b" highlightColor="#29093d" >
            <div className='blog-carte-container SkeletonBlogCard'>
                <div className='container image'>
                        {/* <span className='date-created'><Skeleton /></span> */}
                        <div className="status-category">
                            <span className='status'><Skeleton /></span>
                        </div>
                        <img src='' />
                </div>
                <div className="blog-carte-content">
                    <h2><Skeleton /></h2>
                    <div className="description-container">
                        <p className="description"><Skeleton /></p>
                    </div>
                    <div className="carteBlog-date">
                        <p><Skeleton /></p>
                    </div>
                </div>
            </div>
        </SkeletonTheme>
    )
}

export default SkeletonBlogCard