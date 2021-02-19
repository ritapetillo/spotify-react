import React from 'react'


export default function SidebarOption({title,Icon}) {
    return (
        <div className="sidebarOption">
        {Icon && Icon } 
            <p className="sidebarOption__link-text">{title}</p>
        </div>
    )
}
