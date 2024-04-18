interface Props {
  children: React.ReactNode
}

export const DrawContainer = ({ children }: Props) => {
  return (
    <div>
      {children}
    </div>
  )
}
