import { Box, Button, Modal, Text, createStyles } from "@mantine/core";
import { useState } from "react";

const useStyles = createStyles(() => ({
	message: {
		marginBottom: "1rem",
	},
	optionsContainer: {
		display: "flex",
		justifyContent: "space-between",
	},
}));
export default function ConfirmDialog({
	opened,
	onClose,
	message,
	onConfirm,
}: {
	opened: boolean;
	message: string;
	onClose: () => void;
	onConfirm: () => Promise<void>;
}) {
	const [loading, setLoading] = useState(false);
	const { classes } = useStyles();
	const handleLoading = async () => {
		setLoading(true);
		await onConfirm();
		setLoading(false);
	};
	return (
		<Modal opened={opened} onClose={onClose} title="Confirmar" centered>
			<Text className={classes.message}>{message}</Text>
			<Box className={classes.optionsContainer}>
				<Button onClick={onClose} disabled={loading}>
					Cancelar
				</Button>
				<Button
					onClick={handleLoading}
					loading={loading}
					color="red"
				>
					Aceptar
				</Button>
			</Box>
		</Modal>
	);
}
