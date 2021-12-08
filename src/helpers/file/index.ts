export const getFileFromEvent = <T>(
  e: any
): Promise<{
  value: string;
  file_name: string;
  type: string;
}> => {
  return new Promise((resolve, reject) => {
    try {
      if (e.target.files) {
        const file = e.target.files![0];
        const reader = new FileReader();
        if (file) {
          reader.readAsDataURL(file);
        }

        reader.onloadend = async function () {
          resolve({
            //@ts-ignore
            value: reader.result as string,
            file_name: file.name,
            type: file.type,
          });
        };
      }
    } catch (e) {
      reject("Ошибка загрузки файла");
    }
  });
};
