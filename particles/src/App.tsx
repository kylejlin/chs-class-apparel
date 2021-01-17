import React from "react";
import "./App.css";
import { SceneModifier, startAnimationLoop } from "./particles";

export class App extends React.Component<{}, State> {
  private canvasRef: React.RefObject<HTMLCanvasElement>;

  constructor(props: {}) {
    super(props);

    // @ts-ignore
    window.app = this;

    this.state = {
      canvasCoords: [],
      shouldAddEmitter: false,
      sceneModifier: undefined,
    };

    this.canvasRef = React.createRef();

    this.bindMethods();
  }

  bindMethods(): void {
    this.onCanvasClick = this.onCanvasClick.bind(this);
  }

  componentDidMount(): void {
    this.addEventListeners();
    this.startAnimationLoop();
  }

  startAnimationLoop(): void {
    const canvas = this.canvasRef.current;
    if (canvas === null) {
      throw new Error("Cannot find canvas.");
    }
    const modifier = startAnimationLoop(canvas);
    this.setState({ sceneModifier: modifier });
  }

  addEventListeners(): void {
    window.addEventListener("keydown", (event: KeyboardEvent): void => {
      if (event.key === "e") {
        this.setState({ shouldAddEmitter: true });
      }
    });

    window.addEventListener("keyup", (event: KeyboardEvent): void => {
      if (event.key === "e") {
        this.setState({ shouldAddEmitter: false });
      }
    });

    window.addEventListener("keypress", (event: KeyboardEvent): void => {
      if (event.key === "r") {
        this.state.sceneModifier?.popEmitter();
      }
    });
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

      this.addEmitterIfNeeded(localX, localY);
      this.logCoordinates(localX, localY);
    }
  }

  logCoordinates(localX: number, localY: number): void {
    this.setState(
      (prevState) => ({
        canvasCoords: prevState.canvasCoords.concat([{ x: localX, y: localY }]),
      }),
      () => {
        console.log("after addition", this.state.canvasCoords);
        window.alert("x: " + Math.round(localX) + ", y: " + Math.round(localY));
      }
    );
  }

  addEmitterIfNeeded(localX: number, localY: number): void {
    if (this.state.shouldAddEmitter) {
      this.state.sceneModifier?.pushEmitter(0, localX, localY);
    }
  }
}

export interface State {
  canvasCoords: { x: number; y: number }[];
  shouldAddEmitter: boolean;
  sceneModifier: undefined | SceneModifier;
}
