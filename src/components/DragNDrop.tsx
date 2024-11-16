import { useCallback, useEffect, useRef, useState } from "react";
import { IoDocument } from "react-icons/io5";
import { FaCloudArrowUp } from "react-icons/fa6";

const check = (headers: number[]) => {
  return (buffers: Uint8Array, options = { offset: 0 }) => {
    return headers.every(
      (header, index) => header === buffers[options.offset + index]
    );
  };
};

// JSON files start with '{' (0x7B in ASCII) or '[' (0x5B in ASCII)
const isJSON = check([0x7b]) || check([0x5b]);

export type FileProps = {
  name: string;
  file: File;
};

export type fileTypes = "json";
const dragNdropColors = {
  grayBasic: "#D5D6E0",
  grayHover: "#DCDEE8",
};

export type DragNDropProps = {
  cacheFile?: FileProps | null;
  height?: number;
  limitFileSizeInMb?: number;
  fileTypes?: fileTypes[];
  label?: string;
  onFileDrop: (file: FileProps) => void;
  isError?: boolean;
};

export const DragNDrop = (data: DragNDropProps) => {
  const {
    cacheFile,
    height = 280,
    fileTypes = ["json"],
    label,
    onFileDrop,
    isError,
  } = data;
  const [file, setFile] = useState<FileProps | null>(cacheFile ?? null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLLabelElement>(null);

  const onChangeImage = useCallback(
    (file: File) => {
      const headerReader = new FileReader();
      headerReader.readAsArrayBuffer(file.slice(0, 8));

      let isSupportedFile = false;
      headerReader.onload = () => {
        const uint8Array = new Uint8Array(headerReader?.result as ArrayBuffer);
        isSupportedFile = isJSON(uint8Array);
        if (!isSupportedFile || !file.name.match(/\.(json)$/)) {
         console.error("File is not Json")
        } else {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => {
            setFile({
              name: file.name,
              file,
            });
            onFileDrop({
              name: file.name,
              file,
            });
          };
        }
      };
    },
    [onFileDrop]
  );

  useEffect(() => {
    const fileInput = fileInputRef.current;
    const container = containerRef.current;

    function handleDragOver(e: DragEvent) {
      e.preventDefault();
      if (container)
        container.style.backgroundColor = dragNdropColors.grayHover;
    }

    function handleDragLeave(e: DragEvent) {
      e.preventDefault();
      if (container)
        container.style.backgroundColor = dragNdropColors.grayBasic;
    }

    function handleDrop(e: DragEvent) {
      e.preventDefault();
      if (!e.dataTransfer?.files[0]) return;
      onChangeImage(e.dataTransfer.files[0]);
    }

    if (fileInput && container) {
      container.addEventListener("dragover", handleDragOver);
      container.addEventListener("dragleave", handleDragLeave);
      container.addEventListener("drop", handleDrop);
    }

    return () => {
      if (fileInput && container) {
        container.removeEventListener("dragover", handleDragOver);
        container.removeEventListener("dragleave", handleDragLeave);
        container.removeEventListener("drop", handleDrop);
      }
    };
  }, [fileInputRef, onChangeImage]);

  return (
    <div
      className={`flex w-full flex-col items-center justify-center gap-2`}
      style={{ height: `${height}px` }}
    >
      <label
        ref={containerRef}
        className={`bg-transparent relative flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-gray-100 hover:border-gray-300 hover:bg-gray-200 ${
          isError ? "border-danger-500" : ""
        }`}
        htmlFor="dropzone-file"
      >
        {file ? (
            <div className="flex flex-col items-center justify-center gap-4">
              <IoDocument/>
              <h3>{file.name}</h3>
            </div>
        ) : (
          <div className="flex flex-col items-center justify-center pb-6 pt-5">
            <FaCloudArrowUp size={42}/>
            <p className="mb-2 text-sm text-gray-500">
              <span className="font-semibold text-black opacity-30">
                Click to upload {label ?? "a file"}
              </span>
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-300 text-black opacity-30">
              {fileTypes.map((item) => `${item.toUpperCase()}, `)}Max. upload
              size: 3Mb
            </p>
          </div>
        )}
        <input
          id="dropzone-file"
          ref={fileInputRef}
          type="file"
          className="hidden"
          onChange={(event) => {
            if (!event.target.files?.[0]) return;
            onChangeImage(event.target.files[0] || event.target.files);
          }}
          accept={fileTypes.map((item) => `.${item}`).join(", ")}
        />
      </label>
    </div>
  );
};
