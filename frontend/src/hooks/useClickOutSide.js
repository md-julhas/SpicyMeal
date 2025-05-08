import { useEffect } from "react"

const useClickOutside = (ref, state, setState) => {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setState(false)
      }
    }
    if (state) {
      document.addEventListener("click", handleClickOutside)
    }
    return () => {
      document.removeEventListener("click", handleClickOutside)
    }
  }, [state, ref, setState])
}

export default useClickOutside
