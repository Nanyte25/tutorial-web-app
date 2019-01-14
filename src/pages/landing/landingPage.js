import * as React from 'react';
import PropTypes from 'prop-types';
import { noop } from 'patternfly-react';
import PfMasthead from '../../components/masthead/masthead';
import TutorialDashboard from '../../components/tutorialDashboard/tutorialDashboard';
import LandingPageMastHead from './landingPageMastHead';
import InstalledAppsView from '../../components/installedAppsView/InstalledAppsView';
import { connect, reduxActions } from '../../redux';

// import { packageJson } from '../../../package.json';
const pkgJson = require('../../../package.json');

class LandingPage extends React.Component {
  componentDidMount() {
    const { getProgress, getCustomWalkthroughs } = this.props;
    getCustomWalkthroughs();
    getProgress();

    // mf011018 - testing env vars
    console.log('***************************');
    console.log('Environment variables begin');
    console.log(process.env);
    console.log('Environment variables end');
    console.log('***************************');
  }

  render() {
    const { walkthroughServices, middlewareServices, user } = this.props;
    return (
      <div>
        <PfMasthead />
        <LandingPageMastHead />
        <main>
          <p>
            Web App version: {pkgJson.version}
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Integreatly version: TBD
          </p>
          <section className="integr8ly-landing-page-tutorial-dashboard-section">
            <TutorialDashboard
              className="integr8ly-landing-page-tutorial-dashboard-section-left"
              userProgress={user.userProgress}
              walkthroughs={walkthroughServices.data}
            />
            <InstalledAppsView
              className="integr8ly-landing-page-tutorial-dashboard-section-right"
              apps={Object.values(middlewareServices.data)}
              customApps={middlewareServices.customServices}
            />
          </section>
        </main>
      </div>
    );
  }
}

LandingPage.propTypes = {
  getProgress: PropTypes.func,
  getCustomWalkthroughs: PropTypes.func,
  middlewareServices: PropTypes.object,
  walkthroughServices: PropTypes.object,
  user: PropTypes.object
};

LandingPage.defaultProps = {
  getProgress: noop,
  getCustomWalkthroughs: noop,
  middlewareServices: { data: {} },
  walkthroughServices: { data: {} },
  user: { userProgress: {} }
};

const mapDispatchToProps = dispatch => ({
  getWalkthroughs: language => dispatch(reduxActions.walkthroughActions.getWalkthroughs(language)),
  getCustomWalkthroughs: () => dispatch(reduxActions.walkthroughActions.getCustomWalkthroughs()),
  getProgress: () => dispatch(reduxActions.userActions.getProgress())
});

const mapStateToProps = state => ({
  ...state.middlewareReducers,
  ...state.walkthroughServiceReducers,
  ...state.userReducers
});

const ConnectedLandingPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(LandingPage);

export { ConnectedLandingPage as default, LandingPage };
