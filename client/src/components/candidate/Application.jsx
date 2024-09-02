import { useState, useEffect } from "react";

function Application({ selectedApp, setSelectedApp, handleDelete }) {

  const [app, setApp] = useState(selectedApp)

  useEffect(() => {
    if (selectedApp) setApp(selectedApp);
    else setApp();
  }, [selectedApp]);


  const handleSubmit = (e) => {
    console.log("Update application");

    //api call to update the job then deselect it
  }

  const handleOnChange = (e) => {
    setSelectedApp({
      ...selectedApp,
      [e.target.name]: e.target.value
    })
  }

  return (
    <>
      {app ?
        (
          <form onSubmit={handleSubmit}>
            <h3>Application for {app.job.title}</h3>
            <button type="submit">Update</button>
            <button onClick={(selectedApp) => handleDelete(selectedApp)}>Delete</button>
          </form>
        )
        : null}
    </>
  )
}

export default Application
