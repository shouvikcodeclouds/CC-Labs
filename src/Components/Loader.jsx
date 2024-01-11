import { Box } from '@mui/material'
import React from 'react'

const Loader = () => {
  return (
    <>
     <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'inherit',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backdropFilter: 'blur(5px)',
          }}
        >
    <div className="load-wrapp">
      <div className="load-1">
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>
    </div>
    </Box>
    </>
  )
}

export default Loader