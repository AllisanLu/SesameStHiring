import { useEffect, useState } from "react";

import Application from "./Application";

function ApplicationList({ user, apps, loadApplications, loadJobs }) {

  const [applications, setApplications] = useState(apps)
  const [selectedApp, setSelectedApp] = useState()


  useEffect(() => {
    if (apps) {
      if (user.type === "manager") {
        const filtered = app.filter((app => {
          return app.applicationStatus !== "Rejected"
        }))
        setApplications(filtered)
      } else {
        setApplications(apps)
      }
    }
  }, [apps])

  const handleSelect = (application) => {
    if (application.id === selectedApp?.id) {
      setSelectedApp();
    } else {
      setSelectedApp(application);
    }
  }

  const handleSearch = (e) => {
    if (e.target.value) {
      const filteredList = applications?.filter((application) => {
        return ("" + application.id).includes(e.target.value) || ("" + application.jobId).includes(e.target.value)
      }) ;
      setApplications(filteredList);
    } else {
      setApplications(apps);
    }
  }


  return (
    <>
      <h3>Applications</h3>
      <div>
        <label htmlFor="search" className="font-23">Search: </label>
        <input className="search-bar font-23" id="search" name="search" placeholder="Search Application or Job Id" onChange={(e) => handleSearch(e)} />
      </div>
      <div className="table-wrapper">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Application Id</th>
              <th>Candidate Id</th>
              <th>Job Id</th>
              <th>Date Applied</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody className="table-horizontal">
            {applications?.map((application) => (
              <tr key={application.id} onClick={() => handleSelect(application)}>
                <td>{application.id}</td>
                <td>{application.userId}</td>
                <td>{application.jobId}</td>
                <td>{application.dateApplied}</td>
                <td>{application.applicationStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Application user={user} selectedApp={selectedApp} setSelectedApp={setSelectedApp} loadApplications={loadApplications} loadJobs={loadJobs} />
    </>
  )
}

export default ApplicationList
