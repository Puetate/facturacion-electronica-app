import { useMantineTheme } from "@mantine/core";
import {
	DataTableColumn,
	DataTableProps,
	DataTable as MantineDataTable,
} from "mantine-datatable";
import { useEffect, useMemo, useRef, useState } from "react";


const PAGE_SIZE = 12;

export default function DataTable<T>(props: DataTableProps<T>) {
	const [page, setPage] = useState(1);
	const [fetching, setFetching] = useState(false);
	const recordsRef = useRef<Array<T>>();
	const [tableRecords, setTableRecords] = useState<Array<T>>();
	const [tableColumns, setTableColumns] = useState<DataTableColumn<T>[]>([]);
	const theme = useMantineTheme()
	const titleStyle = useMemo(() => ({ backgroundColor: theme.colors.blue[6], color: "white" }), [])

	useEffect(() => {
		const from = (page - 1) * PAGE_SIZE;
		const to = from + PAGE_SIZE;
		setTableRecords(recordsRef.current?.slice(from, to));
	}, [page]);

	useEffect(() => {
		setTableColumns(props.columns.map((column) => ({ ...column, titleStyle })));
	}, [props.columns]);

	useEffect(() => {
		setFetching(true)
		if (props.records?.length === 0) {
			setTableRecords([]);
			setTimeout(() => {
				setFetching(false);
			}, 3000);
		} else {
			recordsRef.current = props.records;
			setTableRecords(props.records?.slice(0, PAGE_SIZE));
			setFetching(false)
		}
	}, [props.records]);


	return (
		<MantineDataTable
			{...props}
			columns={tableColumns}
			records={tableRecords}
			totalRecords={recordsRef.current?.length}
			recordsPerPage={PAGE_SIZE}
			fetching={fetching}
			withBorder
			paginationColor={theme.colors.green[6]}
			borderColor={theme.colors.green[6]}
			borderRadius="md"
			page={page}
			idAccessor="id"
			noRecordsText="No hay datos disponibles"
			onPageChange={(p) => setPage(p)}
		/>
	);
}
