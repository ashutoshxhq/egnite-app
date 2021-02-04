import * as React from "react"
import {
  useColorMode,
  useColorModeValue,
  IconButtonProps,
  Box,
  Tooltip,
} from "@chakra-ui/react"
import { FaMoon, FaSun } from "react-icons/fa"

type ColorModeSwitcherProps = Omit<IconButtonProps, "aria-label">

export const ColorModeSwitcher: React.FC<ColorModeSwitcherProps> = (props) => {
  const { toggleColorMode } = useColorMode()
  const SwitchIcon = useColorModeValue(FaMoon, FaSun)
  const { colorMode, } = useColorMode()

  return (
    <Tooltip label="Color Mode" aria-label="Color Mode" placement="right" hasArrow >
      <Box onClick={toggleColorMode} cursor="pointer" color="gray.500" background={colorMode === "light"?"gray.200":"gray.700"} display="flex" borderRadius="15px" justifyContent="center" alignItems="center" width="45px" height="45px">
        <SwitchIcon size="20" />
      </Box>
    </Tooltip>

  )
}
