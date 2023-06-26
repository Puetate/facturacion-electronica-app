import { Flex, TextInput, createStyles } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { IconSearch } from "@tabler/icons-react";
import { useEffect, useState } from "react";

const useStyles = createStyles((theme) => ({
	input: {
        border:".5rem",
		borderColor:theme.colors.blue[6],
        padding:0
        
	},
}));


function InputsFilters({ onChangeFilters }: { onChangeFilters: (value: string) => void }) {
    const [searchValue, setSearchValue] = useState("");
    const [val] = useDebouncedValue(searchValue, 300);
	const { classes } = useStyles();


    useEffect(() => {
        onChangeFilters(val)
    }, [val])


    return (
        
            <TextInput  className={classes.input}  placeholder="Buscar" rightSection={<IconSearch />} onChange={(e) => { setSearchValue(e.currentTarget.value) }} />


    )
}

export default InputsFilters