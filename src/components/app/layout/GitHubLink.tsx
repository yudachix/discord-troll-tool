import GitHubIcon from '@mui/icons-material/GitHub';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import MuiLink from '@mui/material/Link';

import { noop } from '@/utils/noop';

export type GitHubLinkProps = {
  variant: GitHubLinkVariant
};

export type GitHubLinkVariant = 'chip' | 'icon';

export default function GitHubLink({ variant }: GitHubLinkProps) {
  return (
    <>
      {variant === 'chip' && (
        <Chip
          clickable
          component={MuiLink}
          deleteIcon={<OpenInNewIcon />}
          href='https://github.com/yudachix/discord-troll-tool'
          icon={<GitHubIcon />}
          label='GitHub'
          onDelete={noop}
          rel='noopener noreferrer'
          target='_blank'
        />
      )}
      {variant === 'icon' && (
        <IconButton
          aria-label='GitHub'
          component={MuiLink}
          href='https://github.com/yudachix/discord-troll-tool'
          rel='noopener noreferrer'
          target='_blank'
        >
          <GitHubIcon />
        </IconButton>
      )}
    </>
  );
}
