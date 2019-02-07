import React from 'react';
import PropTypes from 'prop-types';
import popSound from './popSound';
import CloseIcon from './CloseIcon';
import styles from './styles.scss';


export default class NotificationBar extends React.Component {

  static propTypes = {
    message: PropTypes.string,
    closeIconStyles: PropTypes.object,
    sound: PropTypes.bool,
  }

  static defaultProps = {
    sound: true,
  }

  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };

    this.storageKey = 'NOTIFICATIONBAR';

  }

  componentDidMount() {

    setTimeout(() => {
      this.open();
    }, 1000);

  }

  close = e => {

    if (e) e.preventDefault();

    this.setState({
      open: false,
    });

    this.saveClosedState();

  };

  open() {

    if (this.isPermanentlyClosed()) return;

    this.setState({
      open: true,
    });

    if (!this.props.sound) return;

    const snd = new Audio(`data:audio/mp3;base64,${popSound}`);

    let prom = snd.play();

    if (prom) {
      prom.catch(err => {
        console.warn(`Couldn't play notification sound. Reason: ${err}`);
      });
    }

  }

  isPermanentlyClosed() {
    const notifications = JSON.parse(localStorage.getItem(this.storageKey));

    if (!notifications) return false;

    const notification = notifications.find(notice => {
      return notice.message === this.props.message && notice.closed;
    });

    if (notification) {
      return true;
    }

    return false;

  }

  saveClosedState() {
    const notifications = JSON.parse(localStorage.getItem(this.storageKey)) || [];

    notifications.push({
      message: this.props.message,
      closed: true,
    });

    localStorage.setItem(this.storageKey, JSON.stringify(notifications));

  }

  render() {

    return (
      <div className={`NotificationBar ${this.state.open ? 'open' : 'closed'}`}>
        <div className="NotificationBar__message">
          {this.props.message ? (
            <span dangerouslySetInnerHTML={{__html: this.props.message}} />
          ) :
            this.props.children
          }
        </div>
        <a
          className="NotificationBar__close"
          onClick={this.close}
          href="#">
          <CloseIcon {...this.props.closeIconStyles} />
        </a>
      </div>
    );

  }

}
