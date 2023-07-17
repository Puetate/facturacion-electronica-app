import { Drawer, Container } from '@mantine/core';

export default function MantineDrawer({ children, opened, close, isBig }: { children: JSX.Element | JSX.Element[] , opened:boolean,  close:()=>void, isBig:boolean }) {
  return (
    <>
      <Drawer
      withCloseButton={false}
        opened={opened}
        onClose={close}
        position='right'
        size={(isBig)?"70%":"35%"} 
        overlayProps={{ opacity: 0.5, blur: 4 }}
      >
        <Container> {children} </Container>
      </Drawer>
    </>
  );
}