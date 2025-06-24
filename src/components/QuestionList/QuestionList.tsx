import { useRef, useState, useEffect } from "react";
import { MathJax } from "better-react-mathjax";
import { Button } from "../Button/Button";
import type { Question } from "../../types/Question";
import styles from "./QuestionList.module.css"

function QuestionList() {
  const [prompt, setPrompt] = useState<string>("");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [mathJaxLoading, setMathJaxLoading] = useState<boolean>(false);
  const questionsContainerRef = useRef<HTMLDivElement>(null);

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

  // useEffect(() => {
  //   const script = document.createElement("script");
  //   script.src = "https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js";
  //   script.async = true;
  //   script.onload = () => {
  //     console.log("MathJaxがロードされました！");
  //   };
  //   document.head.appendChild(script);
  
  //   return () => {
  //     document.head.removeChild(script);
  //   };
  // }, []);
  

  // questionsが更新されたときにMathJaxを再描画
  // useEffect(() => {
  //   if (window.MathJax && questions.length > 0) { // ref.current のチェックは不要に
  //     setMathJaxLoading(true);
  //     const timer = setTimeout(() => {
  //       // window.MathJax.typesetClear(); // この行を削除またはコメントアウト
  //       window.MathJax.typesetPromise([document.body]) // document.body を対象にすることで、DOM全体を確実にスキャンさせる
  //         .then(() => {
  //           console.log("MathJax render complete");
  //           setMathJaxLoading(false);
  //         })
  //         .catch((err: any) => {
  //           console.error("MathJax エラー:", err);
  //           setMathJaxLoading(false);
  //         });
  //     }, 50);

  //     return () => clearTimeout(timer);
  //   }
  // }, [questions]);

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
            <>
                {mathJaxLoading && <p className={styles.loading}>数式をレンダリング中です...</p>}
                <div ref={questionsContainerRef}>
                    {questions.map((q, index) => (
                        <div key={index} className={styles.questionCard}>
                          <h3>問題:</h3>
                          <MathJax>
                          <div
                            className={styles.mathContent}
                            dangerouslySetInnerHTML={{ __html: q.problem }}
                          />
                          </MathJax>
                          <h4>答え:</h4>
                          <MathJax>
                          <div
                            className={styles.mathContent}
                            dangerouslySetInnerHTML={{ __html: q.answer }}
                          />
                          </MathJax>
                          <h4>解説:</h4>
                          <MathJax>
                          <div
                            className={styles.mathContent}
                            dangerouslySetInnerHTML={{ __html: q.explanation }}
                          />
                          </MathJax>
                        </div>
                    ))}
                </div>
            </>
        )}
    </div>
  );
}

export default QuestionList;
