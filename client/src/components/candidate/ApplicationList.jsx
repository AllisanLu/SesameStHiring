import { useEffect, useState } from "react";

import Application from "./Application";

function ApplicationList({ user, apps, loadApplications }) {

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

  return (
    <>
      <h3>Applications</h3>
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
      <Application user={user} selectedApp={selectedApp} setSelectedApp={setSelectedApp} loadApplications={loadApplications} />
    </>
  )
}

export default ApplicationList
