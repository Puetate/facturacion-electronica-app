import { Drawer, Container } from '@mantine/core';

export default function MantineDrawer({ children, opened, title, close }: { children: JSX.Element | JSX.Element[] , opened:boolean, title:string, close:()=>void, }) {

  return (
    <>
      <Drawer
        opened={opened}
        onClose={close}
        title={title}
        position='right'
        size="50%" 
        overlayProps={{ opacity: 0.5, blur: 4 }}
      >
        <Container> {children} </Container>
      </Drawer>
    </>
  );
}