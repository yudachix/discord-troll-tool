import ClickAwayListener from '@mui/material/ClickAwayListener';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import { pipe } from 'fp-ts/function';
import { arrayFrom, map } from 'iter-tools';
import { useState } from 'react';

import type { MouseEvent } from 'react';

import { ComputedTheme } from '@/enums/ComputedTheme';
import { Theme } from '@/enums/Theme';
import { useHydratedStore } from '@/hooks/useHydratedStore';
import { initialThemeStore, useComputedTheme, useThemeStore } from '@/stores/theme';

export default function ThemeSelect() {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);
  const { theme, setTheme } = useHydratedStore(useThemeStore, initialThemeStore);
  const computedTheme = useComputedTheme();
  const handleClick = ({ currentTarget }: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const Icon = ComputedTheme.toIcon(computedTheme);

  return (
    <>
      <IconButton aria-label='change theme' onClick={handleClick}>
        <Icon color='secondary' />
      </IconButton>
      <Popper
        anchorEl={anchorEl}
        open={open}
        placement='bottom-start'>
        <Paper>
          <ClickAwayListener onClickAway={handleClose}>
            <MenuList>
              {pipe(
                Theme.iterThemes(),
                map(v => [v, Theme.toIcon(v)] as const),
                map(([v, Icon]) => (
                  (
                    <MenuItem
                      key={v}
                      onClick={() => setTheme(v)}
                      selected={v === theme}
                    >
                      <ListItemIcon>
                        <Icon fontSize='small' />
                      </ListItemIcon>
                      <ListItemText>{Theme.toLabel(v)}</ListItemText>
                    </MenuItem>
                  )
                )),
                arrayFrom
              )}
            </MenuList>
          </ClickAwayListener >
        </Paper>
      </Popper>
    </>
  );
}
