import { useState } from 'react';
import {
  Group,
  Box,
  Collapse,
  UnstyledButton,
  createStyles,
  rem,
  getStylesRef,
} from '@mantine/core';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import { useLayout } from '..';
import { useDisclosure } from '@mantine/hooks';

const useStyles = createStyles((theme) => ({
  control: {
    fontWeight: 500,
    display: 'block',
    width: '100%',
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[6],
    fontSize: theme.fontSizes.sm,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[2],
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    },
  },

  link: {
    fontWeight: 500,
    display: 'block',
    textDecoration: 'none',
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,
    paddingLeft: rem(31),
    marginLeft: rem(30),
    fontSize: theme.fontSizes.sm,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    borderLeft: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
      }`,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[2],
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    },
  },
  linkIcon: {
    ref: getStylesRef('icon'),
    color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[6],

  },

  linkIconActive: {
    color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.black[6],
    marginRight: theme.spacing.xs,

  },

  linkButton: {
    textDecoration: 'none',
  },

  linkActive: {
    "&, &:hover": {
      backgroundColor: "#C0CEFF81",
      color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.black[6],
    },

  },
  chevron: {
    transition: 'transform 200ms ease',
  },
}));

export interface LinksGroupProps {
  icon: React.FC<any>;
  label?: string;
  initiallyOpened?: boolean;
  links?: { label: string; link: string }[];
}

export function LinksGroup({ icon: Icon, label, initiallyOpened, links }: LinksGroupProps) {
  const { cx, classes, theme } = useStyles();
  const { setOpened, title, setTitle } = useLayout();
  const [opened, { toggle }] = useDisclosure(false);
  const hasLinks = Array.isArray(links);
  const ChevronIcon = theme.dir === 'ltr' ? IconChevronRight : IconChevronLeft;
  const items = ((hasLinks) ? links : []).map((link) => {
    return (<Link
      className={cx(classes.link, {
        [classes.linkActive]: title === link.label,
      })}
      to={link.link}
      key={link.label}
      onClick={() => handleClickLink(link.label)}
    >
      {link.label}
    </Link>)
  });
  const link = ((hasLinks && links.length == 1) ? links : []).map((link) => {
    return (
      <Link
        className={classes.linkButton}
        to={link.link}
        key={link.label}
      >
        <UnstyledButton className={cx(classes.control, {
          [classes.linkActive]: title === label!,
        })} onClick={() => handleClickLink(label!)}>
          <Group position="apart" spacing={0}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Icon className={cx(classes.linkIcon, {
                [classes.linkIconActive]: title === label!,
              })} size="1.5rem" />
              <Box ml="md">{label}</Box>
            </Box>
          </Group>
        </UnstyledButton>

      </Link>
    )
  });

  const handleClickLink = (title: string) => {
    setTitle(title);
    setOpened(false);
  };

  return (
    <>
      {(hasLinks && links.length > 1) ?
        <>
          <UnstyledButton onClick={() => toggle()} className={classes.control}>
            <Group position="apart" spacing={0}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Icon className={classes.linkIcon} size="1.5rem" />
                <Box ml="md">{label}</Box>
              </Box>
              {(hasLinks && links.length > 1) && (
                <ChevronIcon
                  className={classes.chevron}
                  size="1rem"
                  stroke={1.5}
                  style={{
                    transform: opened ? `rotate(${theme.dir === 'rtl' ? -90 : 90}deg)` : 'none',
                  }}
                />
              )}
            </Group>
          </UnstyledButton>
          {(hasLinks && links.length > 1) ? <Collapse in={opened}>{items}</Collapse> : null}
        </>
        : <Box >
          {link}
        </Box>}
    </>
  );
}