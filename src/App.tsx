import { MathJaxContext } from "better-react-mathjax";
import "./App.css";
import QuestionList from "./components/QuestionList/QuestionList";

const config = {
  loader: { load: ["[tex]/html"] },
  tex: {
    inlineMath: [["$", "$"], ["\\(", "\\)"]],
    displayMath: [["$$", "$$"], ["\\[", "\\]"]],
  },
};

function App() {
  return (
    <div className="App" style={{ padding: "2rem" }}>
      <MathJaxContext version={3} config={config}>
        <QuestionList />
      </MathJaxContext>
    </div>
  );
}

export default App;
