import React, {
  useEffect,
  Fragment,
  useContext,
} from "react";
import { Container } from "semantic-ui-react";
import { LoaderComponent } from "./LoaderComponent";
import ActivityStore from "../stores/activityStore";
import { observer } from "mobx-react-lite";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import NavBar from "../../features/nav/NavBar";

const App = () => {
  const activityStore = useContext(ActivityStore);


  useEffect(() => {
    activityStore.loadActivies();
  }, [
    activityStore,
  ]); /*this empty array is ensure to effect run once, because without it, when the component gets rerendenring
  it's run again.*/
  if (activityStore.loadingInitial)
    return <LoaderComponent content="Loading acitivities..." />;

  return (
    <Fragment>
      <NavBar />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard />
      </Container>
    </Fragment>
  );
};

export default observer(App);
