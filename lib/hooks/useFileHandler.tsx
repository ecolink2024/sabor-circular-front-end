import { useState, ChangeEvent, DragEvent } from "react";
import { useToast } from "@chakra-ui/react";

const MAX_BYTE_FILE_SIZE = 10000000; // 10 MB

export default function useFileHandler() {
  const [previewUrl, setPreviewUrl] = useState<string | ArrayBuffer | null>(
    null
  );
  const [file, setFile] = useState<Blob | File | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const toast = useToast();

  /**
   * Validates a selected file.
   * Checks if the file is not null, its type, and its size.
   *
   * @param {File} file - The file to validate.
   * @returns {boolean} - Returns true if the file is valid, otherwise false.
   */
  const validateFile = (file: File) => {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please select a file to upload.",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
      return false;
    }

    const fileType = file.type.toLowerCase();
    const fileSize = file.size;

    // Validar tipos de archivos permitidos
    if (
      !fileType.includes("jpg") &&
      !fileType.includes("jpeg") &&
      !fileType.includes("pdf")
    ) {
      toast({
        title: "Invalid file type",
        description: `You cannot upload a file of type: ${fileType}`,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return false;
    }

    // Validar tamaño del archivo
    if (fileSize > MAX_BYTE_FILE_SIZE) {
      toast({
        title: "File size too large",
        description: `You cannot upload a file greater than 10 MB`,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return false;
    }

    return true;
  };

  /**
   * Reads the content of a JPG file and sets the preview URL.
   * Note: This is only applicable for JPG files.
   *
   * @param {File} file - The file to read.
   */
  const handleFileRead = (file: File) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target) {
        setPreviewUrl(event.target.result);
      }
    };

    // Solo leer archivos JPG como URL de vista previa
    if (file.type.includes("jpg") || file.type.includes("jpeg")) {
      reader.readAsDataURL(file);
    } else {
      // Para archivos PDF, puedes decidir no establecer un previewUrl
      setPreviewUrl(null);
    }
  };

  /**
   * Handles the change event for file input.
   *
   * @param {ChangeEvent<HTMLInputElement>} event - The change event from the input.
   */
  const onChangeFile = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;

    const selectedFile = event.target.files[0];
    if (validateFile(selectedFile)) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
      handleFileRead(selectedFile);
    }
  };

  /**
   * Handles the drop event for file upload via drag-and-drop.
   *
   * @param {DragEvent<HTMLDivElement>} event - The drag event.
   */
  const onDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (event.dataTransfer.files) {
      const selectedFile = event.dataTransfer.files[0];
      if (validateFile(selectedFile)) {
        setFile(selectedFile);
        setFileName(selectedFile.name);
        handleFileRead(selectedFile);
      }
    }
  };

  /**
   * Handles the drag over event for file upload via drag-and-drop.
   *
   * @param {DragEvent<HTMLDivElement>} event - The drag event.
   */
  const onDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const onDeleteFile = () => {
    setPreviewUrl(null);
    setFile(null);
    setFileName(null);
  };

  /**
   * Deletes the currently selected file and resets the states.
   */
  return {
    previewUrl,
    file,
    fileName,
    onChangeFile,
    onDeleteFile,
    onDrop,
    onDragOver,
  };
}
