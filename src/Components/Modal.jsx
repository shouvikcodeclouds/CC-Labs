import React from 'react'
import{
    Typography,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText, 
    DialogTitle,
    Button
} from '@mui/material'

const Modal = ({onClose,onClick,open,desc}) => {
  return (
    <>


    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirm Delete</DialogTitle>
      <DialogContent>
        <DialogContentText>
        < Typography variant='h3'>  Are you sure you want to delete this {desc} information?</Typography>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={onClick} color="error" autoFocus>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
    </>
  )
}

export default Modal;