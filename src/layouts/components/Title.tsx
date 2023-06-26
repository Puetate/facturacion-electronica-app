import { Flex, createStyles } from "@mantine/core"
import { useLayout } from "..";

const useStyles = createStyles((theme) => ({

    title: {
        color: theme.colors.blue[4],
        fontSize: "1.5rem",
        [theme.fn.smallerThan("sm")]: {
            display: "none",
        },
    },

}));

function Title() {
    const { title } = useLayout();
	const { classes } = useStyles();


    return (
        <Flex
        justify="center"
        align="center"
        className={classes.title}
        >
            {title}
        </Flex>
    )
}

export default Title