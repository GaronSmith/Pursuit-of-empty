import { Multiselect } from 'multiselect-react-dropdown'
import './AddMembers.css'

const AddMembersForm = ({project}) => {
    const[options, setOptions] = useState([])

    const onSelect = () => {

    }

    const onRemove = () => {

    }
    return (
        <div className='form__content-container'>
            <h3 className='form__title'>Add Members to project: {project.name}</h3>
            <div className='form__select-members'>
                <Multiselect 
                options={options}
                onSelect={onSelect}
                onRemove={onRemove}
                displayValue='name'
                />
            </div>
        </div>
    )
}

export default AddMembersForm