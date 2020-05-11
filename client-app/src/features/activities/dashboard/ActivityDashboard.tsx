import React, { useContext, useEffect } from "react";
import { Grid } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import ActivityList from "./ActivityList";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { RootStoreContext } from "../../../app/stores/rootStore";

const ActivityDashboard: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { loadActivies, loadingInitial } = rootStore.activityStore;

  useEffect(() => {
    loadActivies();
  }, [
    loadActivies,
  ]); /*this empty array is ensure to effect run once, because without it, when the component gets rerendenring
  it's run again.*/
  if (loadingInitial)
    return <LoadingComponent content="Loading acitivities..." />;

  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityList />
      </Grid.Column>

      <Grid.Column width={6}>
        <h2>Activity filters</h2>
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityDashboard);
