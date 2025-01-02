export default function userForm() {

    return ( 
        <>
            <form action="#" id="form" className="flex bg-orange-500">
                <label htmlFor="name" className="mb-2 block">Ingresar actividad: </label>
                <input type="text" name="name" id="name" />
                <label htmlFor="description" className="mb-2 block">Insertar detalles: </label>
                <input type="text" name="description" id="description" />
                <label htmlFor="datetimeField" className="mb-2 block">Ingresar fecha y hora</label>
                <input type="datetime" name="datetime" id="datetimeField" />
                <input type="submit" value="Submit"/>
            </form>
        </>
    )

}