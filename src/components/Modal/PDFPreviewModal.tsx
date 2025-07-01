import { Button } from "../Button/Button"

type PDFPreviewModalProps = {
    onClose: () => void;
    element: HTMLElement;
  };
  
  export const PDFPreviewModal = ({ onClose, element }: PDFPreviewModalProps) => {
    return (
      <div className="modal-backdrop">
        <div className="modal-content">
          <div dangerouslySetInnerHTML={{ __html: element.innerHTML }} />
          <Button onClick={onClose}>閉じる</Button>
        </div>
      </div>
    );
  };
  