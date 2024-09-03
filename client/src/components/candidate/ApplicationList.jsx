import { useState } from "react";

import Application from "./Application";

function ApplicationList({ apps }) {

  const [applications, setApplications] = useState(apps)
  const [selectedApp, setSelectedApp] = useState()

  const handleSelect = (application) => {
    console.log(application);
    if (application.id === selectedApp?.id) {
      setSelectedApp();
    } else {
      setSelectedApp(application);
    }
  }

  const handleDelete = (application) => {
    const id = application.id;
    console.log(`application ${id}`);
    //api call to delete id
  }

  return (
    <>
      <h3>Job Applications</h3>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Job Title</th>
              <th>Job Description</th>
              <th>Hiring Manager</th>
            </tr>
          </thead>
          <tbody>
            {applications?.map((application) => (
              <tr key={application.id} onClick={() => handleSelect(application)}>
                <td>{application.job.title}</td>
                <td>{application.job.description}</td>
                <td>{application.job.manager}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Application selectedApp={selectedApp} setSelectedApp={setSelectedApp} handleDelete={handleDelete} />
    </>
  )
}

export default ApplicationList
