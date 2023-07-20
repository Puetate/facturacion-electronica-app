import { Autocomplete, Flex, Loader, TextInput } from "@mantine/core";
import { useEffect, useState } from "react";
import { shallow } from 'zustand/shallow';
import { getClientByIdentificationService, getIdentificationsService } from "../service";
import { useSalesStore } from "../store";

export default function ClientInfo() {
    const [loading, setLoading] = useState<boolean>(false);
    const [rucsAndCIsData, setRucsAndCIsData] = useState<string[]>([]);
    const { client, setClient } = useSalesStore((state) => ({ client: state.client, setClient: state.setClient }), shallow);
    const [val, setVal] = useState("");

    const getIdentifications = async () => {
        setLoading(true);
        const res = await getIdentificationsService();
        if (res.error || res.data === null) return null;
        const identifications = res.data.data;

        setRucsAndCIsData(identifications);
        setLoading(false)
    }

    const getClientByIdentification = async (identificación: string) => {
        const res = await getClientByIdentificationService(identificación)
        if (res.error || res.data == null) return
        setClient(res.data.data);
    }

    useEffect(() => {
        setVal(client.identification);
        getIdentifications()
    }, [client.identification])

    useEffect(() => {
        getIdentifications();
    }, [])

    return (
        <Flex direction="column">
            <Flex gap="md">
                <Autocomplete
                    label="R.U.C/C.I"
                    rightSection={loading ? <Loader size="1rem" /> : null}
                    data={rucsAndCIsData}
                    onChange={(val) => setVal(val)}
                    value={val}
                    onItemSubmit={async (e) => {
                        getClientByIdentification(e.value);
                    }}
                />
                <TextInput
                    label="Cliente"
                    value={client.fullname}
                    readOnly

                />
            </Flex>
            <Flex gap="md">
                <TextInput
                    label="Teléfono"
                    value={client.telephone}
                    readOnly
                />
                <TextInput
                    label="Correo Electrónico"
                    value={client.email}
                    readOnly
                />
            </Flex>
        </Flex>
    )
}