import React from "react";
import "./App.css";
import { startAnimationLoop } from "./particles";

export class App extends React.Component<{}, State> {
  private canvasRef: React.RefObject<HTMLCanvasElement>;

  constructor(props: {}) {
    super(props);

    // @ts-ignore
    window.app = this;

    this.state = {};

    this.canvasRef = React.createRef();
  }

  componentDidMount(): void {
    const canvas = this.canvasRef.current;
    if (canvas === null) {
      throw new Error("Cannot find canvas.");
    }
    startAnimationLoop(canvas);
  }

  render(): React.ReactElement {
    return (
      <div className="App">
        <canvas ref={this.canvasRef} width={800} height={800}></canvas>
      </div>
    );
  }
}

export interface State {}
