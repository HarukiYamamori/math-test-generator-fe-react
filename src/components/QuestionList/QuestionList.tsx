import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Button } from "../Button/Button";
import { PreviewModal } from "../Modal/PreviewMordal";
import type { Question } from "../../types/Question";
import styles from "./QuestionList.module.css"

function QuestionList() {
  const [prompt, setPrompt] = useState<string>("");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
  

  const handleSubmit = () => {
    if (!prompt) {
        setErrorMessage("プロンプトを入力してください")
        return;
    }

    setErrorMessage(""); // エラーをリセット
    setLoading(true);

    fetch("http://127.0.0.1:8000/api/generate/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: prompt }),
    })
      .then((response) => response.json())
      .then((data) => {
        setQuestions(data.questions);
        console.log("Received questions data:", data.questions); // この行を追加
        setLoading(false);
      })
      .catch((error) => {
        console.error("データ取得エラー:", error);
        setLoading(false);
      });
  };

  return (
    <div className={styles.container}>
        <h2>プロンプトを入力してください</h2>
        <form
            id="pdfForm"
            onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
            }}
            className={styles.formArea}
        >
            <textarea
            id="inputPromptArea"
            rows={5}
            cols={40}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className={styles.textarea}
            placeholder="例: 数学の問題と解答例を3つ作成してください。単元は二次関数で、難易度は大学受験レベルです。"
            ></textarea>
            {errorMessage && <p className={styles.error}>{errorMessage}</p>}
            <Button htmlType="submit">
            問題生成
            </Button>
        </form>
  
        {loading && <p className={styles.loading}>作成中...</p>}

  
        {questions.length > 0 && (
          <div className={styles.previewButtons}>
            {questions.map((q, index) => (
              <Button key={index} onClick={() => setSelectedQuestion(q)}>
                {`問題${index + 1} プレビュー`}
              </Button>
            ))}
          </div>
        )}

        <AnimatePresence>
          {selectedQuestion && (
            <PreviewModal
              question={selectedQuestion}
              onClose={() => setSelectedQuestion(null)}
            />
          )}
        </AnimatePresence>
    </div>
  );
}

export default QuestionList;
