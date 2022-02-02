import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Directory from "./DirectoryComponent";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import Home from "./HomeComponent";
import Contact from "./ContactComponent";
import { CAMPSITES } from "../shared/campsites";
import { COMMENTS } from "../shared/comments";
import { PARTNERS } from "../shared/partners";
import { PROMOTIONS } from "../shared/promotions";
import CampsiteInfo from "./CampsiteInfoComponent";
import About from "./AboutComponent";


class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      campsites: CAMPSITES,
      comments: COMMENTS,
      partners: PARTNERS,
      promotions: PROMOTIONS,
    };
  }

  componentDidMount() {
    //Call an api to get data
  }
  render() {
    const HomePage = () => {
      return (
        <Home
          campsite={this.state.campsites.find((campsite) => campsite.featured)}
          promotion={
            this.state.promotions.filter((promotion) => promotion.featured)[0]
          }
          partner={this.state.partners.filter((partner) => partner.featured)[0]}
        />
      );
    };
    const CampsiteWithId = (props) => {
      console.log("THIS IS ROUTE PROPS", props);
      const { campsites, comments } = this.state;
      return (
        <CampsiteInfo
          campsite={campsites.find(
            (campsite) => campsite.id === +props.match.params.campsiteId
          )}
          comments={comments.filter(
            (comment) => comment.campsiteId === +props.match.params.campsiteId
          )}
        />
      );
    };
    return (
      <>
        <Header />
        <Switch>
          <Route path="/home" component={HomePage} />
          <Route exact path="/directory"
            render={() => <Directory campsites={this.state.campsites} />}
          />
          <Route path="/directory/:campsiteId" component={CampsiteWithId} />
          <Route path="/contactus" component={Contact} />
          <Route
            path="/aboutus"
            render={() => <About partners={this.state.partners} />}
          />
          <Redirect to="/home" />
        </Switch>
        <Footer />
      </>
    );
  }
}
export default Main;
