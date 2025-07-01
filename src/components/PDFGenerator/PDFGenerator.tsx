import html2pdf from "html2pdf.js";
import { Button } from "../Button/Button"
import type { Question } from "../../types/Question";
import "./PDFGenerator.module.css"

type Props = {
  questions: Question[];
  filename?: string;
};

export const PDFGenerator = ({ questions }: Props) => {
  const getCurrentDateFormatted = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}${month}${day}`;
  };

  const handleExportPDF = async () => {
    // iframe作成
    const iframe = document.createElement("iframe");
    iframe.style.position = "absolute";
    iframe.style.left = "-9999px";
    document.body.appendChild(iframe);
  
    const doc = iframe.contentDocument || iframe.contentWindow?.document;
    if (!doc) return;
  
    // 中身のHTML構築
    doc.body.innerHTML = `
      <div style="padding: 20px; background: #fff; color: #000;">
        <h2>【問題】</h2>
        ${questions.map((q, i) => `
          <div style="margin-bottom: 20px;">
            <h3>問題 ${i + 1}</h3>
            <p style="font-size: 11.5px; color: #003366;">${q.genre}</p>
            ${q.problem}
          </div>
        `).join("")}
  
        <div style="page-break-before: always;"></div>
  
        <h2>【解答・解説】</h2>
        ${questions.map((q, i) => `
          <div style="margin-bottom: 20px;">
            <h3>問題 ${i + 1}</h3>
            <h4>解答</h4>
            ${q.answer}
            <h4>解説</h4>
            ${q.explanation}
          </div>
        `).join("")}
      </div>
    `;
  
    // MathJax描画
    await (window as any).MathJax.typesetPromise([doc.body]);
  
    // PDF生成
    await html2pdf().set({
      margin: 10,
      pagebreak: { 
        mode: ['avoid-all', 'css', 'legacy'], 
        before: '.page-break-before', 
        after: '.page-break-after'
      },
      filename: `math_${getCurrentDateFormatted()}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    }).from(doc.body).save();
  
    // iframe削除
    document.body.removeChild(iframe);
  };
  

  return (
    <Button onClick={handleExportPDF} style={{ margin: "10px" }}>PDFダウンロード</Button>
  );
};
