
import { Button, Navbar, Text, createStyles, getStylesRef, rem } from '@mantine/core';
import {
    IconLogout,
} from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { PublicRoutes } from '../../models';
import { useSessionStore } from '../../store';

const useStyles = createStyles((theme) => ({
    navbar: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    },

    title: {
        textTransform: 'uppercase',
        letterSpacing: rem(-0.25),
    },

    link: {
        ...theme.fn.focusStyles(),
        display: 'flex',
        width:"100%",
        alignItems: 'center',
        backgroundColor:"transparent",
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


    const handleLogout = () => {
        navigate(PublicRoutes.login);
        logout();
    };

    const { classes } = useStyles();
    return (
        <Navbar.Section className={classes.footer}>

            <Text className={classes.account}>
                {user.fullName}
            </Text>
            <Text className={classes.email}>
                {user.email}
            </Text>
            <Button
                className={classes.link}
                onClick={ handleLogout}
            >
                <IconLogout className={classes.linkIcon} stroke={1.5} />
                <span>Cerrar Sesión</span>
            </Button>
        </Navbar.Section>
    )
}

export default Footer