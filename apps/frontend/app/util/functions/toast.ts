import { toast } from "react-toastify";

export const errorToast = (message: string) => {
  toast.error(message, {
    onOpen: () => {
      const audio = document.createElement("audio");
      audio.volume = 0.1;
      audio.src = "/audio/error01.wav";
      audio.autoplay = true;
      audio.load();
      audio.addEventListener(
        "load",
        () => {
          audio.play();
        },
        true
      );
    },
  });
};
export const successToast = (message: string) => {
  toast.success(message, {
    onOpen: () => {
      const audio = document.createElement("audio");
      audio.volume = 0.1;
      audio.src = "/audio/success01.wav";
      audio.autoplay = true;
      audio.load();
      audio.addEventListener(
        "load",
        () => {
          audio.play();
        },
        true
      );
    },
  });
};
