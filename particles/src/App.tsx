import React from "react";
import "./App.css";
import { startAnimationLoop } from "./particles";

export class App extends React.Component<{}, State> {
  private canvasRef: React.RefObject<HTMLCanvasElement>;

  constructor(props: {}) {
    super(props);

    // @ts-ignore
    window.app = this;

    this.state = { canvasCoords: [] };

    this.canvasRef = React.createRef();

    this.bindMethods();
  }

  bindMethods(): void {
    this.onCanvasClick = this.onCanvasClick.bind(this);
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
        <canvas
          ref={this.canvasRef}
          width={800}
          height={800}
          onClick={this.onCanvasClick}
        ></canvas>
      </div>
    );
  }

  onCanvasClick(event: React.MouseEvent<HTMLCanvasElement>): void {
    const { clientX, clientY, altKey } = event;
    if (altKey) {
      this.setState(
        (prevState) => ({
          canvasCoords: prevState.canvasCoords.slice(0, -1),
        }),
        () => {
          console.log("after removal", this.state.canvasCoords);
          window.alert("Removed previous point.");
        }
      );
    } else {
      const rect = (event.target as HTMLCanvasElement).getBoundingClientRect();
      const localX = clientX - rect.left;
      const localY = clientY - rect.top;
      this.setState(
        (prevState) => ({
          canvasCoords: prevState.canvasCoords.concat([
            { x: localX, y: localY },
          ]),
        }),
        () => {
          console.log("after addition", this.state.canvasCoords);
          window.alert(
            "x: " + Math.round(localX) + ", y: " + Math.round(localY)
          );
        }
      );
    }
  }
}

export interface State {
  canvasCoords: { x: number; y: number }[];
}
