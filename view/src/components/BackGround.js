import React, { Component } from "react";
import BGImage from "../images/restaurantBackground.jpg";

let sectionStyle = {
    width: "100%",
    height: "100%",
    backgroundImage: `url(${BGImage})`
};

class BackGround extends Component {
    render() {
        return (
            <background style={ sectionStyle }></background>
        );
    }
}

export default BackGround;