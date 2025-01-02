//import { useState } from "react"


interface Task {
    fecha: Date,
    titulo: string,
    description: string
}

export default function newTask(content: Task) {
    

    return (
        <>
            <div>
                <h2>{content.titulo}</h2>
                <h3> {content.fecha.toISOString()} </h3>
                <p> {content.description} </p>
                <button>Finalizado</button>
            </div>
        
        </>
    )
}