import React, { Component } from "react";
import Axios from "axios";


const shapes_constants = {
    width: 800,
    height: 600,
    server_url: "http://localhost:3001/",
    line: "line", 
    rect: "rect"
}


const API_urls = {
    db_addShapes: shapes_constants.server_url + "addShapes",
    db_getShapes: shapes_constants.server_url + "getShapes"
}


class Shapes extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isMouseDown: false,
            startX: 0,
            startY: 0, 
            shapeType: shapes_constants.line,
            shapesDB: []
        };
    }


    drawFromDB = async () => {
        let db = this.state.shapesDB;
        let canvas = document.getElementById("canvas");
        let c = canvas.getContext("2d");

        for (let i = 0; i < db.length; i++) {
            c.beginPath();
            if (db[i].shapeType == shapes_constants.line) {
                c.moveTo(db[i].startX, db[i].startY);
                c.lineTo(db[i].endX, db[i].endY);
            } else {
                c.rect(db[i].startX, db[i].startY, db[i].endX, db[i].endY);
            }
            c.stroke();
            c.closePath();
        }
    }

    startNewShape = (e) => {
        this.setState({ isMouseDown: true })
        let canvas = document.getElementById("canvas");
        let c = canvas.getContext("2d");
        c.beginPath();
        this.setState({ startX: (e.pageX - canvas.offsetLeft)});
        this.setState({ startY: (e.pageY - canvas.offsetTop) });
        c.moveTo(this.state.startX, this.state.startY);
    }


    drawLine = (e) => {
        let canvas = document.getElementById("canvas");
        let c = canvas.getContext("2d");
        if (this.state.isMouseDown) {
            c.clearRect(0, 0, shapes_constants.width, shapes_constants.height);
            c.beginPath();
            c.moveTo(this.state.startX, this.state.startY);
            c.lineTo(e.pageX - canvas.offsetLeft, e.pageY - canvas.offsetTop);
            c.stroke();
            c.closePath();
            this.drawFromDB();
        }
    }

    drawRect = (e) => {
        let canvas = document.getElementById("canvas");
        let c = canvas.getContext("2d");

        if (this.state.isMouseDown) {
            let mouseX = parseInt(e.pageX - canvas.offsetLeft);
            let mouseY = parseInt(e.pageY - canvas.offsetTop);
            c.clearRect(0, 0, shapes_constants.width, shapes_constants.height);
            c.beginPath();
            c.rect(this.state.startX, this.state.startY, mouseX - this.state.startX, mouseY - this.state.startY);
            c.stroke();
            c.closePath();
            this.drawFromDB();
        }
    }

    stopNewShape = async (e) => {
        let newShape = await this.appendNewShapeDB(e);
        this.setState({ isMouseDown: false });
    }

    appendNewShapeDB = async (e) => {
        let canvas = document.getElementById("canvas");
        let shape = "", endXVal = "", endYVal = "";

        endXVal = e.pageX - canvas.offsetLeft;
        endYVal = e.pageY - canvas.offsetTop;

        if (this.state.shapeType == shapes_constants.line) {
            shape = shapes_constants.line;
        } else {
            shape = shapes_constants.rect;
            endXVal = parseInt(endXVal) - this.state.startX;
            endYVal = parseInt(endYVal) - this.state.startY;
        }
        let newShape = { shapeType: shape, startX: this.state.startX, startY: this.state.startY, endX: endXVal, endY: endYVal };
        if (this.state.isMouseDown) {
            var allShape = await this.addShapes(newShape);
            this.setState({ shapesDB: allShape });
        }

        this.setState({ startX: 0 });
        this.setState({ startY: 0 });
    }


    draw = () => {
        let canvas = document.getElementById("canvas");
        canvas.onmousedown = this.startNewShape;
        canvas.onmouseup = canvas.onmouseout = this.stopNewShape;
        if (this.state.shapeType == shapes_constants.line) {
            canvas.onmousemove = this.drawLine;
        } else {
            canvas.onmousemove = this.drawRect;
        }
    };


    startDrawRect = () => {
        this.setState({ shapeType: shapes_constants.rect}, () => { this.draw(); });
    }


    startDrawLine = () => {
        this.setState({ shapeType: shapes_constants.line }, () => { this.draw(); });
    }


    getAllShapesDB = async () => {
        let db = await this.getShapes();
        this.setState({ shapesDB: db }, () => { this.drawFromDB(); });
    }


    addShapes = async (newShape) => {
        let params = {};
        params["shape"] = newShape;
        var response = await Axios.post(API_urls.db_addShapes, params);
        if (response !== undefined){
            return response.data;
        }
    }

    getShapes = async () => {
        var response = await Axios.get(API_urls.db_getShapes);
        if (response !== undefined){
            return response.data;
        }
    }

    componentDidMount()  {
        this.getAllShapesDB();
        this.startDrawLine();
    }

    render() {
        return (
            <div>
                <canvas id="canvas" width={shapes_constants.width} height={shapes_constants.height} style={{ border: "1px solid black" }}></canvas>
                <br />
                <button type="submit" onClick={this.startDrawRect} style={{ padding: "5px", backgroundColor:"#90EE90", border: "1px solid #90EE90" }}>Draw Rect</button>&nbsp;
                <button type="submit" onClick={this.startDrawLine} style={{ padding: "5px", backgroundColor:"#ADD8E6", border: "1px solid #ADD8E6" }}>Draw Line</button>


            </div>
        )
    }
}
export default Shapes;


