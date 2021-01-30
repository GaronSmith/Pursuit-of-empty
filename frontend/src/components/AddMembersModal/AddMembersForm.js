import { Multiselect } from 'multiselect-react-dropdown'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetch } from '../../store/csrf'
import { getTeamMembers } from '../../store/project'
import './AddMembersForm.css'

const AddMembersForm = ({project}) => {
    const teamMembers = useSelector(state => state.projects.members)
    const[options, setOptions] = useState([])
    const[members, setMembers] = useState(teamMembers)
    const dispatch = useDispatch();
    

    useEffect(() => {
        dispatch(getTeamMembers(project.id))
    },[dispatch])

    const searchInput = async (value) => {
        if(value.length){
            const body = {value};
            try {
                const res = await fetch('/api/users/search', {
                    method:'POST',
                    body: JSON.stringify(body)
                })

                setOptions(res.data.searchResults)
            } catch (err){

            }
        }
    }

    const onSelect = async (selectedList, selectedItem) => {
        dispatch(selectedItem.id, project.id)
    }

    const onRemove = async (selectedList, selectedItem) => {
        dispatch()
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
                selectedValues={members}
                displayValue='username'
                />
            </div>
        </div>
    )
}

export default AddMembersForm