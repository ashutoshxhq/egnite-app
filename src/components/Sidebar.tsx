import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Box, Button, Link, Tooltip, useColorMode, useColorModeValue, VStack } from '@chakra-ui/react'
import React from 'react'
import { ColorModeSwitcher } from './ColorModeSwitcher'
import { BiCog, BiFile, BiHome, BiLogOut, BiPaperPlane, BiStoreAlt } from "react-icons/bi";
import { NavLink, useHistory, useLocation } from 'react-router-dom';

const Sidebar = () => {
    const { colorMode, } = useColorMode()
    const history = useHistory()
    const menuItemColor = useColorModeValue("gray.200", "gray.700")
    const location = useLocation<any>();
    console.log(location.pathname)
    const [isOpen, setIsOpen] = React.useState(false)
    const onClose = () => setIsOpen(false)
    const cancelRef = React.useRef<any>()
    const handleLogout = () => {
        localStorage.setItem("loginStatus","false")
        localStorage.setItem("accessToken","")
        localStorage.setItem("serviceID","")
        history.replace("/login")
    }
    return (
        <Box display="flex" justifyContent="space-between" flexDirection="column" width="70px" height="calc(100vh - 1px)" padding="20px 10px" background={colorMode === "light" ? "white" : "gray.800"}>
            <VStack spacing={3}>
                <Tooltip label="Search" aria-label="Search" placement="right" hasArrow >
                    <Link as={NavLink} to={"/dashboard"} activeClassName="active-menu" display="flex" color="gray.500" background={menuItemColor} borderRadius="18px" justifyContent="center" alignItems="center" width="45px" height="45px">
                        <BiHome size="25" />
                    </Link>
                </Tooltip>
                <Tooltip label="Schemas" aria-label="Schemas" placement="right" hasArrow >
                    <Link as={NavLink} to={"/" + location.pathname.split("/")[1] + "/schemas"} activeClassName="active-menu" display="flex" color="gray.500" background={menuItemColor} borderRadius="18px" justifyContent="center" alignItems="center" width="45px" height="45px">
                        <   BiFile size="25" />
                    </Link>
                </Tooltip>
                <Tooltip label="Functions" aria-label="Functions" placement="right" hasArrow >
                    <Link as={NavLink} to={"/" + location.pathname.split("/")[1] + "/functions"} activeClassName="active-menu" display="flex" color="gray.500" background={menuItemColor} borderRadius="18px" justifyContent="center" alignItems="center" width="45px" height="45px">
                        <BiPaperPlane size="25" />
                    </Link>
                </Tooltip>
                <Tooltip label="Marketplace" aria-label="Marketplace" placement="right" hasArrow >
                    <Link as={NavLink} to={"/" + location.pathname.split("/")[1] + "/marketplace"} activeClassName="active-menu" display="flex" color="gray.500" background={menuItemColor} borderRadius="18px" justifyContent="center" alignItems="center" width="45px" height="45px">
                        <BiStoreAlt size="25" />
                    </Link>
                </Tooltip>
                <Tooltip label="Settings" aria-label="Settings" placement="right" hasArrow >
                    <Link as={NavLink} to={"/" + location.pathname.split("/")[1] + "/settings"} activeClassName="active-menu" display="flex" color="gray.500" background={menuItemColor} borderRadius="18px" justifyContent="center" alignItems="center" width="45px" height="45px">
                        <BiCog size="25" />
                    </Link>
                </Tooltip>
            </VStack>

            <VStack>
                <ColorModeSwitcher />
                <Tooltip label="Logout" aria-label="Logout" placement="right" hasArrow >
                    <Box display="flex" onClick={() => setIsOpen(true)} cursor="pointer" color="gray.500" background={colorMode === "light" ? "gray.200" : "gray.700"} borderRadius="15px" justifyContent="center" alignItems="center" width="45px" height="45px">
                        <BiLogOut size="25" />
                    </Box>
                </Tooltip>
                <AlertDialog
                    isOpen={isOpen}
                    leastDestructiveRef={cancelRef}
                    onClose={onClose}
                >
                    <AlertDialogOverlay>
                        <AlertDialogContent>
                            <AlertDialogHeader fontSize="lg" fontWeight="bold">
                                Logout
                            </AlertDialogHeader>

                            <AlertDialogBody>
                                Are you sure you want to logout?
                            </AlertDialogBody>

                            <AlertDialogFooter>
                                <Button ref={cancelRef} onClick={onClose}>
                                    Cancel
                                </Button>
                                <Button colorScheme="red" onClick={handleLogout} ml={3}>
                                    Logout
                                </Button>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialogOverlay>
                </AlertDialog>
            </VStack>
        </Box>
    )
}

export default Sidebar
