import { useState} from "react"
export const useButtons = (initialIndex, dataObject, setDataObject) => {
    const [newIndex, setNewIndex] = useState(initialIndex)
    const [eMessage, setEMessage] = useState('')
    let { x, y, steps} = dataObject;
    const left = () => {
        if (newIndex != 0 && newIndex != 3 && newIndex != 6) {
            setNewIndex(newIndex - 1)
            setDataObject({
                ...dataObject,
                steps: steps += 1,
                x: x -= 1
            })
            setEMessage("")
        } else {
            setEMessage("You can't go left")
        }
    }
    const right = () => {
        if (newIndex != 2 && newIndex != 5 && newIndex != 8) {
            setNewIndex(newIndex + 1);
            setDataObject({
                ...dataObject,
                steps: steps += 1,
                x: x += 1
            })
            setEMessage("")
        } else {
            setEMessage("You can't go right")
        }
    }
    const up = () => {
        if (newIndex > 2) {
            setNewIndex(newIndex - 3)
            setDataObject({
                ...dataObject,
                steps: steps += 1,
                y: y - 1
            })
            setEMessage("")
        }
        else {
            setEMessage("You can't go up")
        }
    }
    const down = () => {
        if (newIndex < 6) {
            setNewIndex(newIndex + 3)
            setDataObject({
                ...dataObject,
                steps: steps += 1,
                y: y + 1
            })
            setEMessage("")
        } else {
            setEMessage("You can't go down")
        }
        
    }
    const reset = (submit) => {
        if (submit) {
            setDataObject({
                ...dataObject,
                email: ''
                
            })
        }
        else {
            setNewIndex(4)
            setDataObject({
                ...dataObject,
                steps: 0,
                y: 2,
                x: 2,
                email: ''
                
            })
            setEMessage("")

        }
        
    }
    return [left, right, up, down, reset, newIndex, eMessage, setEMessage, dataObject, setDataObject];
}