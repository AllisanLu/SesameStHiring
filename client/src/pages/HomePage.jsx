import JobList from "../components/JobList";
import Navigation from "../components/Navigation";
import User from "../components/User";

function HomePage({ user }) {
    return (
      <>
        <Navigation></Navigation>
        <User user={user} ></User>
        <JobList></JobList>
      </>
    )
  }
  
  export default HomePage
  