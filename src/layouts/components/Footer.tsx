
import { Button, Center, Menu, Modal, Text, createStyles, getStylesRef, rem } from '@mantine/core';
import { IconInfoCircle, IconKey, IconLogout, } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { PublicRoutes } from '../../models';
import { useSessionStore } from '../../store';
import { useState } from 'react';
import { FormChangePassword } from '.';
import FormInformation from './FormInformation';

const useStyles = createStyles((theme) => ({
  navbar: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
  },

  title: {
    textTransform: 'uppercase',
    letterSpacing: rem(-0.25),
  },
  button: {
    ...theme.fn.focusStyles(),
    fontSize: theme.fontSizes.sm,
    alignItems: 'center',
    width: "100%",
    padding: ".2rem",
  },

  link: {
    ...theme.fn.focusStyles(),
    display: 'flex',
    width: "100%",
    alignItems: 'center',
    backgroundColor: "transparent",
    fontSize: theme.fontSizes.sm,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7],
    padding: ".5rem",
    borderRadius: theme.radius.sm,
    fontWeight: 500,


    '&:hover': {
      backgroundColor: "#C0CEFF81",
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,

      [`& .${getStylesRef('icon')}`]: {
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
      },
    },
  },

  linkIcon: {
    ref: getStylesRef('icon'),
    color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[6],
    marginRight: theme.spacing.sm,
  },

  linkActive: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
      [`& .${getStylesRef('icon')}`]: {
        color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
      },
    },
  },

  account: {
    ...theme.fn.focusStyles(),
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    fontSize: theme.fontSizes.sm,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.black[7],
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    fontWeight: 500,
  },

  email: {
    ...theme.fn.focusStyles(),
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    fontSize: theme.fontSizes.xs,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.black[7],
    padding: `0 ${theme.spacing.sm}`,
    fontWeight: 500,
  },
  footer: {
    paddingTop: theme.spacing.xs,
    marginTop: theme.spacing.xs,
    marginBottom: theme.spacing.xs,
    borderTop: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
      }`,
  },
}));


function Footer() {
  const { user, logout } = useSessionStore();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [showChangePasswordForm, setShowChangePasswordForm] = useState(false);
  const [showInfoForm, setShowInfoForm] = useState(false);

  const handleLogout = () => {
    navigate(PublicRoutes.login);
    logout();
  };

  const handleOpenChangePassword = () => {
    setShowMenu(false);
    setShowChangePasswordForm(true);
    setShowInfoForm(false);
  };

  const handleOpenInfo = () => {
    setShowMenu(false);
    setShowChangePasswordForm(false);
    setShowInfoForm(true);
  };

  const handleCloseForm = () => {
    setShowChangePasswordForm(false);
    setShowInfoForm(false);
  };
  const { classes } = useStyles();
  return (
    <Menu position="right-end">
      <Menu.Target>
        <Button onClick={() => setShowMenu(!showMenu)}>Configuración</Button>
      </Menu.Target>


      <Menu.Dropdown>
        <Menu.Item onClick={handleOpenChangePassword}>
          <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
            <IconKey size={rem(18)} style={{ marginRight: '0.5rem' }} />
            <span style={{ marginLeft: '0.5rem' }}>Cambiar contraseña</span>
          </div>
        </Menu.Item>
        <Menu.Item onClick={handleOpenInfo}>
          <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center'}}>
            <IconInfoCircle size={rem(18)} style={{ marginRight: '0.5rem' }} />
            <span style={{ marginLeft: '0.5rem' }}>Información</span>
          </div>
        </Menu.Item>
      </Menu.Dropdown>


      <Modal opened={showChangePasswordForm} onClose={handleCloseForm} size="md">
        <Center>
          {showChangePasswordForm && <FormChangePassword onSubmitSuccess={handleCloseForm} />}
        </Center>
      </Modal>

      <Modal opened={showInfoForm} onClose={handleCloseForm} size="lg">
        <Center>
          {showInfoForm && <FormInformation onSubmitSuccess={handleCloseForm} />}
        </Center>
      </Modal>


      <>
        <Text className={classes.account}>{user.fullName}</Text>
        <Text className={classes.email}>{user.email}</Text>
        <Button className={classes.link} onClick={handleLogout}>
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Cerrar Sesión</span>
        </Button>
      </>

    </Menu>
  );
}

export default Footer;
