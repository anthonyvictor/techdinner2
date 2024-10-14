export const playSound = (src: string) => {
  const audio = document.createElement("audio")
  audio.volume = 0.1
  audio.src = src
  audio.autoplay = true
  audio.load()
  audio.addEventListener(
    "load",
    () => {
      audio.play()
    },
    true,
  )
}
