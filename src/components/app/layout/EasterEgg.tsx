import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import { useTheme, styled } from '@mui/material/styles';
import Image from 'next/image';
import { useState } from 'react';

const StyledImage = styled(Image)({
  verticalAlign: 'top'
});

export default function EasterEgg() {
  const theme = useTheme();
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const handleClick = () => setClicked(true);
  const handleMouseEnter = () => setHovered(true);
  const handleMouseLeave = () => {
    setClicked(false);
    setHovered(false);
  };

  return (
    <Tooltip
      arrow
      componentsProps={{
        arrow: {
          sx: {
            color: theme.palette.common.white
          }
        },
        tooltip: {
          sx: {
            color: theme.palette.common.black,
            bgcolor: theme.palette.common.white,
            boxShadow: theme.shadows[1]
          }
        }
      }}
      title={clicked ? 'ぽいぽいー' : 'ぽい？'}
    >
      <Box sx={{ cursor: clicked ? undefined : 'pointer' }}>
        <StyledImage
          alt=''
          height={32}
          onClick={handleClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          src={hovered ? 'images/easter-egg-stop.png' : 'images/easter-egg-walk.gif'}
          width={32}
        />
      </Box>
    </Tooltip>
  );
}
