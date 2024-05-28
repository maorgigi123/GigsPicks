
export const DeleteEqual = (query) => {
  return query.split('=')[1];
}

export const handleClickVideo = (e) => {
  if(e.target.paused)
      {
          e.target.play()
      }
      else{
          e.target.pause()
      }
}