import { useDroppable } from "@dnd-kit/core"

type DropTaskProps = {
    status: string
}

export const DropTask = ({ status }: DropTaskProps)=> {
    const { isOver, setNodeRef } = useDroppable({id: status})
    const style = {
        opacity: isOver ? 0.4 : undefined
    }
    return (
        <div
        className="w-full h-6 border mt-2 text-center text-sm border-dashed border-gray-600"
        ref={setNodeRef}
        style={style}
        >
        Soltar tarea aqui</div>
    )
}