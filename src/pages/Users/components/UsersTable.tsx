import { useDisclosure } from "@mantine/hooks";
import { DataTableColumn } from "mantine-datatable";
import { useEffect, useMemo, useRef, useState } from "react";
import { getUsersService } from "../services/getUsers.service";
import { ActionIcon, Button, Flex, Group, Text, Tooltip } from "@mantine/core";
import { IconCirclePlus, IconEdit } from "@tabler/icons-react";
import InputsFilters from "../../../components/InputsFilters";
import MantineDrawer from "../../../components/Drawer";
import { DataTable } from "../../../components";
import { Title } from "../../../layouts";
import { useSessionStore } from "../../../store";
import FormUser from "./FormUser";
import { getUserService } from "../services/getUser.service";
import { getUserProperties } from "../../../utils/getUserProperties";


export interface UserData {
	id: string,
	company: string,
	identification: string,
	email: string,
	fullName: string,
	status: boolean | string,
	role: string,
	telephone: string,
    password: string
}

function UserTable(){
    const [listUsers, setListUsers] = useState<UserData[]>([]);
    const listUsersRef = useRef<UserData[]>([]);
    const [selectedUser, setSelectedUser] = useState<UserData | null>(null)
    const [opened, { open, close }] = useDisclosure()
    const { user: admin } = useSessionStore();

    const onClickEditButton = async (user: UserData) => {

        const { id } = user;
        const userToEdit = await getUser(id);
        if (userToEdit == null) return;
        setSelectedUser({ ...userToEdit });
        open()
    }

    const getUser = async (id: string) => {
        const res = await getUserService(id);
        if (res.error || res.data === null) return null;

        return getUserProperties(res.data.data);
    };

    const onClickAddButton = () => {
        setSelectedUser(null);
        open()
    }

    const getUsers = async () => {
            const res = await getUsersService(admin.company.id);
            if (res.error || res.data === null) return
            const usersData = res.data.data;
            const users: UserData[] = usersData.map(user => (
                {
                    id: user.id,
                    company: (user.company != null) ? user.company.name:"" ,
                    identification: user.identification,
                    email: user.email,
                    fullName: user.fullName,
                    status: user.status,
                    role: user.role,
                    telephone: user.telephone,
                    password: user.password
                }
            ));
            setListUsers(users);
            listUsersRef.current = users;
      };

    const generalFilter = (value: string) => {
        if (value == "") {
            return setListUsers(listUsersRef.current);
        }
        const filteredList = listUsersRef.current.filter(
            ({ identification, email, fullName, status,role}: UserData) => {
                const filter = `${identification} ${email} ${fullName} ${status} ${role}`;
                return filter.toLowerCase().includes(value.trim().toLowerCase());

            },
        );
        return setListUsers(filteredList);

    }

    useEffect(() => {
        getUsers();
    }, [])

    const onSubmitSuccess = async () => {
        close()
        await getUsers()
    }

    const UsersColumns = useMemo<DataTableColumn<UserData>[]>(() => [
        { accessor: "identification", title: "Identificación", textAlignment: 'center' },
        { accessor: "fullName", title: "Nombre Completos", textAlignment: 'center' },
        { accessor: "email", title: "Correo", textAlignment: 'center' },
        { accessor: "telephone", title: "Teléfono", textAlignment: 'center' },
        { accessor: "role", title: "Rol", textAlignment: 'center' },
        { accessor: "status", title: "Estado", textAlignment: 'center', render: (User) => <Text>{(User.status) ? "Activo" : "Inactivo"}</Text> },
        {
            accessor: "actions",
            title: "Acciones",
            render: (User) => (
                <Group spacing={10} position="center" noWrap>
                    <Tooltip label="Editar">
                        <ActionIcon
                            color="violet"
                            variant="light"
                            onClick={() => onClickEditButton(User)}
                        >
                            <IconEdit />
                        </ActionIcon>
                    </Tooltip>
                </Group>
            ),
            textAlignment: 'center'
        },

    ], [])

    return (

        <Flex direction="column" h="100%" gap=".15rem">
            <Title />
            <Flex justify="space-between" align="center">
                <InputsFilters onChangeFilters={generalFilter} />
                <Button size="md" leftIcon={<IconCirclePlus />} onClick={onClickAddButton}>
                    Agregar
                </Button>
            </Flex>
            <DataTable columns={UsersColumns} records={listUsers} />
            
            <MantineDrawer opened={opened} close={close} isBig={false} >
                <FormUser onCancel={close} onSubmitSuccess={onSubmitSuccess} selectedUser={selectedUser} />
            </MantineDrawer>
        </Flex>
    )
}

export default UserTable
