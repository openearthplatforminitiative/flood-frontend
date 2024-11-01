import { Box } from '@mui/material';
import { ReactNode } from 'react';

type ContentContainerProps = {
  children: ReactNode;
};

export const ContentContainer = (props: ContentContainerProps) => {
  return <Box className="p-4 lg:p-6">{props.children}</Box>;
};
