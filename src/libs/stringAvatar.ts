
interface Props {
  name: string
  size?: number | null
  fontSize?: number | null
}

const componentToHex = (c: number) => {
  const hex = c.toString(16)
  return hex.length === 1 ? '0' + hex : hex
}

const rgbToHex = ({ red, blue, green }: { red: number, blue: number, green: number }) => {
  return '#' + componentToHex(red) + componentToHex(green) + componentToHex(blue)
}

function pastelColor (inputStr: string) {
  // TODO: adjust base colour values below based on theme
  const baseRed = 128
  const baseGreen = 128
  const baseBlue = 128

  // lazy seeded random hack to get values from 0 - 256
  // for seed just take bitwise XOR of first two chars
  let seed = inputStr.split(' ')[0].charCodeAt(0) ^ inputStr.split(' ')[1].charCodeAt(0)
  const RAND1 = Math.abs((Math.sin(seed++) * 10000)) % 256
  const RAND2 = Math.abs((Math.sin(seed++) * 10000)) % 256
  const RAND3 = Math.abs((Math.sin(seed++) * 10000)) % 256

  // build colour
  const red = Math.round((RAND1 + baseRed) / 2)
  const green = Math.round((RAND2 + baseGreen) / 2)
  const blue = Math.round((RAND3 + baseBlue) / 2)

  return rgbToHex({ red, green, blue })
}

export const stringAvatar = ({ name, size, fontSize }: Props) => {
  return {
    sx: {
      bgcolor: pastelColor(name),
      height: size ?? size,
      width: size ?? size,
      fontSize: fontSize ? fontSize / 2 : 24
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`
  }
}
