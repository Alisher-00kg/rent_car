import { axiosInstance } from "../../../api/axiosInstance";

const deleteFile = async (id) => {
  try {
    await axiosInstance.delete(`/uploads/${id}`);
    console.log(`Файл с ID ${id} удалён успешно`);
  } catch (error) {
    console.error("Ошибка при удалении файла:", error.message);
  }
};

// deleteFile(2937);
