import { MantineThemeOverride } from "@mantine/core";

export const theme: MantineThemeOverride = {
	colors: {
		yellow: [
			"#EAE8DA",
			"#DEDABD",
			"#D7D19F",
			"#D5CC7E",
			"#DBCE5A",
			"#E8D530",
			"#FFE500",
		],
		green: [
			"#BED7C7",
			"#A3CDB2",
			"#87C89D",
			"#69C889",
			"#47CE75",
			"#23D960",
			"#0BDA51",
			"#1DB24F",
		],
		black: [
			"#FFFFFF",
			"#000000",
			"#000000",
			"#000000",
			"#000000",
			"#000000",
			"#000000",
		],
		white: [
			"#FFFFFF",
			"#FFFFFF",
			"#FFFFFF",
			"#FFFFFF",
			"#FFFFFF",
			"#FFFFFF",
			"#FFFFFF",
		],
		whiteSmoke: [
			"#EFEEE6",
			"#EFEEE6",
			"#EFEEE6",
			"#EFEEE6",
			"#EFEEE6",
			"#EFEEE6",
			"#EFEEE6D8",
		],
		background: [
			"#EBFFF0",
			"#E4FEEA",
			"#E4FEEA",
			"#E4FEEA",
			"#E4FEEA",
			"#E4FEEA",
			"#E4FEEA",
		],
		blue: [
			"#6D658E",
			"#605785",
			"#544A7E",
			"#493E79",
			"#313175",
			"#252572",
			"#191970",
		],
	},
	components: {
		// Button: {
		//     // Subscribe to theme and component params
		//     styles: (theme, params: ButtonStylesParams, { variant }) => ({
		//       root: {
		//         height: '2.625rem',
		//         padding: '0 1.875rem',
		//         backgroundColor:
		//           variant === 'filled'
		//             ? theme.colors[params.color || theme.primaryColor][9]
		//             : undefined,
		//       },
		//     }),
		//   },
	},
};
