import { FC } from 'react'

import Button from '../form-elements/Button'

const AdminCreateButton: FC<{ onClick?: () => void }> = ({ onClick }) => <Button onClick={onClick}>Создать</Button>

export default AdminCreateButton
