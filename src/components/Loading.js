import React from 'react'
import Loader from 'react-loader-spinner';

export default function Loading() {
    return (
        <div style={{height: '100%', margin: 'auto' }}>
            <div className='d-flex justify-content-center'>
            <Loader type="Circles" color="#00BFFF" height={80} width={80} />
            </div>
        </div>
    )
}
