import { Drawer, Container } from '@mantine/core';

export default function MantineDrawer({ children, opened, close }: { children: JSX.Element | JSX.Element[] , opened:boolean,  close:()=>void, }) {
  return (
    <>
      <Drawer
      withCloseButton={false}
        opened={opened}
        onClose={close}
        position='right'
        size="35%" 
        overlayProps={{ opacity: 0.5, blur: 4 }}
      >
        <Container> {children} </Container>
      </Drawer>
    </>
  );
}