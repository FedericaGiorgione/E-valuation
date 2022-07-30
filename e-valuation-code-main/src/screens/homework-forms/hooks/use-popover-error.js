import { useState, useEffect, useCallback } from 'react'

function usePopoverError(errorMessage, fabRef) {
  const [anchorEl, setAnchorEl] = useState(null)
  const [popoverOpen, setPopoverOpen] = useState(false)

  const openPopover = useCallback(() => {
    setAnchorEl(fabRef.current)
    setPopoverOpen(true)
  }, [fabRef])

  const closePopover = useCallback(() => {
    setAnchorEl(null)
    setPopoverOpen(false)
  }, [])

  useEffect(() => {
    if (errorMessage) {
      openPopover()
    } else {
      closePopover()
    }
  }, [openPopover, closePopover, errorMessage])

  return [anchorEl, popoverOpen, closePopover]
}

export default usePopoverError
