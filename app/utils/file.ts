export const getOrientation = (
  file: File,
): Promise<"landscape" | "portrait" | "square"> => {
  return new Promise((resolve) => {
    const img = new Image();

    img.onload = () => {
      if (img.width > img.height) {
        resolve("landscape");
      } else if (img.width < img.height) {
        resolve("portrait");
      } else {
        resolve("square");
      }
    };

    img.src = URL.createObjectURL(file);
  });
};
