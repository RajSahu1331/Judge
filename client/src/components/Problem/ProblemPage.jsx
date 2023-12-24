import CodeEditor from '../Editor/CodeEditor.jsx'
import { useParams } from 'react-router-dom';


function ProblemPage() {

    const id = useParams()._id;
    // console.log(id);
    return (
        <div>
            <CodeEditor id={id} />
        </div>
    )
}

export default ProblemPage