import { Multiselect } from 'multiselect-react-dropdown'
import { useState } from 'react'
import { fetch } from '../../store/csrf'
import './AddMembersForm.css'

const AddMembersForm = ({project}) => {
    const[options, setOptions] = useState([])

    const searchInput = async (value) => {
        if(value.length){
            const body = {value};
            try {
                const res = await fetch('/api/users/search', {
                    method:'POST',
                    body: JSON.stringify(body)
                })

                console.log(res.data.searchResults)
            } catch (err){

            }
        }
    }

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
                onSearch={searchInput}
                displayValue='name'
                />
            </div>
        </div>
    )
}

export default AddMembersForm