import { Toaster, toast } from 'sonner'

const Sonner = ({ position }: { position: any }) => {
  return (
    <Toaster richColors position={position} />
  )
}

export {
  Sonner,
  toast
}
