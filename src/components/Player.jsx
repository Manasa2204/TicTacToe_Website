import React ,{useState} from 'react'

export default function Player({initialName,symbol,isActive}) {
    const [isEditing,setIsEditing]=useState(false);
    const [name,setName]=useState(initialName)

    const changeName=(event)=>{
        setName(event.target.value)
    }

    return (
        <li className={isActive?"active":null}>
            <span className='player'>
                
                {isEditing?<input onChange={changeName} type='text' value={name} required autoFocus/>:<span className='player-name'>{name}</span>}
                <span className='player-symbol'>{symbol}</span>
            </span>
            <button onClick={()=>setIsEditing(!isEditing)}>{isEditing?"Save":"Edit"}</button>
        </li>
    )
}
