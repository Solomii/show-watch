import React, { Component } from "react";
import styles from "./StopWatch.module.css";

class StopWatch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            time: new Date(0, 0, 0, 0, 0, 0, 0),
        };
        this.idTimeout = null;
    }

    tick = () => {
        const { time } = this.state;
        const newTime = new Date(time.getTime());
        newTime.setSeconds(newTime.getSeconds() + 1);
        this.setState({ time: newTime });
    };

    start = () => {
        if (this.idTimeout === null) {
            this.idTimeout = setTimeout(this.tick, 1000);
        }
    };

    stop = () => {
        clearTimeout(this.idTimeout);
        this.idTimeout = null;
    };

    resume = () => {
        this.stop();
        this.setState({ time: new Date(0, 0, 0, 0, 0, 0, 0) });
    };

    componentDidUpdate() {
        if(this.idTimeout){
            this.idTimeout = setTimeout(this.tick,1000)
        }
    }

    componentWillUnmount() {
        console.log("componentWillUnmount");
        this.stop();
    }

    render() {
        console.log("render");
        const { time } = this.state;

        return (
            <article className={styles.container}>
                <h2>{time.toLocaleTimeString("en-GB")}</h2>
                <div className={styles.boxBtn}>
                    <button className={styles.btn} onClick={this.start}>
                        start
                    </button>
                    <button className={styles.btn} onClick={this.stop}>
                        stop
                    </button>
                    <button className={styles.btn} onClick={this.resume}>
                        resume
                    </button>
                </div>
            </article>
        );
    }
}

export default StopWatch;
