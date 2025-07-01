import { useState } from "react";
import { MathJax } from "better-react-mathjax";
import { motion } from "framer-motion";
import { Button } from "../Button/Button";
import styles from "./PreviewModal.module.css";

type Props = {
    question: {
        problem: string;
        answer: string;
        explanation: string;
        genre: string;
    };
    onClose: () => void; 
};

const formatExplanation = (text: string) => {
  // バックスラッシュnを除去 or <br>に変換
  // ここでは両方に対応
  return text
    .replace(/\\n/g, '') // バックスラッシュnを消す
    .replace(/\n/g, '<br>'); // 本物の改行は<br>に
};

export const PreviewModal = ({ question, onClose }: Props) => {
    const [activeTab, setActiveTab] = useState<"problem" | "answer">("problem");

    return (
        <motion.div
          className={styles.backdrop}
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className={styles.modal}
            onClick={(e) => e.stopPropagation()}
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -30, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            layout
          >
            <div className={styles.tabArea}>
              <button
                className={`${styles.tabButton} ${
                  activeTab === "problem" ? styles.active : ""
                }`}
                onClick={() => setActiveTab("problem")}
              >
                問題
              </button>
              <button
                className={`${styles.tabButton} ${
                  activeTab === "answer" ? styles.active : ""
                }`}
                onClick={() => setActiveTab("answer")}
              >
                解答・解説
              </button>
            </div>
    
            <div className={styles.questionContainer}>
                <motion.div
                    layout
                    className={styles.tabContent}
                    style={{ display: activeTab === "problem" ? "block" : "none" }}
                >
                    <div className={styles.genreContainer}>
                        <h4>{question.genre}</h4>
                    </div>
                    <h3>問題</h3>
                    <MathJax>
                    <div dangerouslySetInnerHTML={{ 
                      __html: formatExplanation(question.problem) 
                    }} />
                    </MathJax>
                </motion.div>

                <motion.div
                    layout
                    className={styles.tabContent}
                    style={{ display: activeTab === "answer" ? "block" : "none" }}
                >
                    <h3>解答</h3>
                    <MathJax>
                    <div dangerouslySetInnerHTML={{ 
                      __html: formatExplanation(question.answer)
                    }} />
                    </MathJax>
                    <h3>解説</h3>
                    <MathJax>
                    <div dangerouslySetInnerHTML={{ 
                      __html: formatExplanation(question.explanation)
                    }} />
                    </MathJax>
                </motion.div>
            </div>
    
            <Button type="secondary" onClick={onClose}>
              閉じる
            </Button>
          </motion.div>
        </motion.div>
    );
}