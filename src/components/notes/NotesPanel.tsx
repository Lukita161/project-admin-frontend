import { Task } from "@/types/index"
import { AddNotesForm } from "./AddNotesForm"
import { NoteDetail } from "./NoteDetail"

type NotePanelProps = {
    note: Task['note']
}

export const NotesPanel = ({ note }: NotePanelProps)=> {
    return (
        <>
            <AddNotesForm />
            <div className="divide divide-y-2">
                {note.length ? 
                <>
                    <p>Notas: </p>
                    {note.map(note => (
                        <NoteDetail key={note._id} note={note} />
                    ))}
                </> 
                :
                <p>No hay notas aún</p>
                }
            </div>
        </>
    )
}