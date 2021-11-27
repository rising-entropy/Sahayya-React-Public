import React from 'react'
import { useState, useEffect } from "react";
import axios from "axios";
import Loading from './Loading';

export default function PrintPage({
    match: {
      params: { id },
    },
  }) {

    const [isLoading, setIsLoading] = useState(true);
    const [type, setType] = useState("");
    const [user1, setUser1] = useState({});
    const [user2, setUser2] = useState({});
    const [applicationData, setApplicationData] = useState({});
    const [requestData, setRequestData] = useState({});

    useEffect(
      () => {
        axios({
          method: "GET",
          url:
            "https://asia-south1-sahayya-9c930.cloudfunctions.net/api/invoice/"+id,
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => {
            if(response.status === 200)
            {
              let data = response.data;
              console.log(data);
              setApplicationData(data['applicationData']);
              setRequestData(data['requestData']);
              setType(data['type']);
              setUser1(data['dataOfPersonWhoApplied'])
              setUser2(data['dataOfPersonWhoCreatedRequest'])
              setIsLoading(false)
            }

          })
          .catch((err) => {
            alert("Something went wrong!");
          });
      }, []
    );

    const applicationsDocs = (docs) => {
      let allDocs = [];

      for(let i=0; i<docs.length; i++)
      {
        allDocs.push(
          <button type="button" class="btn btn-dark"><a href={docs[i]} >Document {i+1}</a></button>
        )
      }

      return allDocs;
    }

    const requirements = (lst) => {
      let allReqs = [];
      for(let i=0; i<lst.length; i++)
      {
        allReqs.push(
          <button type="button" class="btn btn-dark">{lst[i]}</button>
        )
      }

      return allReqs;
    }

    return (
      isLoading ? <Loading/> :
        <div>
            <h1 style={{textAlign: 'center', marginTop: '1rem', marginBottom: '1rem'}}>Invoice</h1>
            <div className='container container-fluid'>
            <div className='row'>
                <div className='col-12 text-center' style={{marginTop: '50px', marginBottom: '20px', border: '2px solid #396EB0', marginLeft: '10%', marginRight: '10%', borderRadius: '30px'}}>
                <h3>Request:</h3>
                  <br/>
                  <h4>{requestData.title}</h4>
                  <p>{requestData.description}</p>
                  {applicationsDocs(requestData.documentsArray)}
                  <br/><br/>
                  {requirements(requestData.requirements)}
                </div>
              </div>
              <div className='row'>
                <div className='col-12 text-center' style={{marginTop: '40px', marginBottom: '20px', border: '2px solid #396EB0', marginLeft: '10%', marginRight: '10%', borderRadius: '30px'}}>
                  <h3>Application:</h3>
                  <br/>
                  <h4>{applicationData.title}</h4>
                  <p>{applicationData.body}</p>
                  {applicationsDocs(applicationData.documents)}
                  <h4>Completion Date: {applicationData.completionDate}</h4>
                </div>
              </div>
              <br/>
              <div className='row'>
                <div className='col-lg-6 col-md-6 col-sm-12 text-center' style={{marginTop: '40px', marginBottom: '20px'}}>
                  <div style={{margin: 'auto 10%', border: '2px solid #396EB0', borderRadius: '30px'}}>
                  <h3>Application By</h3>
                  {
                    user1.type === 'Donor' ? <h4>{user1.fName} {user1.lName}</h4> : <h4>{user1.name}</h4>
                  }
                  <h5>{user1.username}</h5>
                  <br/>
                  <img src={user1.picture} className="img img-fluid" alt="profile" width="150px" ></img>
                  <br/>
                  <br/>
                  <h6>Email: {user1.email}</h6>
                  </div>
                </div>
                <div className='col-lg-6 col-md-6 col-sm-12 text-center' style={{marginTop: '40px', marginBottom: '20px'}}>
                  <div style={{margin: 'auto 10%', border: '2px solid #396EB0', borderRadius: '30px'}}>
                  <h3>Request By</h3>
                  {
                    user2.type === 'Donor' ? <h4>{user2.fName} {user2.lName}</h4> : <h4>{user2.name}</h4>
                  }
                  <h5>{user2.username}</h5>
                  <br/>
                  <img src={user2.picture} className="img img-fluid" alt="profile" width="150px" ></img>
                  <br/><br/>
                  <h6>Email: {user2.email}</h6>
                  </div>
                </div>
              </div>
            </div>
            <br /><br /><br />

        </div>
    );
}
