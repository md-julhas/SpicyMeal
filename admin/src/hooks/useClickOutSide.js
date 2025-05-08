import { useEffect } from "react"

const useClickOutside = (ref, state, setState) => {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        if (typeof state === "boolean") {
          setState(false)
        } else {
          setState(null)
        }
      }
    }
    if (state) {
      document.addEventListener("mousedown", handleClickOutside)
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [ref, state, setState])
}

export default useClickOutside
