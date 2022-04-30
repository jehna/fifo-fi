import s from "../styles/Importer.module.scss";
import { useRef, useState } from "react";
import { useCallback } from "react";

const Importer: React.FC<{
  onRead?: (file: File) => void;
  accept?: HTMLInputElement["accept"];
  children?: React.ReactNode;
}> = ({ children, onRead, accept }) => {
  const [isHovering, setIsHovering] = useState(false);
  const inputRef = useRef<HTMLInputElement>();
  const onHover = useCallback(() => setIsHovering(true), [setIsHovering]);
  const onBlur = useCallback(() => setIsHovering(false), [setIsHovering]);
  const handleUpload = useCallback(
    async (file: FileList | null) => {
      if (!file || file.length === 0) return;
      onRead?.(file[0]);
      (inputRef as any).current.value = null; // TODO: This was due React update, check later
    },
    [onRead]
  );

  return (
    <form
      className={`${s.importer} ${isHovering ? s.isHovering : ""}`}
      onDragOver={onHover}
      onDrag={onHover}
      onDragEnter={onHover}
      onDragLeave={onBlur}
      onDragEnd={onBlur}
      onDrop={onBlur}
    >
      <input
        type="file"
        ref={inputRef as any} // TODO: This was due React update, check later
        onChange={(e) => handleUpload(e.target.files)}
        accept={accept}
      />
      {children}
    </form>
  );
};

export default Importer;
